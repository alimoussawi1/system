import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../businessComponents/adminNavbar';
import { useAccount } from '../context/AccountContext';

const BusinessLayout = ({ children }) => {
    const { accountData } = useAccount();
    const { uid, fullName, plan, isAdmin, timeLeft } = accountData || {};

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Sidebar (handled responsively) */}
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
