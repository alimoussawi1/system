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
            <div>
                <h1 className="text-xl font-bold">
                    Hello <span className="text-[#5842aa]">{fullName}</span>!
                </h1>
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
