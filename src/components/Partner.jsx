// import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PartnersSmall from "../assets/login.jpg";
// import PictureWithText from "./PictureWithText";
// import PictureWithText1 from "./PictureWithText1";
// import PictureWithText2 from "./PictureWithText2";
// import { FaRegTimesCircle } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
// const Partner = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verify, setVerify] = useState(false)
//   const [enteredCode, setEnteredCode] = useState("");
//   const [userId, setUserId] = useState("");

//   const [businessEmail, setBusinessEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [businessType, setBusinessType] = useState("Food & Drinks");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [resendClicked, setResendClicked] = useState(false);

//   const isStrongPassword = (pwd) => {
//     const regex = /^(?=.*\d)[A-Za-z\d]{6}$/;
//     return regex.test(pwd);
//   };

//   const handleResendCode = async () => {
//     if (resendClicked || !businessEmail) return;

//     try {
//       setResendClicked(true);

//       const response = await axios.post("https://swb-backend.onrender.com/send-verification-code", {
//         businessEmail,
//       });

//       if (response.data.success) {
//         const newCode = response.data.code;

//         // Update Firestore document with new code
//         await setDoc(doc(db, "pendingVerifications", userId), {
//           verificationCode: newCode,
//         }, { merge: true });

//         toast.success("Verification code resent!");
//       } else {
//         toast.error("Failed to resend verification code.");
//       }
//     } catch (err) {
//       console.error("Resend error:", err);
//       toast.error("Error resending verification code.");
//     }
//   };


//   const openModalSend = () => setShowModal(true);

//   const handleSubmitBusiness = async () => {
//     if (!businessEmail || !businessName || !password || !firstName || !lastName) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     if (!isStrongPassword(password)) {
//       toast.error("Password must be at least 6 characters long, containing at least 1 number.");
//       return;
//     }


//     setLoading(true);
//     try {
//       // 1. Create Firebase User
//       const userCredential = await createUserWithEmailAndPassword(auth, businessEmail, password);
//       const uid = userCredential.user.uid;
//       setUserId(uid);

//       // 2. Send verification code email through your backend
//       const response = await axios.post("https://swb-backend.onrender.com/send-verification-code", {
//         businessEmail,
//       });

//       if (response.data.success) {
//         const generatedCode = response.data.code;  // receive the generated code from backend
//         console.log("Saving");
//         // 3. Save pending verification **in frontend** manually after email sent
//         await setDoc(doc(db, "pendingVerifications", uid), {
//           verificationCode: generatedCode,
//           fullInfo: {
//             businessEmail,
//             businessName,
//             firstName,
//             lastName,
//             ownerPhoneNumber,
//             businessType,
//             password
//           },
//         });

//         toast.success("Verification code sent! Check your email.");
//         setIsVerifying(true);
//         setShowModal(false);
//       } else {
//         // If backend says failure, delete created Firebase user
//         await userCredential.user.delete();
//         toast.error("Failed to send verification email. User deleted.");
//       }
//     } catch (error) {
//       console.error("Error creating user or sending email:", error);
//       toast.error("Failed to create business account or send verification email.");
//     } finally {
//       setLoading(false);
//     }
//   };



//   const verifyCode = async () => {
//     if (!enteredCode) {
//       toast.error("Enter the verification code");
//       return;
//     }

//     try {
//       setVerify(true)
//       const docRef = doc(db, "pendingVerifications", userId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const { verificationCode, fullInfo } = docSnap.data();

//         if (enteredCode === verificationCode) {
//           await setDoc(doc(db, "users", userId), {
//             uid: userId,
//             businessEmail,
//             businessName: fullInfo.businessName,
//             ownerName: fullInfo.firstName + " " + fullInfo.lastName,
//             ownerPhoneNumber: fullInfo.ownerPhoneNumber,
//             businessType: fullInfo.businessType,
//             isBusinessAccount: true,
//             password: fullInfo.password,
//             access: false,
//             createdAt: serverTimestamp(),
//           });

//           await deleteDoc(doc(db, "pendingVerifications", userId));



