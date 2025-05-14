
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSignOutAlt } from 'react-icons/fa';
// import logo from "../assets/swblogo.png"
// const Sidebar = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/");
//     };

//     const isAdmin = localStorage.getItem("isAdmin") === "true";

//     const linkClasses =
//         "block px-4 py-2 rounded-lg transition duration-200 text-gray-700 hover:bg-[#5842aa] hover:text-white";

//     return (
//         <div className="w-64 h-full bg-white text-gray-800 fixed top-0 left-0 shadow-2xl z-50 py-6 px-4 flex flex-col">
//             <div className=' flex justify-center items-center w-[120px] h-[50px] mb-5'>
//                 <img src={logo} alt="logo" />
//             </div>
//             <ul className="space-y-2 w-full">
//                 <li>
//                     <Link to="/admin/dashboard" className={linkClasses}>
//                         Dashboard
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/scanned-customers" className={linkClasses}>
//                         Scanned Customers
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/packages" className={linkClasses}>
//                         Packages
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/payments" className={linkClasses}>
//                         Payments
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/contracts" className={linkClasses}>
//                         Contracts
//                     </Link>
//                 </li>
//                 {isAdmin && (
//                     <li>
//                         <Link to="/admin/access-center" className={linkClasses}>
//                             Access Center
//                         </Link>
//                     </li>
//                 )}
//                 {isAdmin && (
//                     <li>
//                         <Link to="/admin/business" className={linkClasses}>
//                             Businesses
//                         </Link>
//                     </li>
//                 )}
//                 <li>
//                     <button
//                         onClick={handleLogout}
//                         className="w-full mt-6 px-4 py-2 rounded-lg flex items-center text-gray-700 hover:bg-[#5842aa] hover:text-white transition duration-200"
//                     >
//                         <FaSignOutAlt className="mr-2" /> Logout
//                     </button>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/swblogo.png";
import { useAccount } from '../context/AccountContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { accountData, setAccountData } = useAccount();
    const { isAdmin } = accountData;

    const handleLogout = () => {
        setAccountData({
            uid: null,
            token: null,
            role: null,
            fullName: null,
            plan: null,
            isAdmin: null,
            access: null,
        });
        navigate("/");
    };

    const linkClasses =
        "block px-4 py-2 rounded-lg transition duration-200 text-gray-700 hover:bg-[#5842aa] hover:text-white";

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="relative">
            {/* Hamburger Button for Mobile View */}
            <button
                onClick={toggleSidebar}
                className="md:hidden text-gray-700 p-2 absolute top-4 left-4 z-50"
            >
                {isSidebarOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>

            {/* Sidebar */}
            <div
                className={`w-64 h-full bg-white text-gray-800 fixed top-0 left-0 shadow-2xl z-50 py-6 px-4 flex flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:w-64 md:block`}
            >
                <div className='flex justify-center items-center w-[120px] h-[50px] mb-5'>
                    <img src={logo} alt="logo" />
                </div>
                <ul className="space-y-2 w-full mt-10">
                    <li><Link to="/admin/dashboard" className={linkClasses}>Dashboard</Link></li>
                    <li><Link to="/admin/scanned-customers" className={linkClasses}>Scanned Customers</Link></li>
                    <li><Link to="/admin/packages" className={linkClasses}>Packages</Link></li>
                    <li><Link to="/admin/payments" className={linkClasses}>Payments</Link></li>
                    <li><Link to="/admin/contracts" className={linkClasses}>Contracts</Link></li>

                    {isAdmin && (
                        <>
                            <li><Link to="/admin/access-center" className={linkClasses}>Access Center</Link></li>
                            <li><Link to="/admin/business" className={linkClasses}>Businesses</Link></li>
                            <li><Link to="/admin/subscriptions" className={linkClasses}>Subscriptions</Link></li>
                        </>
                    )}

                    <li>
                        <button
                            onClick={handleLogout}
                            className="w-full mt-6 px-4 py-2 rounded-lg flex items-center text-gray-700 hover:bg-[#5842aa] hover:text-white transition duration-200"
                        >
                            <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
