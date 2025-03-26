"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImage({ selectedSize }) {
  const [selectedImage, setSelectedImage] = useState(selectedSize.images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [transitionKey, setTransitionKey] = useState(0); // force re-render
  const [zoomStyle, setZoomStyle] = useState({
    backgroundImage: `url(${selectedSize.images[0]})`,
    display: "none",
  });
  const imgRef = useRef(null);

  useEffect(() => {
    setSelectedImage(selectedSize.images[0]);
    setCurrentIndex(0);
    setDirection(1); // Animate from right on size change
    setTransitionKey((prev) => prev + 1); // force transition
  }, [selectedSize]);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      borderRadius: "8px",
      zIndex: 10,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle((prev) => ({ ...prev, display: "none" }));
  };

  const goToPrevious = () => {
    if (selectedSize.images.length <= 1) return; // Prevent looping
    const newIndex = currentIndex === 0 ? selectedSize.images.length - 1 : currentIndex - 1;
    setDirection(-1);
    setCurrentIndex(newIndex);
    setSelectedImage(selectedSize.images[newIndex]);
    setTransitionKey((prev) => prev + 1);
  };
  
  const goToNext = () => {
    if (selectedSize.images.length <= 1) return; // Prevent looping
    const newIndex = currentIndex === selectedSize.images.length - 1 ? 0 : currentIndex + 1;
    setDirection(1);
    setCurrentIndex(newIndex);
    setSelectedImage(selectedSize.images[newIndex]);
    setTransitionKey((prev) => prev + 1);
  };
  

  const goToImage = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setSelectedImage(selectedSize.images[index]);
    setTransitionKey((prev) => prev + 1);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full md:max-w-[50%] flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 mt-4 justify-center items-center">
        {selectedSize.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="thumbnail"
            className={`w-20 h-16 object-cover cursor-pointer rounded-lg border transition-all duration-300 ${
              currentIndex === idx ? "border-green-500 scale-105" : "border-gray-300"
            }`}
            onClick={() => goToImage(idx)}
          />
        ))}
      </div>

      {/* Main Image with Zoom + Navigation */}
      <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden bg-white cursor-zoom-out flex items-center justify-center">
        {/* Arrows */}
        {selectedSize.images.length > 1 && (
  <>
    <button
      onClick={goToPrevious}
      className="absolute left-2 z-20 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-all"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>

    <button
      onClick={goToNext}
      className="absolute right-2 z-20 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-all"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </>
)}

        {/* Image Transition */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={transitionKey}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full absolute top-0 left-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={imgRef}
          >
            <div className="w-full h-full group relative overflow-hidden">
              <Image
                src={selectedImage}
                alt="Selected Product"
                fill
                className="object-contain"
                priority={true}
              />
              <div className="magnifier bg-white" style={zoomStyle} />
            </div>
          </motion.div>
        </AnimatePresence>

{/* Dots */}
{selectedSize.images.length > 1 && (
  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
    {selectedSize.images.map((_, idx) => (
      <button
        key={idx}
        onClick={() => goToImage(idx)}
        className={`w-2 h-2 rounded-full transition-all ${
          currentIndex === idx ? "bg-green-500 scale-125" : "bg-gray-300"
        }`}
        aria-label={`Go to image ${idx + 1}`}
      />
    ))}
  </div>
)}
      </div>
    </div>
  );
}
