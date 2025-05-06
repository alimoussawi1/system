// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSignOutAlt } from 'react-icons/fa';

// const Sidebar = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.clear(); // Clear all data
//         navigate("/");        // Redirect to homepage
//     };
//     const isAdmin = localStorage.getItem("isAdmin") === "true";

//     return (
//         <div className="w-64 h-full bg-[#5842aa] text-white fixed top-0 left-0 flex flex-col items-start py-5 px-3">
//             <h2 className="text-xl font-bold text-center mb-8">Business Dashboard</h2>
//             <ul className="space-y-4 w-full">
//                 <li>
//                     <Link to="/admin/dashboard" className="text-white hover:text-gray-400">
//                         Dashboard
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/scanned-customers" className="text-white hover:text-gray-400">
//                         Scanned Customers
//                     </Link>
//                 </li>
//                 {/* <li>
//                     <Link to="/admin/offers" className="text-white hover:text-gray-400">
//                         Offers
//                     </Link>
//                 </li> */}
//                 <li>
//                     <Link to="/admin/packages" className="text-white hover:text-gray-400">
//                         Packages
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/payments" className="text-white hover:text-gray-400">
//                         Payments
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/contracts" className="text-white hover:text-gray-400">
//                         Contracts
//                     </Link>
//                 </li>
//                 {
//                     isAdmin && (
//                         <li>
//                             <Link to="/admin/access-center" className="text-white hover:text-gray-400">
//                                 Access Center
//                             </Link>
//                         </li>

//                     )
//                 }
//                 {/* <li>
//                     <Link to="/admin/chat" className="text-white hover:text-gray-400">
//                         Chat
//                     </Link>
//                 </li> */}
//                 <li>
//                     <button
//                         onClick={handleLogout}
//                         className="w-full mt-5 flex items-center justify-start text-white hover:text-gray-400"
//                     >
//                         <FaSignOutAlt className="mr-2" /> Logout
//                     </button>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Sidebar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from "../assets/swblogo.png"
const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const linkClasses =
        "block px-4 py-2 rounded-lg transition duration-200 text-gray-700 hover:bg-[#5842aa] hover:text-white";

    return (
        <div className="w-64 h-full bg-white text-gray-800 fixed top-0 left-0 shadow-2xl z-50 py-6 px-4 flex flex-col">
            <div className=' flex justify-center items-center w-[120px] h-[50px] mb-5'>
                <img src={logo} alt="logo" />
            </div>
            <ul className="space-y-2 w-full">
                <li>
                    <Link to="/admin/dashboard" className={linkClasses}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/scanned-customers" className={linkClasses}>
                        Scanned Customers
                    </Link>
                </li>
                <li>
                    <Link to="/admin/packages" className={linkClasses}>
                        Packages
                    </Link>
                </li>
                <li>
                    <Link to="/admin/payments" className={linkClasses}>
                        Payments
                    </Link>
                </li>
                <li>
                    <Link to="/admin/contracts" className={linkClasses}>
                        Contracts
                    </Link>
                </li>
                {isAdmin && (
                    <li>
                        <Link to="/admin/access-center" className={linkClasses}>
                            Access Center
                        </Link>
                    </li>
                )}
                {isAdmin && (
                    <li>
                        <Link to="/admin/business" className={linkClasses}>
                            Businesses
                        </Link>
                    </li>
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
    );
};

export default Sidebar;
