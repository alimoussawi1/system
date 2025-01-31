import React from "react";
import { motion } from "framer-motion";

const titles = [
  "Appetito",
  "Mayrig",
  "Batchig",
  "Ahwet Ras Beirut",
  "Music Hub",
  "Per-Vurt",
  "Chicks A Lot",
  "Miniguette",
  "Fitness Zone",
  "Dr Kafta",
  "Multiverse",
  "Volcano Karting",
  "Wave Bike",
  "Craving Pizza Guys",
  "Serve Tennis Academy",
  "Abajour Beirut",
  "Humburg",
  "Machrou3 Cafe",
  "Munchease Diner",
  "Dippers",
  "Creative Ness",
  "Club House",
  "The Nook",
  "Kibbe Kitchen",
  "Kitchen Lab",
  "Beeway Scooter",
  "Padel 961",
  "Wingman",
  "MX Academy",
  "Cloudy Bites",
  "Hamra Urban Gardens",
  "Kurv Pilates",
  "Bayt em Nazih",
  "Sloppy Joes",
  "TUC TACO",
  "Mob’s Burger",
  "Crepaway",
  "Hayat Doner",
  "Agonista",
  "Beit Al Shawarma",
  "The Koozpace"
];

// Duplicate the titles array to create a seamless loop
const loopedTitles = [...titles, ...titles];

function BubbleAnimation() {
  return (
    <div className="relative w-full overflow-hidden whitespace-nowrap py-6">
      <motion.div
        className="flex gap-4 px-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        style={{ display: "flex", width: "max-content" }} // Ensures smooth looping
      >
        {loopedTitles.map((title, index) => (
          <div
            key={index}
            className={`flex-shrink-0 px-6 py-3 rounded-full shadow-md text-center text-white ${
              index % 2 === 0 ? "bg-[#5843aa]" : "bg-[#02afde]"
            }`}
          >
            {title}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default BubbleAnimation;
