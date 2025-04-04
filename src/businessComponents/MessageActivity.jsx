// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import Select from "react-select";
// import axios from "axios";
// import moment from "moment";
// import Chart from "chart.js/auto";

// function MessageActivity({ chartData, setChartData, selectStyle }) {
//     // Updated select options
//     const selectOptions = [
//         { value: "today", label: "Today" },
//         { value: "this_week", label: "This Week" },
//         { value: "this_month", label: "This Month" },
//         { value: "this_year", label: "This Year" },
//     ];

//     const [selectedOption, setSelectedOption] = useState(selectOptions[0]);

//     const handleChange = async (option) => {
//         const userString = localStorage.getItem("user");
//         const user = userString ? JSON.parse(userString) : null;
//         const userId = user ? user.uid : null;

//         try {
//             const response = await axios.get(
//                 "http://localhost:3001/get_scanned_customers_for_business",
//                 {
//                     params: {
//                         businessId: userId,
//                     },
//                 }
//             );

//             const allCustomers = response.data;
//             const now = moment();
//             let cutoffStart, cutoffEnd;
//             let groupBy = "hour";
//             let labelFormat = "YYYY-MM-DD HH:00";
//             let displayFormat = (val) => val;

//             // Adjust cutoff ranges and grouping based on the option.
//             switch (option.value) {
//                 case "today":
//                     cutoffStart = now.clone().startOf("day");
//                     cutoffEnd = now.clone().endOf("day");
//                     groupBy = "hour";
//                     labelFormat = "YYYY-MM-DD HH:00";
//                     displayFormat = (val) => moment(val, labelFormat).format("h A");
//                     break;

//                 case "this_week":
//                     // Using ISO week so that Monday is the start
//                     cutoffStart = now.clone().startOf("isoWeek");
//                     cutoffEnd = now.clone().endOf("isoWeek");
//                     groupBy = "day";
//                     labelFormat = "YYYY-MM-DD";
//                     displayFormat = (val) => moment(val, labelFormat).format("dddd");
//                     break;

//                 case "this_month":
//                     cutoffStart = now.clone().startOf("month");
//                     cutoffEnd = now.clone().endOf("month");
//                     groupBy = "day";
//                     labelFormat = "YYYY-MM-DD";
//                     displayFormat = (val) => moment(val, labelFormat).format("D");
//                     break;

//                 case "this_year":
//                     cutoffStart = now.clone().startOf("year");
//                     cutoffEnd = now.clone().endOf("year");
//                     groupBy = "month";
//                     labelFormat = "YYYY-MM";
//                     displayFormat = (val) => moment(val, labelFormat).format("MMMM");
//                     break;

//                 default:
//                     cutoffStart = now.clone().startOf("day");
//                     cutoffEnd = now.clone().endOf("day");
//             }

//             // Filter the customers based on the cutoff range.
//             const filtered = allCustomers.filter((cust) => {
//                 const scannedTime = cust.scannedAt && cust.scannedAt._seconds
//                     ? moment(new Date(cust.scannedAt._seconds * 1000))
//                     : moment(cust.scannedAt);
//                 return scannedTime.isBetween(cutoffStart, cutoffEnd, undefined, "[]");
//             });

//             // Group the filtered data.
//             const grouped = {};
//             filtered.forEach((cust) => {
//                 const time = cust.scannedAt && cust.scannedAt._seconds
//                     ? moment(new Date(cust.scannedAt._seconds * 1000))
//                     : moment(cust.scannedAt);
//                 const key = time.clone().startOf(groupBy).format(labelFormat);
//                 grouped[key] = (grouped[key] || 0) + 1;
//             });

//             // Create a complete time range for labels.
//             const completeTimeRange = [];
//             const current = cutoffStart.clone();
//             while (current.isSameOrBefore(cutoffEnd)) {
//                 completeTimeRange.push(current.format(labelFormat));
//                 current.add(1, groupBy);
//             }

//             const labels = completeTimeRange.map((label) => displayFormat(label));
//             const counts = completeTimeRange.map((label) => grouped[label] || 0);

//             setSelectedOption(option);
//             setChartData({
//                 labels,
//                 datasets: [
//                     {
//                         label: `Scans - ${option.label}`,
//                         data: counts,
//                         fill: false,
//                         borderColor: "rgba(163, 148, 85, 1)",
//                     },
//                 ],
//             });
//         } catch (error) {
//             console.error("Error fetching scanned customers:", error);
//         }
//     };

//     useEffect(() => {
//         handleChange(selectedOption);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
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
//                 padding: 30,
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
//                     onChange={handleChange}
//                     placeholder="Select time range"
//                     className="bg-white rounded-xl w-[300px]"
//                     styles={selectStyle}
//                 />
//             </div>
//             <div className="flex flex-col px-6 pt-5 pb-6 mt-5 text-xs whitespace-nowrap bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
//                 <div className="flex gap-4 text-zinc-900 text-opacity-40 max-md:flex-wrap max-md:mt-10">
//                     <div className="flex flex-col flex-1 justify-center text-center leading-[133%] max-md:max-w-full">
//                         <div className="flex relative flex-col w-full h-[300px] max-md:max-w-full">
//                             <Line data={chartData} options={options} />
//                         </div>
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
import axios from "axios";
import moment from "moment";
import Chart from "chart.js/auto";

