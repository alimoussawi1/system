// import axios from 'axios';
// import React, { useRef, useEffect, useState } from 'react';
// import SignatureCanvas from 'react-signature-canvas';
// import { getFirestore, collection, doc, query, where, getDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import Table from '../components/Tabel';
// import jsPDF from "jspdf";
// import logo from "../assets/swblogo.png"
// import { FaDownload, FaTrash } from 'react-icons/fa';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import { confirmAlert } from "react-confirm-alert";
// import { useAccount } from '../context/AccountContext';

// const handleDownload = async (business) => {
//     console.log(business)
//     const doc = new jsPDF("p", "pt", "a4");
//     const pageHeight = doc.internal.pageSize.height;
//     let currentY = 40;

//     // Load image helper
//     const loadImage = (src) => {
//         return new Promise((resolve) => {
//             const img = new Image();
//             img.crossOrigin = "Anonymous";
//             img.onload = () => resolve(img);
//             img.src = src;
//         });
//     };

//     const logoImg = await loadImage(logo);
//     doc.addImage(logoImg, "PNG", 40, currentY, 100, 80);
//     currentY += 100;

//     // Construct contract text
//     const contractText = `
// Listing Contract

// Student with Benefits
// Beirut, Lebanon
// +961 70009879
// Date: ${business.signatureTimestamp}

// This Listing contract is entered into as of the above date between Ali el Moussaoui (SWB) and the business: ${business.ownerName}.

// 1. Purpose 
// The purpose of this contract is to outline the terms and conditions under which the Business listed above agrees to list its offers, deals and discounts on the Student with Benefits mobile application.

// 2. Grant of Rights 
// The Business grants the SWB the right to:
// • List the Business’s logo, name, location, Instagram link, website link, offers and all related info about the business on the SWB mobile application.
// • Use the Business’s related info for promotional and marketing purposes related to the application only.

// 3. Duration of Listing 
// The Business acknowledges and agrees that:
// • The listing of offers on SWB application is set to a 1 month period, commencing on the date of listing and automatically renewed for 1 month without prior notice.
// • The listing may be renewed or extended upon mutual agreement between the two parties with a 1 week prior notice to the SWB application.

// 4. No Compensation 
// The Business agrees that:
// • SWB is not obligated to provide any form of compensation or payment to the Business for the listing of offers on the SWB application.
// • The Business will not seek any financial remuneration from Student with Benefits for the inclusion of its offers, logo and related info on the SWB application.

// 5. Release of Claims 
// The Business agrees to:
// • Release, indemnify, and hold harmless the SWB application, its affiliates, owners, directors, employees, and agents from and against all claims, demands, liabilities, damages, losses, costs, or expenses arising out of or related to the listing of offers and the use of the Business’s logo on the application.
// • Not initiate or participate in any legal action or claim against the SWB regarding the listing of offers or the use of the business’s logo and related info on the application and its social media platforms.

// 6. Termination 
// This contract may be terminated by either party with 7 days prior notice to the other party.
// Upon termination, all rights granted under this contract shall cease, and the business’s offers, logo and related info shall be removed from the SWB application.

// 7. Amendments 
// Any amendments to this contract must be written and signed by both parties.

// 8. Governing Law
// This contract shall be governed by and construed in accordance with the laws of the Lebanese government without regard to its conflict of law principles.

// 9. Spread the word and information 
// It is preferred that during the launch period, businesses engage in marketing activities that promote the listed offer on SWB’s application through on-ground actions and, if available, its social media platforms.

// 10. Payments and fees
// Businesses can list their offers on the SWB application free of charge until Student with Benefits decides otherwise.

// At that point, businesses can choose to accept the new terms and continue using the application or not without paying any charges and depending on their view if SWB application benefited their business.

// Additionally, optional features such as advertisements, front-page listings, banner listings, and algorithmic priority ensuring your business appears more prominently in our search engine will have separate pricing. This pricing will be shared monthly with each business, tailored according to factors such as management, business size, number of branches, and other considerations. Therefore, each business will have a customized pricing package.

// 11. Entire Contract 
// This contract constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.

// IN WITNESS WHEREOF, the parties hereto have executed this Digital Listing contract as of the date first above written.

// Signed on: ${business.signatureTimestamp}
//     `;

//     // Split text into lines
//     const lines = doc.splitTextToSize(contractText, 500);

//     for (let i = 0; i < lines.length; i++) {
//         if (currentY > pageHeight - 60) {
//             doc.addPage();
//             currentY = 40;
//         }
//         doc.text(lines[i], 40, currentY);
//         currentY += 20;
//     }

