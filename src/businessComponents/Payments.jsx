import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Table from "../components/Tabel";
import { getAuth } from "firebase/auth";
import { jsPDF } from "jspdf";
const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const userString = localStorage.getItem("user");
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const downloadReceipt = (payment) => {
        const doc = new jsPDF();

        // Set the document title and format the first section
        doc.setFontSize(18);
        doc.text('Official Receipt', 20, 20);
        doc.setFontSize(12);
        doc.text('SWB Business Plus', 20, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
        doc.text(`Business Name: ${payment.businessName}`, 20, 60);
        doc.text(`Contact Email: ${payment.businessEmail}`, 20, 70);
        doc.text(`Amount: $${payment.amount}`, 20, 80);
        doc.text(`Currency: ${payment.currency}`, 20, 90);

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
        const fetchPayments = async () => {
            try {
                let q;
                const paymentsRef = collection(db, "payments");

                if (isAdmin) {
                    q = query(paymentsRef);
                } else {
                    q = query(paymentsRef, where("userId", "==", userId));
                }

                const snapshot = await getDocs(q);

                let results = snapshot.docs.map(doc => {
                    const data = doc.data();



                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt ?? null,
                        endDate: data.endDate ?? null
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
    }, [userId, isAdmin]);

    const paymentColumns = useMemo(() => {
        const baseColumns = [
            { Header: "Amount", accessor: "amount" },
            { Header: "Currency", accessor: "currency" },
            { Header: "Status", accessor: "status" },
            { Header: "Type", accessor: "type" },
            {
                Header: "Created At",
                accessor: "createdAt",
                Cell: ({ cell: { value } }) =>
                    value?.seconds ? new Date(value.seconds * 1000).toLocaleString() : "-",
            },
            {
                Header: "End Date",
                accessor: "endDate",
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
                if (status === "success") {
                    return (
                        <>

                            <button
                                onClick={() => downloadReceipt(row.original)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Download Receipt
                            </button>
                            <button
                                onClick={() => updatePaymentStatus(row.original.id, "pending")}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Decline Payment
                            </button>
                        </>
                    );

                }
                else {
                    if (status === 'Pending') {
                        <button
                            onClick={() => updatePaymentStatus(row.original.id, "success")}
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Mark as Success
                        </button>
                    }
                }
                return null;
            }
        });

        return baseColumns;
    }, [isAdmin]);
    const updatePaymentStatus = async (paymentId, newStatus) => {
        try {
            const paymentRef = doc(db, "payments", paymentId);
            await updateDoc(paymentRef, { status: newStatus });

            // Update the local state to reflect the change
            setPayments(prevPayments =>
                prevPayments.map(payment =>
                    payment.id === paymentId ? { ...payment, status: newStatus } : payment
                )
            );
        } catch (error) {
            console.error("Error updating payment status:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Payments</h2>
            {loading ? (
                <div>Loading...</div>
            ) : payments.length === 0 ? (
                <div>No payments found</div>
            ) : (
                <>
                    <Table
                        columns={paymentColumns}
                        data={payments}
                        pageSize={5}
                        checkbox={false}
                        totalPages={Math.ceil(payments.length / 5)}
                    />

                </>
            )}
        </div>
    );
};

export default Payments;
