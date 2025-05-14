import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';


const ProtectedRoute = ({ children }) => {
    const { accountData } = useAccount();
    const { token, uid } = accountData;

    if (!token || !uid) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
