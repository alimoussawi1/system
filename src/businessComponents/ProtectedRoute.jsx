import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';

const ProtectedRoute = ({ children }) => {
    const { accountData, loading } = useAccount();

    // Wait for session restoration
    if (loading) {
        return <div>Loading...</div>; // Or a Spinner
    }

    // Not logged in
    if (!accountData || !accountData.token || !accountData.uid) {
        return <Navigate to="/login" />;
    }

    // ✅ Now it's safe to access token and uid
    return children;
};

export default ProtectedRoute;
