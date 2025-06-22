import React, { useEffect, useState } from "react";
import Table from "../components/Tabel";
import { toast } from 'react-toastify';
import { db } from "../firebase"; // your firebase config
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { FaToggleOn, FaToggleOff } from "react-icons/fa"; // <-- Added react-icons
import 'react-toastify/dist/ReactToastify.css';
import { MdToggleOn } from "react-icons/md";
import { MdToggleOff } from "react-icons/md";
import { useAccount } from "../context/AccountContext";
const AccessCenter = () => {
    const [businesses, setBusinesses] = useState([]);
    const { showSuccessToast, showErrorToast } = useAccount();

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const businessesRef = collection(db, "users");
                const snapshot = await getDocs(businessesRef);

                const fetchedBusinesses = snapshot.docs
                    .filter(doc => doc.data().isBusinessAccount)
                    .map(doc => ({
                        businessId: doc.id,
                        businessName: doc.data().businessName || "",
                        email: doc.data().businessEmail || "",
                        access: doc.data().access || false,
                    }))
                    .sort((a, b) => a.businessName.localeCompare(b.businessName)); // <-- sort alphabetically

                setBusinesses(fetchedBusinesses);
            } catch (error) {
                console.error("Error fetching businesses:", error);

            }
        };


        fetchBusinesses();
    }, []);

    const handleToggleAccess = async (businessId, currentAccess) => {
        const updatedAccess = !currentAccess;
        try {
            const businessDocRef = doc(db, "users", businessId);
            await updateDoc(businessDocRef, { access: updatedAccess });

            setBusinesses(prevBusinesses =>
                prevBusinesses.map(business =>
                    business.businessId === businessId
                        ? { ...business, access: updatedAccess }
                        : business
                )
            );

            // No success toast (silent update)
        } catch (error) {
            console.error("Error updating access:", error);
            showErrorToast("Error updating access.");
        }
    };

    const columns = [
        { Header: "Business Name", accessor: "businessName" },
        { Header: "Email", accessor: "email" },
        {
            Header: "Access",
            accessor: "access",
            Cell: ({ row }) => (
                <div className="flex justify-center items-center h-full">
                    <div
                        onClick={() => handleToggleAccess(row.original.businessId, row.original.access)}
                        className="cursor-pointer text-3xl"
                    >
                        {row.original.access ? (
                            <MdToggleOn className="text-green-500 text-4xl" />
                        ) : (
                            <MdToggleOff className="text-red-500 text-4xl" />
                        )}
                    </div>
                </div>
            ),
        },

    ];

    return (
        <div>
            <Table
                columns={columns}
                data={businesses}
                pageSize={400}
                checkbox={false}
            />
        </div>
    );
};

export default AccessCenter;
