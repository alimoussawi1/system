import React from "react";
import { motion } from "framer-motion";

const titles = [
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
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {titles.map((title, index) => (
        <motion.div
          key={index}
          className="absolute bg-[#5843aa] text-white flex items-center justify-center px-4 py-2 rounded-full shadow-lg font-medium"
          style={{
            width: "120px",
            height: "120px",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150],
            y: [0, Math.random() * 300 - 150],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: Math.random() * 5 + 4,
          }}
        >
          <p className="text-center text-sm">{title}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default BubbleAnimation;
