import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const Packages = () => {
    const [loading, setLoading] = useState(false);

    const features = [
        "Unlimited access to all SWB tools",
        "Business listing",
        "Full analytics access on SWB website",
        "In-app push notifications (2x/month)",
        "Top spot listing (2x/month)"
    ];

    const pricingOptions = [
        { duration: "1 Month", price: "$1", amount: 1 },
        { duration: "3 Months", price: "$70", amount: 70 },
        { duration: "6 Months", price: "$120", amount: 120 },
        { duration: "1 Year", price: "$200", amount: 200 }
    ];

    const handlePayment = async (amount) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        const userId = user ? user.uid : null;

        setLoading(true);
        try {
            const response = await axios.post("https://swb-backend.onrender.com/initiate_payment", {
                amount: parseFloat(amount),
                currency: "USD",
                user: userId,

            });

            console.log("Payment Response:", response.data);

            if (response.data.payment_url) {
                window.open(response.data.payment_url, "_blank");
            } else {
                alert("Payment failed: " + JSON.stringify(response.data));
            }
        } catch (error) {
            alert("Error processing payment");
            console.error(error);
        }
        setLoading(false);
    };

    const confirmPurchase = (amount) => {
        confirmAlert({
            title: 'Confirm Payment',
            message: `Are you sure you want to pay $${amount} via Whish?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handlePayment(amount)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">SWB Pro Package</h2>
                <p className="text-gray-600 mb-10">Unlock full potential for your business with exclusive tools and features.</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-[#10758B]">What You Get</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    {pricingOptions.map((option, index) => (
                        <div
                            key={index}
                            className="cursor-pointer hover:shadow-md transition-all bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center border border-gray-200"
                            onClick={() => confirmPurchase(option.amount)}
                        >
                            <div>
                                <h4 className="text-lg font-medium text-gray-800">{option.duration}</h4>
                                <p className="text-sm text-gray-500">All Pro Features Included</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-[#10758B]">{option.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="mt-10 text-center text-[#10758B] font-semibold">
                    Processing your payment...
                </div>
            )}
        </div>
    );
};

export default Packages;
