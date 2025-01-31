import React, { useState } from "react";
import emailjs from "emailjs-com";
import Partners from "../assets/partners.png";
import PictureWithButton from "./PictureWithButton";
import PictureWithText from "./PictureWithText";
import PictureWithText1 from "./PictureWithText1";
import PictureWithText2 from "./PictureWithText2";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
const Partner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    contactName: "",
    businessName: "",
    phoneNumber: "",
    email: "",
    location: "",
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      contactName: formData.contactName,
      businessName: formData.businessName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      location: formData.location,
    };
    const toastId = toast.loading("Sending message...", {
      
    });

    emailjs
      .send(
        "service_5ihkoqc", // Your Service ID
        "template_p98neyn", // Your Template ID
        templateParams,
        "V6ZGtr1e7XiBbA7-z" // Your Public Key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
          toast.update(toastId, {
            render: "Message sent successfully! ",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            position: "top-right",

          });
          setTimeout(() => {
            closeModal();
          }, 3000);
         
        },
        (error) => {
          console.error("Failed to send email.", error);
          toast.update(toastId, {
            render: "Failed to send message. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            position: "top-right",

          });
        }
      );
  };

  return (
    <>
      {/* Background Section */}
      <div
        className="relative w-full h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${Partners})` }}
      >
        <button
          onClick={openModal}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white text-black rounded-lg shadow-lg hover:bg-[#02afde] transition duration-300"
        >
          Become a Partner
        </button>
      </div>
      <PictureWithText/>
      <PictureWithText1/>
      <PictureWithText2/>


      {/* Modal Section */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
  progressStyle={{ background: "#5843aa" }} // Custom progress bar color
/>
            <h2 className="text-xl font-bold mb-4 text-center">
              Partner With Us
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Contact Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Contact Name 
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
                  placeholder="Enter contact name"
                />
              </div>

              {/* Business Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
                  placeholder="Enter business name"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
                  placeholder="Enter email"
                />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
                  placeholder="Enter location"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#02afde] text-white rounded-lg hover:bg-[#5843aa]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Partner;
