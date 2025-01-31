import React, { useState } from "react";
import emailjs from "emailjs-com"; // Make sure to install this: npm install emailjs-com
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    phoneNumber: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const templateParams = {
      firstName: formData.firstName.trim(),
      familyName: formData.familyName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      description: formData.description.trim(),
    };
  
    console.log("Sending this data to EmailJS:", templateParams);
  
    // Show a loading toast
    const toastId = toast.loading("Sending message...", {
      
      });
    emailjs
      .send(
        "service_5ihkoqc", // Your Service ID
        "template_ejdokvn", // Your Template ID
        templateParams,
        "V6ZGtr1e7XiBbA7-z" // Your Public Key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
  
        // Update loading toast to success
        toast.update(toastId, {
            render: "Message sent successfully! ",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            position: "top-right",

          });
  
        // Reset form after success
        setFormData({
          firstName: "",
          familyName: "",
          phoneNumber: "",
          email: "",
          subject: "",
          description: "",
        });
      })
      .catch((error) => {
        console.log("FAILED...", error);
  
        // Update loading toast to error
        toast.update(toastId, {
            render: "Failed to send message. Please try again.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            position: "top-right",

          });
      });
  };
  

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Contact Us</h2>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
          required
        />
        
        {/* Family Name */}
        <input
          type="text"
          name="familyName"
          placeholder="Family Name"
          value={formData.familyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
          required
        />

        {/* Phone Number */}
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
          required
        />

        {/* Subject */}
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Your Message"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-[#02afde]"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#02afde] text-white py-2 px-4 rounded-lg hover:bg-[#028bb8] transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