//     // Add signature at the end
//     if (business.signature) {
//         const signatureImg = await loadImage(business.signature);

//         // Add new page if not enough space
//         if (currentY > pageHeight - 100) {
//             doc.addPage();
//             currentY = 40;
//         }

//         doc.addImage(signatureImg, "PNG", 40, currentY + 20, 200, 80);
//     }

//     doc.save(`${business.businessName}_contract.pdf`);
// };


// const ContractComponent = () => {
//     const sigPad = useRef(null);
//     const [signature, setSignature] = useState(null);
//     const [signatureTimestamp, setSignatureTimestamp] = useState(null);
//     const [ownerName, setOwnerName] = useState("");
//     const [signedBusinesses, setSignedBusinesses] = useState([]);
//     const { accountData } = useAccount();
//     const { uid, isAdmin, fullName } = accountData;
//     const [loading, setLoading] = useState(false)
//     const handleDelete = async (business) => {

//         confirmAlert({
//             title: 'Terminate Contract',
//             message: `Are you sure you want to terminate the contract with "${business.businessName}"?`,
//             buttons: [
//                 {
//                     label: 'Yes',
//                     onClick: async () => {
//                         try {
//                             const db = getFirestore();
//                             const usersRef = collection(db, "users");

//                             // Look up the document by business name
//                             const q = query(usersRef, where("businessName", "==", business.businessName));
//                             const snapshot = await getDocs(q);

//                             if (snapshot.empty) {
//                                 toast.error("Business not found");
//                                 return;
//                             }

//                             const userDoc = snapshot.docs[0]; // Assuming unique businessName
//                             const userDocRef = userDoc.ref;

//                             await updateDoc(userDocRef, {
//                                 signature: "",
//                                 signatureTimestamp: null,
//                             });
//                             toast.success("Contract Terminated!");

//                             // Refresh list after deletion
//                             setSignedBusinesses(prev =>
//                                 prev.filter(b => b.businessName !== business.businessName)
//                             );


//                         } catch (error) {
//                             console.error("Error deleting contract:", error);
//                             toast.error("Failed to terminate contract!");

//                         }
//                     }
//                 },
//                 {
//                     label: 'No'
//                 }
//             ]
//         });
//     };
//     useEffect(() => {
//         setLoading(true)
//         const fetchSignature = async () => {

//             const db = getFirestore();
//             const auth = getAuth();
//             const user = auth.currentUser;

//             if (!user) return;

//             const userDocRef = doc(db, "users", user.uid);
//             const docSnap = await getDoc(userDocRef);

//             if (docSnap.exists()) {
//                 const data = docSnap.data();
//                 if (data.signature && data.signatureTimestamp) {
//                     setSignature(data.signature);
//                     setSignatureTimestamp(
//                         data.signatureTimestamp.toDate().toLocaleString()
//                     );
//                     localStorage.setItem("signature", data.signature);
//                     localStorage.setItem("signatureTimestamp", data.signatureTimestamp.toDate().toLocaleString());
//                 }
//                 if (data.ownerName) {
//                     setOwnerName(data.ownerName);
//                 }
//             }
//         };

//         const fetchSignedBusinesses = async () => {
//             if (!isAdmin) return;

//             const db = getFirestore();
//             const businessesRef = collection(db, "users");
//             const snapshot = await getDocs(businessesRef);

//             const businesses = snapshot.docs
//                 .map(doc => {
//                     const data = doc.data();
//                     const timestamp = data.signatureTimestamp ? data.signatureTimestamp.toDate() : null;

//                     return {
//                         businessName: data.businessName || "",
//                         ownerName: data.ownerName || "",
//                         signature: data.signature || "",
//                         signatureTimestamp: timestamp,
//                     };
//                 })
//                 .filter(business => business.signatureTimestamp)
//                 .sort((a, b) => b.signatureTimestamp - a.signatureTimestamp) // Sort latest first
//                 .map(business => ({
//                     ...business,
//                     signatureTimestamp: business.signatureTimestamp.toLocaleString()
//                 }));

//             setSignedBusinesses(businesses);
//         };


//         fetchSignature();
//         fetchSignedBusinesses();

//         setLoading(false)
//     }, [isAdmin]);

//     const clearSignature = () => {
//         if (sigPad.current) {
//             sigPad.current.clear();
//         }
//     };

//     const saveSignature = async () => {
//         if (!sigPad.current || sigPad.current.isEmpty()) return;

//         const canvas = sigPad.current.getCanvas();
//         const dataUrl = canvas.toDataURL("image/png");

//         const db = getFirestore();
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (!user) return;

//         const userDocRef = doc(db, "users", user.uid);

//         try {
//             await updateDoc(userDocRef, {
//                 signature: dataUrl,
//                 signatureTimestamp: serverTimestamp(),
//             });

//             const timestampString = new Date().toLocaleString();
//             setSignature(dataUrl);
//             setSignatureTimestamp(timestampString);
//             toast.success("You have successfully signed your contract!");
//             localStorage.setItem("signature", dataUrl);
//             localStorage.setItem("signatureTimestamp", timestampString);
//         } catch (error) {
//             console.error("Error saving signature:", error);
//         }
//     };

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-white shadow-md">
//             {!isAdmin && (
//                 <>


//                     <div className="mb-8">
//                         <h1 className="text-3xl font-bold mb-2">Listing Contract</h1>
//                         <p className="text-gray-700">
//                             Student with Benefits<br />
//                             Beirut, Lebanon<br />
//                             +961 70009879
//                         </p>
//                         <p className="text-gray-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
//                     </div>

//                     <div className="mb-8 text-gray-800  max-h-full border p-4 rounded whitespace-pre-wrap bg-gray-50">
//                         {`This Listing contract is entered into as of today between Ali el Moussaoui, Founder & Owner of Student With Benefits [referred to as SWB below] and ${fullName}'s owner: ${ownerName}.

// 1. Purpose 
// The purpose of this contract is to outline the terms and conditions under which the Business listed above agrees to list its offers, deals and discounts on the Student With Benefits mobile application.

// 2. Grant of Rights 
// The Business grants the SWB the right to:
// • List the Business’s logo, name, location, Instagram link, website link, offers and all related info about the business on the SWB mobile application.
// • Use the Business’s related info for promotional and marketing purposes related to the application only.

// 3. Duration of Listing 
// The Business acknowledges and agrees that:
// • The listing of offers on SWB application is set to a 12 months period, commencing on the date of listing and automatically renewed for 12 months without prior notice.


// 4. No Compensation 
// The Business agrees that:
// • SWB is not obligated to provide any form of compensation or payment to the Business for the listing of offers on the SWB application.
// • The Business will not seek any financial remuneration from Student With Benefits for the inclusion of its offers, logo and related info on the SWB application.

// 5. Release of Claims 
// The Business agrees to:
// • Release, indemnify, and hold harmless the SWB application, its affiliates, owners, directors, employees, and agents from and against all claims, demands, liabilities, damages, losses, costs, or expenses arising out of or related to the listing of offers and the use of the Business’s logo on the application.
// • Not initiate or participate in any legal action or claim against the SWB regarding the listing of offers or the use of the business’s logo and related info on the application and its social media platforms.

// 6. Termination 
// This contract may be terminated by either party with 7 days prior notice to the other party.
// Upon termination, all rights granted under this contract shall cease, and the business’s offers, logo and related info shall be removed from the SWB application.

// 7. Amendments 
// Any amendments to this contract must be written and signed by both parties.

// 8. Governing Law
// This contract shall be governed by and construed in accordance with the laws of the Lebanese government without regard to its conflict of law principles.

// 9. Spread the word and information 
// It is preferred that during the launch period, businesses engage in marketing activities that promote the listed offer on SWB’s application through on-ground actions and, if available, its social media platforms.

// 10. Payments and fees
// Businesses can list their offers on the SWB application free of charge until Student With Benefits decides otherwise.

// At that point, businesses can choose to accept the new terms and continue using the application or not without paying any charges and depending on their view if SWB application benefited their business.

// Additionally, optional features such as advertisements, front-page listings, push notifications, banner listings, and algorithmic priority ensuring your business appears more prominently in our search engine will have separate pricing. This pricing will be updated monthly with each business, tailored according to factors such as management, business size, number of branches, and other considerations. Therefore, each business will have a customized pricing package.

// 11. Entire Contract 
// This contract constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.

// IN WITNESS WHEREOF, the parties hereto have executed this Digital Listing contract as of the date first above written.`}
//                     </div>

//                     {/* Signature Section */}
//                     <div className="mb-8">
//                         <h2 className="text-2xl font-semibold mb-4">Signature</h2>

//                         {signature ? (
//                             <div>
//                                 <h3 className="font-semibold">Signed on: {signatureTimestamp}</h3>
//                                 <img src={signature} alt="Signature" className="w-full h-64 border" />
//                             </div>
//                         ) : (
//                             <>

//                                 <div className="border border-gray-300 rounded mb-4">
//                                     <SignatureCanvas
//                                         ref={sigPad}
//                                         penColor="black"
//                                         canvasProps={{ className: 'w-full h-64' }}
//                                     />

//                                 </div>
//                                 <div className="flex space-x-4 mt-4">
//                                     <button
//                                         onClick={clearSignature}
//                                         className="px-4 py-2 bg-[#02afde] text-white rounded-lg"
//                                     >
//                                         Clear
//                                     </button>
//                                     <button
//                                         onClick={saveSignature}
//                                         className="px-4 py-2 bg-[#5842aa] text-white rounded-lg hover:bg-[#452d9a]"
//                                     >
//                                         Save Signature
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </>
//             )

//             }

//             {/* Admin Signed Businesses Table */}
//             {isAdmin && (
//                 <div className="mb-8">
//                     <h2 className="text-2xl font-semibold mb-4">Businesses That Signed</h2>
//                     {
//                         loading ? (

//                             <div className="flex items-center justify-center gap-2 mt-4">
//                                 <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
//                                 <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
//                                 <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
//                             </div>

//                         ) :
//                             (
//                                 <Table
//                                     columns={[
//                                         {
//                                             Header: "Business Name",
//                                             accessor: "businessName"
//                                         },
//                                         {
//                                             Header: "Signed At",
//                                             accessor: "signatureTimestamp"
//                                         },
//                                         {
//                                             Header: () => <div className="text-center w-full">Actions</div>,
//                                             accessor: "download",
//                                             Cell: ({ row }) => (
//                                                 <div className="flex justify-center gap-4 items-center">
//                                                     <button
//                                                         onClick={() => handleDownload(row.original)}
//                                                         className="text-[#5842aa] hover:text-[#452d9a]"
//                                                         title="Download Contract"
//                                                     >
//                                                         <FaDownload />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDelete(row.original)}
//                                                         className="text-[#5842aa] hover:text-[#452d9a]"
//                                                         title="Delete Contract"
//                                                     >
//                                                         <FaTrash />
//                                                     </button>
//                                                 </div>
//                                             )
//                                         }


//                                     ]}
//                                     data={signedBusinesses}
//                                     pageSize={5}
//                                     checkbox={false}
//                                     totalPages={Math.ceil(signedBusinesses.length / 5)} // ✅ Add this line
//                                 />
//                             )
//                     }

//                 </div>
//             )}

//             <ToastContainer />
//         </div>
//     );
// };

// export default ContractComponent;
import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { getFirestore, collection, doc, query, where, getDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Table from '../components/Tabel';
import jsPDF from "jspdf";
import logo from "../assets/swblogo.png"
import { FaDownload, FaTrash, FaChevronDown, FaChevronUp, FaFileContract, FaHandshake, FaClock, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from "react-confirm-alert";
import { useAccount } from '../context/AccountContext';

const handleDownload = async (business) => {
    console.log(business)
    const doc = new jsPDF("p", "pt", "a4");
    const pageHeight = doc.internal.pageSize.height;
    let currentY = 40;

    // Load image helper
    const loadImage = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.src = src;
        });
    };

    const logoImg = await loadImage(logo);
    doc.addImage(logoImg, "PNG", 40, currentY, 100, 80);
    currentY += 100;

    // Construct contract text
    const contractText = `
Listing Contract

Student with Benefits
Beirut, Lebanon
+961 70009879
Date: ${business.signatureTimestamp}

This Listing contract is entered into as of the above date between Ali el Moussaoui (SWB) and the business: ${business.ownerName}.

1. Purpose 
The purpose of this contract is to outline the terms and conditions under which the Business listed above agrees to list its offers, deals and discounts on the Student with Benefits mobile application.

2. Grant of Rights 
The Business grants the SWB the right to:
• List the Business's logo, name, location, Instagram link, website link, offers and all related info about the business on the SWB mobile application.
• Use the Business's related info for promotional and marketing purposes related to the application only.

3. Duration of Listing 
The Business acknowledges and agrees that:
• The listing of offers on SWB application is set to a 1 month period, commencing on the date of listing and automatically renewed for 1 month without prior notice.
• The listing may be renewed or extended upon mutual agreement between the two parties with a 1 week prior notice to the SWB application.

4. No Compensation 
The Business agrees that:
• SWB is not obligated to provide any form of compensation or payment to the Business for the listing of offers on the SWB application.
• The Business will not seek any financial remuneration from Student with Benefits for the inclusion of its offers, logo and related info on the SWB application.

5. Release of Claims 
The Business agrees to:
• Release, indemnify, and hold harmless the SWB application, its affiliates, owners, directors, employees, and agents from and against all claims, demands, liabilities, damages, losses, costs, or expenses arising out of or related to the listing of offers and the use of the Business's logo on the application.
• Not initiate or participate in any legal action or claim against the SWB regarding the listing of offers or the use of the business's logo and related info on the application and its social media platforms.

6. Termination 
This contract may be terminated by either party with 7 days prior notice to the other party.
Upon termination, all rights granted under this contract shall cease, and the business's offers, logo and related info shall be removed from the SWB application.

7. Amendments 
Any amendments to this contract must be written and signed by both parties.

8. Governing Law
This contract shall be governed by and construed in accordance with the laws of the Lebanese government without regard to its conflict of law principles.

9. Spread the word and information 
It is preferred that during the launch period, businesses engage in marketing activities that promote the listed offer on SWB's application through on-ground actions and, if available, its social media platforms.

10. Payments and fees
Businesses can list their offers on the SWB application free of charge until Student with Benefits decides otherwise.

At that point, businesses can choose to accept the new terms and continue using the application or not without paying any charges and depending on their view if SWB application benefited their business.

Additionally, optional features such as advertisements, front-page listings, banner listings, and algorithmic priority ensuring your business appears more prominently in our search engine will have separate pricing. This pricing will be shared monthly with each business, tailored according to factors such as management, business size, number of branches, and other considerations. Therefore, each business will have a customized pricing package.

11. Entire Contract 
This contract constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.

IN WITNESS WHEREOF, the parties hereto have executed this Digital Listing contract as of the date first above written.

Signed on: ${business.signatureTimestamp}
    `;

    // Split text into lines
    const lines = doc.splitTextToSize(contractText, 500);

    for (let i = 0; i < lines.length; i++) {
        if (currentY > pageHeight - 60) {
            doc.addPage();
            currentY = 40;
        }
        doc.text(lines[i], 40, currentY);
        currentY += 20;
    }

    // Add signature at the end
    if (business.signature) {
        const signatureImg = await loadImage(business.signature);

        // Add new page if not enough space
        if (currentY > pageHeight - 100) {
            doc.addPage();
            currentY = 40;
        }

        doc.addImage(signatureImg, "PNG", 40, currentY + 20, 200, 80);
    }

    doc.save(`${business.businessName}_contract.pdf`);
};

const ContractSection = ({ title, icon, children, isExpanded, onToggle, highlight = false }) => {
    return (
        <div className={`mb-4 border rounded-lg overflow-hidden transition-all duration-300 ${highlight ? 'border-[#5842aa] shadow-lg' : 'border-gray-200 hover:border-gray-300'
            }`}>
            <button
                onClick={onToggle}
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200 ${highlight
                    ? 'bg-gradient-to-r from-[#5842aa] to-[#02afde] text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <span className={`text-lg ${highlight ? 'text-white' : 'text-[#5842aa]'}`}>
                        {icon}
                    </span>
                    <span className="font-semibold text-lg">{title}</span>
                </div>
                <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    <FaChevronDown />
                </span>
            </button>

            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                <div className="p-6 bg-white border-t border-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ContractComponent = () => {
    const sigPad = useRef(null);
    const [signature, setSignature] = useState(null);
    const [signatureTimestamp, setSignatureTimestamp] = useState(null);
    const [ownerName, setOwnerName] = useState("");
    const [signedBusinesses, setSignedBusinesses] = useState([]);
    const { accountData, showSuccessToast, showErrorToast } = useAccount();
    const { uid, isAdmin, fullName } = accountData;
    const [loading, setLoading] = useState(false);

    // State for expandable sections
    const [expandedSections, setExpandedSections] = useState({
        purpose: false,
        rights: false,
        duration: false,
        compensation: false,
        claims: false,
        termination: false,
        amendments: false,
        law: false,
        marketing: false,
        payments: false,
        entire: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleDelete = async (business) => {
        confirmAlert({
            title: 'Terminate Contract',
            message: `Are you sure you want to terminate the contract with "${business.businessName}"?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const db = getFirestore();
                            const usersRef = collection(db, "users");

                            // Look up the document by business name
                            const q = query(usersRef, where("businessName", "==", business.businessName));
                            const snapshot = await getDocs(q);

                            if (snapshot.empty) {

                                return;
                            }

                            const userDoc = snapshot.docs[0]; // Assuming unique businessName
                            const userDocRef = userDoc.ref;

                            await updateDoc(userDocRef, {
                                signature: "",
                                signatureTimestamp: null,
                            });
                            showSuccessToast('Contract Terminated!')


                            // Refresh list after deletion
                            setSignedBusinesses(prev =>
                                prev.filter(b => b.businessName !== business.businessName)
                            );

                        } catch (error) {
                            console.error("Error deleting contract:", error);
                            showErrorToast("Failed to terminate contract!");
                        }
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    useEffect(() => {
        setLoading(true)
        const fetchSignature = async () => {
            const db = getFirestore();
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) return;

            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.signature && data.signatureTimestamp) {
                    setSignature(data.signature);
                    setSignatureTimestamp(
                        data.signatureTimestamp.toDate().toLocaleString()
                    );
                    localStorage.setItem("signature", data.signature);
                    localStorage.setItem("signatureTimestamp", data.signatureTimestamp.toDate().toLocaleString());
                }
                if (data.ownerName) {
                    setOwnerName(data.ownerName);
                }
            }
        };

        const fetchSignedBusinesses = async () => {
            if (!isAdmin) return;

            const db = getFirestore();
            const businessesRef = collection(db, "users");
            const snapshot = await getDocs(businessesRef);

            const businesses = snapshot.docs
                .map(doc => {
                    const data = doc.data();
                    const timestamp = data.signatureTimestamp ? data.signatureTimestamp.toDate() : null;

                    return {
                        businessName: data.businessName || "",
                        ownerName: data.ownerName || "",
                        signature: data.signature || "",
                        signatureTimestamp: timestamp,
                    };
                })
                .filter(business => business.signatureTimestamp)
                .sort((a, b) => b.signatureTimestamp - a.signatureTimestamp) // Sort latest first
                .map(business => ({
                    ...business,
                    signatureTimestamp: business.signatureTimestamp.toLocaleString()
                }));

            setSignedBusinesses(businesses);
        };

        fetchSignature();
        fetchSignedBusinesses();
        setLoading(false)
    }, [isAdmin]);

    const clearSignature = () => {
        if (sigPad.current) {
            sigPad.current.clear();
        }
    };

    const saveSignature = async () => {
        if (!sigPad.current || sigPad.current.isEmpty()) return;

        const canvas = sigPad.current.getCanvas();
        const dataUrl = canvas.toDataURL("image/png");

        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);

        try {
            await updateDoc(userDocRef, {
                signature: dataUrl,
                signatureTimestamp: serverTimestamp(),
            });

            const timestampString = new Date().toLocaleString();
            setSignature(dataUrl);
            setSignatureTimestamp(timestampString);
            showSuccessToast("You have successfully signed your contract!")


            localStorage.setItem("signature", dataUrl);
            localStorage.setItem("signatureTimestamp", timestampString);
        } catch (error) {
            console.error("Error saving signature:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md">
            {!isAdmin && (
                <>
                    {/* Header Section */}
                    <div className="mb-8 bg-gradient-to-r from-[#5842aa] to-[#02afde] text-white p-8 rounded-xl shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <FaFileContract className="text-4xl" />
                            <div>
                                <h1 className="text-4xl font-bold">Digital Listing Contract</h1>
                                <p className="text-blue-100 text-lg">Student With Benefits Partnership Agreement</p>
                            </div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                            <p className="text-white/90">
                                <strong>Student with Benefits</strong><br />
                                Beirut, Lebanon<br />
                                +961 70009879
                            </p>
                            <p className="text-white/80 mt-2">Contract Date: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Contract Introduction */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-4">
                            <FaHandshake className="text-3xl text-[#5842aa] mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Contract Agreement</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    This Listing contract is entered into between <strong>Ali el Moussaoui</strong>,
                                    Founder & Owner of Student With Benefits [referred to as SWB below] and
                                    <strong className="text-[#5842aa]">{fullName}</strong>'s owner:
                                    <strong className="text-[#02afde]">{ownerName}</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contract Sections */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FaFileContract className="text-[#5842aa]" />
                            Contract Terms & Conditions
                        </h2>

                        <div className="space-y-4">
                            <ContractSection
                                title="1. Purpose"
                                icon={<FaFileContract />}
                                isExpanded={expandedSections.purpose}
                                onToggle={() => toggleSection('purpose')}
                                highlight={true}
                            >
                                <p className="text-gray-700 leading-relaxed">
                                    The purpose of this contract is to outline the terms and conditions under which the Business
                                    listed above agrees to list its offers, deals and discounts on the Student With Benefits mobile application.
                                </p>
                            </ContractSection>

                            <ContractSection
                                title="2. Grant of Rights"
                                icon={<FaShieldAlt />}
                                isExpanded={expandedSections.rights}
                                onToggle={() => toggleSection('rights')}
                            >
                                <div className="text-gray-700">
                                    <p className="mb-3 font-semibold">The Business grants SWB the right to:</p>
                                    <ul className="space-y-2 list-disc list-inside pl-4">
                                        <li>List the Business's logo, name, location, Instagram link, website link, offers and all related info on the SWB mobile application</li>
                                        <li>Use the Business's related info for promotional and marketing purposes related to the application only</li>
                                    </ul>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="3. Duration of Listing"
                                icon={<FaClock />}
                                isExpanded={expandedSections.duration}
                                onToggle={() => toggleSection('duration')}
                            >
                                <div className="text-gray-700">
                                    <p className="mb-3 font-semibold">The Business acknowledges and agrees that:</p>
                                    <ul className="space-y-2 list-disc list-inside pl-4">
                                        <li>The listing of offers on SWB application is set to a <strong className="text-[#5842aa]">12 months period</strong>, commencing on the date of listing and automatically renewed for 12 months without prior notice</li>
                                    </ul>
                                </div>
                            </ContractSection>

                            {/* Additional sections following the same pattern */}
                            <ContractSection
                                title="4. No Compensation"
                                icon={<FaFileContract />}
                                isExpanded={expandedSections.compensation}
                                onToggle={() => toggleSection('compensation')}
                            >
                                <div className="text-gray-700">
                                    <p className="mb-3 font-semibold">The Business agrees that:</p>
                                    <ul className="space-y-2 list-disc list-inside pl-4">
                                        <li>SWB is not obligated to provide any form of compensation or payment to the Business for the listing of offers on the SWB application</li>
                                        <li>The Business will not seek any financial remuneration from Student With Benefits for the inclusion of its offers, logo and related info on the SWB application</li>
                                    </ul>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="5. Release of Claims"
                                icon={<FaShieldAlt />}
                                isExpanded={expandedSections.claims}
                                onToggle={() => toggleSection('claims')}
                            >
                                <div className="text-gray-700">
                                    <p className="mb-3 font-semibold">The Business agrees to:</p>
                                    <ul className="space-y-2 list-disc list-inside pl-4">
                                        <li>Release, indemnify, and hold harmless the SWB application, its affiliates, owners, directors, employees, and agents from and against all claims, demands, liabilities, damages, losses, costs, or expenses arising out of or related to the listing of offers and the use of the Business's logo on the application</li>
                                        <li>Not initiate or participate in any legal action or claim against the SWB regarding the listing of offers or the use of the business's logo and related info on the application and its social media platforms</li>
                                    </ul>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="6. Termination"
                                icon={<FaTrash />}
                                isExpanded={expandedSections.termination}
                                onToggle={() => toggleSection('termination')}
                            >
                                <div className="text-gray-700 space-y-3">
                                    <p>
                                        This contract may be terminated by either party with <strong className="text-red-600">7 days prior notice</strong> to the other party.
                                    </p>
                                    <p>
                                        Upon termination, all rights granted under this contract shall cease, and the business's offers, logo and related info shall be removed from the SWB application.
                                    </p>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="7. Amendments"
                                icon={<FaFileContract />}
                                isExpanded={expandedSections.amendments}
                                onToggle={() => toggleSection('amendments')}
                            >
                                <div className="text-gray-700">
                                    <p>
                                        Any amendments to this contract must be <strong>written and signed by both parties</strong>.
                                    </p>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="8. Governing Law"
                                icon={<FaShieldAlt />}
                                isExpanded={expandedSections.law}
                                onToggle={() => toggleSection('law')}
                            >
                                <div className="text-gray-700">
                                    <p>
                                        This contract shall be governed by and construed in accordance with the laws of the
                                        <strong className="text-[#5842aa]"> Lebanese government</strong> without regard to its conflict of law principles.
                                    </p>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="9. Spread the Word and Information"
                                icon={<FaHandshake />}
                                isExpanded={expandedSections.marketing}
                                onToggle={() => toggleSection('marketing')}
                            >
                                <div className="text-gray-700">
                                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                        <p className="text-green-800">
                                            <strong>Recommended:</strong> During the launch period, businesses are encouraged to engage in marketing activities
                                            that promote the listed offer on SWB's application through on-ground actions and, if available,
                                            social media platforms.
                                        </p>
                                    </div>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="10. Payments and Fees"
                                icon={<FaFileContract />}
                                isExpanded={expandedSections.payments}
                                onToggle={() => toggleSection('payments')}
                            >
                                <div className="text-gray-700 space-y-4">
                                    <p>
                                        Businesses can list their offers on the SWB application <strong className="text-green-600">free of charge</strong> until Student With Benefits decides otherwise.
                                    </p>
                                    <p>
                                        At that point, businesses can choose to accept the new terms and continue using the application or not without paying any charges and depending on their view if SWB application benefited their business.
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                        <p className="font-semibold text-blue-800 mb-2">Optional Premium Features:</p>
                                        <p className="text-blue-700">
                                            Additional features such as advertisements, front-page listings, push notifications, banner listings,
                                            and algorithmic priority will have separate pricing. This pricing will be updated monthly with each business,
                                            tailored according to factors such as management, business size, number of branches, and other considerations.
                                        </p>
                                    </div>
                                </div>
                            </ContractSection>

                            <ContractSection
                                title="11. Entire Contract"
                                icon={<FaFileContract />}
                                isExpanded={expandedSections.entire}
                                onToggle={() => toggleSection('entire')}
                                highlight={true}
                            >
                                <div className="text-gray-700">
                                    <p>
                                        This contract constitutes the <strong>entire agreement</strong> between the parties with respect to the subject matter hereof
                                        and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.
                                    </p>
                                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-purple-800 font-semibold">
                                            IN WITNESS WHEREOF, the parties hereto have executed this Digital Listing contract as of the date first above written.
                                        </p>
                                    </div>
                                </div>
                            </ContractSection>

                            {/* Quick access to other important sections */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-yellow-800 text-sm">
                                    <strong>Note:</strong> This contract includes additional terms covering Release of Claims, Termination (7 days notice),
                                    Amendments, Governing Law (Lebanese jurisdiction), and Marketing cooperation.
                                    Click on each section above to view the complete terms.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Signature Section */}
                    <div className="mb-8 bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                            <FaHandshake className="text-[#5842aa]" />
                            Digital Signature
                        </h2>

                        {signature ? (
                            <div className="bg-white p-6 rounded-lg border border-green-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <h3 className="font-semibold text-green-700">Contract Signed Successfully</h3>
                                </div>
                                <p className="text-gray-600 mb-4">Signed on: <strong>{signatureTimestamp}</strong></p>
                                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <img src={signature} alt="Signature" className="max-w-full h-32 object-contain" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-600 mb-4">
                                    Please sign below to agree to the terms and conditions of this contract:
                                </p>
                                <div className="bg-white border-2 border-gray-300 rounded-lg mb-4 overflow-hidden">
                                    <SignatureCanvas
                                        ref={sigPad}
                                        penColor="black"
                                        canvasProps={{
                                            className: 'w-full h-64',
                                            style: { background: 'white' }
                                        }}
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={clearSignature}
                                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <FaTrash />
                                        Clear Signature
                                    </button>
                                    <button
                                        onClick={saveSignature}
                                        className="px-6 py-3 bg-gradient-to-r from-[#5842aa] to-[#02afde] text-white rounded-lg hover:from-[#452d9a] hover:to-[#0299c7] transition-all duration-200 flex items-center gap-2 font-semibold"
                                    >
                                        <FaHandshake />
                                        Sign Contract
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

            {/* Admin Signed Businesses Table */}
            {isAdmin && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                        <FaFileContract className="text-[#5842aa]" />
                        Signed Contracts
                    </h2>
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
                            <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
                            <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
                        </div>
                    ) : (
                        <Table
                            columns={[
                                {
                                    Header: "Business Name",
                                    accessor: "businessName"
                                },
                                {
                                    Header: "Signed At",
                                    accessor: "signatureTimestamp"
                                },
                                {
                                    Header: () => <div className="text-center w-full">Actions</div>,
                                    accessor: "download",
                                    Cell: ({ row }) => (
                                        <div className="flex justify-center gap-4 items-center">
                                            <button
                                                onClick={() => handleDownload(row.original)}
                                                className="text-[#5842aa] hover:text-[#452d9a] transition-colors"
                                                title="Download Contract"
                                            >
                                                <FaDownload />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row.original)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                title="Terminate Contract"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )
                                }
                            ]}
                            data={signedBusinesses}
                            pageSize={5}
                            checkbox={false}
                            totalPages={Math.ceil(signedBusinesses.length / 5)}
                        />
                    )}
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ContractComponent;