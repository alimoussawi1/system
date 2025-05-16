import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/swblogo.png";
import { useAccount } from '../context/AccountContext';
import { auth } from '../firebase';

const Sidebar = () => {
    const navigate = useNavigate();
    const { accountData, setAccountData } = useAccount();
    const { isAdmin } = accountData || {};

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        localStorage.removeItem("accountSession");
        setAccountData(null);
        auth.signOut();
        navigate("/login");
    };

    const linkClasses =
        "block px-4 py-2 rounded-lg transition duration-200 text-gray-700 hover:bg-[#5842aa] hover:text-white";

    return (
        <div className="relative">
            {/* Hamburger Button for Mobile */}
            <button
                onClick={toggleSidebar}
                className="md:hidden text-gray-700 p-2 absolute top-4 right-4 z-50"
            >
                {isSidebarOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>

            {/* Sidebar container */}
            <div
                className={`
    w-64 h-full bg-white text-gray-800 fixed top-0 
    z-40 py-6 px-4 flex flex-col transition-transform transform
    md:left-0 md:right-auto
    ${isSidebarOpen ? 'translate-x-0 right-0' : 'translate-x-full right-0'}
    md:translate-x-0 md:flex
  `}
            >


                <div className="flex justify-start items-center w-full h-[50px] mb-5">
                    <img src={logo} alt="logo" className="w-[120px]" />
                </div>

                <ul className="space-y-2 w-full mt-10 text-left">
                    <li><Link to="/admin/dashboard" className={linkClasses}>Dashboard</Link></li>
                    <li><Link to="/admin/scanned-customers" className={linkClasses}>Scanned Customers</Link></li>
                    <li><Link to="/admin/packages" className={linkClasses}>Packages</Link></li>
                    <li><Link to="/admin/payments" className={linkClasses}>Payments</Link></li>
                    <li><Link to="/admin/contracts" className={linkClasses}>Contracts</Link></li>

                    {isAdmin && (
                        <>
                            <li><Link to="/admin/business" className={linkClasses}>Businesses</Link></li>
                            <li><Link to="/admin/subscriptions" className={linkClasses}>Subscriptions</Link></li>
                        </>
                    )}

                    <li>
                        <button
                            onClick={handleLogout}
                            className="w-full mt-6 px-4 py-2 rounded-lg flex items-center justify-start text-gray-700 hover:bg-[#5842aa] hover:text-white transition duration-200"
                        >
                            <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
