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
                <div className="flex items-start justify-center min-h-[70vh] bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
                    <div className="bg-white border-2 border-[#5842aa]/20 shadow-2xl px-12 py-12 rounded-2xl text-center w-full max-w-lg relative overflow-hidden">
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5842aa] via-[#10758B] to-[#5842aa]"></div>

                        {/* Premium badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5842aa] to-[#10758B] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Premium Features
                        </div>

                        <h2 className="text-3xl font-bold mb-4 text-gray-800">
                            Unlock Your Full Potential
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Upgrade to <span className="text-[#10758B] font-bold bg-[#10758B]/10 px-2 py-1 rounded">SWB Plus</span> to access all our premium features and take your experience to the next level!
                        </p>

                        <Link to="/admin/packages" className="inline-block group">
                            <button className="bg-gradient-to-r from-[#5842aa] to-[#452d9a] text-white text-lg font-semibold rounded-xl px-8 py-4 hover:from-[#452d9a] hover:to-[#3d2589] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                                View Packages
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </Link>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#5842aa]/10 to-[#10758B]/10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#10758B]/10 to-[#5842aa]/10 rounded-full blur-xl"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusinessDashboard;
