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
  "Beeway Scooter",
  "Padel 961",
  "Wingman",
  "Cloudy Bites",
  "Kurv Pilates",
  "Bayt em Nazih",
  "Sloppy Joes",
  "Mob’s Burger",
  "Crepaway",
  "Appetito Beirut",
  "Hayat Doner",
  "Agonista",
  "Beit Al Shawarma",
  
];

function BubbleAnimation() {
  return (
    <div className="relative w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-6">
      <motion.div
        className="flex gap-4 px-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {titles.map((title, index) => (
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
