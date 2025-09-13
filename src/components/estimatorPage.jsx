import React, { useState } from "react";

export default function EstimatorPage() {
    // Base
    const BASE = 30;
    const EXTRA_BRANCH = 15;
    const [branches, setBranches] = useState(1);

    // Notifications
    const NOTIF_PRICE = 5;
    const [notifications, setNotifications] = useState(0); // 0..10

    // Banner/WhatsApp (monthly)
    const BANNER_MONTHLY = 50;
    const [bannerOn, setBannerOn] = useState(false);

    // Top spot (monthly)
    const TOP = {
        first15: { label: "First 15 places (2 weeks, shuffled)", price: 45 },
        first25: { label: "First 25 places (2 weeks, shuffled)", price: 30 },
        first35: { label: "First 35 places (2 weeks, shuffled)", price: 20 },
        shuffled36: { label: "Shuffled 36+ (Free)", price: 0 },
    };
    const [top, setTop] = useState("shuffled36");

    // Totals
    const monthlyBase = BASE + Math.max(0, branches - 1) * EXTRA_BRANCH;
    const monthlyNotif = notifications * NOTIF_PRICE;
    const monthlyTop = TOP[top].price;
    const monthlyBanner = bannerOn ? BANNER_MONTHLY : 0;
    const monthlyTotal = monthlyBase + monthlyNotif + monthlyTop + monthlyBanner;

    const money = (n) =>
        n.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        📊 SWB Cost Estimator
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Base Package */}
                    <section className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
                        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                            🏢 Base Package <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">Mandatory</span>
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Business Listing (Shuffled) + SWB Website Analytics → <strong>{money(BASE)}/month</strong> (covers 1 branch)
                        </p>

                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center gap-4 mb-4">
                                <label className="text-sm font-semibold text-gray-800 min-w-[80px]">
                                    Branches:
                                </label>
                                <div className="flex items-center bg-white rounded-lg border-2 border-blue-200 overflow-hidden">
                                    <button
                                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold transition-colors"
                                        onClick={() => setBranches((b) => Math.max(1, b - 1))}
                                        type="button"
                                    >
                                        –
                                    </button>
                                    <input
                                        type="number"
                                        min={1}
                                        value={branches}
                                        onChange={(e) =>
                                            setBranches(Math.max(1, Number(e.target.value) || 1))
                                        }
                                        className="w-16 py-2 text-center font-bold border-0 outline-none"
                                    />
                                    <button
                                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold transition-colors"
                                        onClick={() => setBranches((b) => b + 1)}
                                        type="button"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-blue-700">
                                Each additional branch adds {money(EXTRA_BRANCH)}/month.
                            </p>
                        </div>
                    </section>

                    {/* Add-ons */}
                    <section className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
                        <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2">
                            ✨ Add-ons
                        </h3>

                        {/* Notifications */}
                        <div className="bg-green-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-green-800 flex items-center gap-2">
                                    🔔 Notifications
                                </h4>
                                <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full font-semibold">
                                    {money(NOTIF_PRICE)} each
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-semibold text-gray-800 min-w-[80px]">
                                    Per month:
                                </label>
                                <div className="flex items-center bg-white rounded-lg border-2 border-green-200 overflow-hidden">
                                    <button
                                        className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 font-bold transition-colors"
                                        onClick={() => setNotifications((n) => Math.max(0, n - 1))}
                                        type="button"
                                    >
                                        –
                                    </button>
                                    <input
                                        type="number"
                                        min={0}
                                        max={10}
                                        value={notifications}
                                        onChange={(e) => {
                                            const v = Math.min(10, Math.max(0, Number(e.target.value) || 0));
                                            setNotifications(v);
                                        }}
                                        className="w-16 py-2 text-center font-bold border-0 outline-none"
                                    />
                                    <button
                                        className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 font-bold transition-colors"
                                        onClick={() => setNotifications((n) => Math.min(10, n + 1))}
                                        type="button"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Banner + WhatsApp */}
                        <div className="bg-purple-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                                    📱 Mobile App Banner + WhatsApp
                                </h4>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={bannerOn}
                                        onChange={(e) => setBannerOn(e.target.checked)}
                                    />
                                    <div className={`relative w-12 h-6 rounded-full transition-colors ${bannerOn ? "bg-purple-500" : "bg-gray-300"
                                        }`}>
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${bannerOn ? "translate-x-6" : "translate-x-0"
                                            }`} />
                                    </div>
                                    <span className="ml-3 font-semibold text-purple-800">
                                        {bannerOn ? "ON" : "OFF"}
                                    </span>
                                </label>
                            </div>
                            <p className="text-sm text-purple-700">
                                <strong>{money(BANNER_MONTHLY)}/month</strong> - Monthly billing for banner placement and WhatsApp channel
                            </p>
                        </div>

                        {/* Top Spot Listing */}
                        <div className="bg-amber-50 rounded-lg p-4">
                            <h4 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                                🏆 Top Spot Listing in Selected Category
                            </h4>
                            <div className="space-y-3">
                                {Object.keys(TOP).map((k) => (
                                    <label
                                        key={k}
                                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${top === k
                                            ? "border-amber-400 bg-amber-100"
                                            : "border-gray-200 bg-white hover:border-amber-300"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="topspot"
                                            checked={top === k}
                                            onChange={() => setTop(k)}
                                            className="w-4 h-4 text-amber-600"
                                        />
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-800">{TOP[k].label}</div>
                                            <div className="text-lg font-bold text-amber-800">
                                                {TOP[k].price ? money(TOP[k].price) : "FREE"}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Notes */}
                    <section className="bg-white rounded-xl shadow-lg border border-amber-100 p-6">
                        <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                            📝 Important Notes
                        </h3>
                        <div className="space-y-3 text-sm text-amber-800">
                            <div className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Collaboration videos, reels, and influencer campaigns are priced <strong>separately</strong> depending on campaign scope.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Prices shown are indicative, subject to change, and not final.</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>All packages are monthly unless stated otherwise.</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sticky Totals Sidebar - Desktop */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-6">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                💸 Your Total
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-sm opacity-90 mb-1">Base Package</div>
                                    <div className="text-xl font-bold">{money(monthlyBase)}<span className="text-sm opacity-80">/month</span></div>
                                    <div className="text-xs opacity-75">{branches} branch{branches > 1 ? 'es' : ''}</div>
                                </div>

                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-sm opacity-90 mb-1">Notifications</div>
                                    <div className="text-xl font-bold">{money(monthlyNotif)}<span className="text-sm opacity-80">/month</span></div>
                                    <div className="text-xs opacity-75">{notifications} notifications</div>
                                </div>

                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="text-sm opacity-90 mb-1">Top Spot Listing</div>
                                    <div className="text-xl font-bold">{money(monthlyTop)}<span className="text-sm opacity-80">/month</span></div>
                                    <div className="text-xs opacity-75">{TOP[top].label.split(' (')[0]}</div>
                                </div>

                                {bannerOn && (
                                    <div className="bg-white/10 rounded-lg p-4">
                                        <div className="text-sm opacity-90 mb-1">Banner + WhatsApp</div>
                                        <div className="text-xl font-bold">{money(monthlyBanner)}<span className="text-sm opacity-80">/month</span></div>
                                        <div className="text-xs opacity-75">Mobile app banner + WhatsApp channel</div>
                                    </div>
                                )}

                                <div className="border-t border-white/20 pt-4 mt-6">
                                    <div className="text-sm opacity-90 mb-2">Monthly Total</div>
                                    <div className="text-3xl font-black bg-white/20 rounded-lg p-3 text-center">
                                        {money(monthlyTotal)}<span className="text-lg opacity-80">/month</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Floating Total - Always Visible */}
            <div className="fixed bottom-4 right-4 z-50 lg:hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl shadow-2xl p-4 min-w-[280px]">
                    <div className="text-center">
                        <div className="text-sm opacity-90 mb-1">Your Total</div>
                        <div className="text-2xl font-black">
                            {money(monthlyTotal)}
                            <span className="text-sm opacity-80">/month</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Floating Mini Total - Always Visible on Small Screens */}
            <div className="fixed top-20 right-4 z-50 sm:hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-3">
                    <div className="text-center">
                        <div className="text-xs opacity-90">Total</div>
                        <div className="text-lg font-black">
                            {money(monthlyTotal)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}