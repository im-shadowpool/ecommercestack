"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCreative } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "./Carousel.css";

const images = [
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-1.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-2.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-3.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-4.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-5.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-6.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-7.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-8.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-9.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-10.png",
  "https://www.eucaonline.com.au/media/banner/2024/euca-new-banner-11.png",
  "https://www.eucaonline.com.au/media/banner/tenpercent_adjusted_banner.png",
  "https://www.eucaonline.com.au/media/banner/starter-kit-banner-2024.png",
];

const names = ["Autralian made and owned", "Low Allergenic", "No Nasty Chemicals", "A better clean"];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="home-top-slider relative w-full h-[88vh] overflow-hidden">
      <Swiper
        modules={[Pagination, EffectCreative]}
        effect="creative"
        speed={800} // 🔥 Slow sliding effect (1.2s)
        creativeEffect={{
          prev: { opacity: 0.8, scale: 1, translate: ["-100%", 0, -1] },
          next: { translate: ["100%", 0, 0], opacity: 1, scale: 1.4 },
        }}
        
        loop={true}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <motion.img
              src={src}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Names appearing on each slide change with staggered animation */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 space-y-24 z-[1]">
        {names.map((name, index) => (
          <motion.div
            key={`${currentIndex}-${index}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 1 + 0.3 * index,
                duration: 1.2,
                ease: [0.25, 1, 0.5, 1], // Cubic Bezier
              },
            }}
            className="text-white font-semibold uppercase text-sm"
          >
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;