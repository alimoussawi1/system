import React, { useState, useEffect, useMemo } from 'react';
import Table from '../components/Tabel';
import SelectInput from '../components/SelectInput';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useAccount } from '../context/AccountContext';
import { Search } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ScannedCustomers = () => {
    const { accountData } = useAccount();
    const { uid, isAdmin, access } = accountData;

    const [scanBusiness, setScanBusiness] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtersconst [searchTerm, setSearchTerm] = useState('');
    const filteredData = useMemo(() => {
        if (!searchTerm) return scanBusiness;

        return scanBusiness.filter(item =>
            Object.values(item)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, scanBusiness]);
    const exportToExcel = () => {
        if (!scanBusiness.length) return;

        // Map your data for export (optional: remove unwanted fields)
        const exportData = scanBusiness.map(item => ({
            Name: item.fullName,
            Email: item.email,
            Phone: item.phone,
            University: item.university,
            "Scanned At": item.scannedAt,
            ...(isAdmin && { "Business Name": item.businessName })
        }));

        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Scanned Customers");

        // Write workbook and trigger download
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, `Scanned_Customers_${new Date().toLocaleDateString()}.xlsx`);
    };


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [university, setUniversity] = useState('');

    const pageSize = 5;
    const totalPages = useMemo(() => {
        return Math.ceil(filteredData.length / pageSize);
    }, [filteredData]);



    const universities = [
        { value: "", label: "ALL" },
        { value: 'LU - Lebanese University', label: 'LU - Lebanese University' },
        { value: 'NDU - Notre Dame University-Lo...', label: 'NDU - Notre Dame University - Louaize' },
        { value: 'UOB - University of Balamand', label: 'UOB - University of Balamand' },
        { value: 'MUT - Manar University of Tripoli', label: 'MUT - Manar University of Tripoli' },
        { value: 'MEU - Middle East University', label: 'MEU - Middle East University' },
        { value: 'HU - Haigazian University', label: 'HU - Haigazian University' },
        { value: 'AUB - American University of B...', label: 'AUB - American University of Beirut' },
        { value: 'LAU - Lebanese American University', label: 'LAU - Lebanese American University' },
        { value: 'USJ - Saint Joseph University', label: 'USJ - Saint Joseph University' },
        { value: 'Holy Spirit University', label: 'Holy Spirit University' },
        { value: 'BAU - Beirut Arab University', label: 'BAU - Beirut Arab University' },
        { value: 'US - University of Sagesse', label: 'US - University of Sagesse' },
        { value: 'MU - Makassed University', label: 'MU - Makassed University' },
        { value: 'LIU - Lebanese International University', label: 'LIU - Lebanese International University' },
        { value: 'AOU - Arab Open University', label: 'AOU - Arab Open University' },
        { value: 'GU - Global University', label: 'GU - Global University' },
        { value: 'BIU - Beirut Islamic University', label: 'BIU - Beirut Islamic University' },
        { value: 'IUL - Islamic University of Lebanon', label: 'IUL - Islamic University of Lebanon' },
        { value: 'Antonine University', label: 'Antonine University' },
        { value: 'JU - Jinan University', label: 'JU - Jinan University' },
        { value: 'ULFTSA - Université Libano-Franco', label: 'ULFTSA - Université Libano-Franco' },
        { value: 'HCU - Hariri Canadian University', label: 'HCU - Hariri Canadian University' },
        { value: 'LGU - Lebanese German University', label: 'LGU - Lebanese German University' },
        { value: 'MUBS - Modern University for Business and Science', label: 'MUBS - Modern University for Business and Science' },
        { value: 'AUST - American University of Science and Technology', label: 'AUST - American University of Science and Technology' },
        { value: 'AUT - American University of Technology', label: 'AUT - American University of Technology' },
        { value: 'ASTUL - Arts, Sciences & Technology', label: 'ASTUL - Arts, Sciences & Technology' },
        { value: 'LCU - Lebanese Canadian University', label: 'LCU - Lebanese Canadian University' },
        { value: 'C&EAUI - C&E American University', label: 'C&EAUI - C&E American University' },
        { value: 'ESA - Ecole Supérieure des Affaires', label: 'ESA - Ecole Supérieure des Affaires' },
        { value: 'Al-Kafaat University Institute', label: 'Al-Kafaat University Institute' },
        { value: 'RHU - Rafic Hariri University', label: 'RHU - Rafic Hariri University' },
        { value: 'USAL - University of Science and Arts', label: 'USAL - University of Science and Arts' },
        { value: 'Other', label: 'Other' }
    ];

    const fetchBusinessName = async (businessId) => {
        if (!businessId) return "";
        try {
            const db = getFirestore();
            const userDocRef = doc(db, "users", businessId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                return userDoc.data().businessName || "";
            }
            return "";
        } catch (error) {
            console.error("Error fetching business name:", error);
            return "";
        }
    };

    const fetchData = async () => {
        setLoading(true);
        const db = getFirestore();

        try {
            const scansRef = collection(db, "scannedCustomers");
            let constraints = [];

            if (uid && !isAdmin) {
                constraints.push(where("businessId", "==", uid));
            }
            if (startDate) {
                constraints.push(where("scannedAt", ">=", new Date(startDate)));
            }
            if (endDate) {
                const endDay = new Date(endDate);
                endDay.setHours(23, 59, 59, 999);
                constraints.push(where("scannedAt", "<=", endDay));
            }

            const q = query(scansRef, ...constraints);
            const snapshot = await getDocs(q);

            let results = snapshot.docs.map(doc => doc.data());
            results.sort((a, b) => b.scannedAt.toDate() - a.scannedAt.toDate());

            if (university?.value) {
                results = results.filter(c => c.university === university.value);
            }

            const formattedData = await Promise.all(results.map(async (business) => {
                const scannedAtDate = business.scannedAt.toDate();
                let businessName = "";

                if (isAdmin && business.businessId) {
                    businessName = await fetchBusinessName(business.businessId);
                }

                return {
                    ...business,
                    scannedAt: scannedAtDate.toLocaleString(),
                    businessName,
                };
            }));

            setScanBusiness(formattedData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, university]);

    const scannedBusiness = useMemo(() => {
        const columns = [
            { Header: "Name", accessor: "fullName" },
            { Header: "Email", accessor: "email" },
            { Header: "Phone", accessor: "phone" },
            { Header: "University", accessor: "university" },
            { Header: "Scanned At", accessor: "scannedAt" },
        ];

        if (isAdmin) {
            columns.push({ Header: "Business Name", accessor: "businessName" });
        }

        return columns;
    }, [isAdmin]);

    return (
        <div>
            {access || isAdmin ? (
                <>
                    <div className="mb-8">
                        <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    Filter Options
                                </h3>
                            </div>
                            <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setStartDate('');
                                        setEndDate('');
                                        setUniversity('');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear Filters
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="start-date" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="start-date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="end-date" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        id="end-date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        University
                                    </label>
                                    <div className="relative">
                                        <SelectInput
                                            id="university"
                                            value={university}
                                            onChange={(selectedValue) => setUniversity(selectedValue)}
                                            options={universities}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Optional: Add a clear filters button */}

                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center mt-20">

                            <div className="flex items-center justify-center gap-2 mt-4">
                                <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
                                <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
                                <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
                            </div>


                        </div>
                    ) : (
                        <>

                            <div className="flex items-center gap-4 max-w-full">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search across all fields..."
                                        className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                                    />
                                </div>

                                <button
                                    onClick={exportToExcel}
                                    className="px-4 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all whitespace-nowrap"
                                >
                                    Export to Excel
                                </button>
                            </div>




                            <Table
                                columns={scannedBusiness}
                                data={filteredData}
                                pageSize={pageSize}
                                checkbox={false}
                                totalPages={totalPages}
                                search={false}
                            />
                        </>
                    )}
                </>
            ) : (
                <div className="flex items-start justify-center min-h-[70vh] bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
                    <div className="bg-white border-2 border-[#5842aa]/20 shadow-2xl px-12 py-12 rounded-2xl text-center w-full max-w-lg relative overflow-hidden">
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5842aa] via-[#10758B] to-[#5842aa]"></div>

                        {/* Premium badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#5842aa] to-[#10758B] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Premium Features
                        </div>

                        <h2 className="text-3xl font-bold mb-4 text-gray-800">
                            Unlock Your Full Potential
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Upgrade to <span className="text-[#10758B] font-bold bg-[#10758B]/10 px-2 py-1 rounded">SWB Plus</span> to access all our premium features and take your experience to the next level!
                        </p>

                        <Link to="/admin/packages" className="inline-block group">
                            <button className="bg-gradient-to-r from-[#5842aa] to-[#452d9a] text-white text-lg font-semibold rounded-xl px-8 py-4 hover:from-[#452d9a] hover:to-[#3d2589] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                                View Packages
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </Link>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#5842aa]/10 to-[#10758B]/10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#10758B]/10 to-[#5842aa]/10 rounded-full blur-xl"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScannedCustomers;
