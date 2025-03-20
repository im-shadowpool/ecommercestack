"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ProductCard from "./ProductCard";
import { LayoutGrid, LayoutList } from "lucide-react";

export default function ProductListing({ products }) {
  const [view, setView] = useState("grid");
  const [selectedSizes, setSelectedSizes] = useState(() => {
    const initial = {};
    products.forEach((product) => {
      initial[product.skuCode] = product.sizes[0];
    });
    return initial;
  });

  const toggleView = () => {
    setView((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const handleSizeChange = (sku, size) => {
    setSelectedSizes((prev) => ({ ...prev, [sku]: size }));
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable;

      const isQuickLookOpen = document.querySelector(".quicklookpopup");

      if (!isTyping && !isQuickLookOpen && event.key.toLowerCase() === "t") {
        toggleView();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="py-12">
      <div className=" w-[77%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Products ({products.length})</h1>
          <button
            onClick={toggleView}
            className="flex gap-2 justify-end items-end text-egray-700 hover:text-egreen-700 transition-links"
          >
            <div className="flex flex-col justify-end items-end text-[0.7rem]">
              <span>Press 'T' to toggle</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 30 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                {view === "grid" ? <LayoutGrid /> : <LayoutList />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className={
              view === "grid"
                ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-6"
            }
          >
            {products.map((product) => (
              <ProductCard
                key={product.skuCode}
                product={product}
                view={view}
                selectedSize={selectedSizes[product.skuCode]}
                onSizeChange={(size) => handleSizeChange(product.skuCode, size)}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
