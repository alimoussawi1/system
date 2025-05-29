import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';

const ProtectedRoute = ({ children }) => {
    const { accountData, loading } = useAccount();

    // Wait for session restoration
    if (loading) {
        return <div className="flex justify-center items-center mt-40">

            <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:0ms]" />
                <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:200ms]" />
                <div className="w-3 h-3 bg-[#10758B] rounded-full animate-ping [animation-delay:400ms]" />
            </div>


        </div>; // Or a Spinner
    }

    // Not logged in
    if (!accountData || !accountData.token || !accountData.uid) {
        return <Navigate to="/login" />;
    }

    // ✅ Now it's safe to access token and uid
    return children;
};

export default ProtectedRoute;
