import React from "react";
import { motion } from "framer-motion";

// Import all images from SWBPhotos

import image1 from "../assets/SWB-WEBP/1.webp";
import image2 from "../assets/SWB-WEBP/2.webp";
import image3 from "../assets/SWB-WEBP/3.webp";
import image4 from "../assets/SWB-WEBP/4.webp";
import image5 from "../assets/SWB-WEBP/5.webp";
import image6 from "../assets/SWB-WEBP/6.webp";
import image7 from "../assets/SWB-WEBP/7.webp";
import image8 from "../assets/SWB-WEBP/8.webp";
import image9 from "../assets/SWB-WEBP/9.webp";
import image10 from "../assets/SWB-WEBP/10.webp";
import image11 from "../assets/SWB-WEBP/11.webp";
import image12 from "../assets/SWB-WEBP/12.webp";
import image13 from "../assets/SWB-WEBP/13.webp";
import image14 from "../assets/SWB-WEBP/14.webp";
import image15 from "../assets/SWB-WEBP/15.webp";
import image16 from "../assets/SWB-WEBP/16.webp";
import image17 from "../assets/SWB-WEBP/17.webp";
import image18 from "../assets/SWB-WEBP/18.webp";
import image19 from "../assets/SWB-WEBP/19.webp";
import image20 from "../assets/SWB-WEBP/20.webp";
import image21 from "../assets/SWB-WEBP/21.webp";
import image22 from "../assets/SWB-WEBP/22.webp";
import image23 from "../assets/SWB-WEBP/23.webp";
import image24 from "../assets/SWB-WEBP/24.webp";
import image25 from "../assets/SWB-WEBP/25.webp";
import image26 from "../assets/SWB-WEBP/26.webp";
import image27 from "../assets/SWB-WEBP/27.webp";
import image28 from "../assets/SWB-WEBP/28.webp";
import image29 from "../assets/SWB-WEBP/29.webp";
import image30 from "../assets/SWB-WEBP/30.webp";
import image31 from "../assets/SWB-WEBP/31.webp";
import image32 from "../assets/SWB-WEBP/32.webp";
import image33 from "../assets/SWB-WEBP/33.webp";
import image34 from "../assets/SWB-WEBP/34.webp";
import image35 from "../assets/SWB-WEBP/35.webp";
import image36 from "../assets/SWB-WEBP/36.webp";
import image37 from "../assets/SWB-WEBP/37.webp";
import image38 from "../assets/SWB-WEBP/38.webp";
import image39 from "../assets/SWB-WEBP/39.webp";
import image40 from "../assets/SWB-WEBP/40.webp";
import image41 from "../assets/SWB-WEBP/41.webp";
import image42 from "../assets/SWB-WEBP/42.webp";
import image43 from "../assets/SWB-WEBP/43.webp";
import image44 from "../assets/SWB-WEBP/44.webp";
import image45 from "../assets/SWB-WEBP/45.webp";
import image46 from "../assets/SWB-WEBP/46.webp";
import image47 from "../assets/SWB-WEBP/47.webp";
import image48 from "../assets/SWB-WEBP/48.webp";
import image49 from "../assets/SWB-WEBP/49.webp";
import image50 from "../assets/SWB-WEBP/50.webp";
import image51 from "../assets/SWB-WEBP/51.webp";
import image52 from "../assets/SWB-WEBP/52.webp";
import image53 from "../assets/SWB-WEBP/53.webp";
import image54 from "../assets/SWB-WEBP/54.webp";
import image55 from "../assets/SWB-WEBP/55.webp";
import image56 from "../assets/SWB-WEBP/56.webp";
import image57 from "../assets/SWB-WEBP/57.webp";

import image59 from "../assets/SWB-WEBP/59.webp";
import image60 from "../assets/SWB-WEBP/60.webp";
import image61 from "../assets/SWB-WEBP/61.webp";
import image62 from "../assets/SWB-WEBP/62.webp";
import image63 from "../assets/SWB-WEBP/63.webp";

