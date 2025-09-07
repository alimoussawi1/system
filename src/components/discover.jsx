import React, { useState } from 'react';
import { FaChevronRight, FaSearch, FaUsers, FaChartLine, FaGift, FaBolt, FaShieldAlt, FaRocket } from 'react-icons/fa';

const WebsiteDiscoverySection = () => {
    const [openModalSend, setOpenModalSend] = useState(() => () => {
        console.log('Modal opened');
    });

    const discoveryItems = [
        {
            icon: <FaSearch className="text-3xl" />,
            title: "Smart Search",
            description: "Find exactly what you're looking for with our intelligent search system",
            color: "#5842aa"
        },
        {
            icon: <FaUsers className="text-3xl" />,
            title: "Partner Network",
            description: "Connect with verified businesses and trusted local partners",
            color: "#2563eb"
        },
        {
            icon: <FaChartLine className="text-3xl" />,
            title: "Real-Time Analytics",
            description: "Track your business performance with live data and insights",
            color: "#059669"
        },
        {
            icon: <FaGift className="text-3xl" />,
            title: "Exclusive Offers",
            description: "Access member-only deals and special promotional campaigns",
            color: "#dc2626"
        },
        {
            icon: <FaBolt className="text-3xl" />,
            title: "Instant Notifications",
            description: "Get real-time updates on opportunities and customer interactions",
            color: "#ea580c"
        },
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: "Secure Platform",
            description: "Bank-level security protecting your business data and transactions",
            color: "#7c3aed"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-20">





                    {/* NEW: Discover Inside Our Website Section */}
                    <div className="relative">
                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-full mb-6">
                                Explore Our Platform
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                                <span className="text-gray-800">Discover </span>
                                <br />
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, #5842aa 0%, #2563eb 100%)` }}>
                                    Our Plus Version
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Unlock the full potential of our platform with these powerful features designed to accelerate your business growth and streamline your operations.
                            </p>
                        </div>

                        {/* Discovery Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {discoveryItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/20 overflow-hidden"
                                >
                                    {/* Background Gradient on Hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-500"
                                        style={{ background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}11 100%)` }}
                                    ></div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300"
                                            style={{
                                                background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}25 100%)`,
                                                color: item.color
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                                            {item.description}
                                        </p>

                                        {/* Hover Arrow */}
                                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                                            <FaChevronRight style={{ color: item.color }} className="text-lg" />
                                        </div>
                                    </div>

                                    {/* Decorative Corner */}
                                    <div
                                        className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)`,
                                            clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%)'
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <div className="inline-flex items-center space-x-4">
                                <button
                                    onClick={openModalSend}
                                    className="group relative inline-flex items-center px-10 py-4 text-lg font-bold text-white rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, #5842aa 0%, #3730a3 100%)`,
                                        boxShadow: '0 20px 40px -12px rgba(88, 66, 170, 0.3)'
                                    }}
                                >
                                    <span className="relative z-10 flex items-center">
                                        <FaRocket className="mr-3 group-hover:animate-bounce" />
                                        Explore Now
                                        <FaChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, #3730a3 0%, #5842aa 100%)` }}></div>
                                </button>

                                <span className="text-gray-500 text-sm">
                                    Join 500+ businesses already growing with us
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsiteDiscoverySection;