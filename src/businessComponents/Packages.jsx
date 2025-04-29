import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const Packages = () => {
    const [loading, setLoading] = useState(false);
    const [focusedPackage, setFocusedPackage] = useState(null);
    const [showZoom, setShowZoom] = useState(false);


    const packageOptions = [
        {
            duration: "1 Month",
            price: "$50",
            amount: 50,
            details: [
                "Offer Listing",
                "Full Analytics on SWB Website",
                "1 Social Media Promotion on SWB Page",
                "Top 30 Ranking in Related Category (rotated/shuffled)",
                "Virtual or In-Person Staff Training (upon request)",
                "Priority 24/7 Customer Support"
            ]
        },
        {
            duration: "3 Months",
            price: "$100",
            amount: 100,
            saving: "You're saving 33%",
            details: [
                "Offer Listing",
                "Full Analytics on SWB Website",
                "1 Social Media Promotion on SWB Page",
                "Top 20 Ranking in Related Category (rotated/shuffled)",
                "Virtual or In-Person Staff Training (upon request)",
                "Priority 24/7 Customer Support",
                "3 Push Notifications",
                "1 SWB WhatsApp Channel Exposure"
            ]
        },
        {
            duration: "6 Months ",
            price: "$150",
            amount: 150,
            saving: "You're saving 50%",
            info: 'Most Popular',
            details: [
                "Offer Listing",
                "Full Analytics on SWB Website",
                "1 Social Media Promotion on SWB Page",
                "Top 15 Ranking in Related Category (rotated/shuffled)",
                "Virtual or In-Person Staff Training (upon request)",
                "Priority 24/7 Customer Support",
                "6 Push Notifications",
                "3 SWB WhatsApp Channel Exposures per Month",
            ]
        },
        {
            duration: "1 Year ",
            price: "$250",
            amount: 250,
            info: 'Best Value',
            saving: "You're saving 60%",
            details: [
                "Offer Listing",
                "Full Analytics on SWB Website",
                "1 Social Media Promotion on SWB Page",
                "Top 10 Ranking in Related Category (rotated/shuffled)",
                "Virtual or In-Person Staff Training (upon request)",
                "Priority 24/7 Customer Support",
                "15 Push Notifications",
                "6 SWB WhatsApp Channel Exposures",
            ]
        }
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
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    SWB <span className="text-[#5842aa]">Plus</span> Packages
                </h2>
                <p className="text-gray-600">
                    Unlock your business's full potential with SWB's exclusive tools, analytics, promotions, and 24/7 support.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {packageOptions.map((pkg, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setFocusedPackage(index);
                            setTimeout(() => setShowZoom(true), 500); // delay for smoother feel
                        }}
                        className="bg-white flex flex-col justify-between rounded-2xl shadow-md p-6 border border-gray-200 transition-all cursor-pointer hover:shadow-xl"
                    >


                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-semibold text-[#5842aa]">{pkg.duration}</h4>

                                {pkg.info && (
                                    <div className="border border-[#02afde] px-3 py-1 rounded-lg bg-[#02afde]">
                                        <h4 className="text-sm text-white">{pkg.info}</h4>
                                    </div>
                                )}
                            </div>


                            {pkg.saving && (
                                <p className="text-sm italic text-[#5842aa] mt-1 mb-3">{pkg.saving}</p>
                            )}
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                                {pkg.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-3xl font-bold text-[#02afde] mb-3">{pkg.price}</p>
                            <button
                                onClick={() => confirmPurchase(pkg.amount)}
                                className="bg-[#5842aa] hover:bg-[#452d9a] text-white font-semibold py-2 px-4 rounded-lg w-full"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {focusedPackage !== null && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ${showZoom ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => {
                        setShowZoom(false);
                        setTimeout(() => setFocusedPackage(null), 300); // smooth exit
                    }}
                >
                    <div
                        className={`bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 w-[90%] max-w-lg relative transform transition-transform duration-300 ease-in-out ${showZoom ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
                            }`}
                        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
                    >
                        {/* Close "X" Button */}
                        <button
                            onClick={() => {
                                setShowZoom(false);
                                setTimeout(() => setFocusedPackage(null), 300);
                            }}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
                            aria-label="Close"
                        >
                            &times;
                        </button>

                        <h4 className="text-2xl font-bold text-[#5842aa] mb-2">
                            {packageOptions[focusedPackage].duration}
                        </h4>

                        {packageOptions[focusedPackage].saving && (
                            <p className="text-sm italic text-[#5842aa] mb-4">
                                {packageOptions[focusedPackage].saving}
                            </p>
                        )}

                        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 text-sm">
                            {packageOptions[focusedPackage].details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                            ))}
                        </ul>

                        <p className="text-3xl font-bold text-[#02afde] mb-4 flex items-center justify-center">
                            {packageOptions[focusedPackage].price}
                        </p>

                        <button
                            onClick={() => confirmPurchase(packageOptions[focusedPackage].amount)}
                            className="bg-[#5842aa] hover:bg-[#452d9a] text-white font-semibold py-2 px-4 rounded-lg w-full"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            )}


            {loading && (
                <div className="mt-10 text-center text-[#10758B] font-semibold">
                    Processing your payment...
                </div>
            )}
        </div>
    );
};

export default Packages;
