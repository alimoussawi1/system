import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Tabel"; // Assuming you have a Table component for displaying the data

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [scannedCustomers, setScannedCustomers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false); // Separate loading state for users
    const [loadingScanned, setLoadingScanned] = useState(false); // Separate loading state for scanned customers
    const [error, setError] = useState("");

    // Fetch business users and scanned customers when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoadingUsers(true);
            setLoadingScanned(true);
            setError("");

            try {
                // Fetch business users
                const businessResponse = await axios.get("https://swb-backend.onrender.com/get_business_users");
                setUsers(businessResponse.data);  // Set business users data
                setLoadingUsers(false); // Set loadingUsers to false once data is fetched

                // Fetch scanned customers and their associated offer titles
                const scannedResponse = await axios.get("https://swb-backend.onrender.com/get_scanned_customers");
                const scannedData = scannedResponse.data;

                // Format the scannedAt field (convert Firebase Timestamp to Date)
                const formattedScannedCustomers = scannedData.map((customer) => {
                    // Convert Firebase timestamp to JavaScript Date
                    const scannedAtDate = new Date(
                        customer.scannedAt._seconds * 1000 + customer.scannedAt._nanoseconds / 1000000
                    );

                    return {
                        ...customer,
                        scannedAt: scannedAtDate.toLocaleString(),  // Convert to a readable date string
                    };
                });

                setScannedCustomers(formattedScannedCustomers);  // Set scanned customers data
                setLoadingScanned(false); // Set loadingScanned to false once data is fetched
            } catch (err) {
                setError("Error fetching data.");
                console.error(err);
                setLoadingUsers(false);
                setLoadingScanned(false);
            }
        };

        fetchData();
    }, []);

    // Define columns for the Table component for Business Users
    const userColumns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "businessName", // Assuming the field for the name is `businessName`
            },
            {
                Header: "Email",
                accessor: "businessEmail", // The email field is `businessEmail`
            },
        ],
        []
    );

    // Define columns for the Table component for Scanned Customers
    const scannedColumns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "fullName", // Assuming the field for the name is `fullName`
            },
            {
                Header: "Email",
                accessor: "businessEmail", // The email field is `businessEmail`
            },
            {
                Header: "Offer Title",
                accessor: "offerTitle", // The offer title fetched from the offer collection
            },
            {
                Header: "Gender",
                accessor: "gender", // Gender field
            },
            {
                Header: "Phone",
                accessor: "phone", // Phone field
            },
            {
                Header: "Scanned At",
                accessor: "scannedAt", // Scanned At field (now formatted)
            },
        ],
        []
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

            {/* Displaying Business Users */}
            <h2 className="text-xl font-bold mb-4">Business Users</h2>

            {error && <div className="text-red-500">{error}</div>}

            {loadingUsers ? (
                <div>Loading business users...</div>
            ) : (
                <Table
                    columns={userColumns}
                    data={users}  // Pass the users data to the Table component
                    pageSize={5}
                    checkbox={false}
                />
            )}

            {/* Displaying Scanned Customers */}
            <h2 className="text-xl font-bold mb-4">Scanned Customers</h2>

            {loadingScanned ? (
                <div>Loading scanned customers...</div>
            ) : (
                <Table
                    columns={scannedColumns}
                    data={scannedCustomers}  // Pass the scanned customers data to the Table component
                    pageSize={5}
                    checkbox={false}
                />
            )}
        </div>
    );
};

export default Admin;
