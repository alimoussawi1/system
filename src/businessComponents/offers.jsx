// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PlacesAutocomplete, {
//     geocodeByAddress,
//     getLatLng,
// } from "react-places-autocomplete";

// // Function to load Google Maps JavaScript API dynamically
// const loadGoogleMapsScript = (callback) => {
//     const existingScript = document.getElementById("googleMaps");
//     if (!existingScript) {
//         const script = document.createElement("script");
//         script.src =
//             "https://maps.googleapis.com/maps/api/js?key=AIzaSyB17TAHLxsO7oNTeIsZPwhR0mfwSEaA0ZY&libraries=places";
//         script.id = "googleMaps";
//         document.body.appendChild(script);
//         script.onload = () => {
//             if (callback) callback();
//         };
//     } else if (callback) callback();
// };

// const Offers = () => {
//     const [offers, setOffers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     // New offer form state
//     const [newOffer, setNewOffer] = useState({
//         title: "",
//         discount: "",
//         description: "",
//         phoneNumber: "",
//         phoneNumber2: "",
//         websiteLink: "",
//         instagramLink: "",
//         imageFile: null, // File selected by the user
//         address: "",
//         latitude: "",
//         longitude: "",
//     });

//     // For controlling the typed address in the autocomplete input
//     const [typedAddress, setTypedAddress] = useState("");

//     // Total number of offers (scans)
//     const [totalOffers, setTotalOffers] = useState(0);

