import React, { useEffect, useState, useMemo } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Table from '../components/Tabel';
import { FaPencilAlt } from 'react-icons/fa';

const EditBusinessModal = ({ isOpen, onClose, business, onSave }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(business || {});
    }, [business]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Edit Business</h2>

                {["businessName", "businessEmail", "businessType", "ownerName", "ownerPhoneNumber"].map(field => (
                    <div key={field} className="mb-4">
                        <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                ))}

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

const Businesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pageSize = 12;

    const fetchBusinesses = async () => {
        setLoading(true);
        const db = getFirestore();
        const usersRef = collection(db, "users");

        try {
            const snapshot = await getDocs(usersRef);
            const filtered = snapshot.docs
                .map(doc => ({ ...doc.data(), uid: doc.id }))
                .filter(doc => !!doc.businessEmail)
                .map(doc => ({
                    uid: doc.uid,
                    businessName: doc.businessName || "-",
                    businessEmail: doc.businessEmail || "-",
                    businessType: doc.businessType || "-",
                    ownerName: doc.ownerName || "-",
                    ownerPhoneNumber: doc.ownerPhoneNumber || "-"
                }))
                .sort((a, b) => a.businessName.localeCompare(b.businessName));

            setBusinesses(filtered);
        } catch (err) {
            console.error("Error fetching businesses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinesses();
    }, []);

    const totalPages = Math.ceil(businesses.length / pageSize);

    const handleEditClick = (business) => {
        setSelectedBusiness(business);
        setIsModalOpen(true);
    };

    const handleSave = async (updatedData) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, "users", updatedData.uid);
            await updateDoc(docRef, updatedData);
            setIsModalOpen(false);
            setSelectedBusiness(null);
            fetchBusinesses();
        } catch (error) {
            console.error("Error updating business:", error);
        }
    };

    const columns = useMemo(() => [
        { Header: "Business Name", accessor: "businessName" },
        { Header: "Business Email", accessor: "businessEmail" },
        { Header: "Business Type", accessor: "businessType" },
        { Header: "Owner Name", accessor: "ownerName" },
        { Header: "Owner Phone", accessor: "ownerPhoneNumber" },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }) => (
                <FaPencilAlt
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleEditClick(row.original)}
                />
            )
        }
    ], []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Businesses</h2>
            {loading ? (

                <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
                    <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
                    <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
                </div>

            ) : (
                <>
                    <Table
                        columns={columns}
                        data={businesses}
                        pageSize={pageSize}
                        checkbox={false}
                        totalPages={totalPages}
                        search={true}
                    />
                    <EditBusinessModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        business={selectedBusiness}
                        onSave={handleSave}
                    />
                </>
            )}
        </div>
    );
};

export default Businesses;
