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

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to initiate payment and open Whish W2W page
  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/initiate_payment", {
        amount: parseFloat(amount),
        currency: "USD"
      });

      console.log("Payment Response:", response.data); // Debugging log

      if (response.data.payment_url) {
        window.open(response.data.payment_url, "_blank"); // Open payment page in new tab
      } else {
        alert("Payment failed: " + JSON.stringify(response.data));
      }
    } catch (error) {
      alert("Error processing payment");
      console.error(error);
    }
    setLoading(false);
    setShowModal(false);
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
            Pay Now
          </button>

          <div className="text-white rounded-lg px-4 py-2 flex items-center cursor-pointer">
            <p className="text-[#02afde] font-medium">Log in</p>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none" onClick={toggleMenu}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} w-64`}>
        <button className="text-gray-600 p-4 focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      {showModal && (
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
      )}
    </div>
  );
}

export default Navbar;
