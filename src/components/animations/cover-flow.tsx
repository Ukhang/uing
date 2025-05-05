"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const defaultAlbums = [
  "https://lastfm.freetls.fastly.net/i/u/300x300/2c4113a4cf750427dd390f8a3b2b8dc9.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/33ee3c8333bf4c0ea0baebd003813cca.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/69d057194658d532af3d1576ec6ed7c4.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/248f5294bb1d1d9fc088f41768a84dc8.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/07886c9f2d41c38b81fb25b6e6f78491.jpg"
];

export default function CoverFlow({ albums = defaultAlbums }) {
  const [active, setActive] = useState(2);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-10">
      <div className="relative w-full max-w-4xl h-72 flex items-center justify-center">
        {albums.map((src, i) => {
          const offset = i - active;
          const isActive = offset === 0;

          const scale = isActive ? 1 : 0.85;
          const translateX = offset * 130;
          const rotate = offset * 10;
          const zIndex = 20 - Math.abs(offset);
          const blur = Math.abs(offset) === 2 ? "blur-sm" : offset !== 0 ? "blur-xs" : "";

          return (
            <motion.img
              key={i}
              src={src}
              alt={`album-${i}`}
              onClick={() => setActive(i)}
              className={`absolute cursor-pointer rounded-xl shadow-xl object-cover transition-all duration-500 ${blur}`}
              style={{
                width: "150px",
                height: "150px",
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(0deg) rotateZ(${rotate}deg)`,
                zIndex
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          );
        })}
      </div>
    </div>
  );
}
