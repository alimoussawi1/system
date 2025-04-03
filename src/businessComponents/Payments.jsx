import React, { useState, useEffect, useMemo } from "react";

import axios from 'axios';
import Table from "../components/Tabel";
const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user ? user.uid : null;

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get("https://swb-backend.onrender.com/get_payments", {
                    params: { userId }
                });

                // Axios responses don't have an 'ok' property. Check status or use response.data directly.
                if (response.status === 200) {
                    setPayments(response.data.payments);
                } else {
                    console.error("Error fetching payments:", response.data.error);
                }
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [userId]);

    const paymentColumns = useMemo(() => [
        { Header: "Payment ID", accessor: "paymentId" },
        { Header: "Amount", accessor: "amount" },
        { Header: "Currency", accessor: "currency" },
        { Header: "Status", accessor: "status" },
        {
            Header: "Created At",
            accessor: "createdAt",
            Cell: ({ cell: { value } }) => {
                // Check if the value has _seconds (Firestore timestamp)
                if (value && value._seconds) {
                    return new Date(value._seconds * 1000).toLocaleString();
                }
                return value;
            }
        },
    ], []);

    return (
        <div>
            <h2>Payments</h2>
            {loading ? (
                <div>Loading...</div>
            ) : payments.length === 0 ? (
                <div>No payments found</div>
            ) : (
                <Table
                    columns={paymentColumns}
                    data={payments}
                    pageSize={5}
                    checkbox={false}
                />
            )}
        </div>
    );
};

export default Payments;
