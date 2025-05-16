import React from "react";
import { useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const AdminNavbar = ({ name, plan, timeLeft, isAdmin }) => {
    const location = useLocation();

    const rawPath = location.pathname.split("/")[2] || "dashboard";

    const pageTitle = rawPath
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="bg-gray-100 border-b border-gray-300 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
            <h2 className="text-xl font-semibold">{pageTitle}</h2>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm w-full md:w-auto">
                {
                    !isAdmin && (
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                            <span className="text-[#02afde]">
                                Current Plan: <span className="font-semibold text-[#5842aa]">{plan}</span>
                            </span>

                            {timeLeft ? (
                                <span className="text-[#ff6347] font-semibold">
                                    Days Left: {timeLeft}
                                </span>
                            ) : (
                                <span className="text-[#ff6347]">Subscription Expired</span>
                            )}

                            <div className="hidden md:block h-5 border-l border-gray-400" />
                        </div>
                    )
                }

                <div className="pt-1 md:pt-0">
                    <span className="font-semibold text-[#5842aa]">{name}</span>
                </div>
            </div>
        </div>
    );
};


export default AdminNavbar;
