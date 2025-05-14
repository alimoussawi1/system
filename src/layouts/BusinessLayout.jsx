import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../businessComponents/adminNavbar';
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { useAccount } from '../context/AccountContext';

const BusinessLayout = ({ children }) => {
    const { accountData } = useAccount();
    const { uid, fullName, plan, isAdmin } = accountData;

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const fetchLatestApprovedPayment = async () => {
            try {
                const paymentsRef = collection(db, "payments");
                const q = query(
                    paymentsRef,
                    where("userId", "==", uid),
                    where("status", "==", "success"),
                    orderBy("createdAt", "desc"),
                    limit(1)
                );
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const latestPayment = snapshot.docs[0].data();
                    const endDate = latestPayment.endDate.toDate(); // Firestore timestamp -> JS Date

                    const intervalId = setInterval(() => {
                        const currentDate = new Date();
                        const timeDifference = endDate - currentDate;

                        if (timeDifference <= 0) {
                            clearInterval(intervalId);
                            setTimeLeft("Subscription expired");
                        } else {
                            const days = Math.floor(timeDifference / (1000 * 3600 * 24));
                            const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
                            const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

                            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                        }
                    }, 1000);

                    return () => clearInterval(intervalId);
                } else {
                    setTimeLeft("No active subscription found");
                }
            } catch (error) {
                console.error("Error fetching the latest payment:", error);
            }
        };

        if (uid) {
            fetchLatestApprovedPayment();
        }
    }, [uid]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-grow bg-gray-100 flex flex-col overflow-y-auto w-full md:ml-64">
                {/* Admin Navbar */}
                <AdminNavbar
                    name={fullName}
                    plan={plan}
                    timeLeft={timeLeft}
                    isAdmin={isAdmin}

                />

                {/* Page Content */}
                <div className="p-4 flex-grow overflow-y-auto w-full">
                    {children || <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default BusinessLayout;
