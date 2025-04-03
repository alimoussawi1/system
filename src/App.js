import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import Footer component
import Main from "./assets/dashboard.png";
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
import Intro from "./assets/intro.mp4"
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./components/LoginPage";
import Admin from "./components/Admin";
import DefaultLayout from "./layouts/DeaultLayout";
import BusinessLayout from "./layouts/BusinessLayout";
import BusinessDashboard from "./businessComponents/businessDashbaord";
import ScannedCustomers from "./businessComponents/scannedCustomers";
import Offers from "./businessComponents/offers";
import Packages from "./businessComponents/Packages";
import Success from "./businessComponents/Sucess";
import PaymentFailed from "./businessComponents/Failed";
import Payments from "./businessComponents/Payments";
import ContractComponent from "./businessComponents/Contracts";
import ProtectedRoute from "./businessComponents/ProtectedRoute";
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
          Simplify student life by offering exclusive opportunities that help students save money, build connections, and make the most of their university years.
          We strive to create a supportive ecosystem that empowers students to thrive both socially and academically.
        </p>
      </div>

      {/* Our Vision Section */}
      <div
        className="w-full max-w-lg p-6 rounded-2xl text-white h-auto lg:h-[200px] flex flex-col"
        style={{ backgroundColor: "#5843aa" }}
      >
        <h2 className="text-xl font-bold mb-4 text-left">Our Vision</h2>
        <p className="flex-grow">
          Become the go-to platform for university students worldwide,
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
      >
        <video
          src={Intro}
          autoPlay


          muted
          playsInline
          controls={false}


          className="w-full h-full object-cover"
        />
        <div
          className="absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 bg-[#02afde] text-black rounded-lg px-6 py-3 flex items-center cursor-pointer shadow-lg mb-10
          md:px-5 md:py-2.5 md:text-base lg:px-6 lg:py-3 lg:text-lg"
          onClick={handleDownload}
        >
          <FaDownload className="mr-2 text-lg md:text-base sm:text-sm" />
          <p className="font-medium md:text-base sm:text-sm">Download Now</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-center text-center">
        <h1 className="italic text-lg sm:text-xl mt-5">
          Student Life Made Easy
        </h1>
        <h1 className="text-3xl text-[#5843aa] sm:text-4xl font-bold mt-5">About Us</h1>
      </div>

      <div className="flex flex-col justify-center items-center w-[90%] sm:w-[80%] md:w-1/2 lg:w-1/2 mt-5 text-center mb-5 text-base sm:text-lg md:text-xl leading-relaxed">
        At Student with Benefits, we are committed to enhancing the university experience by making student life more connected, convenient, and cost-efficient.
        <br />
        <br />
        More than just an app, we are a community-driven platform that bridges the gap between students and businesses, providing exclusive deals, resources, and opportunities that support students throughout their academic journey.
      </div>

      <MissionVision />
      <BubbleAnimation />
    </div>
  );
}


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");


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

      <ScrollToTop />
      {/* Main content area */}
      <div className={`flex-grow ${!isAdminRoute ? "pt-20" : ""}`}>

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Dashboard />
                  </motion.div>

                </DefaultLayout>

              }
            />
            <Route
              path="/partner"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Partner />
                  </motion.div>
                </DefaultLayout>
              }
            />
            <Route
              path="/deliver"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Deliver />
                  </motion.div>
                </DefaultLayout>
              }
            />
            <Route
              path="/careers"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Careers />
                  </motion.div>
                </DefaultLayout>
              }
            />
            <Route
              path="/contactUs"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <ContactUs />
                  </motion.div>
                </DefaultLayout>
              }

            />
            <Route
              path="/admin"
              element={
                <BusinessLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Admin />
                  </motion.div>

                </BusinessLayout>

              }
            />
            <Route
              path="/privacy"
              element={
                <DefaultLayout>


                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Privacy />
                  </motion.div>
                </DefaultLayout>
              }
            />
            <Route
              path="/media"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Media />
                  </motion.div>
                </DefaultLayout>
              }
            />
            <Route
              path="/jobs"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Jobs />
                  </motion.div>
                </DefaultLayout>
              }
            />

            <Route
              path="/login"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <LoginPage />
                </motion.div>
              }
            />
            {/* Business*/}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <BusinessDashboard />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/scanned-customers"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ScannedCustomers />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/offers"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Offers />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/packages"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Packages />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/success"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Success />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>

              }
            />
            <Route
              path="/admin/failed"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <PaymentFailed />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Payments />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contracts"
              element={
                <ProtectedRoute>
                  <BusinessLayout>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ContractComponent />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />

          </Routes>
        </AnimatePresence>




      </div>


    </div>
  );
}

export default App;
