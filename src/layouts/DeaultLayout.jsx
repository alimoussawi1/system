// src/layouts/DefaultLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';


const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />

        </div>
    );
};

export default DefaultLayout;
