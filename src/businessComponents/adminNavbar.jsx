import React from "react";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const AdminNavbar = ({ name, plan }) => {
    const location = useLocation();

    // Extract the route after /admin
    const rawPath = location.pathname.split("/")[2] || "dashboard";

    // Format it (capitalize and replace dashes)
    const pageTitle = rawPath
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="bg-gray-100 border-b border-gray-300 px-6 py-3 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{pageTitle}</h2>

            <div className="flex items-center space-x-4 text-sm">


                <span className=" text-[#02afde]">Current Plan : <span className="font-semibold text-[#5842aa]">
                    {plan}
                </span> </span>
                <div className="h-5 border-l border-gray-400"></div>


                <div className="flex items-center space-x-2">

                    <span className="font-semibold text-[#5842aa]">{name}</span>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
