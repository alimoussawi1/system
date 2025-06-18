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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ece9f3] to-[#fafafa]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 relative">
        <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#5842aa] to-[#7b68ee]">
          Get in Touch
        </h2>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          progressStyle={{ background: "#5842aa" }}
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5842aa]"
              required
            />
            <input
              type="text"
              name="familyName"
              placeholder="Family Name"
              value={formData.familyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5842aa]"
              required
            />
          </div>

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5842aa]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5842aa]"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5842aa]"
            required
          />

          <textarea
            name="description"
            placeholder="Your Message"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5842aa]"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#5842aa] to-[#7b68ee] text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

};

export default ContactUs;