//     // Fetch offers from your backend API
//     const fetchData = async () => {
//         setLoading(true);
//         const userString = localStorage.getItem("user");
//         const user = userString ? JSON.parse(userString) : null;
//         const userId = user ? user.uid : null;
//         try {
//             const offersResponse = await axios.get("https://swb-backend.onrender.com/get_offers", {
//                 params: { userId },
//             });
//             setOffers(offersResponse.data);
//             setTotalOffers(offersResponse.data.length);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadGoogleMapsScript(() => {
//             // After Google Maps is loaded, fetch offers
//             fetchData();
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     // Modal handlers
//     const handleOpenModal = () => setShowModal(true);
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setNewOffer({
//             discount: "",
//             description: "",
//             phoneNumber: "",
//             phoneNumber2: "",
//             websiteLink: "",
//             instagramLink: "",
//             imageFile: null,
//             address: "",
//             latitude: "",
//             longitude: "",
//         });
//         setTypedAddress("");
//     };

//     // Input change for text fields
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewOffer((prev) => ({ ...prev, [name]: value }));
//     };

//     // File input change handler
//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setNewOffer((prev) => ({ ...prev, imageFile: e.target.files[0] }));
//         }
//     };

//     // Google Places Autocomplete handlers
//     const handleAddressChange = (address) => {
//         setTypedAddress(address);
//     };

//     const handleAddressSelect = async (address) => {
//         setTypedAddress(address);
//         try {
//             const results = await geocodeByAddress(address);
//             const latLng = await getLatLng(results[0]);
//             setNewOffer((prev) => ({
//                 ...prev,
//                 address,
//                 latitude: latLng.lat.toString(),
//                 longitude: latLng.lng.toString(),
//             }));
//         } catch (error) {
//             console.error("Error in handleAddressSelect:", error);
//         }
//     };

//     // Form submission handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const userString = localStorage.getItem("user");
//         const user = userString ? JSON.parse(userString) : null;
//         const userId = user ? user.uid : null;

//         try {
//             // Create a FormData object to send file and text fields
//             const formData = new FormData();
//             formData.append("title", newOffer.title)
//             formData.append("discount", newOffer.discount);
//             formData.append("description", newOffer.description);
//             formData.append("phoneNumber", newOffer.phoneNumber);
//             formData.append("phoneNumber2", newOffer.phoneNumber2);
//             formData.append("websiteLink", newOffer.websiteLink);
//             formData.append("instagramLink", newOffer.instagramLink);
//             formData.append("address", newOffer.address);
//             formData.append("latitude", newOffer.latitude);
//             formData.append("longitude", newOffer.longitude);
//             formData.append("businessId", userId);
//             if (newOffer.imageFile) {
//                 formData.append("imageFile", newOffer.imageFile);
//             }

//             await axios.post("https://swb-backend.onrender.com/create_offer", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             await fetchData();
//             handleCloseModal();
//         } catch (error) {
//             console.error("Error creating new offer:", error);
//         }
//     };

//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">Business Offers</h2>
//             <p className="text-sm text-gray-600 mb-4">Total Offers: {totalOffers}</p>
//             <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4"
//                 onClick={handleOpenModal}
//             >
//                 Add New Offer
//             </button>
//             {loading ? (
//                 <div>Loading offers...</div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {offers.map((offer, index) => (
//                         <div
//                             key={index}
//                             className="bg-white p-6 rounded-lg shadow-lg"
//                             style={{ border: "1px solid #e0e0e0", transition: "transform 0.2s" }}
//                         >
//                             {offer.imageUrl && (
//                                 <img
//                                     src={offer.imageUrl}
//                                     alt="Offer"
//                                     className="w-full h-48 object-cover rounded-t-lg"
//                                 />
//                             )}
//                             <div className="mt-4">
//                                 <p className="text-blue-500">Discount % : {offer.discount}% off</p>
//                                 <p className="text-purple-500">Offer Description: {offer.description}</p>
//                                 <p className="text-sm text-gray-600">Likes: {offer.likesCount}</p>
//                                 {offer.createdAt?._seconds && (
//                                     <p className="text-sm text-gray-400">
//                                         {new Date(
//                                             offer.createdAt._seconds * 1000 +
//                                             (offer.createdAt._nanoseconds || 0) / 1000000
//                                         ).toLocaleString()}
//                                     </p>
//                                 )}
//                                 <p
//                                     className={`text-sm font-semibold mt-2 ${offer.approved ? "text-green-500" : "text-red-500"
//                                         }`}
//                                 >
//                                     {offer.approved ? "Active" : "Inactive"}
//                                 </p>
//                                 {offer.location && offer.location.address && (
//                                     <p className="text-sm text-gray-600 mt-1">
//                                         Location: {offer.location.address}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Modal for adding new offer */}
//             {showModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//                     <div className="bg-white p-6 rounded-lg w-full max-w-lg relative min-h-[200px] max-h-[80vh] overflow-y-auto">

//                         <h3 className="text-xl font-bold mb-4">Add New Offer</h3>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={newOffer.title}
//                                     onChange={handleInputChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Discount (%)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="discount"
//                                     value={newOffer.discount}
//                                     onChange={handleInputChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Description
//                                 </label>
//                                 <textarea
//                                     name="description"
//                                     value={newOffer.description}
//                                     onChange={handleInputChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Phone Number 1
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="phoneNumber"
//                                     value={newOffer.phoneNumber}
//                                     onChange={handleInputChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Phone Number 2
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="phoneNumber2"
//                                     value={newOffer.phoneNumber2}
//                                     onChange={handleInputChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Website Link
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="websiteLink"
//                                     value={newOffer.websiteLink}
//                                     onChange={handleInputChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Instagram Link
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="instagramLink"
//                                     value={newOffer.instagramLink}
//                                     onChange={handleInputChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             {/* File input for image */}
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Image
//                                 </label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleFileChange}
//                                     className="border rounded px-3 py-2 w-full"
//                                 />
//                             </div>
//                             {/* Google Places Autocomplete for address */}
//                             <div>
//                                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                                     Address (Autocomplete)
//                                 </label>
//                                 <PlacesAutocomplete
//                                     value={typedAddress}
//                                     onChange={handleAddressChange}
//                                     onSelect={handleAddressSelect}
//                                 >
//                                     {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                                         <div>
//                                             <input
//                                                 {...getInputProps({
//                                                     placeholder: "Search Address ...",
//                                                     className: "border rounded px-3 py-2 w-full",
//                                                 })}
//                                             />
//                                             <div className="bg-white border border-gray-300 mt-1 rounded">
//                                                 {loading && <div className="p-2 text-sm">Loading...</div>}
//                                                 {suggestions.map((suggestion, idx) => {
//                                                     const className = suggestion.active
//                                                         ? "p-2 bg-gray-200 cursor-pointer"
//                                                         : "p-2 bg-white cursor-pointer";
//                                                     return (
//                                                         <div
//                                                             key={idx}
//                                                             {...getSuggestionItemProps(suggestion, { className })}
//                                                         >
//                                                             {suggestion.description}
//                                                         </div>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </PlacesAutocomplete>
//                             </div>

//                             {/* Form buttons */}
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     type="button"
//                                     onClick={handleCloseModal}
//                                     className="mr-3 px-4 py-2 rounded bg-gray-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-blue-600 text-white rounded"
//                                 >
//                                     Add Offer
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Offers;
import React, { useState, useEffect } from "react";
// We will remove axios since we won't call an external backend
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

// Import Firestore + Storage tools
import { auth, db, storage } from "../firebase"; // <-- Adjust import path as needed
import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

// Load Google Maps JavaScript API for the autocomplete widget
const loadGoogleMapsScript = (callback) => {
    const existingScript = document.getElementById("googleMaps");
    if (!existingScript) {
        const script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places";
        script.id = "googleMaps";
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    } else if (callback) callback();
};

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // New offer form state
    const [newOffer, setNewOffer] = useState({
        title: "",
        discount: "",
        description: "",
        phoneNumber: "",
        phoneNumber2: "",
        websiteLink: "",
        instagramLink: "",
        imageFile: null, // File selected by the user
        address: "",
        latitude: "",
        longitude: "",

    });

    // For the Google Places Autocomplete input
    const [typedAddress, setTypedAddress] = useState("");

    // 1) Collection reference
    const offersCollectionRef = collection(db, "offers");

    // Fetch offers from Firestore
    const fetchData = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(offersCollectionRef);
            // Convert docs to an array of objects
            const offersData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOffers(offersData);
        } catch (err) {
            console.error("Error fetching offers:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGoogleMapsScript(() => {
            fetchData();
        });
    }, []);
    useEffect(() => {
        const user = auth.currentUser;
        console.log("Logged-in user:", user);
    }, []);


    // Modal handlers
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setNewOffer({
            title: "",
            discount: "",
            description: "",
            phoneNumber: "",
            phoneNumber2: "",
            websiteLink: "",
            instagramLink: "",
            imageFile: null,
            address: "",
            latitude: "",
            longitude: "",
        });
        setTypedAddress("");
    };

    // Input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOffer((prev) => ({ ...prev, [name]: value }));
    };

    // File input change handler
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewOffer((prev) => ({ ...prev, imageFile: e.target.files[0] }));
        }
    };

    // Google Places Autocomplete handlers
    const handleAddressChange = (address) => {
        setTypedAddress(address);
    };

    const handleAddressSelect = async (address) => {
        setTypedAddress(address);
        try {
            const results = await geocodeByAddress(address);
            const latLng = await getLatLng(results[0]);
            setNewOffer((prev) => ({
                ...prev,
                address,
                latitude: latLng.lat.toString(),
                longitude: latLng.lng.toString(),
            }));
        } catch (error) {
            console.error("Error in handleAddressSelect:", error);
        }
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUser = auth.currentUser;

            // 1) Upload the file to Firebase Storage (if exists)
            let imageUrl = "";
            if (newOffer.imageFile) {
                const storageRef = ref(
                    storage,
                    `offers/${newOffer.imageFile.name}-${Date.now()}`
                );
                await uploadBytes(storageRef, newOffer.imageFile);
                // 2) Get the public download URL
                imageUrl = await getDownloadURL(storageRef);
            }

            // 3) Add a new doc to Firestore
            await addDoc(offersCollectionRef, {
                title: newOffer.title,
                discount: newOffer.discount,
                description: newOffer.description,
                phoneNumber: newOffer.phoneNumber,
                phoneNumber2: newOffer.phoneNumber2,
                websiteLink: newOffer.websiteLink,
                instagramLink: newOffer.instagramLink,
                address: newOffer.address,
                latitude: parseFloat(newOffer.latitude),
                longitude: parseFloat(newOffer.longitude),
                imageUrl: imageUrl,
                likesCount: 0,
                approved: false,
                createdAt: serverTimestamp(),
                addedBy: currentUser.uid,
                rank: 1, // Ensure this matches the app's expectations
            });



            // 4) Refresh offers from Firestore
            await fetchData();
            handleCloseModal();
        } catch (error) {
            console.error("Error creating new offer:", error);
        }
    };

    const totalOffers = offers.length;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Business Offers</h2>
            <p className="text-sm text-gray-600 mb-4">Total Offers: {totalOffers}</p>

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4"
                onClick={handleOpenModal}
            >
                Add New Offer
            </button>

            {loading ? (
                <div>Loading offers...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="bg-white p-6 rounded-lg shadow-lg"
                            style={{ border: "1px solid #e0e0e0", transition: "transform 0.2s" }}
                        >
                            {offer.imageUrl && (
                                <img
                                    src={offer.imageUrl}
                                    alt="Offer"
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            )}
                            <div className="mt-4">
                                <p className="text-blue-500">Discount % : {offer.discount}% off</p>
                                <p className="text-purple-500">
                                    Offer Description: {offer.description}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Likes: {offer.likesCount || 0}
                                </p>
                                {offer.createdAt && offer.createdAt.toDate && (
                                    <p className="text-sm text-gray-400">
                                        {offer.createdAt.toDate().toLocaleString()}
                                    </p>
                                )}
                                <p
                                    className={`text-sm font-semibold mt-2 ${offer.approved ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {offer.approved ? "Active" : "Inactive"}
                                </p>
                                {offer.address && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        Location: {offer.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for adding new offer */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg relative min-h-[200px] max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Add New Offer</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newOffer.title}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Discount (%)
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={newOffer.discount}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={newOffer.description}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Phone Number 1
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={newOffer.phoneNumber}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Phone Number 2
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber2"
                                    value={newOffer.phoneNumber2}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Website Link
                                </label>
                                <input
                                    type="text"
                                    name="websiteLink"
                                    value={newOffer.websiteLink}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Instagram Link
                                </label>
                                <input
                                    type="text"
                                    name="instagramLink"
                                    value={newOffer.instagramLink}
                                    onChange={handleInputChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            {/* File input for image */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                            {/* Google Places Autocomplete for address */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Address (Autocomplete)
                                </label>
                                <PlacesAutocomplete
                                    value={typedAddress}
                                    onChange={handleAddressChange}
                                    onSelect={handleAddressSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <input
                                                {...getInputProps({
                                                    placeholder: "Search Address ...",
                                                    className: "border rounded px-3 py-2 w-full",
                                                })}
                                            />
                                            <div className="bg-white border border-gray-300 mt-1 rounded">
                                                {loading && <div className="p-2 text-sm">Loading...</div>}
                                                {suggestions.map((suggestion, idx) => {
                                                    const className = suggestion.active
                                                        ? "p-2 bg-gray-200 cursor-pointer"
                                                        : "p-2 bg-white cursor-pointer";
                                                    return (
                                                        <div
                                                            key={idx}
                                                            {...getSuggestionItemProps(suggestion, { className })}
                                                        >
                                                            {suggestion.description}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>

                            {/* Form buttons */}
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="mr-3 px-4 py-2 rounded bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Add Offer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Offers;
