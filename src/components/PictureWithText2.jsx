import React from "react";
import Paragraph3 from "../assets/paragraph3.png"

const PictureWithText2 = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center bg-white rounded-lg md:space-y-0 md:space-x-6">
      {/* Image on the Left */}
      <div className="w-full md:w-1/3 flex justify-start mb-10">
        <img
          src={Paragraph3} // Replace with your image URL
          alt="Sample Title"
          className="rounded-lg object-cover max-h-72 w-full" // Increased max height
        />
      </div>

      {/* Text on the Right */}
      <div className="w-full md:w-2/3 text-center md:text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Increased Foot Traffic
        </h2>
        <p className="text-gray-600">
        Attract a steady stream of young, enthusiastic customers eager to discover and support local businesses.
        </p>
      </div>
    </div>
  );
};

export default PictureWithText2;