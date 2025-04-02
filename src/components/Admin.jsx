import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Tabel"; // Assuming you have a Table component for displaying the data

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [scannedCustomers, setScannedCustomers] = useState([]);
    const [scanBusiness, setScanBusiness] = useState([]);
    const [offers, setOffers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false); // Separate loading state for users
    const [loadingOffers, setLoadingOffers] = useState(false)
    const [loadingScanned, setLoadingScanned] = useState(false); // Separate loading state for scanned customers
    const [error, setError] = useState("");





    // Fetch business users and scanned customers when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoadingUsers(true);
            setLoadingScanned(true);
            setError("");

            const userString = localStorage.getItem("user");
            const user = userString ? JSON.parse(userString) : null;
            const userId = user ? user.uid : null;

            console.log("User ID from localStorage:", userId);
            try {
                // Fetch business users
                const businessResponse = await axios.get("https://swb-backend.onrender.com/get_business_users");
                setUsers(businessResponse.data);  // Set business users data
                setLoadingUsers(false); // Set loadingUsers to false once data is fetched

                // Fetch scanned customers and their associated offer titles
                const scannedResponse = await axios.get("https://swb-backend.onrender.com/get_scanned_customers");
                const scannedData = scannedResponse.data;

                const offersResponse = await axios.get("http://localhost:3001/get_offers", {
                    params: { userId } // Pass userId as a query parameter
                });
                setOffers(offersResponse.data);
                const scannedBusinessResponse = await axios.get("http://localhost:3001/get_scanned_customers_for_business", {
                    params: { businessId: userId }
                });

                const scannedBusinessData = scannedBusinessResponse.data;

                // Format timestamps if necessary
                const formattedScannedBusiness = scannedBusinessData.map((business) => {
                    const scannedAtDate = new Date(
                        business.scannedAt._seconds * 1000 + business.scannedAt._nanoseconds / 1000000
                    );

                    return {
                        ...business,
                        scannedAt: scannedAtDate.toLocaleString(),  // Format to readable string
                    };
                });

                setScanBusiness(formattedScannedBusiness)

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
    const scannedBusiness = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "fullName", // Assuming the field for the name is `fullName`
            },
            {
                Header: "Email",
                accessor: "email", // The email field is `businessEmail`
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
                Header: "University",
                accessor: "university"
            },
            {
                Header: "Scanned At",
                accessor: "scannedAt", // Scanned At field (now formatted)
            },
        ],
        []
    );
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
                accessor: "scannedAt", // Scanned At field
                Cell: ({ value }) => {
                    // Format the scannedAt field (if it's a date object or a string)
                    const formattedDate = new Date(value).toLocaleString();
                    return formattedDate; // Return formatted date string
                },
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
            {/* Displaying Offers in a Card Layout */}
            <h2 className="text-xl font-bold mb-4">Business Offers</h2>
            {loadingOffers ? (
                <div>Loading offers...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.description}
                            className="bg-white p-6 rounded-lg shadow-lg"
                            style={{
                                border: "1px solid #e0e0e0",
                                transition: "transform 0.2s",
                            }}
                        >
                            <img
                                src={offer.imageUrl}
                                alt="Offer Image"
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">{offer.businessType}</h3>
                                <p className="text-gray-600">{offer.description}</p>
                                <p className="text-blue-500">{offer.discount}% off</p>

                                {/* Convert Firestore Timestamp to readable date */}
                                <p className="text-sm text-gray-400">
                                    {new Date(
                                        offer.createdAt._seconds * 1000 + offer.createdAt._nanoseconds / 1000000
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

            )}
            <h2 className="text-xl font-bold mb-4">Scanned Business</h2>

            {error && <div className="text-red-500">{error}</div>}

            {loadingUsers ? (
                <div>Loading business users...</div>
            ) : (
                <Table
                    columns={scannedBusiness}
                    data={scanBusiness}  // Pass the users data to the Table component
                    pageSize={5}
                    checkbox={false}
                />
            )}

        </div>
    );
};

export default Admin;
