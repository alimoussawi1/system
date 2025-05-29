import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firebase config import
import { collection, getDocs, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Modal from "react-modal";
import Select from "react-select"; // Import react-select for multi-select
import { FaPencilAlt, FaRegTimesCircle, FaTrash } from "react-icons/fa";
import Table from "./Tabel";
import { confirmAlert } from 'react-confirm-alert'; // Importing react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const Subscriptions = () => {
    const [businessOptions, setBusinessOptions] = useState([]);
    const [packageOptions] = useState([
        { value: "Launch", label: "Launch" },
        { value: "Growth", label: "Growth" },
        { value: "Advance", label: "Advance" },
        { value: "Elite", label: "Elite" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Track if we're in edit mode
    const [selectedBusinesses, setSelectedBusinesses] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(true); // Track status (active/inactive)
    const [subscriptions, setSubscriptions] = useState([]); // Store subscription data
    const [editSubscriptionId, setEditSubscriptionId] = useState(null); // Store subscription ID for editing
    const [loading, setLoading] = useState(false);

    // Fetch & sort businesses
    const fetchBusinessNames = async () => {
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const filtered = snapshot.docs
                .map(doc => ({ ...doc.data(), uid: doc.id }))
                .filter(doc => !!doc.businessEmail)
                .map(doc => ({
                    value: doc.uid,
                    label: doc.businessName || "-",
                }))
                .sort((a, b) => a.label.localeCompare(b.label));
            setBusinessOptions(filtered);
        } catch (error) {
            console.error("Error fetching business names: ", error);
        }
    };

    // Fetch subscriptions data
    const fetchSubscriptions = async () => {
        try {
            setLoading(true)
            const snapshot = await getDocs(collection(db, "subscriptions"));
            const fetchedData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    businessName: data.businessName,
                    businessUid: data.businessUid,
                    startDate: data.startDate?.toDate().toISOString().split('T')[0], // Format date as YYYY-MM-DD
                    endDate: data.endDate?.toDate().toISOString().split('T')[0], // Format date as YYYY-MM-DD
                    packageName: data.packageName,
                    status: data.status,
                    createdAt: data.createdAt?.toDate().toLocaleString()
                };
            });

            // Sort descending by endDate (latest endDate first)
            fetchedData.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));


            setSubscriptions(fetchedData);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
        finally {
            setLoading(false)
        }
    };


    // Open the modal in edit mode
    const openModalForEdit = (subscriptionId) => {

        setIsModalOpen(true);
        setIsEditMode(true);
        const subscription = subscriptions.find(sub => sub.id === subscriptionId);
        console.log(subscription)
        if (subscription) {
            setEditSubscriptionId(subscription.id);
            setSelectedBusinesses([{ value: subscription.businessUid, label: subscription.businessName }]);
            setStartDate(subscription.startDate);
            setEndDate(subscription.endDate);
            setSelectedPackage({ value: subscription.packageName, label: subscription.packageName });
            setSelectedStatus(subscription.status);
        }
    };

    // Open modal for adding new subscription
    const openModalForAdd = () => {
        setIsModalOpen(true);
        setIsEditMode(false);
        setSelectedBusinesses([]);
        setStartDate("");
        setEndDate("");
        setSelectedPackage(null);
        setSelectedStatus(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBusinesses([]);
        setStartDate("");
        setEndDate("");
        setSelectedPackage(null);
        setSelectedStatus(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const baseSubscriptionData = {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            packageName: selectedPackage?.label,
            createdAt: serverTimestamp(),
            status: selectedStatus // Use selectedStatus for status
        };
        console.log(selectedBusinesses)

        try {
            if (isEditMode) {
                // Update existing subscription
                const subscriptionDoc = doc(db, "subscriptions", editSubscriptionId);
                await updateDoc(subscriptionDoc, {
                    ...baseSubscriptionData,
                    businessUid: selectedBusinesses[0]?.value,
                    businessName: selectedBusinesses[0]?.label,
                });
                console.log("Subscription updated successfully");
            } else {
                // Create new subscription
                const writePromises = selectedBusinesses.map(business => {
                    const data = {
                        ...baseSubscriptionData,
                        businessUid: business.value,
                        businessName: business.label
                    };
                    return addDoc(collection(db, "subscriptions"), data);
                });

                await Promise.all(writePromises);
                console.log("All subscriptions successfully added.");
            }

            closeModal();
            fetchSubscriptions(); // Refresh the table after adding or editing
        } catch (error) {
            console.error("Error saving subscriptions:", error);
        }
    };

    const handleDelete = (subscriptionId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this subscription?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const subscriptionDoc = doc(db, "subscriptions", subscriptionId);
                            await deleteDoc(subscriptionDoc);
                            console.log("Subscription deleted successfully");
                            fetchSubscriptions(); // Refresh the table after deletion
                        } catch (error) {
                            console.error("Error deleting subscription: ", error);
                        }
                    },
                },
                {
                    label: 'No',
                    onClick: () => console.log("Deletion canceled"),
                },
            ],
        });
    };

    useEffect(() => {
        fetchBusinessNames(); // Fetch business names when the component mounts
        fetchSubscriptions(); // Fetch subscriptions when the component mounts
    }, []);

    // Define columns for the table
    const subscriptionColumns = [
        { Header: 'Business Name', accessor: 'businessName' },
        { Header: 'Start Date', accessor: 'startDate' },
        { Header: 'End Date', accessor: 'endDate' },
        { Header: 'Package', accessor: 'packageName' },
        {
            Header: 'Status', accessor: 'status',
            Cell: ({ cell: { value } }) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            )
        },
        { Header: 'Created At', accessor: 'createdAt' },
        {
            Header: 'Actions',
            Cell: ({ row }) => (
                <>
                    <div className="flex gap-2">
                        <button onClick={() => openModalForEdit(row.original.id)} className="text-gray-500 p-1 rounded">
                            <FaPencilAlt />
                        </button>
                        <button onClick={() => handleDelete(row.original.id)} className="text-red-600 p-1 rounded">
                            <FaTrash />
                        </button>
                    </div>
                </>
            )
        }
    ];

    return (
        <div>
            <div className="flex justify-between">
                <div>

                </div>
                <div>
                    <button onClick={openModalForAdd} className="bg-[#5842aa] text-white p-2 rounded-lg">
                        Add Subscription
                    </button>
                </div>
            </div>
            {
                loading ? (

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
                        <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
                        <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
                    </div>


                ) : (
                    <Table
                        columns={subscriptionColumns}
                        data={subscriptions} // Pass subscriptions data to your table component
                        pageSize={10}
                        checkbox={false}
                        totalPages={Math.ceil(subscriptions.length / 10)}
                    />


                )
            }

            {/* Table Component */}

            {/* Modal for Adding or Editing Subscription */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "500px",
                        padding: "20px",
                        borderRadius: "10px",
                        height: "500px"
                    },
                }}
            >
                <div className="flex justify-between">
                    <div>
                        <h2 className="mb-4">{isEditMode ? "Edit Subscription" : "Add Subscription"}</h2>
                    </div>
                    <div>
                        <FaRegTimesCircle onClick={closeModal} />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Business Names</label>
                        <Select
                            isMulti
                            options={businessOptions}
                            value={selectedBusinesses}
                            onChange={setSelectedBusinesses}
                            placeholder="Select businesses"
                            className="text-left"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate ? startDate : ''}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate ? endDate : ''}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border p-2 w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Package Name</label>
                        <Select
                            options={packageOptions}
                            value={selectedPackage}
                            onChange={setSelectedPackage}
                            placeholder="Select package"
                            className="text-left"
                            required
                        />
                    </div>
                    {isEditMode && (
                        <div className="mb-4 flex items-center gap-4">
                            <label className="block mb-1 font-semibold text-gray-700">Status</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedStatus}
                                    onChange={() => setSelectedStatus(!selectedStatus)}
                                    className="sr-only"
                                />
                                <div
                                    className={`w-12 h-7 rounded-full transition-colors duration-300 ease-in-out
          ${selectedStatus ? 'bg-green-500' : 'bg-gray-300'}`}
                                ></div>
                                <div
                                    className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white border border-gray-300
          transition-transform duration-300 ease-in-out
          ${selectedStatus ? 'translate-x-5' : 'translate-x-0'}`}
                                ></div>
                            </label>
                        </div>
                    )}





                    <div className="flex justify-center w-full mt-8">
                        <button type="submit" className="bg-[#10758B] w-[20%] text-white p-2 rounded-lg hover:bg-[#0a5f73] w-full">
                            {isEditMode ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Subscriptions;
