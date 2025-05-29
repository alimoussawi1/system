import React, { useState, useEffect, useMemo } from 'react';
import Table from '../components/Tabel';
import SelectInput from '../components/SelectInput';
import { Link } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useAccount } from '../context/AccountContext';

const ScannedCustomers = () => {
    const { accountData } = useAccount();
    const { uid, isAdmin, access } = accountData;

    const [scanBusiness, setScanBusiness] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [university, setUniversity] = useState('');

    const pageSize = 5;
    const totalPages = Math.ceil(scanBusiness.length / pageSize);

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
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg">
                        <div className="col-span-1">
                            <label htmlFor="start-date" className="text-sm font-medium mb-1 block">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="end-date" className="text-sm font-medium mb-1 block">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <div className="col-span-1">
                            <SelectInput
                                id="university"
                                label="University"
                                value={university}
                                onChange={(selectedValue) => setUniversity(selectedValue)}
                                options={universities}
                                className="w-full"
                            />
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
                        <Table
                            columns={scannedBusiness}
                            data={scanBusiness}
                            pageSize={pageSize}
                            checkbox={false}
                            totalPages={totalPages}
                        />
                    )}
                </>
            ) : (
                <div className="flex items-start justify-center min-h-[70vh] bg-gray-100 pt-20">
                    <div className="bg-white border border-[#5842aa] px-10 py-10 rounded-lg text-center w-full max-w-md">
                        <p className="text-2xl font-bold mb-6">
                            Upgrade to <span className="text-[#10758B] font-bold">SWB Plus</span> to access all our features!
                        </p>
                        <Link to="/admin/packages" className="inline-block">
                            <button className="bg-[#5842aa] text-white text-lg font-semibold rounded-lg px-6 py-3 hover:bg-[#452d9a]">
                                Packages
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScannedCustomers;
