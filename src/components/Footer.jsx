import React from "react";
import apple from "../assets/appstore.webp";
import android from "../assets/playstore.webp";
import vid from "../assets/footerVideo.MP4"
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-6xl flex flex-row justify-between items-center text-center">
        {/* Video Section */}
        <div className=" md:mb-0">
          <video
            src={vid}
            className="w-[100px] h-[100px] rounded-lg h-[200px]"
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div className="sm:ml-1">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Contact</h3>
          <p className="text-gray-600">
          <Link to="/contactUs" className="hover:text-[#10758B]">
  Contact Us
</Link>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Legal</h3>
          <p className="text-gray-600">
          <Link to="/privacy" className="hover:text-[#10758B]">
  Privacy Policy
</Link>
          </p>
        </div>


        {/* Download Our App Section */}
        <div>
          {/* <h3 className="text-lg font-bold text-gray-800 mb-4">
            Download Our App
          </h3> */}
          <div className="flex flex-col gap-4">
            <a
              href="https://apps.apple.com/lb/app/student-with-benefits/id6590629020"
              className="inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={apple} alt="apple" className="w-[150px]" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.omarnaous.swb"
              className="inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={android} alt="android" className="w-[150px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
