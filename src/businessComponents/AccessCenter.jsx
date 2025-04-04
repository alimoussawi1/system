import React, { useEffect, useState } from "react";
import Table from "../components/Tabel";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AccessCenter = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get('https://swb-backend.onrender.com/get_businesses_admin');

                setBusinesses(response.data);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };
        fetchBusinesses();
    }, []);

    const handleToggleAccess = async (businessId, currentAccess) => {
        const updatedAccess = !currentAccess;
        try {
            // Call the API to update the 'access' field
            const response = await axios.get(`https://swb-backend.onrender.com/update_business_access/${businessId}`);

            if (response.status === 200) {  // Ensure you check the response status
                // Update the state to reflect the change locally
                setBusinesses(businesses.map(business =>
                    business.businessId === businessId
                        ? { ...business, access: updatedAccess }
                        : business
                ));

                // Show success toast
                toast.success("Access updated successfully!");
            } else {
                toast.error("Failed to update access.");
            }
        } catch (error) {
            console.error("Error updating access:", error);
            toast.error("Error updating access.");
        }
    };
    const columns = [
        { Header: "Business Name", accessor: "businessName" },
        { Header: "Email", accessor: "email" },
        {
            Header: "Access",
            accessor: "access",
            Cell: ({ row }) => (
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={row.original.access}
                        onChange={() => handleToggleAccess(row.original.businessId, row.original.access)}
                    />
                    <span className="slider"></span>
                </label>
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
