import React from "react";
import { motion } from "framer-motion";
import SWB from "../assets/swblogo.png"; // Ensure this path is correct

// List of places (all using SWB logo)
const places = [
  "Appetito", "Mayrig", "Batchig", "Ahwet Ras Beirut", "Music Hub", "Per-Vurt",
  "Chicks A Lot", "Miniguette", "Fitness Zone", "Dr Kafta", "Multiverse",
  "Volcano Karting", "Wave Bike", "Craving Pizza Guys", "Serve Tennis Academy",
  "Abajour Beirut", "Humburg", "Machrou3 Cafe", "Munchease Diner", "Dippers",
  "Creative Ness", "Club House", "The Nook", "Kibbe Kitchen", "Kitchen Lab",
  "Beeway Scooter", "Padel 961", "Wingman", "MX Academy", "Cloudy Bites",
  "Hamra Urban Gardens", "Kurv Pilates", "Bayt em Nazih", "Sloppy Joes",
  "TUC TACO", "Mob’s Burger", "Crepaway", "Hayat Doner", "Agonista",
  "Beit Al Shawarma", "The Koozpace"
];

// Function to divide places into 3 rows
const splitIntoRows = (array, numRows) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(array.filter((_, index) => index % numRows === i));
  }
  return rows;
};

const rows = splitIntoRows([...places, ...places, ...places], 3); // Duplicate enough for a continuous effect

function BubbleAnimation() {
  return (
    <div className="relative w-full overflow-hidden py-6 bg-white">
      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className="flex gap-6"
          animate={{ x: rowIndex % 2 === 0 ? ["0%", "-100%"] : ["-100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 40 + rowIndex * 10, ease: "linear" }} // Smooth looping
          style={{ display: "flex", width: "max-content" }} // Ensures continuous flow
        >
          {row.map((place, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-2 flex-shrink-0 bg-white rounded-full shadow-md text-black"
              style={{ width: "120px", height: "120px" }} // Circular bubbles
            >
              {/* <img
                src={SWB}
                alt="SWB Logo"
                className="w-10 h-10 rounded-full"
              /> */}
              <span className="text-xs font-medium text-center">{place}</span>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default BubbleAnimation;
