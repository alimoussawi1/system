import React from "react";
import apple from "../assets/appstore.webp";
import android from "../assets/playstore.webp";
import whatsapp from "../assets/whatsapp.png";
import instagram from "../assets/instagram.png"
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center gap-4">
        {/* Contact & Privacy Links */}
        <div className="flex flex-row gap-4 text-gray-600">
          <div className="flex gap-4 mt-4 mr-4">
            <Link to="/contactUs" className="hover:text-[#10758B]">Contact Us</Link>
            <Link to="/privacy" className="hover:text-[#10758B]">Privacy Policy</Link>
          </div>

          <div className="flex ">
            <div className="mt-3">
              <a
                href="https://www.instagram.com/studentwithbenefits?igsh=MXc2c2ZpM2VuZmpqNg=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="Instagram" className="w-[30px] h-[30px]" />
              </a>

            </div>
            <div>
              <a
                href="https://wa.me/+96170009879"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsapp} alt="WhatsApp" className="w-[70px] h-[50px]" />
              </a>

            </div>


          </div>
        </div>

        {/* Download Our App Section */}
        <div className="flex flex-row gap-4 items-center">
          <a
            href="https://apps.apple.com/lb/app/student-with-benefits/id6590629020"
            className="inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={apple} alt="Download on App Store" className="w-[150px]" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.alimoussawi.swb&pcampaignid=web_share"
            className="inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={android} alt="Get it on Google Play" className="w-[150px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
