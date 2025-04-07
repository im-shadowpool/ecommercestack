import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline, IoEllipsisHorizontal } from 'react-icons/io5';

const SearchComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const toggleSearch = () => setIsOpen((prev) => !prev);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Close on Click Outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);



  return (
    <div className="relative inline-block text-left" ref={searchRef}>
      {/* Toggle Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSearch}
        className="cursor-pointer"
      >
        {isOpen ? (
          <motion.div>
            <IoEllipsisHorizontal className="text-white text-2xl hover:text-gray-200 transition-colors duration-300" />
          </motion.div>
        ) : (
          <IoSearchOutline className="text-white text-2xl hover:text-gray-200 transition-colors duration-300" />
        )}
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute right-0 mt-3 w-72 bg-white backdrop-blur border border-gray-200 rounded-lg shadow-lg p-4 z-10"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent border-b border-gray-300 focus:border-gray-800 outline-none text-gray-800 px-2 py-2 placeholder-gray-400 transition-colors duration-300"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Type and hit Enter...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchComponent;
