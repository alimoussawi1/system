import React, { useState, useEffect } from 'react';
import Table from '../components/Tabel';
import axios from 'axios';
import SelectInput from '../components/SelectInput';
import { Link } from 'react-router-dom';

const ScannedCustomers = () => {
    const [scanBusiness, setScanBusiness] = useState([]);
    const [loading, setLoading] = useState(false);

    // Search filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [gender, setGender] = useState('');
    const [university, setUniversity] = useState('');
    const universities = [
        { value: "", label: "ALL" },
        { value: 'LU - Lebanese University', label: 'LU - Lebanese University' },
        { value: 'NDU - Notre Dame University - Louaize', label: 'NDU - Notre Dame University - Louaize' },
        { value: 'UOB - University of Balamand', label: 'UOB - University of Balamand' },
        { value: 'MUT - Manar University of Tripoli', label: 'MUT - Manar University of Tripoli' },
        { value: 'MEU - Middle East University', label: 'MEU - Middle East University' },
        { value: 'HU - Haigazian University', label: 'HU - Haigazian University' },
        { value: 'AUB - American University of Beirut', label: 'AUB - American University of Beirut' },
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


    const fetchData = async () => {
        setLoading(true);
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        const userId = user ? user.uid : null;

        try {
            const response = await axios.get("http://localhost:3001/get_scanned_customers_for_business", {
                params: {
                    businessId: userId,
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                    gender: gender.value || undefined,
                    university: university.value || undefined
                }
            });

            const data = response.data;

            const formattedData = data.map((business) => {
                const scannedAtDate = new Date(
                    business.scannedAt._seconds * 1000 + business.scannedAt._nanoseconds / 1000000
                );
                return {
                    ...business,
                    scannedAt: scannedAtDate.toLocaleString(),
                };
            });

            setScanBusiness(formattedData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, gender, university]);

    const handleSearch = () => {
        fetchData();
    };

    const scannedBusiness = React.useMemo(() => [
        { Header: "Name", accessor: "fullName" },
        { Header: "Email", accessor: "email" },
        { Header: "Gender", accessor: "gender" },
        { Header: "Phone", accessor: "phone" },
        { Header: "University", accessor: "university" },
        { Header: "Scanned At", accessor: "scannedAt" },
    ], []);

    const access = localStorage.getItem("access") === "true";
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Scanned Business</h2>

            {access ? (
                <>
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg">
                        {/* Start Date Label and Input */}
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
                                placeholder="Start Date"
                            />
                        </div>

                        {/* End Date Label and Input */}
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
                                placeholder="End Date"
                            />
                        </div>

                        {/* Gender Label and Select */}
                        <div className="col-span-1">
                            <SelectInput
                                id="gender"
                                label="Gender"
                                value={gender}
                                onChange={(selectedValue) => setGender(selectedValue)}
                                options={[
                                    { value: '', label: 'ALL' },
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                ]}
                                className="w-full"
                            />
                        </div>

                        {/* University Label and Select */}
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
                        <div>Loading business users...</div>
                    ) : (
                        <Table
                            columns={scannedBusiness}
                            data={scanBusiness}
                            pageSize={5}
                            checkbox={false}
                        />
                    )}
                </>
            ) : (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg">
                    <p className="text-lg font-semibold">
                        You should upgrade to <span className="text-[#10758B] font-bold">SWB Pro</span> to filter and search for your scanned customers.
                    </p>
                    <Link to="/admin/packages" className="text-white hover:text-gray-400">
                        <button className="mt-4 bg-[#5842aa] text-white font-medium rounded-lg px-4 py-2 flex items-center cursor-pointer hover:bg-[#452d9a]">
                            Packages
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );

};

export default ScannedCustomers;
