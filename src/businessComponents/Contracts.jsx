import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { getFirestore, collection, doc, getDoc, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ContractComponent = () => {
    const sigPad = useRef(null);
    const [signature, setSignature] = useState(null);
    const [signatureTimestamp, setSignatureTimestamp] = useState(null);
    const [ownerName, setOwnerName] = useState("");
    const [signedBusinesses, setSignedBusinesses] = useState([]);
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    useEffect(() => {
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
                .map(doc => ({
                    businessName: doc.data().businessName || "",
                    signatureTimestamp: doc.data().signatureTimestamp ? doc.data().signatureTimestamp.toDate() : null,
                }))
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
            localStorage.setItem("signature", dataUrl);
            localStorage.setItem("signatureTimestamp", timestampString);
        } catch (error) {
            console.error("Error saving signature:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md">
            {!isAdmin && (
                <>


                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Listing Contract</h1>
                        <p className="text-gray-700">
                            Student with Benefits<br />
                            Beirut, Lebanon<br />
                            +961 70009879
                        </p>
                        <p className="text-gray-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="mb-8 text-gray-800 overflow-y-auto max-h-96 border p-4 rounded whitespace-pre-wrap bg-gray-50">
                        {`This Listing contract is entered into as of today between Ali el Moussaoui, founder & owner of Student with Benefits [referred to as SWB below] and the business: ${ownerName}.
                
1. Purpose 
The purpose of this contract is to outline the terms and conditions under which the Business listed above agrees to list its offers, deals and discounts on the Student with Benefits mobile application.

2. Grant of Rights 
The Business grants the SWB the right to:
• List the Business’s logo, name, location, Instagram link, website link, offers and all related info about the business on the SWB mobile application.
• Use the Business’s related info for promotional and marketing purposes related to the application only.

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
• Release, indemnify, and hold harmless the SWB application, its affiliates, owners, directors, employees, and agents from and against all claims, demands, liabilities, damages, losses, costs, or expenses arising out of or related to the listing of offers and the use of the Business’s logo on the application.
• Not initiate or participate in any legal action or claim against the SWB regarding the listing of offers or the use of the business’s logo and related info on the application and its social media platforms.

6. Termination 
This contract may be terminated by either party with 7 days prior notice to the other party.
Upon termination, all rights granted under this contract shall cease, and the business’s offers, logo and related info shall be removed from the SWB application.

7. Amendments 
Any amendments to this contract must be written and signed by both parties.

8. Governing Law
This contract shall be governed by and construed in accordance with the laws of the Lebanese government without regard to its conflict of law principles.

9. Spread the word and information 
It is preferred that during the launch period, businesses engage in marketing activities that promote the listed offer on SWB’s application through on-ground actions and, if available, its social media platforms.

10. Payments and fees
Businesses can list their offers on the SWB application free of charge until Student with Benefits decides otherwise.

At that point, businesses can choose to accept the new terms and continue using the application or not without paying any charges and depending on their view if SWB application benefited their business.

Additionally, optional features such as advertisements, front-page listings, banner listings, and algorithmic priority ensuring your business appears more prominently in our search engine will have separate pricing. This pricing will be shared monthly with each business, tailored according to factors such as management, business size, number of branches, and other considerations. Therefore, each business will have a customized pricing package.

11. Entire Contract 
This contract constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.

IN WITNESS WHEREOF, the parties hereto have executed this Digital Listing contract as of the date first above written.`}
                    </div>

                    {/* Signature Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Signature</h2>

                        {signature ? (
                            <div>
                                <h3 className="font-semibold">Signed on: {signatureTimestamp}</h3>
                                <img src={signature} alt="Signature" className="w-full h-64 border" />
                            </div>
                        ) : (
                            <div className="border border-gray-300 rounded mb-4">
                                <SignatureCanvas
                                    ref={sigPad}
                                    penColor="black"
                                    canvasProps={{ className: 'w-full h-64' }}
                                />
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        onClick={clearSignature}
                                        className="px-4 py-2 bg-red-500 text-white rounded"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={saveSignature}
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Save Signature
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )

            }

            {/* Admin Signed Businesses Table */}
            {isAdmin && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Businesses That Signed</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-2 px-4 border-b">Business Name</th>
                                    <th className="py-2 px-4 border-b">Signed At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {signedBusinesses.map((business, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">{business.businessName}</td>
                                        <td className="py-2 px-4 border-b">{business.signatureTimestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContractComponent;
