// src/components/Dashboard.jsx
import React, { useState } from "react";
import MessageActivity from "./MessageActivity";
import { Link } from "react-router-dom";


const BusinessDashboard = () => {
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
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const name = user ? user.fullName : null;
    const access = localStorage.getItem("access") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";


    return (
        <div className="p-6 space-y-10">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <h1 className="text-xl font-bold">Hello {name}!</h1>
            </div>

            {access ? (
                <MessageActivity
                    chartData={chartData}
                    setChartData={setChartData}
                    selectStyle={selectStyle}
                    isAdmin={isAdmin}
                />
            ) : (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg">
                    <p className="text-lg font-semibold">
                        You should upgrade to <span className="text-[#10758B] font-bold">SWB Pro</span> to see the analytics graphs.
                    </p>
                    <Link to="/admin/packages" className="text-white hover:text-gray-400">
                        <button className="bg-[#5842aa] text-white font-medium rounded-lg px-4 py-2 flex items-center cursor-pointer hover:bg-[#452d9a]">
                            Packages

                        </button>

                    </Link>



                </div>



            )}
        </div>
    );
};


export default BusinessDashboard;
