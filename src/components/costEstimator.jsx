import React, { useEffect, useMemo, useState } from "react";

export default function SWBEstimatorModal() {
    const [open, setOpen] = useState(false);

    // Base
    const BASE = 30;
    const EXTRA_BRANCH = 15;
    const [branches, setBranches] = useState(1);

    // Notifications
    const NOTIF_PRICE = 5;
    const [notifications, setNotifications] = useState(0); // 0..10

    // Banner/WhatsApp (weekly)
    const BANNER_WEEKLY = 50;
    const [bannerOn, setBannerOn] = useState(false);

    // Top spot (monthly)
    const TOP = {
        first15: { label: "First 15 places (2 weeks, shuffled)", price: 45 },
        first25: { label: "First 25 places (2 weeks, shuffled)", price: 30 },
        first35: { label: "First 35 places (2 weeks, shuffled)", price: 20 },
        shuffled36: { label: "Shuffled 36+ (Free)", price: 0 },
    };
    const [top, setTop] = useState("first15");

    // Totals
    const monthlyBase = BASE + Math.max(0, branches - 1) * EXTRA_BRANCH;
    const monthlyNotif = notifications * NOTIF_PRICE;
    const monthlyTop = TOP[top].price;
    const monthlySubtotal = monthlyBase + monthlyNotif + monthlyTop;
    const weeklySubtotal = bannerOn ? BANNER_WEEKLY : 0;
    const approxMonthlyInclWeekly = useMemo(
        () => monthlySubtotal + weeklySubtotal * 4.33,
        [monthlySubtotal, weeklySubtotal]
    );

    const money = (n) =>
        n.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        });

    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <>
            {/* Trigger */}
            <div className="flex flex-row gap-2 justify-center">
                <button
                    onClick={() => setOpen(true)}
                    className="group relative inline-flex items-center px-10 py-5 text-lg font-bold text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, #5842aa 0%, #3730a3 100%)`,
                        boxShadow: '0 25px 50px -12px rgba(88, 66, 170, 0.25)'
                    }}
                >
                    <span className="relative z-10 flex items-center">
                        Estimate My Cost
                    </span>
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `linear-gradient(135deg, #3730a3 0%, #5842aa 100%)`
                        }}
                    ></div>
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm h-full overflow-scroll-y mt-10"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                    />

                    {/* Card */}
                    <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-gray-100">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-[#5842aa]/5 to-[#6b52d6]/5">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                📊 SWB Cost Estimator
                            </h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="grid h-10 w-10 place-items-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="max-h-[78vh] overflow-y-auto p-6 space-y-6">
                            {/* 1) Base Package */}
                            <section className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
                                <h3 className="mb-2 text-lg font-semibold text-blue-900 flex items-center gap-2">
                                    🏢 Base Package (Mandatory)
                                </h3>
                                <p className="text-sm text-blue-700 mb-4">
                                    <span className="font-medium">
                                        Business Listing (Shuffled) + SWB Website Analytics
                                    </span>{" "}
                                    → {money(BASE)}/month (covers 1 branch)
                                </p>

                                <div className="flex items-center gap-3 mb-3">
                                    <label className="min-w-[92px] text-sm font-medium text-gray-800">
                                        Branches
                                    </label>
                                    <div className="inline-flex items-center overflow-hidden rounded-xl border border-blue-300 bg-white">
                                        <button
                                            className="h-10 w-10 bg-blue-100 text-lg font-bold text-blue-700 hover:bg-blue-200 transition-colors"
                                            onClick={() => setBranches((b) => Math.max(1, b - 1))}
                                            aria-label="Decrease branches"
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
                                            className="h-10 w-16 text-center font-semibold outline-none"
                                        />
                                        <button
                                            className="h-10 w-10 bg-blue-100 text-lg font-bold text-blue-700 hover:bg-blue-200 transition-colors"
                                            onClick={() => setBranches((b) => b + 1)}
                                            aria-label="Increase branches"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs text-blue-600 mb-3">
                                    Each additional branch adds {money(EXTRA_BRANCH)}/month.
                                </p>

                                <div className="space-y-2">
                                    <LineItem label="Base (includes 1 branch)" value={`${money(BASE)}/mo`} />
                                    <LineItem
                                        label={`Extra branches (${Math.max(0, branches - 1)})`}
                                        value={`${money(Math.max(0, branches - 1) * EXTRA_BRANCH)}/mo`}
                                    />
                                </div>
                            </section>

                            {/* 2) Add-ons */}
                            <section className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5">
                                <h3 className="mb-4 text-lg font-semibold text-green-900 flex items-center gap-2">
                                    ✨ Add-ons
                                </h3>

                                {/* Notifications */}
                                <div className="mb-6 p-4 bg-white/70 rounded-lg border border-green-100">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-medium text-green-800 flex items-center gap-2">
                                            🔔 Notifications
                                        </span>
                                        <span className="text-sm text-green-700 font-semibold">
                                            {money(NOTIF_PRICE)} each
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <label className="min-w-[92px] text-sm font-medium text-gray-800">
                                            Per month
                                        </label>
                                        <div className="inline-flex items-center overflow-hidden rounded-xl border border-green-300 bg-white">
                                            <button
                                                className="h-10 w-10 bg-green-100 text-lg font-bold text-green-700 hover:bg-green-200 transition-colors"
                                                onClick={() =>
                                                    setNotifications((n) => Math.max(0, n - 1))
                                                }
                                                aria-label="Decrease notifications"
                                            >
                                                –
                                            </button>
                                            <input
                                                type="number"
                                                min={0}
                                                max={10}
                                                value={notifications}
                                                onChange={(e) => {
                                                    const v = Math.min(
                                                        10,
                                                        Math.max(0, Number(e.target.value) || 0)
                                                    );
                                                    setNotifications(v);
                                                }}
                                                className="h-10 w-16 text-center font-semibold outline-none"
                                            />
                                            <button
                                                className="h-10 w-10 bg-green-100 text-lg font-bold text-green-700 hover:bg-green-200 transition-colors"
                                                onClick={() =>
                                                    setNotifications((n) => Math.min(10, n + 1))
                                                }
                                                aria-label="Increase notifications"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <LineItem
                                        label="Notifications total"
                                        value={`${money(monthlyNotif)}/mo`}
                                    />
                                </div>

                                {/* Banner + WhatsApp */}
                                <div className="mb-6 p-4 bg-white/70 rounded-lg border border-green-100">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="font-medium text-green-800 flex items-center gap-2">
                                            📱 Mobile App Banner + WhatsApp Channel
                                        </span>
                                        <label className="inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={bannerOn}
                                                onChange={(e) => setBannerOn(e.target.checked)}
                                            />
                                            <div className={`relative h-6 w-11 rounded-full transition-colors ${bannerOn ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                <div className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${bannerOn ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </div>
                                            <span className="ml-3 text-sm font-semibold text-green-700">
                                                {bannerOn ? "On" : "Off"}
                                            </span>
                                        </label>
                                    </div>
                                    <LineItem
                                        label="Montly cost"
                                        value={`${money(weeklySubtotal)}/month`}
                                    />
                                </div>

                                {/* Top Spot Listing */}
                                <div className="p-4 bg-white/70 rounded-lg border border-green-100">
                                    <div className="mb-3 font-medium text-green-800 flex items-center gap-2">
                                        🏆 Top Spot Listing in Selected Category
                                    </div>
                                    <div className="grid gap-3">
                                        {Object.keys(TOP).map((k) => (
                                            <label
                                                key={k}
                                                className="flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-white p-3 hover:border-green-300 transition-colors"
                                                style={{
                                                    borderColor: top === k ? '#10b981' : '#e5e7eb'
                                                }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="topspot"
                                                    checked={top === k}
                                                    onChange={() => setTop(k)}
                                                    className="w-4 h-4 text-green-600"
                                                />
                                                <span className="text-sm">
                                                    {TOP[k].label} →{" "}
                                                    <strong className="text-green-700">
                                                        {TOP[k].price ? money(TOP[k].price) : "Free"}
                                                    </strong>
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="mt-3">
                                        <LineItem
                                            label="Top spot listing"
                                            value={`${money(monthlyTop)}/mo`}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Totals */}
                            <section className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-5">
                                <h3 className="mb-4 text-lg font-semibold text-purple-900 flex items-center gap-2">
                                    💸 Totals
                                </h3>
                                <TotalRow label="Monthly Subtotal" value={`${money(monthlySubtotal)}/month`} />


                                <div className="my-4 h-px bg-gradient-to-r from-purple-200 to-pink-200" />


                            </section>

                            {/* Notes */}
                            <section className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-5">
                                <h3 className="mb-3 text-lg font-semibold text-amber-900 flex items-center gap-2">
                                    📝 Important Notes
                                </h3>
                                <ul className="list-none space-y-2 text-sm text-amber-800">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600">•</span>
                                        Collaboration videos, reels, and influencer campaigns are priced{" "}
                                        <strong>separately</strong> depending on campaign scope.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600">•</span>
                                        Prices shown are indicative, subject to change, and not final.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600">•</span>
                                        All packages are monthly unless stated otherwise.
                                    </li>
                                </ul>
                            </section>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

/* ------- Small presentational subcomponents ------- */
function LineItem({ label, value }) {
    return (
        <div className="flex items-center justify-between text-sm text-gray-700 p-2 bg-white/50 rounded-lg">
            <span>{label}</span>
            <strong className="text-gray-900">{value}</strong>
        </div>
    );
}

function TotalRow({ label, value }) {
    return (
        <div className="mb-3 flex items-center justify-between rounded-xl border border-purple-200 bg-white/80 px-4 py-3">
            <span className="text-purple-800 font-medium">{label}</span>
            <strong className="text-purple-900">{value}</strong>
        </div>
    );
}