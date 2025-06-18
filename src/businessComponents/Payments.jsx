import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Table from "../components/Tabel";
import { getAuth } from "firebase/auth";
import Select from "react-select";
import logoImg from '../assets/swblogo.png';
import { jsPDF } from "jspdf";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import { FaDownload, FaRegTimesCircle } from "react-icons/fa";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { confirmAlert } from 'react-confirm-alert';
import { useAccount } from "../context/AccountContext";
import {
    FaCheck,      // For approve action
    FaTimes,      // For decline action  
    // For download action
    FaTrash,      // For delete action
    FaUndo,       // For revert/undo action
    FaBan         // For decline from success state
} from 'react-icons/fa';
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
        const doc = new jsPDF();

        // Add Logo (assumes base64 or URL, see below)
        const imgProps = doc.getImageProperties(logoImg);
        const imgWidth = 40;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        doc.addImage(logoImg, 'PNG', 160, 10, imgWidth, imgHeight);

        // Title
        doc.setFontSize(22);
        doc.setTextColor('#5842aa');
        doc.text('Official Receipt', 20, 30);

        // Subtitle
        doc.setFontSize(14);
        doc.setTextColor('#10758B');
        doc.text('SWB Business Plus', 20, 40);

        // Business Info
        doc.setFontSize(12);
        doc.setTextColor('#000000');
        doc.text(`Business Name: ${payment.businessName || '-'}`, 20, 55);
        doc.text(`Contact Email: ${payment.businessEmail || '-'}`, 20, 65);

        // Draw a line
        doc.setDrawColor('#5842aa');
        doc.setLineWidth(0.8);
        doc.line(20, 70, 190, 70);

        // Payment Details Table
        const startDate = payment.createdAt?.seconds
            ? new Date(payment.createdAt.seconds * 1000).toLocaleDateString()
            : '-';
        const endDate = payment.endDate?.seconds
            ? new Date(payment.endDate.seconds * 1000).toLocaleDateString()
            : '-';

        const tableColumnX = 20;
        let tableRowY = 80;
        const lineHeight = 10;

        const addRow = (label, value) => {
            doc.setFont(undefined, 'bold');
            doc.text(label, tableColumnX, tableRowY);
            doc.setFont(undefined, 'normal');
            doc.text(String(value), tableColumnX + 70, tableRowY);
            tableRowY += lineHeight;
        };

        addRow('Package Purchased:', '1 Year');
        addRow('Start Date:', startDate);
        addRow('End Date:', endDate);
        addRow('Payment Method:', payment.type || '-');
        addRow('Amount Paid:', `${payment.amount ?? '-'} ${payment.currency ?? ''}`);

        // Another line before next section
        doc.setDrawColor('#10758B');
        doc.setLineWidth(0.6);
        doc.line(20, tableRowY + 2, 190, tableRowY + 2);

        tableRowY += 15;

        // Included Features Heading
        doc.setFontSize(14);
        doc.setTextColor('#5842aa');
        doc.setFont(undefined, 'bold');
        doc.text("What's Included in the Package:", 20, tableRowY);
        tableRowY += 10;

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        const features = [
            "Offer Listing: Your business will be listed in our exclusive SWB offers directory.",
            "Full Analytics on SWB Website: Access to detailed website analytics.",
            "Social Media Promotion on SWB Page: Promotion of your business.",
            "Top Ranking in Related Category: Your business will receive top ranking.",
            "Virtual/In-Person Staff Training: Our team will provide training.",
            "Priority 24/7 Customer Support: Access to customer support anytime.",
            "Push Notifications: Based on your package, you'll get push notifications.",
            "SWB WhatsApp Channel Exposure: Exposure to more users via WhatsApp."
        ];

        features.forEach((feature) => {
            const splitText = doc.splitTextToSize(feature, 170);
            doc.text(splitText, 20, tableRowY);
            tableRowY += splitText.length * 7;
        });

        tableRowY += 10;

        // Contact Info
        doc.setFont(undefined, 'bold');
        doc.setTextColor('#10758B');
        doc.text('Contact Information:', 20, tableRowY);
        tableRowY += 8;

        doc.setFont(undefined, 'normal');
        doc.setTextColor('#000000');
        const contacts = [
            'Website: www.studentwithbenefits.com',
            'Email: studentwithbenefits@gmail.com',
            'Phone: +961 70009879',
        ];
        contacts.forEach((line) => {
            doc.text(line, 20, tableRowY);
            tableRowY += 8;
        });

        // Save PDF
        doc.save(`receipt_${payment.id || 'unknown'}.pdf`);
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




                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt ?? null,

                    };
                });


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
            Header: "Actions",
            Cell: ({ row }) => {
                const status = row.original.status;

                // Admin actions for different statuses
                if (isAdmin) {
                    if (status === 'Pending') {
                        return (
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => updatePaymentStatus(row.original.id, "Success")}
                                    className="group relative p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-200 hover:scale-105"
                                    title="Approve Payment"
                                >
                                    <FaCheck className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Approve
                                    </span>
                                </button>

                                <button
                                    onClick={() => updatePaymentStatus(row.original.id, "Declined")}
                                    className="group relative p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105"
                                    title="Decline Payment"
                                >
                                    <FaTimes className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Decline
                                    </span>
                                </button>

                                <button
                                    onClick={() => downloadReceipt(row.original)}
                                    className="group relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                                    title="Download Receipt"
                                >
                                    <FaDownload className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Download
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleDelete(row.original)}
                                    className="group relative p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-105"
                                    title="Delete Payment"
                                >
                                    <FaTrash className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Delete
                                    </span>
                                </button>
                            </div>
                        );
                    }

                    else if (status === 'Success') {
                        return (
                            <div className="flex items-center justify-center gap-1">
                                <button
                                    onClick={() => updatePaymentStatus(row.original.id, "Pending")}
                                    className="group relative p-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 hover:text-orange-700 transition-all duration-200 hover:scale-105"
                                    title="Move to Pending"
                                >
                                    <FaUndo className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Revert
                                    </span>
                                </button>

                                <button
                                    onClick={() => updatePaymentStatus(row.original.id, "Declined")}
                                    className="group relative p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105"
                                    title="Decline Payment"
                                >
                                    <FaBan className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Decline
                                    </span>
                                </button>

                                <button
                                    onClick={() => downloadReceipt(row.original)}
                                    className="group relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                                    title="Download Receipt"
                                >
                                    <FaDownload className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Download
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleDelete(row.original)}
                                    className="group relative p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-105"
                                    title="Delete Payment"
                                >
                                    <FaTrash className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Delete
                                    </span>
                                </button>
                            </div>
                        );
                    }

                    else if (status === 'Declined') {
                        return (
                            <div className="flex items-center justify-center gap-1">
                                <button
                                    onClick={() => updatePaymentStatus(row.original.id, "Pending")}
                                    className="group relative p-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 hover:text-orange-700 transition-all duration-200 hover:scale-105"
                                    title="Move to Pending"
                                >
                                    <FaUndo className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Revert
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleDelete(row.original)}
                                    className="group relative p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105"
                                    title="Delete Payment"
                                >
                                    <FaTrash className="w-4 h-4" />
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Delete
                                    </span>
                                </button>
                            </div>
                        );
                    }
                }

                // Non-admin actions for successful payments
                if (status === "Success") {
                    return (
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() => downloadReceipt(row.original)}
                                className="group relative p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                title="Download Receipt"
                            >
                                <FaDownload className="w-5 h-5" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Download Receipt
                                </span>
                            </button>
                        </div>
                    );
                }

                // No actions available
                return (
                    <div className="flex items-center justify-center">
                        <span className="text-gray-400 text-sm italic">No actions</span>
                    </div>
                );
            }
        });

        return baseColumns;
    }, [isAdmin]);
    const updatePaymentStatus = async (paymentId, newStatus) => {
        // Confirm the action before making any changes
        console.log("changing", payments);
        console.log(paymentId)


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


                            console.log(paymentId)
                            console.log(payments);
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
                <div className="flex justify-center items-center mt-20">

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
                        <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
                        <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
                    </div>


                </div>
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
                        height: "400px"
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
