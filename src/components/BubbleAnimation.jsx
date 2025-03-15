import React from "react";
import { motion } from "framer-motion";

// Import all images from SWBPhotos
import Pasta from "../assets/SWBPhotos/1-2-3 Pasta.jpg";
import AlSafaPadel from "../assets/SWBPhotos/Al Safa Padel.jpg";
import AthleteFactory from "../assets/SWBPhotos/Athlete Factory.jpg";
import B60 from "../assets/SWBPhotos/B60.jpg";
import Bar35 from "../assets/SWBPhotos/Bar 35.jpg";
import Beeway from "../assets/SWBPhotos/Beeway.jpg";
import BrainFactory from "../assets/SWBPhotos/Brain Factoy.jpg";
import Burgers from "../assets/SWBPhotos/Burgers 2 .jpg";
import CHKN from "../assets/SWBPhotos/CHKN.CO.jpg";
import ChicksALot from "../assets/SWBPhotos/Chicks A lot.jpg";
import CraveBurger from "../assets/SWBPhotos/Crave's Burger.jpg";
import Dippers from "../assets/SWBPhotos/Dippers.jpg";
import Doughvincy from "../assets/SWBPhotos/Doughvincy.jpg";
import DrKafta from "../assets/SWBPhotos/Dr Kafta.jpg";
import FireFly from "../assets/SWBPhotos/FireFly burger.jpg";
import FlyingFrog from "../assets/SWBPhotos/Flying Frog.jpg";
import Fuego from "../assets/SWBPhotos/Fuego Beirut.jpg";
import KibbeKitchen from "../assets/SWBPhotos/Kibbe kitchen.jpg";
import KitchenLab from "../assets/SWBPhotos/Kitchen Lab.jpg";
import KurvPilates from "../assets/SWBPhotos/Kurv Pilates.jpg";
import LunaVillage from "../assets/SWBPhotos/Luna's village.jpg";
import MOBFood from "../assets/SWBPhotos/MOB's Food.jpg";
import MXAcademy from "../assets/SWBPhotos/MX academy.jpg";
import MusicHub from "../assets/SWBPhotos/Music Hub.jpg";
import PapaMiaTacos from "../assets/SWBPhotos/Papa mia tacos.jpg";
import Pervurt from "../assets/SWBPhotos/Pervurt.jpg";
import PhoenixParagliding from "../assets/SWBPhotos/Phoenix Paragliding Lebanon.jpg";
import PizzaGuys from "../assets/SWBPhotos/Pizza guys.jpg";
import SOULGarden from "../assets/SWBPhotos/SOUL garden.jpg";
import Wingman from "../assets/SWBPhotos/Wingman.jpg";
import KababObeid from "../assets/SWBPhotos/Kabab Obeid.jpg";
import ClassicoArena from "../assets/SWBPhotos/Classico Arena.jpg";
import SkyFall from "../assets/SWBPhotos/SkyFall.jpg";
import SloppyJoes from "../assets/SWBPhotos/Sloppy Joes.jpg";
import SweetBar from "../assets/SWBPhotos/Sweet Bar.jpg";
import XnDoughs from "../assets/SWBPhotos/XnDoughs.jpg";
import ZawiyatFarah from "../assets/SWBPhotos/Zawiyat farah.jpg";

// Import all images from Logo Fixed
import BillyBoyz from "../assets/Logo Fixed/Billy Boyz.png";
import Smushkies from "../assets/Logo Fixed/Smushkies.png";
import Appetito from "../assets/Logo Fixed/appetito.PNG";
import LosSabores from "../assets/Logo Fixed/los sabores.png";
import PersianCup from "../assets/Logo Fixed/persian cup.png";
import GoTango from "../assets/Logo Fixed/Go tango.png";
import TucTaco from "../assets/Logo Fixed/TUC TACO.JPG";
import CafeYounes from "../assets/Logo Fixed/cafe younes.jpg";
import Machrou3Cafe from "../assets/Logo Fixed/machrou3 cafe.png";
import PlushCafe from "../assets/Logo Fixed/plush cafe.png";
import HookaTimes from "../assets/Logo Fixed/hooka times.png";
import MYFitLife from "../assets/Logo Fixed/MY fit life.JPG";
import MiskBeirut from "../assets/Logo Fixed/Misk beirut.jpg";
import Miniguette from "../assets/Logo Fixed/miniguette.png";
import NabuMuseum from "../assets/Logo Fixed/nabu museum.png";
import TheBakeAtelier from "../assets/Logo Fixed/The Bake Atelier.jpg";
import Agonista from "../assets/Logo Fixed/agonista.jpg";
import ZmrdSocialSpace from "../assets/Logo Fixed/zmrd social space.png";

// Define fixed rows
const allImages = [
  Pasta, AlSafaPadel, AthleteFactory, B60, Bar35, Beeway, BrainFactory, Burgers, CHKN, ChicksALot, CraveBurger, Dippers, Doughvincy, DrKafta, FireFly, FlyingFrog, Fuego, KibbeKitchen, KitchenLab, KurvPilates, LunaVillage, MOBFood, MXAcademy, MusicHub, PapaMiaTacos, Pervurt, PhoenixParagliding, PizzaGuys, SOULGarden, Wingman, KababObeid, ClassicoArena, SkyFall, SloppyJoes, SweetBar, XnDoughs, ZawiyatFarah,
  BillyBoyz, Smushkies, Appetito, LosSabores, PersianCup, GoTango, TucTaco, CafeYounes, Machrou3Cafe, PlushCafe, HookaTimes, MYFitLife, MiskBeirut, Miniguette, NabuMuseum, TheBakeAtelier, Agonista, ZmrdSocialSpace
];

const rows = [
  allImages.slice(0, Math.ceil(allImages.length / 3)),
  allImages.slice(Math.ceil(allImages.length / 3), Math.ceil((allImages.length * 2) / 3)),
  allImages.slice(Math.ceil((allImages.length * 2) / 3))
];

const InfiniteRow = ({ images, speed }) => {
  return (
    <motion.div
      className="flex items-center gap-6 whitespace-nowrap my-11"
      style={{ width: "max-content" }}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
    >
      {[...images, ...images].map((image, index) => (
        <div
          key={index}
          className="flex items-center justify-center flex-shrink-0 rounded-full shadow-md"
          style={{ width: "120px", height: "120px", overflow: "hidden" }}
        >
          <img src={image} alt={`Logo ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </motion.div>
  );
};


const BubbleAnimation = () => {
  return (
    <div className="relative w-full overflow-hidden py-6 bg-white">
      {rows.map((row, rowIndex) => (
        <InfiniteRow key={rowIndex} images={row} speed={30 + rowIndex * 5} />
      ))}
    </div>
  );
};

export default BubbleAnimation;