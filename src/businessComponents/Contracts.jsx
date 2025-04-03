import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const ContractComponent = () => {
    const sigPad = useRef(null);

    const clearSignature = () => {
        if (sigPad.current) {
            sigPad.current.clear();
        }
    };

    const saveSignature = () => {
        if (sigPad.current) {
            const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
            // Use the signature data (e.g. send to an API or update state)
            console.log('Saved signature:', dataUrl);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Listing Contract</h1>
                <p className="text-gray-700">
                    Student with Benefits<br />
                    Beirut, Lebanon<br />
                    +961 70009879
                </p>
                <p className="text-gray-500 mt-2">Date: 14th March 2025</p>
            </div>

            <div className="mb-8 text-gray-800 overflow-y-auto max-h-96 border p-4 rounded whitespace-pre-wrap bg-gray-50">
                {`Page 1:

This Listing contract is entered into as of today between Ali el Moussaoui, founder & owner of Student with Benefits [referred to as SWB below] and the business: ___________________________

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

6.Termination 
This contract may be terminated by either party with 7 days prior notice to the other party.
Upon termination, all rights granted under this contract shall cease, and the business’s
oﬀers, logo and related info shall be removed from the SWB application.

7.Amendments 
Any amendments to this contract must be written and signed by both parties.

8.Governing Law
This contract shall be governed by and construed in accordance with the laws of the
Lebanese government without regard to its conflict of law principles.

9.Spread the word and information 
It is preferred that during the launch period, businesses engage in marke'ng ac'vi'es
that promote the listed oﬀer on SWB’s applica'on through on-ground ac'ons and, if
available, its social media plaRorms.

10.Payments and fees
Businesses can list their oﬀers on the SWB applica'on free of charge un'l Student with
Benefits decides otherwise.

If a specific fee is introduced in the future, businesses will be no'fied at least 2 weeks in
advance with details of the exact pricing.
At that point, businesses can choose to accept the new terms and con'nue using the
applica'on or not without paying any charges and depending on their view if SWB
applica'on benefited their business.
Addi'onally, op'onal features such as adver'sements, front-page lis'ngs, banner
lis'ngs, and algorithmic priority ensuring your business appears more prominently in
our search engine will have separate pricing.
This pricing will be shared monthly with each business, tailored according to factors
such as management, business size, number of branches, and other considera'ons.
Therefore, each business will have a customized pricing package.

11. Entire Contract 
This contract constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral, relating to such subject matter.

IN WITNESS WHEREOF, the parties hereto have executed this Digital Listing contract as of the date first above written.

StudentwithBenefits [SWB]                                              [Name of business here]:
Ali el Moussaoui                                                       [Name of business owner here]:
Date: _________________________ 
Signature:                                                             Signature:
`}
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Signature</h2>
                <div className="border border-gray-300 rounded mb-4">
                    <SignatureCanvas
                        ref={sigPad}
                        penColor="black"
                        canvasProps={{ className: 'w-full h-64' }}
                    />
                </div>
                <div className="flex space-x-4">
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
        </div>
    );
};

export default ContractComponent;