//           toast.success("Business account verified and created!");
//           setIsVerifying(false);
//           const templateParams = {
//             businessEmail: businessEmail,
//             businessName: fullInfo.businessName,
//             ownerName: fullInfo.firstName + " " + fullInfo.lastName,
//             ownerPhoneNumber: fullInfo.ownerPhoneNumber,
//             businessType: fullInfo.businessType,
//           };

//           emailjs
//             .send(
//               "service_5ihkoqc",      // Your Service ID
//               "template_p98neyn",     // Your Template ID
//               templateParams,
//               "V6ZGtr1e7XiBbA7-z"     // Your Public Key
//             )
//             .then((response) => {
//               console.log("SUCCESS!", response.status, response.text);
//               // You can trigger any other logic here (e.g., form reset, navigation)
//             })
//             .catch((error) => {
//               console.error("FAILED...", error);
//               // Handle failure if needed (e.g., show alert or fallback UI)
//             });



//         } else {
//           toast.error("Incorrect verification code");
//         }
//       } else {
//         toast.error("No verification info found");
//       }
//     } catch (error) {
//       console.error("Verification error:", error);
//       toast.error("Verification failed");
//     }
//     finally {
//       setVerify(false)
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />

//       <div
//         className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center hidden md:block"
//         style={{ backgroundImage: `url(${PartnersSmall})` }}
//       >
//         {/* Heading placed directly above the button */}
//         <h1 className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-6xl text-white font-bold text-center mb-10 w-full">
//           Join us in making a Difference!
//         </h1>

//         {/* Button */}
//         <button
//           onClick={openModalSend}
//           className="absolute bottom-24 left-1/2 transform -translate-x-1/2 px-8 text-xl py-4 bg-gradient-to-r from-[#029fc8] to-[#02afde] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105"
//         >
//           Get Started
//         </button>

//       </div>


//       <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center block md:hidden" style={{ backgroundImage: `url(${PartnersSmall})` }}>
//         <h1 className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-3xl text-white font-bold text-center  w-full">
//           Join us in making a Difference!
//         </h1>

//         <button
//           onClick={openModalSend}
//           className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#02afde] text-white rounded-lg hover:bg-[#02afde] font-medium"
//         >
//           Get Started
//         </button>
//       </div>

//       <PictureWithText />
//       <PictureWithText1 />
//       <PictureWithText2 />

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-10">
//           <div className="relative bg-white p-6 rounded-lg w-[90%] max-w-[400px] mt-10">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold">Create Business Account</h2>
//               <button
//                 className="text-2xl font-bold text-gray-600 hover:text-black"
//                 onClick={() => setShowModal(false)}
//               >
//                 <FaRegTimesCircle />
//               </button>
//             </div>



//             <label className="block font-medium text-sm mb-1">Owner's First Name</label>
//             <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-2 mb-2 w-full" />
//             <label className="block font-medium text-sm mb-1">Owner's Last Name</label>
//             <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-2 mb-2 w-full" />
//             <label className="block font-medium text-sm mb-1">Owner's Phone Number</label>
//             <input type="tel" placeholder="Phone Number" value={ownerPhoneNumber} onChange={(e) => setOwnerPhoneNumber(e.target.value)} className="border p-2 mb-2 w-full" />
//             <label className="block font-medium text-sm mb-1">Business Name</label>
//             <input type="text" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="border p-2 mb-2 w-full" />
//             <label className="block font-medium text-sm mb-1">Business Email</label>
//             <input type="email" placeholder="Business Email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} className="border p-2 mb-2 w-full" />
//             <label className="block font-medium text-sm mb-1">Business Type</label>
//             <select
//               value={businessType}
//               onChange={(e) => setBusinessType(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select Business Type</option>
//               <option value="Food & Drinks">Food & Drinks</option>
//               <option value="Sports & Activities">Sports & Activities</option>
//               <option value="Nightlife">Nightlife</option>
//               <option value="Tourism">Tourism</option>
//             </select>
//             <label className="block font-medium text-sm mb-1">Password</label>
//             <div className="relative mb-2">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="border p-2 w-full pr-10"
//               />
//               <div
//                 className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <label className="block font-medium text-sm mb-1">Confirm Password</label>
//             <div className="relative mb-4">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="border p-2 w-full pr-10"
//               />
//               <div
//                 className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <button
//                 onClick={handleSubmitBusiness}
//                 disabled={loading}
//                 className="bg-[#02afde] text-white px-4 py-2 rounded flex justify-center items-center"
//               >
//                 {loading ? "Submitting..." : "Create Account"}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//       {isVerifying && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px] relative">

