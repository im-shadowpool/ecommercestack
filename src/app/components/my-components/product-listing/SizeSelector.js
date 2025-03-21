import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { truncateText } from "@/lib/utils";

export default function SizeSelector({ product, selectedSize, onSizeChange, setQuantity }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-w-[9rem]" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-[6.5px] px-3 flex justify-between items-center bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
        <span>{truncateText(selectedSize?.size, 10) || "Select"}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-1 min-w-[15rem] bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto text-sm z-10"
          >
            {product.sizes.map((sizeOption) => (
              <li
                key={sizeOption.size}
                onClick={() => {
                  onSizeChange(sizeOption);
                  setQuantity(1);
                  setIsOpen(false);
                }}
                className="py-[6.5px] px-3 cursor-pointer hover:bg-green-100 transition-all flex justify-between items-center"
              >
                {sizeOption.size}
                {selectedSize?.size === sizeOption.size && (
                  <svg className="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
