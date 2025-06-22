
// import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
// import { getAuth } from "firebase/auth";
// import { useAccount } from "../context/AccountContext";
// import { FaSpinner } from "react-icons/fa";

// const Packages = () => {
//     const { accountData } = useAccount();
//     const { uid } = accountData;

//     const [loading, setLoading] = useState(false);
//     const [focusedPackage, setFocusedPackage] = useState(null);
//     const [showZoom, setShowZoom] = useState(false);

//     const packageOptions = [
//         {
//             duration: "1 Month",
//             months: 1,
//             name: 'Launch',
//             price: "$50",
//             amount: 50,
//             details: [
//                 "Offer Listing",
//                 "Full Analytics on SWB Website",
//                 "1 Social Media Promotion on SWB Page",
//                 "Top 30 Ranking in Related Category (rotated/shuffled)",
//                 "Virtual or In-Person Staff Training (upon request)",
//                 "Priority 24/7 Customer Support"
//             ]
//         },
//         {
//             duration: "3 Months",
//             name: "Growth",
//             price: "$100",
//             amount: 100,
//             months: 3,
//             saving: "You're saving 33%",
//             details: [
//                 "Offer Listing",
//                 "Full Analytics on SWB Website",
//                 "1 Social Media Promotion on SWB Page",
//                 "Top 20 Ranking in Related Category (rotated/shuffled)",
//                 "Virtual or In-Person Staff Training (upon request)",
//                 "Priority 24/7 Customer Support",
//                 "3 Push Notifications",
//                 "1 SWB WhatsApp Channel Exposure"
//             ]
//         },
//         {
//             duration: "6 Months ",
//             price: "$150",
//             name: "Advance",
//             amount: 150,
//             saving: "You're saving 50%",
//             months: 6,
//             info: 'MOST POPULAR',
//             details: [
//                 "Offer Listing",
//                 "Full Analytics on SWB Website",
//                 "1 Social Media Promotion on SWB Page",
//                 "Top 15 Ranking in Related Category (rotated/shuffled)",
//                 "Virtual or In-Person Staff Training (upon request)",
//                 "Priority 24/7 Customer Support",
//                 "6 Push Notifications",
//                 "3 SWB WhatsApp Channel Exposures per Month",
//             ]
//         },
//         {
//             duration: "1 Year ",
//             price: "$250",
//             name: "Elite",
//             months: 12,
//             amount: 250,
//             info: 'BEST VALUE',
//             saving: "You're saving 60%",
//             details: [
//                 "Offer Listing",
//                 "Full Analytics on SWB Website",
//                 "1 Social Media Promotion on SWB Page",
//                 "Top 10 Ranking in Related Category (rotated/shuffled)",
//                 "Virtual or In-Person Staff Training (upon request)",
//                 "Priority 24/7 Customer Support",
//                 "15 Push Notifications",
//                 "6 SWB WhatsApp Channel Exposures",
//             ]
//         },

//     ];

//     const handlePayment = async (pkg) => {
//         const { amount, months, name } = pkg;
//         if (!amount || isNaN(amount) || amount <= 0) {
//             alert("Please enter a valid amount.");
//             return;
//         }

//         if (!uid) {
//             alert("User not found. Please log in again.");
//             return;
//         }

//         const endDate = new Date();
//         endDate.setMonth(endDate.getMonth() + months);
//         setLoading(true);

//         try {
//             const response = await axios.post("https://swb-backend.onrender.com/initiate_payment", {
//                 amount: parseFloat(amount),
//                 currency: "USD",
//                 user: uid,
//                 endDate: endDate.toISOString(),
//                 name: name,
//             });

//             if (response.data.payment_url) {
//                 window.open(response.data.payment_url, "_blank");
//             } else {
//                 alert("Payment failed: " + JSON.stringify(response.data));
//             }
//         } catch (error) {
//             alert("Error processing payment");
//             console.error(error);
//         }

//         setLoading(false);
//     };

//     const confirmPurchase = (pkg) => {
//         confirmAlert({
//             title: 'Confirm Payment',
//             message: `Are you sure you want to pay $${pkg.amount} via Whish?`,
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: () => handlePayment(pkg)
//                 },
//                 {
//                     label: 'No'
//                 }
//             ]
//         });
//     };

