import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';

const SearchComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isOpen]);

  return (
    <>
      {/* Search Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSearch}
        className="cursor-pointer"
      >
        <IoSearchOutline className="text-white text-2xl hover:text-white/70 transition-all duration-200" />
      </motion.div>

      {/* 3D Rotating Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black/90 margin-left-overflow backdrop-blur-lg z-50 flex flex-col items-center justify-center overflow-hidden"
            style={{ perspective: 1000 }}
          >
            {/* Close Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="absolute top-5 right-5 cursor-pointer"
              onClick={toggleSearch}
            >
              <IoCloseOutline className="text-white text-4xl hover:text-white/70 transition-all duration-200" />
            </motion.div>

            {/* 3D Search Input */}
            <motion.div
              initial={{ y: -30, opacity: 0, rotateX: 45 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -30, opacity: 0, rotateX: -45 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="w-full max-w-2xl px-6 relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="w-full p-4 text-white bg-transparent border-b-2 border-white/30 focus:border-white outline-none text-3xl text-center tracking-wide placeholder-white/50"
              />
              {/* 3D Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left"
              />
            </motion.div>

            {/* Floating 3D Text */}
            <motion.div
              initial={{ y: 50, opacity: 0, rotateX: -30 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-white/50 text-lg text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              Type to explore the future...
            </motion.div>

            {/* 3D Background Grid */}
            <motion.div
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="grid grid-cols-12 gap-4 h-full w-full opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-l border-white/10"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchComponent;