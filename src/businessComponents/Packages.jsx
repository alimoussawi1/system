
import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getAuth } from "firebase/auth";
import { useAccount } from "../context/AccountContext";
import { FaSpinner } from "react-icons/fa";

const Packages = () => {
    const { accountData } = useAccount();
    const { uid } = accountData;

    const [loading, setLoading] = useState(false);
    const [focusedPackage, setFocusedPackage] = useState(null);
    const [showZoom, setShowZoom] = useState(false);

    const packageOptions = [
        {
            duration: "1 Month",
            months: 1,
            name: 'Launch',
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
            name: "Growth",
            price: "$100",
            amount: 100,
            months: 3,
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
            name: "Advance",
            amount: 150,
            saving: "You're saving 50%",
            months: 6,
            info: 'MOST POPULAR',
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
            name: "Elite",
            months: 12,
            amount: 250,
            info: 'BEST VALUE',
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
        },

    ];

    const handlePayment = async (pkg) => {
        const { amount, months, name } = pkg;
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (!uid) {
            alert("User not found. Please log in again.");
            return;
        }

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);
        setLoading(true);

        try {
            const response = await axios.post("https://swb-backend.onrender.com/initiate_payment", {
                amount: parseFloat(amount),
                currency: "USD",
                user: uid,
                endDate: endDate.toISOString(),
                name: name,
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

    const confirmPurchase = (pkg) => {
        confirmAlert({
            title: 'Confirm Payment',
            message: `Are you sure you want to pay $${pkg.amount} via Whish?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handlePayment(pkg)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    return (
        <div className="min-h-screen bg-[#f8f9fb]  px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center mb-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    SWB <span className="text-[#5842aa]">Plus</span> Packages
                </h2>
                <p className="text-gray-600">
                    Unlock your business's full potential with SWB's exclusive tools, analytics, promotions, and 24/7 support.
                </p>
            </div>

            {loading ? (
                <div className="mt-10 text-center text-[#10758B] font-semibold">
                    Payment Gateway is loading, please wait!
                    <div className="flex justify-center items-center mt-20">

                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
                            <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
                            <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
                        </div>


                    </div>
                </div>
            ) :
                (
                    <>
                        <div className="mb-6">
                            <p className="text-red-500 font-bold italic text-sm"> Important Note: SWB mobile app puts all its efforts into highlighting your business and maximizing its visibility within the student community. </p>
                            <p className="text-red-500 font-bold italic text-sm"> However, our bundles do not guarantee any specific outcome, as it is entirely up to the students to choose the offers that best suit them based on location, pricing, and your business’s reputation in the market. All purchases are non-refundable in all cases.</p>
                        </div>

                        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {packageOptions.map((pkg, index) => (
                                <div
                                    key={index}
                                    className="bg-white flex flex-col justify-between rounded-2xl shadow-md border border-gray-200 transition-all cursor-pointer hover:shadow-xl relative"
                                >
                                    {/* Badge for MOST POPULAR or BEST VALUE */}
                                    {pkg.info && (
                                        <div className="absolute -top-3 right-4 left-4">
                                            <div className={`text-center py-1 px-2 rounded-full text-white text-xs font-semibold ${pkg.info === 'MOST POPULAR' ? 'bg-[#5842aa]' : 'bg-[#b89647]'}`}>
                                                {pkg.info}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="flex justify-between items-start ">
                                            <h4 className="text-xl font-semibold text-[#5842aa]">{pkg.name}</h4>
                                        </div>
                                        <hr></hr>
                                        <div className="flex justify-between items-start mb-4 mt-2">
                                            <h4 className="text-l font-semibold text-[#02afde]">{pkg.duration}</h4>
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
                                    <div className="text-center p-6 pt-0">
                                        <p className="text-3xl font-bold text-[#02afde] mb-3">{pkg.price}</p>
                                        <button
                                            onClick={() => confirmPurchase(pkg)}
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
                                    {/* Badge at the top like SoundCloud */}
                                    {packageOptions[focusedPackage].info && (
                                        <div className="absolute -top-4 right-8 left-8">
                                            <div className={`text-center py-1 px-4 rounded-full text-white text-sm font-semibold ${packageOptions[focusedPackage].info === 'MOST POPULAR' ? 'bg-[#b89647]' : 'bg-[#02afde]'}`}>
                                                {packageOptions[focusedPackage].info}
                                            </div>
                                        </div>
                                    )}

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
                    </>
                )
            }


        </div>
    );
};

export default Packages;