//             {/* Close Button */}
//             <button
//               onClick={() => setIsVerifying(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
//               aria-label="Close"
//             >
//               <FaRegTimesCircle />
//             </button>

//             <h2 className="text-xl font-bold mb-4">Enter Verification Code</h2>
//             <h2 className="text-sm italic mb-4 text-[#02afde]">
//               If you did not receive an email, kindly check your spam folder
//             </h2>

//             <input
//               type="text"
//               placeholder="6-digit code"
//               value={enteredCode}
//               onChange={(e) => setEnteredCode(e.target.value)}
//               className="border p-2 mb-4 w-full"
//             />
//             <div className="text-center mt-4">
//               <button
//                 onClick={handleResendCode}

//                 className={`text-sm font-medium ${resendClicked ? 'text-gray-400 ' : 'text-[#02afde] hover:underline'}`}
//               >
//                 {resendClicked ? "Verification Code Sent" : "Resend Verification Code"}
//               </button>
//             </div>


//             <div className="flex justify-center mt-2">
//               <button
//                 onClick={verifyCode}
//                 className="bg-[#5842aa] text-white px-4 py-2 rounded"
//               >
//                 {verify ? "Verifying" : "Verify"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//     </div>
//   );
// };

// export default Partner;
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaCheck, FaSpinner, FaUser, FaBuilding, FaEnvelope, FaPhone, FaLock, FaStar, FaChevronRight, FaChevronLeft, FaShieldAlt } from "react-icons/fa";
import { useAccount } from "../context/AccountContext";