import image65 from "../assets/SWB-WEBP/65.webp";
import image66 from "../assets/SWB-WEBP/66.webp";
import image67 from "../assets/SWB-WEBP/67.webp";
import image68 from "../assets/SWB-WEBP/68.webp";
import image69 from "../assets/SWB-WEBP/69.webp";
import image70 from "../assets/SWB-WEBP/70.webp";
import image71 from "../assets/SWB-WEBP/71.webp";

import image73 from "../assets/SWB-WEBP/73.webp";
import image74 from "../assets/SWB-WEBP/74.webp";
import image75 from "../assets/SWB-WEBP/75.webp";
import image76 from "../assets/SWB-WEBP/76.webp";
import image77 from "../assets/SWB-WEBP/77.webp";
import image78 from "../assets/SWB-WEBP/78.webp";
import image79 from "../assets/SWB-WEBP/79.webp";
import image80 from "../assets/SWB-WEBP/80.webp";
import image81 from "../assets/SWB-WEBP/81.webp";
import image82 from "../assets/SWB-WEBP/82.webp";
import image83 from "../assets/SWB-WEBP/83.webp";
import image84 from "../assets/SWB-WEBP/84.webp";
import image85 from "../assets/SWB-WEBP/85.webp";
import image86 from "../assets/SWB-WEBP/86.webp";
import image87 from "../assets/SWB-WEBP/87.webp";
import image88 from "../assets/SWB-WEBP/88.webp";
import image89 from "../assets/SWB-WEBP/89.webp";
import image90 from "../assets/SWB-WEBP/90.webp";
import image91 from "../assets/SWB-WEBP/91.webp";
import image92 from "../assets/SWB-WEBP/92.webp";
import image93 from "../assets/SWB-WEBP/93.webp";
import image94 from "../assets/SWB-WEBP/94.webp";
import image95 from "../assets/SWB-WEBP/95.webp";
import image96 from "../assets/SWB-WEBP/96.webp";
import image97 from "../assets/SWB-WEBP/97.webp";
import image98 from "../assets/SWB-WEBP/98.webp";
import image99 from "../assets/SWB-WEBP/99.webp";
import image100 from "../assets/SWB-WEBP/100.webp";
import image101 from "../assets/SWB-WEBP/101.webp";
import image102 from "../assets/SWB-WEBP/102.webp";
import image103 from "../assets/SWB-WEBP/103.webp";
import image104 from "../assets/SWB-WEBP/104.webp";

// Define fixed rows
const allImages = [
  image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
  image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
  image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
  image31, image32, image33, image34, image35, image36, image37, image38, image39, image40,
  image41, image42, image43, image44, image45, image46, image47, image48, image49, image50,
  image51, image52, image53, image54, image55, image56, image57, image59, image60,
  image61, image62, image63, image65, image66, image67, image68, image69, image70,
  image71, image73, image74, image75, image76, image77, image78, image79, image80,
  image81, image82, image83, image84, image85, image86, image87, image88, image89, image90,
  image91, image92, image93, image94, image95, image96, image97, image98, image99, image100,
  image101, image102, image103, image104
];


const rows = [
  allImages.slice(0, Math.ceil(allImages.length / 3)),
  allImages.slice(Math.ceil(allImages.length / 3), Math.ceil((allImages.length * 2) / 3)),
  allImages.slice(Math.ceil((allImages.length * 2) / 3))
];

const InfiniteRow = ({ images, speed, direction }) => {
  return (
    <motion.div
      className="flex items-center gap-6 whitespace-nowrap my-11"
      style={{ width: "max-content" }}
      animate={{ x: direction === "left" ? ["-50%", "0%"] : ["0%", "-50%"] }}
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
        <InfiniteRow
          key={rowIndex}
          images={row}
          speed={30 + rowIndex * 5}
          direction={rowIndex % 2 === 0 ? "left" : "right"} // Odd rows move right, even rows move left
        />
      ))}
    </div>
  );
};

export default BubbleAnimation;
