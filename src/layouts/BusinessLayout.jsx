import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../businessComponents/adminNavbar';
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase"; // Adjust according to your firebase setup
import { getAuth } from 'firebase/auth';

const BusinessLayout = ({ children }) => {
    const userString = localStorage.getItem("user");

    const name = localStorage.getItem("fullName");
    const plan = localStorage.getItem("plan");
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const fetchLatestApprovedPayment = async () => {
            try {

                const paymentsRef = collection(db, "payments");
                const q = query(paymentsRef, where("userId", "==", userId), where("status", "==", "success"), orderBy("createdAt", "desc"), limit(1));
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const latestPayment = snapshot.docs[0].data();
                    const endDate = latestPayment.endDate.toDate(); // Convert Firestore timestamp to JavaScript Date

                    // Set up a countdown timer
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

                    return () => clearInterval(intervalId); // Cleanup interval on component unmount
                } else {
                    setTimeLeft("No active subscription found");
                }
            } catch (error) {
                console.error("Error fetching the latest payment:", error);
            }
        };

        if (userId) {
            fetchLatestApprovedPayment();
        }
    }, [userId]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-grow ml-64 bg-gray-100 flex flex-col overflow-y-auto">
                {/* ✅ Admin Navbar */}
                <AdminNavbar
                    name={name}
                    plan={plan}
                    timeLeft={timeLeft} // Passing the dynamic countdown to AdminNavbar
                />

                {/* Page Content */}
                <div className="p-8 flex-grow overflow-y-auto">
                    {children || <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default BusinessLayout;
