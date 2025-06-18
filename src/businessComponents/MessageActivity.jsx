// import React, { useState, useEffect } from "react";
// import { Line, Pie } from "react-chartjs-2";
// import Select from "react-select";
// import moment from "moment";
// import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// import {
//     Chart as ChartJS,
//     LineElement,
//     PointElement,
//     LineController,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
//     PieController,
// } from "chart.js";

// ChartJS.register(
//     LineElement,
//     PointElement,
//     LineController,
//     CategoryScale,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
//     PieController
// );

// function MessageActivity({ chartData, setChartData, selectStyle, isAdmin }) {
//     const selectOptions = [
//         { value: "today", label: "Today" },
//         { value: "this_week", label: "This Week" },
//         { value: "this_month", label: "This Month" },
//         { value: "this_year", label: "This Year" },
//     ];

//     const [totalScans, setTotalScans] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(selectOptions[0]);
//     const [peakHourData, setPeakHourData] = useState(null);
//     const [pieUniversityData, setPieUniversityData] = useState(null);

//     const handleChange = async (option) => {
//         setSelectedOption(option);

//         const db = getFirestore();
//         const auth = getAuth();
//         const user = auth.currentUser;
//         const userId = user ? user.uid : null;
//         if (!userId) return;

//         const now = moment();
//         let cutoffStart, cutoffEnd;
//         let groupBy = "hour";
//         let labelFormat = "YYYY-MM-DD HH:00";
//         let displayFormat = (val) => val;

//         switch (option.value) {
//             case "today":
//                 cutoffStart = now.clone().startOf("day");
//                 cutoffEnd = now.clone().endOf("day");
//                 groupBy = "hour";
//                 labelFormat = "YYYY-MM-DD HH:00";
//                 displayFormat = (val) => moment(val, labelFormat).format("h A");
//                 break;
//             case "this_week":
//                 cutoffStart = now.clone().startOf("isoWeek");
//                 cutoffEnd = now.clone().endOf("isoWeek");
//                 groupBy = "day";
//                 labelFormat = "YYYY-MM-DD";
//                 displayFormat = (val) => moment(val, labelFormat).format("dddd");
//                 break;
//             case "this_month":
//                 cutoffStart = now.clone().startOf("month");
//                 cutoffEnd = now.clone().endOf("month");
//                 groupBy = "day";
//                 labelFormat = "YYYY-MM-DD";
//                 displayFormat = (val) => moment(val, labelFormat).format("D");
//                 break;
//             case "this_year":
//                 cutoffStart = now.clone().startOf("year");
//                 cutoffEnd = now.clone().endOf("year");
//                 groupBy = "month";
//                 labelFormat = "YYYY-MM";
//                 displayFormat = (val) => moment(val, labelFormat).format("MMMM");
//                 break;
//             default:
//                 cutoffStart = now.clone().startOf("day");
//                 cutoffEnd = now.clone().endOf("day");
//         }

//         const scansRef = collection(db, "scannedCustomers");
//         let q = isAdmin
//             ? query(scansRef, where("scannedAt", ">=", cutoffStart.toDate()), where("scannedAt", "<=", cutoffEnd.toDate()))
//             : query(scansRef, where("businessId", "==", userId), where("scannedAt", ">=", cutoffStart.toDate()), where("scannedAt", "<=", cutoffEnd.toDate()));

//         const snapshot = await getDocs(q);
//         const filtered = snapshot.docs.map((doc) => doc.data());
//         setTotalScans(filtered.length);

//         // Line chart data
//         const grouped = {};
//         filtered.forEach((cust) => {
//             const scannedAt = cust.scannedAt.toDate();
//             const key = moment(scannedAt).startOf(groupBy).format(labelFormat);
//             grouped[key] = (grouped[key] || 0) + 1;
//         });

//         const completeTimeRange = [];
//         const current = cutoffStart.clone();
//         while (current.isSameOrBefore(cutoffEnd)) {
//             completeTimeRange.push(current.format(labelFormat));
//             current.add(1, groupBy);
//         }

//         const labels = completeTimeRange.map((label) => displayFormat(label));
//         const counts = completeTimeRange.map((label) => grouped[label] || 0);

//         setChartData({
//             labels,
//             datasets: [
//                 {
//                     label: `Scans - ${option.label}`,
//                     data: counts,
//                     fill: false,
//                     borderColor: "rgba(88, 66, 170, 1)",
//                 },
//             ],
//         });

