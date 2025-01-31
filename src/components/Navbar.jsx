import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swb from "../assets/swblogo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const location = useLocation(); // Get the current location

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md h-20 fixed top-0 w-full z-50">
      <div className="container mx-auto py-2 flex justify-between items-center w-[100%]">
        {/* Logo Section */}
        <div className="flex">
          <Link to="/">
            <img
              src={Swb}
              alt="Student With Benefits Logo"
              className="h-14 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className={`font-medium ${
              location.pathname === "/" ? "text-[#10758B]" : "text-gray-600"
            } hover:text-[#10758B]`}
          >
            Home
          </Link>
          <Link
            to="/partner"
            className={`font-medium ${
              location.pathname === "/partner"
                ? "text-[#10758B]"
                : "text-gray-600"
            } hover:text-[#10758B]`}
          >
            Become a Partner
          </Link>
          <Link
            to="/jobs"
            className={`font-medium ${
              location.pathname === "/jobs"
                ? "text-[#10758B]"
                : "text-gray-600"
            } hover:text-[#10758B]`}
          >
            Student Jobs
          </Link>
        </div>

        {/* Desktop Sign Up & Log In */}
        <div className="hidden md:flex flex-row items-center">
          <div className="h-10 w-[1px] bg-gray-300"></div>
          <div className="text-white rounded-lg px-4 py-2 flex items-center cursor-pointer">
            <p className="text-[#5842aa] font-medium">Sign up</p>
          </div>
          <div className="text-white rounded-lg px-4 py-2 flex items-center cursor-pointer">
            <p className="text-[#02afde] font-medium">Log in</p>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } w-64`}
      >
        <button
          className="text-gray-600 p-4 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <nav className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            className={`font-medium ${
              location.pathname === "/" ? "text-[#10758B]" : "text-gray-600"
            } hover:text-[#10758B]`}
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Home
          </Link>
          <Link
            to="/partner"
            className={`font-medium ${
              location.pathname === "/partner"
                ? "text-[#10758B]"
                : "text-gray-600"
            } hover:text-[#10758B]`}
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Become a Partner
          </Link>
          <Link
            to="/jobs"
            className={`font-medium ${
              location.pathname === "/jobs"
                ? "text-[#10758B]"
                : "text-gray-600"
            } hover:text-[#10758B]`}
            onClick={() => setIsMenuOpen(false)} // Close menu on click
          >
            Student Jobs
          </Link>
          {/* Mobile Sign Up & Log In */}
          <div className="flex flex-col space-y-2 mt-4">
            <div className="text-[#5842aa] font-medium border border-[#5842aa] rounded-lg px-4 py-2 text-center">
              Sign up
            </div>
            <div className="text-[#02afde] font-medium border border-[#02afde] rounded-lg px-4 py-2 text-center">
              Log in
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
