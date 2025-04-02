import React from "react";

import apple from "../assets/appstore.webp";
import android from "../assets/playstore.webp";

const Success = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fafc] p-6 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-[#10758B] mb-4">Success!</h2>
                <p className="text-gray-700 mb-4">
                    Make sure to download the app on your staff's mobile to scan students' QR codes on their mobile.
                </p>
                <p className="text-gray-600 mb-6">Thank you for trusting the SWB app.</p>

                <div className="flex flex-row gap-4 items-center justify-center">
                    <a
                        href="https://apps.apple.com/lb/app/student-with-benefits/id6590629020"
                        className="inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={apple} alt="Download on App Store" className="w-[150px]" />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.alimoussawi.swb&pcampaignid=web_share"
                        className="inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={android} alt="Get it on Google Play" className="w-[150px]" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Success;