//         // Peak hour analysis
//         const hourCount = Array(24).fill(0);
//         filtered.forEach((cust) => {
//             const hour = moment(cust.scannedAt.toDate()).hour();
//             hourCount[hour]++;
//         });
//         const peakHour = hourCount.indexOf(Math.max(...hourCount));
//         setPeakHourData({ peakHour, count: hourCount[peakHour] });

//         // University pie chart
//         const uniCount = filtered.reduce((acc, cust) => {
//             const uni = cust.university || "Unknown";
//             acc[uni] = (acc[uni] || 0) + 1;
//             return acc;
//         }, {});
//         setPieUniversityData({
//             labels: Object.keys(uniCount),
//             datasets: [
//                 {
//                     data: Object.values(uniCount),
//                     backgroundColor: [
//                         "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b", "#858796", "#5a5c69",
//                     ],
//                 },
//             ],
//         });
//     };

//     useEffect(() => {
//         handleChange(selectedOption);
//     }, []);

//     const lineOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             y: { beginAtZero: true },
//         },
//         plugins: {
//             legend: {
//                 position: "top",
//                 align: "start",
//                 labels: {
//                     usePointStyle: true,
//                     boxWidth: 7,
//                     boxHeight: 7,
//                     padding: 30,
//                 },
//             },
//         },
//     };

//     const pieOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: "bottom",
//             },
//         },
//     };

//     return (
//         <section className="mb-7">
//             <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
//                 <h2 className="flex flex-1 gap-4 self-start text-xl font-medium text-black">
//                     <span className="grow my-auto">Scanned Customers Activity</span>
//                 </h2>
//                 <Select
//                     options={selectOptions}
//                     value={selectedOption}
//                     onChange={(option) => handleChange(option)}
//                     placeholder="Select time range"
//                     className="bg-white rounded-xl w-[300px]"
//                     styles={selectStyle}
//                 />
//             </div>

//             <div className="flex flex-col px-6 pt-5 pb-6 mt-5 text-xs whitespace-nowrap bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
//                 <div className="flex justify-end mb-2">
//                     <p className="text-sm text-gray-600">Total Scans: {totalScans}</p>
//                 </div>

//                 <div className="flex gap-4 text-zinc-900 text-opacity-40 max-md:flex-wrap max-md:mt-10">
//                     <div className="flex flex-col flex-1 justify-center text-center leading-[133%] max-md:max-w-full">
//                         <div className="flex relative flex-col w-full h-[300px] max-md:max-w-full">
//                             <Line key={selectedOption.value} data={chartData} options={lineOptions} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row gap-8 mt-8 mb-8">
//                     <div className="w-full md:w-1/2 h-[400px]">
//                         <h3 className="mb-4 text-sm font-semibold text-gray-700">
//                             Distribution by University
//                         </h3>
//                         {pieUniversityData && pieUniversityData.datasets[0].data.some(v => v > 0) ? (
//                             <Pie key="university" data={pieUniversityData} options={pieOptions} />
//                         ) : (
//                             <p className="text-center mt-8 text-gray-500">
//                                 No university data available
//                             </p>
//                         )}
//                     </div>
//                     <div className="w-full md:w-1/2 h-[300px] flex flex-col items-center justify-center">
//                         <h3 className="mb-4 text-sm font-semibold text-gray-700">Peak Scan Hour</h3>
//                         {peakHourData ? (
//                             <div className="text-center">
//                                 <p className="text-4xl font-bold text-indigo-600">
//                                     {peakHourData.peakHour}:00
//                                 </p>
//                                 <p className="text-gray-500 mt-2">
//                                     Total Scans: {peakHourData.count}
//                                 </p>
//                             </div>
//                         ) : (
//                             <p className="text-center mt-8 text-gray-500">No scan data available</p>
//                         )}
//                     </div>


//                 </div>
//             </div>
//         </section>
//     );
// }

// export default MessageActivity;
import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import Select from "react-select";
import moment from "moment";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Activity, Users, Clock, TrendingUp, BarChart3, Calendar } from "lucide-react";

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController
);

