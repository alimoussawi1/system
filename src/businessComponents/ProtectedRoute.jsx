import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    // If no user is logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