//     return (
//         <div className="min-h-screen bg-[#f8f9fb]  px-4 sm:px-6 lg:px-8">
//             <div className="max-w-6xl mx-auto text-center mb-2">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                     SWB <span className="text-[#5842aa]">Plus</span> Packages
//                 </h2>
//                 <p className="text-gray-600">
//                     Unlock your business's full potential with SWB's exclusive tools, analytics, promotions, and 24/7 support.
//                 </p>
//             </div>

//             {loading ? (
//                 <div className="mt-10 text-center text-[#10758B] font-semibold">
//                     Payment Gateway is loading, please wait!
//                     <div className="flex justify-center items-center mt-20">

//                         <div className="flex items-center justify-center gap-2 mt-4">
//                             <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
//                             <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
//                             <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
//                         </div>


//                     </div>
//                 </div>
//             ) :
//                 (
//                     <>
//                         <div className="mb-6">
//                             <p className="text-red-500 font-bold italic text-sm"> Important Note: SWB mobile app puts all its efforts into highlighting your business and maximizing its visibility within the student community. </p>
//                             <p className="text-red-500 font-bold italic text-sm"> However, our bundles do not guarantee any specific outcome, as it is entirely up to the students to choose the offers that best suit them based on location, pricing, and your business’s reputation in the market. All purchases are non-refundable in all cases.</p>
//                         </div>

//                         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                             {packageOptions.map((pkg, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white flex flex-col justify-between rounded-2xl shadow-md border border-gray-200 transition-all cursor-pointer hover:shadow-xl relative"
//                                 >
//                                     {/* Badge for MOST POPULAR or BEST VALUE */}
//                                     {pkg.info && (
//                                         <div className="absolute -top-3 right-4 left-4">
//                                             <div className={`text-center py-1 px-2 rounded-full text-white text-xs font-semibold ${pkg.info === 'MOST POPULAR' ? 'bg-[#5842aa]' : 'bg-[#b89647]'}`}>
//                                                 {pkg.info}
//                                             </div>
//                                         </div>
//                                     )}

//                                     <div className="p-6">
//                                         <div className="flex justify-between items-start ">
//                                             <h4 className="text-xl font-semibold text-[#5842aa]">{pkg.name}</h4>
//                                         </div>
//                                         <hr></hr>
//                                         <div className="flex justify-between items-start mb-4 mt-2">
//                                             <h4 className="text-l font-semibold text-[#02afde]">{pkg.duration}</h4>
//                                         </div>

//                                         {pkg.saving && (
//                                             <p className="text-sm italic text-[#5842aa] mt-1 mb-3">{pkg.saving}</p>
//                                         )}

