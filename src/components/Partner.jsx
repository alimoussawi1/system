import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PartnersSmall from "../assets/login.jpg";
import PictureWithText from "./PictureWithText";
import PictureWithText1 from "./PictureWithText1";
import PictureWithText2 from "./PictureWithText2";
import { FaRegTimesCircle } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
const Partner = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verify, setVerify] = useState(false)
  const [enteredCode, setEnteredCode] = useState("");
  const [userId, setUserId] = useState("");

  const [businessEmail, setBusinessEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Food & Drinks");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendClicked, setResendClicked] = useState(false);

  const isStrongPassword = (pwd) => {
    const regex = /^(?=.*\d)[A-Za-z\d]{6}$/;
    return regex.test(pwd);
  };

  const handleResendCode = async () => {
    if (resendClicked || !businessEmail) return;

    try {
      setResendClicked(true);

      const response = await axios.post("https://swb-backend.onrender.com/send-verification-code", {
        businessEmail,
      });

      if (response.data.success) {
        const newCode = response.data.code;

        // Update Firestore document with new code
        await setDoc(doc(db, "pendingVerifications", userId), {
          verificationCode: newCode,
        }, { merge: true });

        toast.success("Verification code resent!");
      } else {
        toast.error("Failed to resend verification code.");
      }
    } catch (err) {
      console.error("Resend error:", err);
      toast.error("Error resending verification code.");
    }
  };


  const openModalSend = () => setShowModal(true);

  const handleSubmitBusiness = async () => {
    if (!businessEmail || !businessName || !password || !firstName || !lastName) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!isStrongPassword(password)) {
      toast.error("Password must be at least 6 characters long, containing at least 1 number.");
      return;
    }


    setLoading(true);
    try {
      // 1. Create Firebase User
      const userCredential = await createUserWithEmailAndPassword(auth, businessEmail, password);
      const uid = userCredential.user.uid;
      setUserId(uid);

      // 2. Send verification code email through your backend
      const response = await axios.post("https://swb-backend.onrender.com/send-verification-code", {
        businessEmail,
      });

      if (response.data.success) {
        const generatedCode = response.data.code;  // receive the generated code from backend
        console.log("Saving");
        // 3. Save pending verification **in frontend** manually after email sent
        await setDoc(doc(db, "pendingVerifications", uid), {
          verificationCode: generatedCode,
          fullInfo: {
            businessEmail,
            businessName,
            firstName,
            lastName,
            ownerPhoneNumber,
            businessType,
            password
          },
        });

        toast.success("Verification code sent! Check your email.");
        setIsVerifying(true);
        setShowModal(false);
      } else {
        // If backend says failure, delete created Firebase user
        await userCredential.user.delete();
        toast.error("Failed to send verification email. User deleted.");
      }
    } catch (error) {
      console.error("Error creating user or sending email:", error);
      toast.error("Failed to create business account or send verification email.");
    } finally {
      setLoading(false);
    }
  };



  const verifyCode = async () => {
    if (!enteredCode) {
      toast.error("Enter the verification code");
      return;
    }

    try {
      setVerify(true)
      const docRef = doc(db, "pendingVerifications", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { verificationCode, fullInfo } = docSnap.data();

        if (enteredCode === verificationCode) {
          await setDoc(doc(db, "users", userId), {
            uid: userId,
            businessEmail,
            businessName: fullInfo.businessName,
            ownerName: fullInfo.firstName + " " + fullInfo.lastName,
            ownerPhoneNumber: fullInfo.ownerPhoneNumber,
            businessType: fullInfo.businessType,
            isBusinessAccount: true,
            password: fullInfo.password,
            access: false,
            createdAt: serverTimestamp(),
          });

          await deleteDoc(doc(db, "pendingVerifications", userId));



          toast.success("Business account verified and created!");
          setIsVerifying(false);
          const templateParams = {
            businessEmail: businessEmail,
            businessName: fullInfo.businessName,
            ownerName: fullInfo.firstName + " " + fullInfo.lastName,
            ownerPhoneNumber: fullInfo.ownerPhoneNumber,
            businessType: fullInfo.businessType,
          };

          emailjs
            .send(
              "service_5ihkoqc",      // Your Service ID
              "template_p98neyn",     // Your Template ID
              templateParams,
              "V6ZGtr1e7XiBbA7-z"     // Your Public Key
            )
            .then((response) => {
              console.log("SUCCESS!", response.status, response.text);
              // You can trigger any other logic here (e.g., form reset, navigation)
            })
            .catch((error) => {
              console.error("FAILED...", error);
              // Handle failure if needed (e.g., show alert or fallback UI)
            });



        } else {
          toast.error("Incorrect verification code");
        }
      } else {
        toast.error("No verification info found");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification failed");
    }
    finally {
      setVerify(false)
    }
  };

  return (
    <div>
      <ToastContainer />

      <div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${PartnersSmall})` }}
      >
        {/* Heading placed directly above the button */}
        <h1 className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-6xl text-white font-bold text-center mb-10 w-full">
          Join us in making a Difference!
        </h1>

        {/* Button */}
        <button
          onClick={openModalSend}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 px-8 text-xl py-4 bg-gradient-to-r from-[#029fc8] to-[#02afde] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105"
        >
          Get Started
        </button>

      </div>


      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center block md:hidden" style={{ backgroundImage: `url(${PartnersSmall})` }}>
        <h1 className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-3xl text-white font-bold text-center  w-full">
          Join us in making a Difference!
        </h1>

        <button
          onClick={openModalSend}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#02afde] text-white rounded-lg hover:bg-[#02afde] font-medium"
        >
          Get Started
        </button>
      </div>

      <PictureWithText />
      <PictureWithText1 />
      <PictureWithText2 />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-10">
          <div className="relative bg-white p-6 rounded-lg w-[90%] max-w-[400px] mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create Business Account</h2>
              <button
                className="text-2xl font-bold text-gray-600 hover:text-black"
                onClick={() => setShowModal(false)}
              >
                <FaRegTimesCircle />
              </button>
            </div>



            <label className="block font-medium text-sm mb-1">Owner's First Name</label>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 mb-2 w-full" />
            <label className="block font-medium text-sm mb-1">Owner's Last Name</label>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 mb-2 w-full" />
            <label className="block font-medium text-sm mb-1">Owner's Phone Number</label>
            <input type="tel" placeholder="Phone Number" value={ownerPhoneNumber} onChange={(e) => setOwnerPhoneNumber(e.target.value)} className="border p-2 mb-2 w-full" />
            <label className="block font-medium text-sm mb-1">Business Name</label>
            <input type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="border p-2 mb-2 w-full" />
            <label className="block font-medium text-sm mb-1">Business Email</label>
            <input type="email" placeholder="Business Email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} className="border p-2 mb-2 w-full" />
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
            <label className="block font-medium text-sm mb-1">Password</label>
            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <label className="block font-medium text-sm mb-1">Confirm Password</label>
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 w-full pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmitBusiness}
                disabled={loading}
                className="bg-[#02afde] text-white px-4 py-2 rounded flex justify-center items-center"
              >
                {loading ? "Submitting..." : "Create Account"}
              </button>
            </div>

          </div>
        </div>
      )}

      {isVerifying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] relative">

            {/* Close Button */}
            <button
              onClick={() => setIsVerifying(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close"
            >
              <FaRegTimesCircle />
            </button>

            <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
            <h2 className="text-sm italic mb-4 text-[#02afde]">
              If you did not receive an email, kindly check your spam folder
            </h2>

            <input
              type="text"
              placeholder="6-digit code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <div className="text-center mt-4">
              <button
                onClick={handleResendCode}

                className={`text-sm font-medium ${resendClicked ? 'text-gray-400 ' : 'text-[#02afde] hover:underline'}`}
              >
                {resendClicked ? "Verification Code Sent" : "Resend Verification Code"}
              </button>
            </div>


            <div className="flex justify-center mt-2">
              <button
                onClick={verifyCode}
                className="bg-[#5842aa] text-white px-4 py-2 rounded"
              >
                {verify ? "Verifying" : "Verify"}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Partner;
