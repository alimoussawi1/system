import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import Select from "react-select";
import moment from "moment";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
        { value: "today", label: "Today" },
        { value: "this_week", label: "This Week" },
        { value: "this_month", label: "This Month" },
        { value: "this_year", label: "This Year" },
    ];

    const [totalScans, setTotalScans] = useState(0);
    const [selectedOption, setSelectedOption] = useState(selectOptions[0]);
    const [peakHourData, setPeakHourData] = useState(null);
    const [pieUniversityData, setPieUniversityData] = useState(null);

    const handleChange = async (option) => {
        setSelectedOption(option);

        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user ? user.uid : null;
        if (!userId) return;

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
                    fill: false,
                    borderColor: "rgba(88, 66, 170, 1)",
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
        setPieUniversityData({
            labels: Object.keys(uniCount),
            datasets: [
                {
                    data: Object.values(uniCount),
                    backgroundColor: [
                        "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b", "#858796", "#5a5c69",
                    ],
                },
            ],
        });
    };

    useEffect(() => {
        handleChange(selectedOption);
    }, []);

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true },
        },
        plugins: {
            legend: {
                position: "top",
                align: "start",
                labels: {
                    usePointStyle: true,
                    boxWidth: 7,
                    boxHeight: 7,
                    padding: 30,
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    return (
        <section className="mb-7">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <h2 className="flex flex-1 gap-4 self-start text-xl font-medium text-black">
                    <span className="grow my-auto">Scanned Customers Activity</span>
                </h2>
                <Select
                    options={selectOptions}
                    value={selectedOption}
                    onChange={(option) => handleChange(option)}
                    placeholder="Select time range"
                    className="bg-white rounded-xl w-[300px]"
                    styles={selectStyle}
                />
            </div>

            <div className="flex flex-col px-6 pt-5 pb-6 mt-5 text-xs whitespace-nowrap bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
                <div className="flex justify-end mb-2">
                    <p className="text-sm text-gray-600">Total Scans: {totalScans}</p>
                </div>

                <div className="flex gap-4 text-zinc-900 text-opacity-40 max-md:flex-wrap max-md:mt-10">
                    <div className="flex flex-col flex-1 justify-center text-center leading-[133%] max-md:max-w-full">
                        <div className="flex relative flex-col w-full h-[300px] max-md:max-w-full">
                            <Line key={selectedOption.value} data={chartData} options={lineOptions} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mt-8 mb-8">
                    <div className="w-full md:w-1/2 h-[400px]">
                        <h3 className="mb-4 text-sm font-semibold text-gray-700">
                            Distribution by University
                        </h3>
                        {pieUniversityData && pieUniversityData.datasets[0].data.some(v => v > 0) ? (
                            <Pie key="university" data={pieUniversityData} options={pieOptions} />
                        ) : (
                            <p className="text-center mt-8 text-gray-500">
                                No university data available
                            </p>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 h-[300px] flex flex-col items-center justify-center">
                        <h3 className="mb-4 text-sm font-semibold text-gray-700">Peak Scan Hour</h3>
                        {peakHourData ? (
                            <div className="text-center">
                                <p className="text-4xl font-bold text-indigo-600">
                                    {peakHourData.peakHour}:00
                                </p>
                                <p className="text-gray-500 mt-2">
                                    Total Scans: {peakHourData.count}
                                </p>
                            </div>
                        ) : (
                            <p className="text-center mt-8 text-gray-500">No scan data available</p>
                        )}
                    </div>


                </div>
            </div>
        </section>
    );
}

export default MessageActivity;