//                                         <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
//                                             {pkg.details.map((detail, idx) => (
//                                                 <li key={idx}>{detail}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                     <div className="text-center p-6 pt-0">
//                                         <p className="text-3xl font-bold text-[#02afde] mb-3">{pkg.price}</p>
//                                         <button
//                                             onClick={() => confirmPurchase(pkg)}
//                                             className="bg-[#5842aa] hover:bg-[#452d9a] text-white font-semibold py-2 px-4 rounded-lg w-full"
//                                         >
//                                             Subscribe
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         {focusedPackage !== null && (
//                             <div
//                                 className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ${showZoom ? "opacity-100" : "opacity-0"
//                                     }`}
//                                 onClick={() => {
//                                     setShowZoom(false);
//                                     setTimeout(() => setFocusedPackage(null), 300); // smooth exit
//                                 }}
//                             >
//                                 <div
//                                     className={`bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 w-[90%] max-w-lg relative transform transition-transform duration-300 ease-in-out ${showZoom ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
//                                         }`}
//                                     onClick={(e) => e.stopPropagation()} // prevent closing on inner click
//                                 >
//                                     {/* Badge at the top like SoundCloud */}
//                                     {packageOptions[focusedPackage].info && (
//                                         <div className="absolute -top-4 right-8 left-8">
//                                             <div className={`text-center py-1 px-4 rounded-full text-white text-sm font-semibold ${packageOptions[focusedPackage].info === 'MOST POPULAR' ? 'bg-[#b89647]' : 'bg-[#02afde]'}`}>
//                                                 {packageOptions[focusedPackage].info}
//                                             </div>
//                                         </div>
//                                     )}

//                                     {/* Close "X" Button */}
//                                     <button
//                                         onClick={() => {
//                                             setShowZoom(false);
//                                             setTimeout(() => setFocusedPackage(null), 300);
//                                         }}
//                                         className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
//                                         aria-label="Close"
//                                     >
//                                         &times;
//                                     </button>

//                                     <h4 className="text-2xl font-bold text-[#5842aa] mb-2">
//                                         {packageOptions[focusedPackage].duration}
//                                     </h4>

//                                     {packageOptions[focusedPackage].saving && (
//                                         <p className="text-sm italic text-[#5842aa] mb-4">
//                                             {packageOptions[focusedPackage].saving}
//                                         </p>
//                                     )}

//                                     <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 text-sm">
//                                         {packageOptions[focusedPackage].details.map((detail, idx) => (
//                                             <li key={idx}>{detail}</li>
//                                         ))}
//                                     </ul>

//                                     <p className="text-3xl font-bold text-[#02afde] mb-4 flex items-center justify-center">
//                                         {packageOptions[focusedPackage].price}
//                                     </p>

//                                     <button
//                                         onClick={() => confirmPurchase(packageOptions[focusedPackage].amount)}
//                                         className="bg-[#5842aa] hover:bg-[#452d9a] text-white font-semibold py-2 px-4 rounded-lg w-full"
//                                     >
//                                         Subscribe
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )
//             }


//         </div>
//     );
// };

// export default Packages;
import React, { useState } from "react";
import { FaCheck, FaStar, FaCrown, FaRocket, FaTrophy, FaSpinner } from "react-icons/fa";
import { useAccount } from "../context/AccountContext";

const Packages = () => {
    const [loading, setLoading] = useState(false);
    const [focusedPackage, setFocusedPackage] = useState(null);
    const [showZoom, setShowZoom] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const { accountData } = useAccount();
    const { uid, plan } = accountData;
    console.log(plan);

    const packageOptions = [
        {
            duration: "1 Month",
            months: 1,
            name: 'Launch',
            price: "$50",
            amount: 50,
            icon: <FaRocket className="text-2xl" />,
            color: "#3B82F6",
            shadowColor: "rgba(59, 130, 246, 0.3)",
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
            icon: <FaStar className="text-2xl" />,
            color: "#8B5CF6",
            shadowColor: "rgba(139, 92, 246, 0.3)",
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
            duration: "6 Months",
            price: "$150",
            name: "Advance",
            amount: 150,
            saving: "You're saving 50%",
            months: 6,
            info: 'MOST POPULAR',
            icon: <FaTrophy className="text-2xl" />,
            color: "#F59E0B",
            shadowColor: "rgba(245, 158, 11, 0.4)",
            isPopular: true,
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
            duration: "1 Year",
            price: "$250",
            name: "Elite",
            months: 12,
            amount: 250,
            info: 'BEST VALUE',
            saving: "You're saving 60%",
            icon: <FaCrown className="text-2xl" />,
            color: "#10B981",
            shadowColor: "rgba(16, 185, 129, 0.3)",
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute  left-10 w-64 h-64 bg-gradient-to-r from-[#5842aa]/3 to-[#02afde]/3 rounded-full blur-3xl"></div>
                <div className="absolute right-10 w-80 h-80 bg-gradient-to-l from-[#02afde]/4 to-[#5842aa]/4 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center mb-8">


                    <h1 className="text-5xl md:text-6xl font-bold  leading-none mb-5">
                        <span className="bg-gradient-to-r from-[#5842aa] via-[#02afde] to-[#5842aa] bg-clip-text text-transparent">
                            SWB Plus
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                        Elevate your business with cutting-edge analytics, strategic promotions, and premium support designed to accelerate your growth in the student market.
                    </p>
                </div>

                {loading ? (
                    <div className="max-w-md mx-auto">
                        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center border border-white/30">
                            <div className="relative mb-8">
                                <div className="w-24 h-24 mx-auto border-8 border-gray-200 rounded-full"></div>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 border-8 border-[#5842aa] border-t-transparent rounded-full animate-spin mb-8"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-[#5842aa] mb-4">Processing Payment</h3>
                            <p className="text-gray-600 mb-6">Securing your transaction...</p>
                            <div className="flex justify-center gap-2">
                                <div className="w-3 h-3 bg-[#5842aa] rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-[#02afde] rounded-full animate-bounce delay-150"></div>
                                <div className="w-3 h-3 bg-[#5842aa] rounded-full animate-bounce delay-300"></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Important Notice */}
                        <div className="max-w-4xl mx-auto mb-12 mt-5">
                            <div className="bg-blue-50 backdrop-blur-lg rounded-xl p-4 border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-blue-800 text-sm leading-relaxed">
                                            <span className="font-semibold">Note:</span> While we maximize your business visibility within the student community, results may vary based on location, pricing, and market factors. All purchases are non-refundable.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Package Cards */}
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
                                {packageOptions.map((pkg, index) => (
                                    <div
                                        key={index}
                                        className={`relative group cursor-pointer transition-all duration-300 ${pkg.isPopular ? 'transform scale-102' : ''
                                            } ${hoveredCard === index ? 'transform -translate-y-2' : ''}`}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        {/* Main Card */}
                                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden relative h-full flex flex-col transition-all duration-300">
                                            {/* Popular Badge */}
                                            {pkg.info && (
                                                <div className="absolute top-1 left-6 right-6 z-20">
                                                    <div className={`text-center py-2 px-2 rounded-full text-white font-semibold text-xs tracking-wide shadow-md ${pkg.info === 'MOST POPULAR'
                                                        ? 'bg-[#5842aa]'
                                                        : 'bg-[#02afde]'
                                                        }`}>
                                                        <div className="flex items-center justify-center gap-1">
                                                            {pkg.info === 'MOST POPULAR' ? <FaStar className="text-xs" /> : <FaCrown className="text-xs" />}
                                                            {pkg.info}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Card Content */}
                                            <div className="p-6 pt-8 flex-grow flex flex-col">
                                                {/* Header */}
                                                <div className="text-center mb-6">
                                                    <div
                                                        className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-white shadow-md"
                                                        style={{ backgroundColor: pkg.color }}
                                                    >
                                                        <div className="text-lg">{pkg.icon}</div>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-[#5842aa] mb-1">{pkg.name}</h3>
                                                    <p className="text-[#02afde] font-semibold">{pkg.duration}</p>
                                                </div>

                                                {/* Savings */}
                                                <div className="mb-6">
                                                    {pkg.saving ? (
                                                        <div className="bg-green-50 rounded-lg px-3 py-2 border border-green-200">
                                                            <p className="text-green-700 font-semibold text-center text-sm">
                                                                💰 {pkg.saving}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="h-10"></div>
                                                    )}
                                                </div>

                                                {/* Features */}
                                                <div className="space-y-3 mb-6 flex-grow">
                                                    {pkg.details.map((detail, idx) => (
                                                        <div key={idx} className="flex items-start gap-3">
                                                            <div className="w-5 h-5 bg-gradient-to-br from-[#5842aa] to-[#02afde] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <FaCheck className="text-white text-xs" />
                                                            </div>
                                                            <span className="text-gray-600 text-sm leading-relaxed">
                                                                {detail}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Price */}
                                                <div className="text-center mb-6">
                                                    <span className="text-3xl font-bold text-[#02afde]">
                                                        {pkg.price}
                                                    </span>
                                                </div>

                                                {/* CTA Button */}
                                                {plan === pkg.name ? (
                                                    <div className="w-full bg-green-100 text-green-700 font-semibold py-3 px-6 rounded-xl text-center border border-green-300">
                                                        Subscribed
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => confirmPurchase(pkg)}
                                                        className="w-full bg-gradient-to-r from-[#5842aa] to-[#02afde] hover:from-[#452d9a] hover:to-[#0288b8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                                                    >
                                                        Subscribe Now
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal */}
                        {focusedPackage !== null && (
                            <div
                                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all duration-300 ${showZoom ? "opacity-100" : "opacity-0"
                                    }`}
                                onClick={() => {
                                    setShowZoom(false);
                                    setTimeout(() => setFocusedPackage(null), 300);
                                }}
                            >
                                <div
                                    className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50 w-[90%] max-w-2xl relative transform transition-all duration-300 ${showZoom ? "scale-100 translate-y-0" : "scale-90 translate-y-10"
                                        }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => {
                                            setShowZoom(false);
                                            setTimeout(() => setFocusedPackage(null), 300);
                                        }}
                                        className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 font-bold text-xl"
                                    >
                                        ×
                                    </button>

                                    <div className="text-center">
                                        <h4 className="text-4xl font-bold text-[#5842aa] mb-4">
                                            {packageOptions[focusedPackage].name}
                                        </h4>
                                        <p className="text-6xl font-black bg-gradient-to-r from-[#02afde] to-[#5842aa] bg-clip-text text-transparent mb-8">
                                            {packageOptions[focusedPackage].price}
                                        </p>

                                        <button
                                            onClick={() => confirmPurchase(packageOptions[focusedPackage])}
                                            className="bg-gradient-to-r from-[#5842aa] to-[#02afde] hover:from-[#452d9a] hover:to-[#0288b8] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                                        >
                                            Subscribe Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Packages;