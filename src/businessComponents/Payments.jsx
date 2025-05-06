import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Table from "../components/Tabel";

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.uid : null;
    const isAdmin = localStorage.getItem("isAdmin") === "true";

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

        return baseColumns;
    }, [isAdmin]);

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