const Partner = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verify, setVerify] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [userId, setUserId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const { showSuccessToast, showErrorToast } = useAccount();

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

  const businessTypes = [
    { value: "Food & Drinks", icon: "🍕", desc: "Restaurants, cafes, bars" },
    { value: "Sports & Activities", icon: "⚽", desc: "Gyms, sports clubs, activities" },
    { value: "Nightlife", icon: "🎵", desc: "Clubs, lounges, entertainment" },
    { value: "Tourism", icon: "🏖️", desc: "Hotels, tours, attractions" }
  ];

  const isStrongPassword = (pwd) => {
    const regex = /^(?=.*\d)[A-Za-z\d]{6}$/;
    return regex.test(pwd);
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: 0, text: "", color: "" };
    if (pwd.length < 3) return { strength: 1, text: "Weak", color: "text-red-500" };
    if (pwd.length < 6) return { strength: 2, text: "Fair", color: "text-yellow-500" };
    if (isStrongPassword(pwd)) return { strength: 3, text: "Strong", color: "text-green-500" };
    return { strength: 2, text: "Fair", color: "text-yellow-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  const openModalSend = () => {
    setShowModal(true);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedStep1 = firstName && lastName && ownerPhoneNumber;
  const canProceedStep2 = businessName && businessEmail && businessType;
  const canProceedStep3 = password && confirmPassword && password === confirmPassword && isStrongPassword(password);

  const handleSubmitBusiness = async () => {
    if (!canProceedStep3) return;

    if (!businessEmail || !businessName || !password || !firstName || !lastName) {
      showErrorToast("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    if (!isStrongPassword(password)) {
      showErrorToast("Password must be at least 6 characters long, containing at least 1 number.");
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
        const generatedCode = response.data.code;

        // 3. Save pending verification in Firestore
        await setDoc(doc(db, "pendingVerifications", uid), {
          verificationCode: generatedCode,
          fullInfo: {
            businessEmail,
            businessName,
            firstName,
            lastName,
            ownerPhoneNumber,
            businessType,
            password,
          },
        });

        showSuccessToast("Verification code sent! Check your email.");
        setIsVerifying(true);
        setShowModal(false);
        setCurrentStep(1);
      } else {
        await userCredential.user.delete();
        showErrorToast("Failed to send verification email. User deleted.");
      }
    } catch (error) {
      console.error("Error creating user or sending email:", error);
      showErrorToast("Failed to create business account or send verification email.");
    } finally {
      setLoading(false);
    }
  };


  const verifyCode = async () => {
    if (!enteredCode) {
      showErrorToast("Enter the verification code");
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



          showSuccessToast("Business account verified and created!");
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
          showErrorToast("Incorrect verification code");
        }
      } else {
        showErrorToast("No verification info found");
      }
    } catch (error) {
      console.error("Verification error:", error);
      showErrorToast("Verification failed");
    }
    finally {
      setVerify(false)
    }
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

        showSuccessToast("Verification code resent!");
      } else {
        showErrorToast("Failed to resend verification code.");
      }
      setTimeout(() => {
        showSuccessToast("Verification code resent!");
        setResendClicked(false);
      }, 1000);
    } catch (err) {
      setTimeout(() => setResendClicked(false), 30000);
      console.error("Resend error:", err);
      showErrorToast("Error resending verification code.");
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: FaUser },
    { number: 2, title: "Business Details", icon: FaBuilding },
    { number: 3, title: "Security", icon: FaShieldAlt }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50" style={{ background: 'linear-gradient(135deg, #cae1fd 0%, #ffffff 50%, #f8fafc 100%)' }}>
      <ToastContainer />
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" style={{ backgroundColor: '#5842aa' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: '#cae1fd' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000" style={{ backgroundColor: '#5842aa' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, #5842aa 0%, #2563eb 100%)` }}>
                Transform
              </span>
              <br />
              <span className="text-gray-800">Your Business</span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Partner with us to unlock unlimited growth potential, reach thousands of new customers, and revolutionize your business operations.
            </p>

            <button
              onClick={openModalSend}
              className="group relative inline-flex items-center px-12 py-6 text-xl font-bold text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #5842aa 0%, #3730a3 100%)`,
                boxShadow: '0 25px 50px -12px rgba(88, 66, 170, 0.25)'
              }}
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <FaChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, #3730a3 0%, #5842aa 100%)` }}></div>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            {[
              { number: "500+", label: "Active Partners" },
              { number: "10K+", label: "Monthly Customers" },
              { number: "98%", label: "Satisfaction Rate", note: "The remaining 2% thought we were Tinder." },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl font-black mb-2" style={{ color: '#5842aa' }}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                {stat.note && (
                  <div className="mt-2 text-[10px] text-gray-400 italic">
                    &quot;{stat.note.split("Tinder")[0]}
                    <span className="text-[#5842aa] font-medium">Tinder</span>&quot;
                  </div>
                )}


              </div>
            ))}
          </div>


          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Growth",
                desc: "Get discovered by thousands of potential customers immediately",
                icon: "🚀",
                gradient: `linear-gradient(135deg, #5842aa 0%, #3730a3 100%)`
              },
              {
                title: "Smart Analytics",
                desc: "Advanced insights and data to optimize your business performance",
                icon: "📊",
                gradient: `linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)`
              },
              {
                title: "Premium Support",
                desc: "Dedicated account manager and 24/7 priority customer support",
                icon: "💎",
                gradient: `linear-gradient(135deg, #059669 0%, #047857 100%)`
              }
            ].map((feature, index) => (
              <div key={index} className="group relative p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: feature.gradient }}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Step Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header with Progress */}
            <div className="text-white p-8" style={{ background: `linear-gradient(135deg, #5842aa 0%, #3730a3 100%)` }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Join Our Platform</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-full"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentStep >= step.number
                      ? 'bg-white border-white'
                      : 'border-white/50 text-white/50'
                      }`} style={currentStep >= step.number ? { color: '#5842aa' } : {}}>
                      <step.icon size={16} />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-1 mx-4 transition-all duration-300 ${currentStep > step.number ? 'bg-white' : 'bg-white/30'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm text-white/80">
                {steps.map(step => (
                  <span key={step.number} className={currentStep >= step.number ? 'text-white font-medium' : ''}>
                    {step.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 overflow-y-auto max-h-96">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-slideIn">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Tell us about yourself</h3>
                    <p className="text-gray-600">We'll need some basic information to get started</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        style={{ '--focus-border-color': '#5842aa' }}
                        onFocus={(e) => e.target.style.borderColor = '#5842aa'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onFocus={(e) => e.target.style.borderColor = '#5842aa'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={ownerPhoneNumber}
                        onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                        className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onFocus={(e) => e.target.style.borderColor = '#5842aa'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-slideIn">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">About your business</h3>
                    <p className="text-gray-600">Help us understand your business better</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Business Name</label>
                    <input
                      type="text"
                      placeholder="Your Amazing Business"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      onFocus={(e) => e.target.style.borderColor = '#5842aa'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Business Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="business@example.com"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                        className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onFocus={(e) => e.target.style.borderColor = '#5842aa'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">Business Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {businessTypes.map((type) => (
                        <div
                          key={type.value}
                          onClick={() => setBusinessType(type.value)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${businessType === type.value
                            ? 'border-gray-200 bg-gray-50 hover:border-gray-300'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                            }`}
                          style={businessType === type.value ? {
                            borderColor: '#5842aa',
                            backgroundColor: '#cae1fd20'
                          } : {}}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{type.icon}</span>
                            <div>
                              <div className="font-semibold text-gray-800">{type.value}</div>
                              <div className="text-sm text-gray-600">{type.desc}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-slideIn">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Secure your account</h3>
                    <p className="text-gray-600">Create a strong password to protect your business</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onFocus={(e) => e.target.style.borderColor = '#5842aa'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Password Strength</span>
                          <span className={`text-sm font-medium ${passwordStrength.color}`}>
                            {passwordStrength.text}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' :
                              passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' :
                                'bg-green-500 w-full'
                              }`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        onFocus={(e) => e.target.style.borderColor = '#5842aa'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <FaTimes className="mr-2" size={12} />
                        Passwords do not match
                      </p>
                    )}
                    {confirmPassword && password === confirmPassword && password && (
                      <p className="text-green-500 text-sm mt-2 flex items-center">
                        <FaCheck className="mr-2" size={12} />
                        Passwords match
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="p-8 bg-gray-50 flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <FaChevronLeft className="mr-2" />
                Back
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2)
                  }
                  className={`flex items-center px-8 py-3 rounded-xl font-bold transition-all duration-300 ${((currentStep === 1 && canProceedStep1) || (currentStep === 2 && canProceedStep2))
                    ? 'text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  style={((currentStep === 1 && canProceedStep1) || (currentStep === 2 && canProceedStep2)) ? {
                    background: `linear-gradient(135deg, #5842aa 0%, #3730a3 100%)`
                  } : {}}
                >
                  Continue
                  <FaChevronRight className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitBusiness}
                  disabled={!canProceedStep3 || loading}
                  className={`flex items-center px-8 py-3 rounded-xl font-bold transition-all duration-300 ${canProceedStep3 && !loading
                    ? 'text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  style={canProceedStep3 && !loading ? {
                    background: `linear-gradient(135deg, #059669 0%, #047857 100%)`
                  } : {}}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaCheck className="ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Verification Modal */}
      {isVerifying && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#5842aa] text-white p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-violet-100">We've sent a verification code to your email address</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-2">Enter the 6-digit code we sent to:</p>
                <p className="font-semibold text-gray-800">{businessEmail}</p>
                <p className="text-sm text-blue-600 mt-3">
                  Don't see the email? Check your spam folder
                </p>
              </div>

              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="000000"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="w-full p-4 text-center text-3xl font-mono border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#5842aa] transition-all duration-300 bg-gray-50 focus:bg-white tracking-widest"
                  maxLength="6"
                />

                <button
                  onClick={verifyCode}
                  disabled={verify || !enteredCode}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${!verify && enteredCode
                    ? 'bg-[#5842aa] text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {verify ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaCheck className="mr-2" />
                      Verify Account
                    </div>
                  )}
                </button>

                <div className="text-center">
                  <button
                    onClick={handleResendCode}
                    disabled={resendClicked}
                    className={`text-sm font-medium transition-colors ${resendClicked
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#5842aa] hover:text-[#3f2d88] hover:underline'
                      }`}
                  >
                    {resendClicked ? "Code sent! Check your email" : "Resend verification code"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Partner;