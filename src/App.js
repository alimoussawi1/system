
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
import anniversaryImage from "./assets/anniversary.jpeg"
import aliImage from "./assets/ali.png"
import { Calendar, Users, Building2, Trophy, Lightbulb, Award, Camera } from 'lucide-react';


import React, { useState, useEffect } from 'react';

import { Download, ArrowRight, Target, Eye, MapPin, Sparkles } from 'lucide-react';
import SWBAnniversaryArticle from "./components/swb1year";
import SWBEntrepreneurArticle from "./components/EmpowerStudents";
import EstimatorPage from "./components/estimatorPage";
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


const SWBEntrepreneurSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="bg-gradient-to-r from-[#cae1fd] via-white to-[#f0f8ff] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-[#cae1fd]/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#02afde] to-[#5843aa]" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(2, 175, 222, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(88, 67, 170, 0.1) 0%, transparent 50%)`
          }} />
        </div>

        {/* Entrepreneur Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">

        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 relative z-10">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            {/* Entrepreneur Header */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <Users className="w-5 h-5 text-[#02afde]" />
              <span className="text-sm font-medium text-[#02afde] uppercase tracking-wide">
                Empowering Students
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Student Entrepreneurs
              <span className="block bg-gradient-to-r from-[#02afde] to-[#5843aa] bg-clip-text text-transparent">
                Empowered to Shine
              </span>
            </h3>

            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              SWB provides a 100% free platform for student entrepreneurs to showcase their businesses, gain expert support, and grow through real partnerships. From creative shoots to strategic guidance, we're here to help your ideas flourish.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-white/50 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Opportunity for All</div>
                  <div className="text-xs text-gray-600">Students first, always</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-white/50 flex items-center gap-3">
                <Camera className="w-4 h-4 text-[#02afde]" />
                <div>
                  <div className="font-bold text-gray-900 text-sm">Professional Studio</div>
                  <div className="text-xs text-gray-600">High-quality content creation</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-white/50 flex items-center gap-3">
                <Award className="w-4 h-4 text-[#5843aa]" />
                <div>
                  <div className="font-bold text-gray-900 text-sm">Expert Support</div>
                  <div className="text-xs text-gray-600">From idea to impact</div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-white/50 flex items-center gap-3">
                <Users className="w-4 h-4 text-yellow-500" />
                <div>
                  <div className="font-bold text-gray-900 text-sm">Real Partnerships</div>
                  <div className="text-xs text-gray-600">Connect & collaborate</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex-shrink-0">
              <Link to='/empowering-students'>

                <button className="group bg-gradient-to-r from-[#02afde] to-[#5843aa] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto">
                  Discover How We Support Students
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Entrepreneur Image */}
          <div className="flex-shrink-0 w-full lg:w-96 xl:w-[28rem]">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-[#cae1fd]/30 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={aliImage} // imported image or URL
                    alt="Anniversary Celebration"
                    className="w-[24rem] h-[28rem] md:w-[28rem] md:h-[32rem] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
};



const SWBAnniversarySection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="bg-gradient-to-r from-[#cae1fd] via-white to-[#f0f8ff] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-[#cae1fd]/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#02afde] to-[#5843aa]" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(2, 175, 222, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(88, 67, 170, 0.1) 0%, transparent 50%)`
          }} />
        </div>

        {/* Anniversary Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">

        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 relative z-10">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            {/* Anniversary Header */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#02afde]" />
              <span className="text-sm font-medium text-[#02afde] uppercase tracking-wide">
                Celebrating One Year
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              SWB's Amazing
              <span className="block bg-gradient-to-r from-[#02afde] to-[#5843aa] bg-clip-text text-transparent">
                First Year Journey
              </span>
            </h3>

            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From a startup idea to transforming education across Lebanon. Discover our incredible journey, the challenges we overcame, and the amazing community of students, educators, and partners we've built together.
            </p>


            {/* Call to Action */}
            <div className="flex-shrink-0">
              <Link to='/one-year-anniversary'>
                <button className="group bg-gradient-to-r from-[#02afde] to-[#5843aa] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto">
                  Read Our Anniversary Story
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>



          </div>

          {/* Anniversary Image */}
          <div className="flex-shrink-0 w-full lg:w-96 xl:w-[28rem]">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative  rounded-2xl p-4  transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={anniversaryImage} // imported image or URL
                    alt="Anniversary Celebration"
                    className="w-[24rem] h-[28rem] md:w-[28rem] md:h-[32rem] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};


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


// function Dashboard() {
//   return (
//     <div className="flex flex-col items-center">
//       <div
//         className="relative w-full bg-cover bg-center h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px]"
//       >
//         <video
//           src={Intro}
//           autoPlay


//           muted
//           playsInline
//           controls={false}


//           className="w-full h-full object-cover"
//         />
//         <div
//           className="absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 bg-[#02afde] text-black rounded-lg px-6 py-3 flex items-center cursor-pointer shadow-lg mb-10
//           md:px-5 md:py-2.5 md:text-base lg:px-6 lg:py-3 lg:text-lg"
//           onClick={handleDownload}
//         >
//           <FaDownload className="mr-2 text-lg md:text-base sm:text-sm" />
//           <p className="font-medium md:text-base sm:text-sm">Download Now</p>
//         </div>
//       </div>

//       <div className="mt-16 flex flex-col items-center justify-center text-center px-4">
//         <h2 className="italic text-xl sm:text-2xl text-gray-600 mb-4">
//           Student Life Made Easy
//         </h2>
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#5843aa] font-bold mb-8">
//           About Us
//         </h1>

//         <div className="max-w-4xl text-lg sm:text-xl leading-relaxed text-gray-700 mb-12">
//           <p className="mb-6">
//             At <span className="font-semibold text-[#5843aa]">Student with Benefits</span>, we are committed to enhancing the university experience by making student life more connected, convenient, and cost-efficient.
//           </p>
//           <p>
//             More than just an app, we are a community-driven platform that bridges the gap between students and businesses, providing exclusive deals, resources, and opportunities that support students throughout their academic journey.
//           </p>
//         </div>
//       </div>

//       <MissionVision />
//       <div className="w-full max-w-6xl mx-auto px-4 py-16">
//         <div className="bg-gradient-to-r from-[#cae1fd] to-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#cae1fd]/30">
//           <div className="flex flex-col lg:flex-row items-center gap-8">
//             <div className="flex-1 text-center lg:text-left">
//               <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Our Journey & Impact
//               </h3>
//               <p className="text-lg text-gray-700 mb-6 leading-relaxed">
//                 Discover how we've grown from a startup idea to reaching over 10,000 students across Lebanon. Read about our challenges, victories, and the incredible community we've built together.
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-600">
//                 <span className="bg-white px-3 py-1 rounded-full">📊 10,000+ Students</span>
//                 <span className="bg-white px-3 py-1 rounded-full">🤝 300+ Business Partners</span>
//                 <span className="bg-white px-3 py-1 rounded-full">🎯 Real Impact Stories</span>
//               </div>
//             </div>

//             <div className="flex-shrink-0">
//               <Link to='/articles'>

//                 Read Our Story
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
//           <Sparkles className="w-10 h-10 text-[#02afde]" />
//           Explore Our Places
//         </h2>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//           Discover the newest and trendiest spots on SWB Mobile App, where exclusive promotions and unforgettable adventures await to elevate your experience.
//         </p>
//       </div>

//       <BubbleAnimation />
//     </div>
//   );
// }


function Dashboard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section with Dynamic Background */}
      <div className="relative w-full h-[100vh] min-h-[600px] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#02afde] transition-all duration-1000">
          {/* Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Mouse-following Glow Effect - Hidden on mobile for performance */}
          <div
            className="hidden sm:block absolute w-96 h-96 bg-white/10 rounded-full blur-3xl transition-all duration-300 ease-out pointer-events-none"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center w-full max-w-4xl">
            {/* Main Heading with Animation */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 animate-fade-in leading-tight">
                Student Life
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#cae1fd] to-[#cae1fd] leading-tight pb-1">
                  Reimagined
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed mt-3 sm:mt-5 px-2">
                Connect, Save, and Thrive with Lebanon's Ultimate Student Platform
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 px-2">
              {[
                { icon: '🎓', title: '10,000+', subtitle: 'Active Students' },
                { icon: '🤝', title: '500+', subtitle: 'Partner Businesses' },
                { icon: '💰', title: '20%', subtitle: 'Average Savings' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 hover:bg-white/20"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{item.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{item.title}</div>
                  <div className="text-sm sm:text-base text-white/80">{item.subtitle}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center z-0 relative px-4">
              <button
                onClick={handleDownload}
                className="group relative bg-gradient-to-r from-[#02afde] to-[#5843aa] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex justify-center items-center gap-2 sm:gap-3 w-full sm:w-auto max-w-xs sm:max-w-none text-center"
              >
                <FaDownload className="text-lg sm:text-xl group-hover:animate-bounce" />
                <span className="whitespace-nowrap">Download Now</span>
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* About Section */}
      <div className="mt-0 flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 md:py-16 w-full">
        <div className="relative mb-6 sm:mb-8">
          <h2 className="italic text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4">
            Student Life Made Easy
          </h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#5843aa] font-bold relative">
            About Us
            <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-r from-[#02afde] to-[#5843aa] rounded-full animate-pulse" />
          </h1>
        </div>

        <div className="max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-blue-100">
            <p className="mb-4 sm:mb-6">
              At <span className="font-semibold text-[#5843aa] bg-gradient-to-r from-[#5843aa] to-[#02afde] bg-clip-text text-transparent">Student with Benefits</span>, we are committed to enhancing the university experience by making student life more connected, convenient, and cost-efficient.
            </p>
            <p>
              More than just an app, we are a community-driven platform that bridges the gap between students and businesses, providing exclusive deals, resources, and opportunities that support students throughout their academic journey.
            </p>
          </div>
        </div>
      </div>

      <MissionVision />
      {/* entepreneur section*/}
      <SWBEntrepreneurSection />
      {/* Swb 1 year annivesary */}
      <SWBAnniversarySection />

      {/* Journey Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="bg-gradient-to-r from-[#cae1fd] via-white to-[#f0f8ff] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-[#cae1fd]/30 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#02afde] to-[#5843aa]" style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(2, 175, 222, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, rgba(88, 67, 170, 0.1) 0%, transparent 50%)`
            }} />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 relative z-10">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Our Journey & Impact
              </h3>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Discover how we've grown from a startup idea to reaching over 10,000 students across Lebanon. Read about our challenges, victories, and the incredible community we've built together.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start text-xs sm:text-sm text-gray-600">
                <span className="bg-white/80 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full shadow-sm border border-white/50">📊 10,000+ Students</span>
                <span className="bg-white/80 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full shadow-sm border border-white/50">🤝 500+ Business Partners</span>
                <span className="bg-white/80 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full shadow-sm border border-white/50">🎯 Real Impact Stories</span>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link to='/articles' className="block w-full lg:w-auto">
                <button className="group bg-gradient-to-r from-[#02afde] to-[#5843aa] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto">
                  Read Our Story
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="text-center mb-8 sm:mb-12 px-4 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#02afde] animate-spin-slow" />
          <span className="leading-tight">Explore Our Places</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
          Discover the newest and trendiest spots on SWB Mobile App, where exclusive promotions and unforgettable adventures await to elevate your experience.
        </p>
      </div>

      <BubbleAnimation />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        @media (max-width: 640px) {
          .hover\\:shadow-3xl:hover {
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
          }
        }
      `}</style>
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
              path="/estimator"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <EstimatorPage />
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
              path="/one-year-anniversary"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <SWBAnniversaryArticle />
                  </motion.div>

                </DefaultLayout>

              }
            />
            <Route
              path="/empowering-students"
              element={
                <DefaultLayout>
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <SWBEntrepreneurArticle />
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