function MessageActivity({ chartData, setChartData, selectStyle, isAdmin }) {
    const selectOptions = [
        { value: "today", label: "Today" },
        { value: "this_week", label: "This Week" },
        { value: "this_month", label: "This Month" },
        { value: "this_year", label: "This Year" },
    ];

    // New state to hold total scans
    const [totalScans, setTotalScans] = useState(0);

    const [selectedOption, setSelectedOption] = useState(selectOptions[0]);
    const [pieGenderData, setPieGenderData] = useState(null);
    const [pieUniversityData, setPieUniversityData] = useState(null);

    const handleChange = async (option) => {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        const userId = user ? user.uid : null;

        try {
            const response = await axios.get(
                "http://localhost:3001/get_scanned_customers_for_business",
                {
                    params: { businessId: userId, isAdmin: isAdmin },
                }
            );

            const allCustomers = response.data;
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

            // Filter the customers based on the cutoff range.
            const filtered = allCustomers.filter((cust) => {
                const scannedTime =
                    cust.scannedAt && cust.scannedAt._seconds
                        ? moment(new Date(cust.scannedAt._seconds * 1000))
                        : moment(cust.scannedAt);
                return scannedTime.isBetween(cutoffStart, cutoffEnd, undefined, "[]");
            });

            // Update the total scans state
            setTotalScans(filtered.length);

            // Build the line chart data by grouping
            const grouped = {};
            filtered.forEach((cust) => {
                const time =
                    cust.scannedAt && cust.scannedAt._seconds
                        ? moment(new Date(cust.scannedAt._seconds * 1000))
                        : moment(cust.scannedAt);
                const key = time.clone().startOf(groupBy).format(labelFormat);
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

            // Update line chart data
            setSelectedOption(option);
            setChartData({
                labels,
                datasets: [
                    {
                        label: `Scans - ${option.label}`,
                        data: counts,
                        fill: false,
                        borderColor: "rgba(163, 148, 85, 1)",
                    },
                ],
            });

            // Compute pie chart data for Gender distribution.
            const genderCount = filtered.reduce((acc, cust) => {
                const gender = cust.gender || "Unknown";
                acc[gender] = (acc[gender] || 0) + 1;
                return acc;
            }, {});
            setPieGenderData({
                labels: Object.keys(genderCount),
                datasets: [
                    {
                        data: Object.values(genderCount),
                        backgroundColor: ["#4e73df", "#e74a3b", "#f6c23e", "#858796"],
                    },
                ],
            });

            // Compute pie chart data for University distribution.
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
                            "#1cc88a",
                            "#36b9cc",
                            "#f6c23e",
                            "#e74a3b",
                            "#858796",
                            "#5a5c69",
                        ],
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching scanned customers:", error);
        }
    };

    useEffect(() => {
        handleChange(selectedOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                padding: 30,
            },
        },
    };

    // Simple pie options (customize as needed)
    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };

    // Helper function to check if a Pie chart has at least one non-zero value
    const hasPieData = (pieData) => {
        if (!pieData) return false;
        const dataset = pieData.datasets && pieData.datasets[0];
        if (!dataset) return false;
        // Sum all values in the dataset
        const total = dataset.data.reduce((sum, val) => sum + val, 0);
        return total > 0;
    };

    return (
        <section className="mb-7">
            {/* Header + Select */}
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <h2 className="flex flex-1 gap-4 self-start text-xl font-medium text-black">
                    <span className="grow my-auto">Scanned Customers Activity</span>
                </h2>
                <Select
                    options={selectOptions}
                    value={selectedOption}
                    onChange={handleChange}
                    placeholder="Select time range"
                    className="bg-white rounded-xl w-[300px]"
                    styles={selectStyle}
                />
            </div>

            {/* Main container */}
            <div className="flex flex-col px-6 pt-5 pb-6 mt-5 text-xs whitespace-nowrap bg-white rounded-2xl max-md:px-5 max-md:max-w-full">

                {/* Total Scans Display */}
                <div className="flex justify-end mb-2">
                    <p className="text-sm text-gray-600">
                        Total Scans: {totalScans}
                    </p>
                </div>

                {/* LINE CHART */}
                <div className="flex gap-4 text-zinc-900 text-opacity-40 max-md:flex-wrap max-md:mt-10">
                    <div className="flex flex-col flex-1 justify-center text-center leading-[133%] max-md:max-w-full">
                        <div className="flex relative flex-col w-full h-[300px] max-md:max-w-full">
                            <Line data={chartData} options={lineOptions} />
                        </div>
                    </div>
                </div>

                {/* PIE CHARTS (side by side) */}
                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    {/* GENDER PIE */}
                    <div className="w-full md:w-1/2 h-[300px]">
                        <h3 className="mb-4 text-sm font-semibold text-gray-700">
                            Distribution by Gender
                        </h3>
                        {pieGenderData && hasPieData(pieGenderData) ? (
                            <Pie data={pieGenderData} options={pieOptions} />
                        ) : (
                            <p className="text-center mt-8 text-gray-500">
                                No gender data available
                            </p>
                        )}
                    </div>

                    {/* UNIVERSITY PIE */}
                    <div className="w-full md:w-1/2 h-[300px]">
                        <h3 className="mb-4 text-sm font-semibold text-gray-700">
                            Distribution by University
                        </h3>
                        {pieUniversityData && hasPieData(pieUniversityData) ? (
                            <Pie data={pieUniversityData} options={pieOptions} />
                        ) : (
                            <p className="text-center mt-8 text-gray-500">
                                No university data available
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MessageActivity;
