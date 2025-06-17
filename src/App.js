import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
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
import AccessCenter from "./businessComponents/AccessCenter";
import News from "./components/News";
import Businesses from "./components/Businesses";
import Subscriptions from "./components/Subscriptions";
import Articles from "./components/Articles";
import { Download, ArrowRight, Target, Eye, MapPin, Sparkles } from 'lucide-react';
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
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Our Mission Section */}
        <div className="group">
          <div
            className="p-8 rounded-2xl text-white h-full flex flex-col transition-transform duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#02afde" }}
          >
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg leading-relaxed flex-grow">
              Simplify student life by offering exclusive opportunities that help students save money, build connections, and make the most of their university years.
              We strive to create a supportive ecosystem that empowers students to thrive both socially and academically.
            </p>
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="group">
          <div
            className="p-8 rounded-2xl text-white h-full flex flex-col transition-transform duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#5843aa" }}
          >
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-lg leading-relaxed flex-grow">
              Become the go-to platform for university students worldwide,
              fostering a community that bridges the gap between students and
              businesses, while creating opportunities that extend beyond education.
            </p>
          </div>
        </div>
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

      <div className="mt-16 flex flex-col items-center justify-center text-center px-4">
        <h2 className="italic text-xl sm:text-2xl text-gray-600 mb-4">
          Student Life Made Easy
        </h2>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#5843aa] font-bold mb-8">
          About Us
        </h1>

        <div className="max-w-4xl text-lg sm:text-xl leading-relaxed text-gray-700 mb-12">
          <p className="mb-6">
            At <span className="font-semibold text-[#5843aa]">Student with Benefits</span>, we are committed to enhancing the university experience by making student life more connected, convenient, and cost-efficient.
          </p>
          <p>
            More than just an app, we are a community-driven platform that bridges the gap between students and businesses, providing exclusive deals, resources, and opportunities that support students throughout their academic journey.
          </p>
        </div>
      </div>

      <MissionVision />
      <div className="w-full max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#cae1fd] to-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#cae1fd]/30">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Journey & Impact
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Discover how we've grown from a startup idea to reaching over 10,000 students across Lebanon. Read about our challenges, victories, and the incredible community we've built together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-600">
                <span className="bg-white px-3 py-1 rounded-full">📊 10,000+ Students</span>
                <span className="bg-white px-3 py-1 rounded-full">🤝 300+ Business Partners</span>
                <span className="bg-white px-3 py-1 rounded-full">🎯 Real Impact Stories</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link to='/articles'>

                Read Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-[#02afde]" />
          Explore Our Places
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover the newest and trendiest spots on SWB Mobile App, where exclusive promotions and unforgettable adventures await to elevate your experience.
        </p>
      </div>

      <BubbleAnimation />
    </div>
  );
}


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/login");



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
    <div className="flex flex-col min-h-screen ">

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
              path="/articles"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Articles />
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
            />      <Route
              path="/news"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <News />

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
              path="/admin/access-center"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <AccessCenter />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/business"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Businesses />
                    </motion.div>
                  </BusinessLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subscriptions"
              element={
                <ProtectedRoute>
                  <BusinessLayout>


                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Subscriptions />
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
