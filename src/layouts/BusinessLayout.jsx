import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../businessComponents/adminNavbar';
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import { useAccount } from '../context/AccountContext';

const BusinessLayout = ({ children }) => {
    const { accountData, setAccountData } = useAccount();
    const { uid, fullName, plan, isAdmin } = accountData;

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const fetchActiveSubscription = async () => {
            try {
                const subscriptionsRef = collection(db, "subscriptions");
                const q = query(
                    subscriptionsRef,
                    where("businessUid", "==", uid),
                    where("status", "==", true),
                    orderBy("endDate", "desc"), // In case there are multiple actives, get latest
                    limit(1)
                );
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const activeSub = snapshot.docs[0].data();
                    const endDate = activeSub.endDate.toDate(); // Firestore Timestamp to JS Date
                    const planName = activeSub.packageName;
                    console.log(planName)
                    setAccountData(prev => ({ ...prev, plan: planName }));

                    // Optional: you can update plan from here too
                    // setPlan(planName); // If you're managing it via state

                    const intervalId = setInterval(() => {
                        const now = new Date();
                        const timeDiff = endDate - now;

                        if (timeDiff <= 0) {
                            clearInterval(intervalId);

                        } else {
                            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                            setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                        }
                    }, 1000);
                    const hasaccess = activeSub ? true : false
                    setAccountData(prev => ({ ...prev, access: hasaccess }))

                    return () => clearInterval(intervalId);
                } else {
                    setTimeLeft("No active subscription found");
                }
            } catch (error) {
                console.error("Error fetching active subscription:", error);
            }
        };


        if (uid) {
            fetchActiveSubscription();
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
