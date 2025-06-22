// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
// import logo from "../assets/swblogo.png";
// import { useAccount } from '../context/AccountContext';
// import { auth } from '../firebase';

// const Sidebar = () => {
//     const navigate = useNavigate();
//     const { accountData, setAccountData } = useAccount();
//     const { isAdmin } = accountData || {};

//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//     const handleLogout = () => {
//         localStorage.removeItem("accountSession");
//         setAccountData(null);
//         auth.signOut();
//         navigate("/login");
//     };

//     const linkClasses =
//         "block px-4 py-2 rounded-lg transition duration-200 text-gray-700 hover:bg-[#5842aa] hover:text-white";

//     return (
//         <div className="relative">
//             {/* Hamburger Button for Mobile */}
//             <button
//                 onClick={toggleSidebar}
//                 className="md:hidden text-gray-700 p-2 absolute top-4 right-4 z-50"
//             >
//                 {isSidebarOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
//             </button>

//             {/* Sidebar container */}
//             <div
//                 className={`
//     w-64 h-full bg-white text-gray-800 fixed top-0 
//     z-40 py-6 px-4 flex flex-col transition-transform transform
//     md:left-0 md:right-auto
//     ${isSidebarOpen ? 'translate-x-0 right-0' : 'translate-x-full right-0'}
//     md:translate-x-0 md:flex
//   `}
//             >


//                 <div className="flex justify-start items-center w-full h-[50px] mb-5">
//                     <img src={logo} alt="logo" className="w-[120px]" />
//                 </div>

//                 <ul className="space-y-2 w-full mt-10 text-left">
//                     <li><Link to="/admin/dashboard" className={linkClasses}>Dashboard</Link></li>
//                     <li><Link to="/admin/scanned-customers" className={linkClasses}>Scanned Customers</Link></li>
//                     <li><Link to="/admin/packages" className={linkClasses}>Packages</Link></li>
//                     <li><Link to="/admin/payments" className={linkClasses}>Payments</Link></li>
//                     <li><Link to="/admin/contracts" className={linkClasses}>Contracts</Link></li>

//                     {isAdmin && (
//                         <>
//                             <li><Link to="/admin/business" className={linkClasses}>Businesses</Link></li>
//                             <li><Link to="/admin/subscriptions" className={linkClasses}>Subscriptions</Link></li>
//                         </>
//                     )}

//                     <li>
//                         <button
//                             onClick={handleLogout}
//                             className="w-full mt-6 px-4 py-2 rounded-lg flex items-center justify-start text-gray-700 hover:bg-[#5842aa] hover:text-white transition duration-200"
//                         >
//                             <FaSignOutAlt className="mr-2" /> Logout
//                         </button>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes, FaTachometerAlt, FaUsers, FaBox, FaCreditCard, FaFileContract, FaBuilding, FaSubscript } from 'react-icons/fa';
import logo from "../assets/swblogo.png";
import { useAccount } from '../context/AccountContext';
import { auth } from '../firebase';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { accountData, setAccountData } = useAccount();
    const { isAdmin } = accountData || {};

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        localStorage.removeItem("accountSession");
        setAccountData(null);
        auth.signOut();
        navigate("/login");
    };

    const menuItems = [
        { path: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
        { path: "/admin/scanned-customers", label: "Scanned Customers", icon: FaUsers },
        { path: "/admin/packages", label: "Packages", icon: FaBox },
        { path: "/admin/payments", label: "Payments", icon: FaCreditCard },
        { path: "/admin/contracts", label: "Contracts", icon: FaFileContract },
        ...(isAdmin ? [
            { path: "/admin/business", label: "Businesses", icon: FaBuilding },
            { path: "/admin/subscriptions", label: "Subscriptions", icon: FaSubscript }
        ] : [])
    ];

    const isActiveLink = (path) => location.pathname === path;

    return (
        <div className="relative">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden backdrop-blur-sm"
                    onClick={toggleSidebar}
                />
            )}

            {/* Hamburger Button for Mobile */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-xl shadow-lg p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 border border-gray-100"
            >
                {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar container */}
            <div
                className={`
                    fixed top-0 left-0 w-65 h-full bg-white
                    z-40 transition-all duration-300 ease-in-out transform shadow-xl border-r border-gray-100
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                `}
            >
                {/* Header with gradient background */}
                <div className="relative p-6">
                    <div className="flex items-center justify-center">
                        <div className="rounded-2xl p-4">
                            <img src={logo} alt="logo" className="w-[140px] h-auto" />
                        </div>
                    </div>
                    {/* Decorative circles */}

                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 ">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveLink(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    group flex items-center px-4 py-3.5 rounded-2xl text-sm font-medium
                                    transition-all duration-300 ease-out relative overflow-hidden
                                    ${isActive
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200/50 transform translate-x-1'
                                        : 'text-gray-600 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
                                    }
                                `}
                            >
                                <div className={`
                                    flex items-center justify-center w-11 h-11 rounded-xl mr-4
                                    ${isActive
                                        ? 'bg-white/20 shadow-sm'
                                        : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'
                                    }
                                    transition-all duration-300
                                `}>
                                    <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-indigo-500'} />
                                </div>
                                <span className="truncate font-medium">{item.label}</span>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                                )}

                                {/* Subtle hover glow */}
                                {!isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300 rounded-2xl"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>


                {/* Logout Button */}
                <div className="p-4 border-t border-gray-100 mb-10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-medium
                                 text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200
                                 hover:border-red-200 transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl mr-4 
                                      bg-gray-100 group-hover:bg-red-100 transition-all duration-300">
                            <FaSignOutAlt size={18} className="text-gray-500 group-hover:text-red-500" />
                        </div>
                        <span>Sign Out</span>
                    </button>
                </div>

                {/* Bottom decorative element */}

            </div>
        </div>
    );
};

export default Sidebar;