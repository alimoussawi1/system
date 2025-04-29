import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }


    return children;
};

export default ProtectedRoute;