function MessageActivity({ chartData, setChartData, selectStyle, isAdmin }) {
    const selectOptions = [
        { value: "today", label: "Today", icon: "📅" },
        { value: "this_week", label: "This Week", icon: "📊" },
        { value: "this_month", label: "This Month", icon: "📈" },
        { value: "this_year", label: "This Year", icon: "🗓️" },
    ];

    const [totalScans, setTotalScans] = useState(0);
    const [selectedOption, setSelectedOption] = useState(selectOptions[0]);
    const [peakHourData, setPeakHourData] = useState(null);
    const [pieUniversityData, setPieUniversityData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            borderRadius: '16px',
            border: state.isFocused ? '2px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(148, 163, 184, 0.3)',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '4px 8px',
            minHeight: '48px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            '&:hover': {
                borderColor: 'rgba(99, 102, 241, 0.4)',
                transform: 'translateY(-1px)',
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? 'rgba(99, 102, 241, 0.9)'
                : state.isFocused
                    ? 'rgba(99, 102, 241, 0.1)'
                    : 'transparent',
            color: state.isSelected ? 'white' : '#1f2937',
            padding: '12px 16px',
            borderRadius: '8px',
            margin: '4px',
            transition: 'all 0.2s ease',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            backdropFilter: 'blur(16px)',
            background: 'rgba(255, 255, 255, 0.95)',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#1f2937',
            fontWeight: '500',
        })
    };

    const handleChange = async (option) => {
        setIsLoading(true);
        setSelectedOption(option);

        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user ? user.uid : null;
        if (!userId) {
            setIsLoading(false);
            return;
        }

        const now = moment();
        let cutoffStart, cutoffEnd;
        let groupBy = "hour";
        let labelFormat = "YYYY-MM-DD HH:00";
        let displayFormat = (val) => val;

        switch (option.value) {
            case "today":
                cutoffStart = now.clone().startOf("day");
                cutoffEnd = now.clone().endOf("day");
                groupBy = "hour";
                labelFormat = "YYYY-MM-DD HH:00";
                displayFormat = (val) => moment(val, labelFormat).format("h A");
                break;
            case "this_week":
                cutoffStart = now.clone().startOf("isoWeek");
                cutoffEnd = now.clone().endOf("isoWeek");
                groupBy = "day";
                labelFormat = "YYYY-MM-DD";
                displayFormat = (val) => moment(val, labelFormat).format("dddd");
                break;
            case "this_month":
                cutoffStart = now.clone().startOf("month");
                cutoffEnd = now.clone().endOf("month");
                groupBy = "day";
                labelFormat = "YYYY-MM-DD";
                displayFormat = (val) => moment(val, labelFormat).format("D");
                break;
            case "this_year":
                cutoffStart = now.clone().startOf("year");
                cutoffEnd = now.clone().endOf("year");
                groupBy = "month";
                labelFormat = "YYYY-MM";
                displayFormat = (val) => moment(val, labelFormat).format("MMMM");
                break;
            default:
                cutoffStart = now.clone().startOf("day");
                cutoffEnd = now.clone().endOf("day");
        }

        const scansRef = collection(db, "scannedCustomers");
        let q = isAdmin
            ? query(scansRef, where("scannedAt", ">=", cutoffStart.toDate()), where("scannedAt", "<=", cutoffEnd.toDate()))
            : query(scansRef, where("businessId", "==", userId), where("scannedAt", ">=", cutoffStart.toDate()), where("scannedAt", "<=", cutoffEnd.toDate()));

        const snapshot = await getDocs(q);
        const filtered = snapshot.docs.map((doc) => doc.data());
        setTotalScans(filtered.length);

        // Line chart data
        const grouped = {};
        filtered.forEach((cust) => {
            const scannedAt = cust.scannedAt.toDate();
            const key = moment(scannedAt).startOf(groupBy).format(labelFormat);
            grouped[key] = (grouped[key] || 0) + 1;
        });

        const completeTimeRange = [];
        const current = cutoffStart.clone();
        while (current.isSameOrBefore(cutoffEnd)) {
            completeTimeRange.push(current.format(labelFormat));
            current.add(1, groupBy);
        }

        const labels = completeTimeRange.map((label) => displayFormat(label));
        const counts = completeTimeRange.map((label) => grouped[label] || 0);

        setChartData({
            labels,
            datasets: [
                {
                    label: `Scans - ${option.label}`,
                    data: counts,
                    fill: true,
                    borderColor: "rgba(99, 102, 241, 1)",
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    borderWidth: 3,
                    pointBackgroundColor: "rgba(99, 102, 241, 1)",
                    pointBorderColor: "rgba(255, 255, 255, 1)",
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.4,
                },
            ],
        });

        // Peak hour analysis
        const hourCount = Array(24).fill(0);
        filtered.forEach((cust) => {
            const hour = moment(cust.scannedAt.toDate()).hour();
            hourCount[hour]++;
        });
        const peakHour = hourCount.indexOf(Math.max(...hourCount));
        setPeakHourData({ peakHour, count: hourCount[peakHour] });

        // University pie chart
        const uniCount = filtered.reduce((acc, cust) => {
            const uni = cust.university || "Unknown";
            acc[uni] = (acc[uni] || 0) + 1;
            return acc;
        }, {});

        const colors = [
            "rgba(99, 102, 241, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(34, 197, 94, 0.8)",
            "rgba(251, 146, 60, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(14, 165, 233, 0.8)",
            "rgba(245, 158, 11, 0.8)",
            "rgba(139, 69, 19, 0.8)"
        ];

        setPieUniversityData({
            labels: Object.keys(uniCount),
            datasets: [
                {
                    data: Object.values(uniCount),
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace('0.8', '1')),
                    borderWidth: 2,
                    hoverOffset: 10,
                },
            ],
        });

        setIsLoading(false);
    };

    useEffect(() => {
        handleChange(selectedOption);
    }, []);

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(99, 102, 241, 0.5)',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 16,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                },
                ticks: {
                    color: 'rgba(107, 114, 128, 0.8)',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                },
                ticks: {
                    color: 'rgba(107, 114, 128, 0.8)',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        size: 12,
                        weight: '500'
                    },
                    color: 'rgba(75, 85, 99, 0.9)'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: 'rgba(99, 102, 241, 0.5)',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 16,
            }
        },
    };

    return (
        <section className="mb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                        <Activity className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Customer Analytics Dashboard
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Real-time scanning activity insights</p>
                    </div>
                </div>

                <div className="w-80">
                    <Select
                        options={selectOptions}
                        value={selectedOption}
                        onChange={(option) => handleChange(option)}
                        placeholder="Select time range"
                        className="text-sm"
                        styles={customSelectStyles}
                        isSearchable={false}
                    />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Scans</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalScans.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Peak Hour</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {peakHourData ? `${peakHourData.peakHour}:00` : '--'}
                            </p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Peak Activity</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {peakHourData ? peakHourData.count : '0'}
                            </p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chart */}
            <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-xl mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-900">Activity Trend</h3>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-80">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        </div>
                    </div>
                ) : (
                    <div className="h-80">
                        <Line key={selectedOption.value} data={chartData} options={lineOptions} />
                    </div>
                )}
            </div>

            {/* Bottom Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* University Distribution */}
                <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="w-6 h-6 text-purple-600" />
                        <h3 className="text-xl font-bold text-gray-900">University Distribution</h3>
                    </div>

                    {pieUniversityData && pieUniversityData.datasets[0].data.some(v => v > 0) ? (
                        <div className="h-80">
                            <Pie key="university" data={pieUniversityData} options={pieOptions} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-80 text-gray-500">
                            <Users className="w-16 h-16 mb-4 opacity-30" />
                            <p className="text-lg font-medium">No university data available</p>
                            <p className="text-sm">Data will appear when scans are recorded</p>
                        </div>
                    )}
                </div>

                {/* Peak Hour Details */}
                <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-xl font-bold text-gray-900">Peak Activity Analysis</h3>
                    </div>

                    {peakHourData && peakHourData.count > 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="relative mb-8">
                                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-white">
                                            {peakHourData?.peakHour !== undefined
                                                ? `${String(peakHourData.peakHour).padStart(2, '0')}:00`
                                                : '00:00'}
                                        </p>

                                        <p className="text-sm text-emerald-100 font-medium">HOUR</p>
                                    </div>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-20 animate-pulse"></div>
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-2xl font-bold text-gray-900">{peakHourData.count} scans</p>
                                <p className="text-gray-500">Highest activity period</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <Clock className="w-16 h-16 mb-4 opacity-30" />
                            <p className="text-lg font-medium">No peak data available</p>
                            <p className="text-sm">Activity patterns will show after scans</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default MessageActivity;