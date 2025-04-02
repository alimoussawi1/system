import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all data
        navigate("/");        // Redirect to homepage
    };

    return (
        <div className="w-64 h-full bg-gray-800 text-white fixed top-0 left-0 flex flex-col items-start py-5 px-3">
            <h2 className="text-xl font-bold text-center mb-8">Business Dashboard</h2>
            <ul className="space-y-4 w-full">
                <li>
                    <Link to="/admin/dashboard" className="text-white hover:text-gray-400">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/scanned-customers" className="text-white hover:text-gray-400">
                        Scanned Customers
                    </Link>
                </li>
                <li>
                    <Link to="/admin/offers" className="text-white hover:text-gray-400">
                        Offers
                    </Link>
                </li>
                <li>
                    <Link to="/admin/packages" className="text-white hover:text-gray-400">
                        Packages
                    </Link>
                </li>
                <li>
                    <Link to="/admin/payments" className="text-white hover:text-gray-400">
                        Payments
                    </Link>
                </li>
                <li>
                    <Link to="/admin/contracts" className="text-white hover:text-gray-400">
                        Contracts
                    </Link>
                </li>
                <li>
                    <Link to="/admin/chat" className="text-white hover:text-gray-400">
                        Chat
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="w-full mt-5 flex items-center justify-start text-white hover:text-gray-400"
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
