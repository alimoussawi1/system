// import React from "react";
// import { useLocation } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";

// const AdminNavbar = ({ name, plan, timeLeft, isAdmin }) => {
//     const location = useLocation();

//     const rawPath = location.pathname.split("/")[2] || "dashboard";

//     const pageTitle = rawPath
//         .replace(/-/g, " ")
//         .replace(/\b\w/g, (char) => char.toUpperCase());

//     return (
//         <div className="bg-gray-100 border-b border-gray-300 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
//             <h2 className="text-xl font-semibold">{pageTitle}</h2>

//             <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm w-full md:w-auto">
//                 {
//                     !isAdmin && (
//                         <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
//                             <span className="text-[#02afde]">
//                                 Current Plan: <span className="font-semibold text-[#5842aa]">{plan}</span>
//                             </span>

//                             {timeLeft ? (
//                                 <span className="text-[#ff6347] font-semibold">
//                                     Time Left: {timeLeft}
//                                 </span>
//                             ) : (
//                                 <span className="text-[#ff6347]">Subscription Expired</span>
//                             )}

//                             <div className="hidden md:block h-5 border-l border-gray-400" />
//                         </div>
//                     )
//                 }

//                 <div className="pt-1 md:pt-0">
//                     <span className="font-semibold text-[#5842aa]">{name}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default AdminNavbar;
import React from "react";
import { useLocation } from "react-router-dom";
import {
    FaUserCircle,
    FaCrown,
    FaClock,
    FaCalendarAlt,
    FaChevronDown,
    FaBell,
    FaSearch
} from "react-icons/fa";

const AdminNavbar = ({ name, plan, timeLeft, isAdmin }) => {
    const location = useLocation();

    const rawPath = location.pathname.split("/")[2] || "dashboard";

    const pageTitle = rawPath
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    // Get current time
    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Get current date
    const currentDate = new Date().toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
                {/* Left Section - Page Title */}
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                                {pageTitle.charAt(0)}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {pageTitle}
                        </h1>
                    </div>

                    {/* Date & Time */}
                    <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500 ml-6">
                        <div className="flex items-center space-x-1">
                            <FaCalendarAlt className="w-3 h-3" />
                            <span>{currentDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FaClock className="w-3 h-3" />
                            <span>{currentTime}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - User Info & Actions */}
                <div className="flex items-center space-x-4 w-full lg:w-auto">
                    {/* Search Bar - Hidden on mobile */}
                    {/* <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 min-w-[200px]">
                        <FaSearch className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm flex-1"
                        />
                    </div> */}

                    {/* Notifications */}
                    {/* <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <FaBell className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">3</span>
                        </span>
                    </button> */}

                    {/* User Plan Info - Only for non-admin users */}
                    {!isAdmin && (
                        <div className="flex items-center space-x-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                            <div className="flex items-center space-x-2">
                                <FaCrown className="w-4 h-4 text-purple-600" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-600">Current Plan</span>
                                    <span className="text-sm font-semibold text-purple-700">
                                        {plan}
                                    </span>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-gray-300" />

                            <div className="flex items-center space-x-2">
                                <FaClock className="w-4 h-4 text-orange-500" />
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-600">Time Left</span>
                                    {timeLeft ? (
                                        <span className="text-sm font-semibold text-orange-600">
                                            {timeLeft}
                                        </span>
                                    ) : (
                                        <span className="text-sm font-semibold text-red-600">
                                            Expired
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Profile */}
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <FaUserCircle className="w-6 h-6 text-white" />
                            </div>
                            {isAdmin && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <FaCrown className="w-2 h-2 text-white" />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">
                                {name}
                            </span>
                            <span className="text-xs text-gray-500">
                                {isAdmin ? "Administrator" : "Business"}
                            </span>
                        </div>


                    </div>
                </div>
            </div>

            {/* Mobile Date & Time */}
            <div className="flex md:hidden items-center justify-between text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FaClock className="w-3 h-3" />
                    <span>{currentTime}</span>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;