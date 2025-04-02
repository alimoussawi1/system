import React from "react";

const PaymentFailed = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#fef2f2] p-6 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-red-300">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Unsuccessful</h2>
                <p className="text-gray-700 mb-4">
                    Please try again to get going.
                </p>
                <p className="text-gray-600 mb-6">
                    For any inquiries, contact us on <strong>70009879</strong> or email us at<br />
                    <a
                        href="mailto:studentwithbenefits@gmail.com"
                        className="text-[#10758B] underline"
                    >
                        studentwithbenefits@gmail.com
                    </a>
                </p>
                {/* <button
                    onClick={() => window.location.href = "/admin/packages"}
                    className="bg-[#5842aa] hover:bg-[#452d9a] text-white font-medium px-6 py-2 rounded-lg transition"
                >
                    Try Again
                </button> */}
            </div>
        </div>
    );
};

export default PaymentFailed;
