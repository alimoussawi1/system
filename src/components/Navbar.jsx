import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Swb from "../assets/swblogo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase"; // make sure this exports your Firebase auth & db

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
  const [ownerName, setOwnerName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");




  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmitBusiness = async () => {
    if (!businessEmail || !businessName || !password || !businessType || !ownerName) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, businessEmail, password);
      const uid = userCredential.user.uid;

      // Step 2: Store user details in Firestore
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        uid,
        businessEmail,
        businessName,
        businessType,
        ownerName,
        ownerPhoneNumber,
        isBusinessAccount: true,
        createdAt: serverTimestamp(),
        access: true,
        isAdmin: false,
      });

      // Step 3: Optionally, show a success state or modal
      alert("Business account created successfully!");
      setShowModal(false);
      setIsVerifying(true);
      setUserId(uid);
    } catch (error) {
      console.error("Error adding business user:", error);
      alert("Failed to create business account.");
    } finally {
      setLoading(false);
    }
  };


  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("Please enter the verification code.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/verify_business_user", {
        userId: userId,  // Pass the correct user ID that was returned after business creation
        verificationCode
      });

      if (response.status === 200) {
        alert("Business added successfully! ");
        setIsVerifying(false);  // Show verification section after business is added
        setShowModal(false);
      } else {
        alert("Failed to add business.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Something went wrong.");
    }
  };




  return (
    <div className="bg-white shadow-md h-20 fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center bg-white p-2 rounded-xl ">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="relative">
              {/* Logo with optional white padding to remove edge shadows */}
              <img
                src={Swb}
                alt="Student with Benefits"
                className="h-12 object-contain rounded-md"
              />

              {/* Soft background glow (optional if logo has transparency) */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 rounded-lg blur-md -z-10"></div>
            </div>

            {/* Text next to logo with gradient */}
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              SWB
            </span>
          </Link>
        </div>


        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { path: "/", label: "Home" },
            { path: "/partner", label: "Become a Partner" },
            { path: "/news", label: "News" }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative font-semibold text-lg transition-all duration-300 hover:scale-105 group ${location.pathname === item.path
                ? "text-purple-600"
                : "text-gray-700 hover:text-purple-600"
                }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"></div>
              )}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

          {/* <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold px-6 py-2.5 rounded-full hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button> */}

          <Link
            to="/login"
            className="text-purple-600 font-semibold px-6 py-2.5 rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200 hover:scale-105"
          >
            Log in
          </Link>
        </div>

        {/* Verification Code Modal */}
        {isVerifying && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Verify Your Account
                  </h2>
                  <button
                    onClick={() => setIsVerifying(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Verification Code</label>
                  <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-center text-lg font-mono tracking-widest"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsVerifying(false)}
                    className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerifyCode}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 shadow-lg"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleMenu}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
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
          {[
            { path: "/", label: "Home" },
            { path: "/partner", label: "Become a Partner" },
            { path: "/news", label: "News" }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative font-semibold text-lg transition-all duration-300 py-3 px-4 rounded-lg ${location.pathname === item.path
                ? "text-purple-600 bg-gradient-to-r from-purple-50 to-blue-50"
                : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-500 rounded-r-full"></div>
              )}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-500 rounded-r-full scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-200">
            <Link
              to="/login"
              className="block text-center text-purple-600 font-semibold py-3 px-4 rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
          </div>
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
              <label className="block font-medium text-sm mb-1">Owner First Name</label>
              <input
                type="text"
                placeholder="Enter owner's first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setOwnerName(e.target.value + " " + lastName); // Concatenate first and last name
                }}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium text-sm mb-1">Owner Last Name</label>
              <input
                type="text"
                placeholder="Enter owner's last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setOwnerName(firstName + " " + e.target.value); // Concatenate first and last name
                }}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium text-sm mb-1">Owner Phone Number</label>
              <input
                type="tel"  // Use 'tel' type for phone number input
                placeholder="Enter business owner phone number"
                value={ownerPhoneNumber}  // You will need to create this state variable
                onChange={(e) => setOwnerPhoneNumber(e.target.value)}  // Update the state when the input changes
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

