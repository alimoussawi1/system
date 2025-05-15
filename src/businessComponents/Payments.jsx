import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Table from "../components/Tabel";
import { getAuth } from "firebase/auth";
import Select from "react-select";
import { jsPDF } from "jspdf";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import { FaDownload, FaRegTimesCircle, FaTrash } from "react-icons/fa";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { confirmAlert } from 'react-confirm-alert';
import { useAccount } from "../context/AccountContext";
const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { accountData } = useAccount();
    const [selectedBusinesses, setSelectedBusinesses] = useState([]);
    const { uid, isAdmin } = accountData;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [businessOptions, setBusinessOptions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const statusOptions = [
        { value: "Success", label: "Success" },
        { value: "Pending", label: "Pending" },
        { value: "Declined", label: "Declined" },
    ];

    const typesOptions = [
        {
            value: "Cash", label: "Cash"
        },

    ]
    const [selectedType, setSelectedType] = useState(typesOptions[0]); // default to Cash
    const [amount, setAmount] = useState("");

    //add payment manually
    const openModalForAdd = () => {
        setIsModalOpen(true);

    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBusinesses([]);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const timestamp = new Date();

            const paymentPromises = selectedBusinesses.map(async (business) => {
                const paymentData = {
                    userId: business.value,
                    businessName: business.label,
                    amount: Number(amount),
                    currency: "USD", // or any other you use
                    type: selectedType.value,
                    status: "Success",
                    createdAt: timestamp,
                    whishStatus: "-", // optional
                };

                await addDoc(collection(db, "payments"), paymentData);
            });

            await Promise.all(paymentPromises);

            // Optionally, you could refresh payments list manually here
            setAmount("");
            setSelectedBusinesses([]);
            closeModal();
        } catch (error) {
            console.error("Error adding payment:", error);
        }
    };

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
    const downloadReceipt = (payment) => {
        console.log(payment);
        const doc = new jsPDF();

        // Set the document title and format the first section
        doc.setFontSize(18);
        doc.text('Official Receipt', 20, 20);
        doc.setFontSize(12);
        doc.text('SWB Business Plus', 20, 30);
        doc.text(`Business Name: ${payment.businessName}`, 20, 60);
        doc.text(`Contact Email: ${payment.businessEmail}`, 20, 70);

        // Package Details
        doc.text('Package Details:', 20, 110);
        doc.text(`• Package Purchased: 1 Year`, 20, 120);  // Example, can be dynamic if necessary
        doc.text(`• Start Date: ${new Date(payment.createdAt.seconds * 1000).toLocaleDateString()}`, 20, 130);
        doc.text(`• End Date: ${new Date(payment.endDate.seconds * 1000).toLocaleDateString()}`, 20, 140);
        doc.text(`• Payment Method: ${payment.type}`, 20, 150);  // Adjust this based on actual data

        // What's Included in the Package
        doc.text("What's Included in the Package:", 20, 170);
        doc.text("1. Offer Listing: Your business will be listed in our exclusive SWB offers directory.", 20, 180);
        doc.text("2. Full Analytics on SWB Website: Access to detailed website analytics.", 20, 190);
        doc.text("3. Social Media Promotion on SWB Page: Promotion of your business.", 20, 200);
        doc.text("4. Top Ranking in Related Category: Your business will receive top ranking.", 20, 210);
        doc.text("5. Virtual/In-Person Staff Training: Our team will provide training.", 20, 220);
        doc.text("6. Priority 24/7 Customer Support: Access to customer support anytime.", 20, 230);
        doc.text("7. Push Notifications: Based on your package, you'll get push notifications.", 20, 240);
        doc.text("8. SWB WhatsApp Channel Exposure: Exposure to more users via WhatsApp.", 20, 250);

        // Contact Information
        doc.text('Contact Information:', 20, 270);
        doc.text('Website: www.studentwithbenefits.com', 20, 280);
        doc.text('Email: studentwithbenefits@gmail.com', 20, 290);
        doc.text('Phone: +961 70009879', 20, 300);

        // Save the PDF
        doc.save(`receipt_${payment.id}.pdf`);
    };
    useEffect(() => {
        fetchBusinessNames(); // Fetch business names when the component mounts

    }, []);
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                let q;
                const paymentsRef = collection(db, "payments");

                if (isAdmin) {
                    q = query(paymentsRef);
                } else {
                    q = query(paymentsRef, where("userId", "==", uid));
                }

                const snapshot = await getDocs(q);

                let results = snapshot.docs.map(doc => {
                    const data = doc.data();
                    console.log(data);



                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt ?? null,

                    };
                });
                console.log(results)

                if (isAdmin) {
                    // Fetch all unique userId -> business info
                    const uniqueUserIds = [...new Set(results.map(p => p.userId).filter(Boolean))];
                    const userDocs = await Promise.all(uniqueUserIds.map(uid => getDoc(doc(db, "users", uid))));

                    const userMap = {};
                    userDocs.forEach((docSnap, index) => {
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            userMap[uniqueUserIds[index]] = {
                                businessName: userData.businessName || "-",
                                businessEmail: userData.businessEmail || "-",
                            };
                        }
                    });

                    // Merge user info into each payment
                    results = results.map(payment => ({
                        ...payment,
                        businessName: userMap[payment.userId]?.businessName || "-",
                        businessEmail: userMap[payment.userId]?.businessEmail || "-"
                    }));

                    // Sort payments by createdAt, from newest to oldest
                    results = results.sort((a, b) => {
                        const dateA = a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(0);
                        const dateB = b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(0);
                        return dateB - dateA; // newest first
                    });
                }


                setPayments(results);
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [uid, isAdmin]);

    const paymentColumns = useMemo(() => {
        const baseColumns = [
            { Header: "Amount", accessor: "amount" },
            { Header: "Currency", accessor: "currency" },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ cell: { value } }) => {
                    const statusColor = {
                        success: "bg-green-100 text-green-800",
                        pending: "bg-orange-100 text-orange-800",
                        declined: "bg-red-100 text-red-800",
                    };

                    return (
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColor[value.toLowerCase()] || "bg-gray-100 text-gray-800"}`}>
                            {value}
                        </span>
                    );
                }
            },

            ...(isAdmin ? [{ Header: "Whish Status", accessor: "whishStatus" }] : []),
            { Header: "Type", accessor: "type" },
            {
                Header: "Created At",
                accessor: "createdAt",
                Cell: ({ cell: { value } }) =>
                    value?.seconds ? new Date(value.seconds * 1000).toLocaleString() : "-",
            },

        ];

        if (isAdmin) {
            baseColumns.unshift({
                Header: "Business Name",
                accessor: "businessName",
            });

        }

        baseColumns.push({
            Header: "Action",
            Cell: ({ row }) => {
                const status = row.original.status;

                // Conditionally render "Dislike" button only for Admins
                if (isAdmin) {
                    if (status === 'Pending') {
                        return (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updatePaymentStatus(row.original.id, "Success", row.original.userId)}
                                    className="text-green-500"
                                    title="Approve"
                                >
                                    <AiFillLike />
                                </button>
                                <button
                                    onClick={() => updatePaymentStatus(row.original.id, "Declined", row.original.userId)}
                                    className="text-green-500"
                                    title="Decline"
                                >
                                    <IoIosCloseCircleOutline />
                                </button>
                                <button
                                    onClick={() => downloadReceipt(row.original)}
                                    className="text-[#0a5f73]"
                                    title="Download"
                                >
                                    <FaDownload />
                                </button>
                                <button
                                    onClick={() => handleDelete(row.original)}
                                    className="text-red-500"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        );
                    }

                    else if (status === 'Success') {
                        return (
                            <>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updatePaymentStatus(row.original.id, "Pending", row.original.userId)}
                                        className=" text-red-500 rounded"
                                    >
                                        <AiFillDislike />
                                    </button>
                                    <button
                                        onClick={() => updatePaymentStatus(row.original.id, "Declined", row.original.userId)}
                                        className=" text-green-500  rounded"
                                    >
                                        <IoIosCloseCircleOutline />
                                    </button>
                                    <button
                                        onClick={() => downloadReceipt(row.original)}
                                        className=" text-[#0a5f73] rounded"
                                    >
                                        <FaDownload />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(row.original)}
                                        className="text-red-500"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </>
                        );

                    } else if (status === 'Declined') {
                        return (
                            <button
                                onClick={() => handleDelete(row.original)}
                                className="text-red-500"
                                title="Delete"
                            >
                                <FaTrash />
                            </button>

                        )
                    }

                }

                if (status === "Success") {
                    return (
                        <>
                            <button
                                onClick={() => downloadReceipt(row.original)}
                                className="text-[#0a5f73] px-4 py-2 rounded"
                            >
                                <FaDownload />
                            </button>
                        </>
                    );
                }

                return null;
            }
        });


        return baseColumns;
    }, [isAdmin]);
    const updatePaymentStatus = async (paymentId, newStatus, uid, planName) => {
        // Confirm the action before making any changes

        confirmAlert({
            title: 'Confirm Status Change',
            message: `Are you sure you want to change the payment status to "${newStatus}"?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const paymentRef = doc(db, "payments", paymentId);
                            await updateDoc(paymentRef, { status: newStatus });

                            // If admin, update the access and plan fields
                            if (isAdmin) {
                                const userRef = doc(db, "users", uid);
                                if (newStatus === 'Success') {
                                    // Set access to true and update plan name
                                    await updateDoc(userRef, { access: true, plan: planName });
                                } else if (newStatus === 'Pending') {
                                    // Set access to false and clear plan name
                                    await updateDoc(userRef, { access: false, plan: "" });
                                }
                                else if (newStatus === 'Declined') {
                                    await updateDoc(userRef, { access: false, plan: "" });
                                }
                            }

                            // Update the local state to reflect the change
                            setPayments(prevPayments =>
                                prevPayments.map(payment =>
                                    payment.id === paymentId ? { ...payment, status: newStatus } : payment
                                )
                            );
                        } catch (error) {
                            console.error("Error updating payment status:", error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        // Do nothing on cancel
                    }
                }
            ]
        });
    };
    const handleDelete = async (payment) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: `Are you sure you want to permanently delete this payment? This action cannot be undone.`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const paymentRef = doc(db, "payments", payment.id);
                            await deleteDoc(paymentRef); // completely removes the doc from Firestore

                            setPayments(prev =>
                                prev.filter(p => p.id !== payment.id)
                            );

                            console.log(`Payment ${payment.id} successfully deleted.`);
                        } catch (error) {
                            console.error("Error deleting payment:", error);
                        }
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };


    return (
        <div className="p-4">
            <div className="flex justify-between">
                <div>
                    {isAdmin && (
                        <div className="my-4 w-60">
                            <Select
                                options={statusOptions}
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                isClearable
                                placeholder="Filter by status"
                            />
                        </div>
                    )}

                </div>
                <div>
                    {
                        isAdmin && (
                            <button onClick={openModalForAdd} className="bg-[#5842aa] text-white p-2 rounded-lg">
                                Add Payment
                            </button>
                        )
                    }

                </div>

            </div>

            {loading ? (
                <div>Loading...</div>
            ) : payments.length === 0 ? (
                <div>No payments found</div>
            ) : (
                <>
                    <Table
                        columns={paymentColumns}
                        data={
                            selectedStatus
                                ? payments.filter(p => p.status?.toLowerCase() === selectedStatus.value.toLowerCase())
                                : payments
                        }
                        pageSize={10}
                        checkbox={false}
                        totalPages={Math.ceil(payments.length / 10)}
                    />


                </>
            )}
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
                        <h2 className="mb-4">Add Payment</h2>
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
                        <label className="block mb-1">Type</label>
                        <Select
                            options={typesOptions}
                            value={selectedType}
                            onChange={setSelectedType}
                            placeholder="Select type"
                            className="text-left"
                            isDisabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter amount"
                            required
                        />
                    </div>











                    <div className="flex justify-center w-full mt-8">
                        <button type="submit" className="bg-[#10758B] w-[20%] text-white p-2 rounded-lg hover:bg-[#0a5f73] w-full">
                            Add
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Payments;
