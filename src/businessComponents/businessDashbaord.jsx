import React, { useState } from "react";
import MessageActivity from "./MessageActivity";
import { Link } from "react-router-dom";
import { useAccount } from "../context/AccountContext";


const BusinessDashboard = () => {
    const { accountData } = useAccount();
    const { fullName, isAdmin, access } = accountData;

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const selectStyle = {
        control: (base) => ({
            ...base,
            borderRadius: "12px",
            padding: "2px",
            minHeight: "40px",
        }),
    };

    return (
        <div className="p-2">
            <div className="mb-8">
                <div className="flex items-center gap-4">
                    {/* <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div> */}
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{fullName}</span>!
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Here's your business overview</p>
                    </div>
                </div>
            </div>

            {access || isAdmin ? (
                <MessageActivity
                    chartData={chartData}
                    setChartData={setChartData}
                    selectStyle={selectStyle}
                    isAdmin={isAdmin}
                />
            ) : (
                <div className="flex items-start justify-center min-h-[70vh] bg-gray-100 pt-20">
                    <div className="bg-white border border-[#5842aa] px-10 py-10 rounded-lg text-center w-full max-w-md">
                        <p className="text-2xl font-bold mb-6">
                            Upgrade to <span className="text-[#10758B] font-bold">SWB Plus</span> to access all our features!
                        </p>
                        <Link to="/admin/packages" className="inline-block">
                            <button className="bg-[#5842aa] text-white text-lg font-semibold rounded-lg px-6 py-3 hover:bg-[#452d9a]">
                                Packages
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusinessDashboard;
