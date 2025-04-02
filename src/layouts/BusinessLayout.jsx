import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../businessComponents/adminNavbar';


const BusinessLayout = ({ children }) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const name = user ? user.fullName : null;

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-grow ml-64 bg-gray-100 flex flex-col overflow-y-auto">
                {/* ✅ Admin Navbar */}
                <AdminNavbar
                    name={name}
                // Replace with dynamic value or user image
                // Replace with real balance if needed
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
