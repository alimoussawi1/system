import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import Footer component
import Main from "./assets/mainbackground.png";
import Privacy from "./components/Privacy";
import VideoSection from "./components/VideoComponents";
import PictureWithButton from "./components/PictureWithButton";
import Partner from "./components/Partner";
import Affordable from "./assets/affordable.png";
import PictureWithText from "./components/PictureWithText";
import AboutUs from "./assets/aboutus.png";
import JobPic from "./assets/comingsoon.jpeg";
import { FaDownload } from "react-icons/fa";
import BubbleAnimation from "./components/BubbleAnimation";
import ContactUs from "./components/Contacts";
const handleDownload = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.omarnaous.swb";
  } else if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
    window.location.href =
      "https://apps.apple.com/lb/app/student-with-benefits/id6590629020";
  } else {
    alert("This app is only available for Android and iOS devices.");
  }
};
function Deliver() {
  return <h1>Deliver for Toters Page</h1>;
}

function Careers() {
  return <h1>Careers Page</h1>;
}
function MissionVision() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 mt-10 px-4 mb-5">
      {/* Our Mission Section */}
      <div
        className="w-full max-w-lg p-6 rounded-2xl text-white h-auto lg:h-[200px] flex flex-col"
        style={{ backgroundColor: "#02afde" }}
      >
        <h2 className="text-xl font-bold mb-4 text-left">Our Mission</h2>
        <p className="flex-grow">
          To empower university students by providing a platform that simplifies
          their lives, offering exclusive deals and opportunities to make student
          life more affordable, connected, and fulfilling.
        </p>
      </div>

      {/* Our Vision Section */}
      <div
        className="w-full max-w-lg p-6 rounded-2xl text-white h-auto lg:h-[200px] flex flex-col"
        style={{ backgroundColor: "#5843aa" }}
      >
        <h2 className="text-xl font-bold mb-4 text-left">Our Vision</h2>
        <p className="flex-grow">
          To become the go-to platform for university students worldwide,
          fostering a community that bridges the gap between students and
          businesses, while creating opportunities that extend beyond education.
        </p>
      </div>
    </div>
  );
}

function Media() {
  return (
    <>
      <div
        className="relative w-full h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${AboutUs})` }}
      ></div>
      <div className="flex justify-center mt-10 mb-10">
        <p className="flex items-center justify-center mt-2 w-[50%] text-2xl text-[#10758B]">
          Students With Benefits (SWB) is an innovative application designed to
          connect university students with exclusive deals and offers everywhere
          they go. Our mission is to support students by helping them save money
          on everyday purchases.
        </p>
      </div>
    </>
  );
}

function Jobs() {
  return (
    <div
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${JobPic})` }}
    ></div>
  );
}


function Dashboard() {
  return (
    <div className="flex flex-col items-center">
    <div
  className="relative w-full bg-cover bg-center h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px]"
  style={{ backgroundImage: `url(${Main})` }}
>
  <div
 className="absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 bg-[#02afde] border border-[#02afde] text-white rounded-lg px-6 py-3 flex items-center cursor-pointer shadow-lg mb-10"
    onClick={handleDownload}
  >
    <FaDownload className="mr-2 text-lg" />
    <p className="text-white font-medium">Download Now</p>
  </div>
</div>

      
<div className="mt-5 flex flex-col items-center justify-center text-center">
  <h1 className="text-[#5843aa] italic text-lg sm:text-xl mt-5">
    Student Life Made Easy
  </h1>
  <h1 className="text-3xl sm:text-4xl font-bold mt-5">About Us</h1>
</div>

<div className="flex flex-col justify-center items-center w-[90%] sm:w-[80%] md:w-1/2 lg:w-1/2 mt-5 text-center mb-5 text-base sm:text-lg md:text-xl leading-relaxed">
  At Student with Benefits, we are dedicated to empowering university students
  by providing them with a platform designed to make their lives more
  affordable, connected, and convenient.
  <br />
  <br />
  Founded with the vision of supporting students during one of the most pivotal
  phases of their lives, Student with Benefits is more than just an app, it’s a
  movement.
</div>

<MissionVision/>
<BubbleAnimation/>


    
    </div>
  );
}

function App() {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      x: -200,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: 200,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content area */}
      <div className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Dashboard />
                </motion.div>
              }
            />
            <Route
              path="/partner"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Partner />
                </motion.div>
              }
            />
            <Route
              path="/deliver"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Deliver />
                </motion.div>
              }
            />
            <Route
              path="/careers"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Careers />
                </motion.div>
              }
            />
             <Route
              path="/contactUs"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ContactUs/>
                </motion.div>
              }
            />
            <Route
              path="/privacy"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Privacy />
                </motion.div>
              }
            />
            <Route
              path="/media"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Media />
                </motion.div>
              }
            />
            <Route
              path="/jobs"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Jobs />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
