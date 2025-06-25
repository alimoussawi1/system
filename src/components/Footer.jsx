// import React from "react";
// import apple from "../assets/appstore.webp";
// import android from "../assets/playstore.webp";
// import whatsapp from "../assets/whatsapp.png";
// import instagram from "../assets/instagram.png"
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// function Footer() {
//   return (
//     <footer className="bg-gray-100 py-4">
//       <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
//         {/* Contact & Privacy Links */}
//         <div className="flex flex-row gap-4 text-gray-600">
//           <div className="flex gap-4 mt-4 mr-4">
//             <Link to="/contactUs" className="hover:text-[#10758B]">Contact Us</Link>
//             <Link to="/privacy" className="hover:text-[#10758B]">Privacy Policy</Link>
//           </div>

//           <div className="flex space-x-4 items-center mt-3">
//             {/* Instagram */}
//             <a
//               href="https://www.instagram.com/studentwithbenefits?igsh=MXc2c2ZpM2VuZmpqNg=="
//               target="_blank"
//               rel="noopener noreferrer"
//               className=" text-3xl"
//             >
//               <FontAwesomeIcon icon={faInstagram} />
//             </a>

//             {/* WhatsApp */}
//             <a
//               href="https://wa.me/+96170009879"
//               target="_blank"
//               rel="noopener noreferrer"
//               className=" text-3xl"
//             >
//               <FontAwesomeIcon icon={faWhatsapp} />
//             </a>
//           </div>

//         </div>

//         {/* Download Our App Section */}
//         <div className="flex flex-row gap-4 items-center">
//           <a
//             href="https://apps.apple.com/lb/app/student-with-benefits/id6590629020"
//             className="inline-block"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img src={apple} alt="Download on App Store" className="w-[150px]" />
//           </a>
//           <a
//             href="https://play.google.com/store/apps/details?id=com.alimoussawi.swb&pcampaignid=web_share"
//             className="inline-block"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img src={android} alt="Get it on Google Play" className="w-[150px]" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-8">

          {/* Contact & Privacy Links */}
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex gap-6">
              <Link
                to="/contactUs"
                className="text-gray-300 hover:text-cyan-400 hover:scale-105 transition-all duration-300 font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-cyan-400 hover:scale-105 transition-all duration-300 font-medium"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex space-x-6 items-center">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/studentwithbenefits?igsh=MXc2c2ZpM2VuZmpqNg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group shadow-lg"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-xl group-hover:rotate-12 transition-transform"
                />
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com/channel/0029Vb8qdbvHbFVBLAxYgi2M"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group shadow-lg"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-xl group-hover:rotate-12 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Download Our App Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* App Store */}
            <a
              href="https://apps.apple.com/lb/app/student-with-benefits/id6590629020"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[180px] h-[50px] flex items-center justify-center  rounded-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                alt="Download on the App Store"
                className="object-contain h-full w-full"
              />
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.alimoussawi.swb&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[180px] h-[50px] flex items-center justify-center rounded-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                alt="Get it on Google Play"
                className="object-contain h-full w-full"
              />
            </a>
          </div>


        </div>
      </div>
    </footer>
  );
}

export default Footer;
