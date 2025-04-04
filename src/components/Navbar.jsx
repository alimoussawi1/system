import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Swb from "../assets/swblogo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Food & Drinks");
  const [isBusinessAccount, setIsBusinessAccount] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ownerName, setOwnerName] = useState("")



  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmitBusiness = async () => {
    if (!businessEmail || !businessName || !password || !businessType) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        businessEmail,
        businessName,
        businessType,
        ownerName,
        password,
        isBusinessAccount: true,
      };

      const response = await axios.post("https://swb-backend.onrender.com/add_business_user", payload); // Update this to your real API

      if (response.status === 201) {
        alert("Business added successfully!");
        setShowModal(false);
        // Optionally reset fields here
      } else {
        alert("Failed to add business.");
      }
    } catch (error) {
      console.error("Error adding business:", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };





  return (
    <div className="bg-white shadow-md h-20 fixed top-0 w-full z-50">
      <div className="container mx-auto py-2 flex justify-between items-center w-[100%]">
        {/* Logo Section */}
        <div className="flex flex-row items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Swb} alt="Student With Benefits Logo" className="h-14 object-contain" />
            <p className="font-bold">SWB</p>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={`font-medium ${location.pathname === "/" ? "text-[#10758B]" : "text-gray-600"} hover:text-[#10758B]`}>Home</Link>
          <Link to="/partner" className={`font-medium ${location.pathname === "/partner" ? "text-[#10758B]" : "text-gray-600"} hover:text-[#10758B]`}>Become a Partner</Link>
          <Link to="/jobs" className={`font-medium ${location.pathname === "/jobs" ? "text-[#10758B]" : "text-gray-600"} hover:text-[#10758B]`}>Student Jobs</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex flex-row items-center">
          <div className="h-10 w-[1px] bg-gray-300"></div>

          {/* Pay Now Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#5842aa] text-white font-medium rounded-lg px-4 py-2 flex items-center cursor-pointer hover:bg-[#452d9a]"
          >
            Get Started
          </button>

          <div className="text-white rounded-lg px-4 py-2 flex items-center cursor-pointer">
            <Link to="/login" className="text-[#02afde] font-medium">Log in</Link>
          </div>

        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none mr-3" onClick={toggleMenu}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} w-64`}>
        <button className="text-gray-600 p-4 focus:outline-none " onClick={toggleMenu} >
          <svg className="w-6 h-6 " fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <nav className="flex flex-col p-4 space-y-4">
          <Link to="/" className={`font-medium ${location.pathname === "/" ? "text-[#10758B]" : "text-gray-600"} hover:text-[#10758B]`} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/partner" className={`font-medium ${location.pathname === "/partner" ? "text-[#10758B]" : "text-gray-600"} hover:text-[#10758B]`} onClick={() => setIsMenuOpen(false)}>Become a Partner</Link>
          <Link to="/jobs" className={`font-medium ${location.pathname === "/jobs" ? "text-[#10758B]" : "text-gray-600"} hover:text-[#10758B]`} onClick={() => setIsMenuOpen(false)}>Student Jobs</Link>
        </nav>
      </div>

      {/* Payment Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Payment Amount</h2>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handlePayment}
                className="bg-[#10758B] text-white px-4 py-2 rounded-lg hover:bg-[#0a5f73]"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Your Business Account</h2>

            <div className="mb-3">
              <label className="block font-medium text-sm mb-1">Business Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium text-sm mb-1">Owner Name</label>
              <input
                type="text"
                placeholder="Enter business owner name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-3">
              <label className="block font-medium text-sm mb-1">Business Name</label>
              <input
                type="text"
                placeholder="Ente business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium text-sm mb-1">Business Type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Business Type</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Sports & Activities">Sports & Activities</option>
                <option value="Nightlife">Nightlife</option>
                <option value="Tourism">Tourism</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block font-medium text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-5">
              <label className="block font-medium text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>


            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitBusiness}
                className="bg-[#10758B] text-white px-4 py-2 rounded-lg hover:bg-[#0a5f73]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Business"}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default Navbar;

