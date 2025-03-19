"use client";

import { useWishlist } from "@/app/context/WishlistContext";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { truncateText } from "@/lib/utils";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="w-[90%] mx-auto">
        {/* Page Title */}
        <section className="py-10 flex justify-center">
          <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
        </section>

        {/* Wishlist Items */}
        <div className="w-[86%] mx-auto">
          {/* Table head */}
          <div className="flex border-b pb-2 justify-between">
            <div className="w-[6%]">
              <h2 className="text-lg font-semibold">S.No</h2>
            </div>
            <div className="w-1/2">
              <h2 className="text-lg font-semibold">Product</h2>
            </div>
            <div className="w-1/5">
              <h2 className="text-lg font-semibold">Unit Price</h2>
            </div>
            <div className="w-1/4">
              <h2 className="text-lg font-semibold">Actions</h2>
            </div>
          </div>

          {/* Table Body */}
          {isLoading ? (
            // Skeleton Loader
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex items-center border-b py-4"
              >
                <div className="w-[6%] h-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-300 rounded"></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : wishlist.length === 0 ? (
            // Empty wishlist message
            <div className="flex flex-col gap-4 items-center text-center py-10">
              <p className="text-gray-500">No products added to wishlist.</p>
              <Link href="/products">
                <button className="w-fit bg-egreen-800 hover:bg-green-700 transition text-white py-2 px-4 rounded">
                  View all products
                </button>
              </Link>
            </div>
          ) : (
            wishlist.map((item, index) => (
              <motion.div
                key={item.slug}
                className="flex items-center border-b py-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Serial Number */}
                <div className="w-[6%] text-gray-700">
                  <p>{index + 1}.</p>
                </div>

                {/* Product Details */}
                <div className="w-1/2 flex items-center">
                  <Link href={`/products/${item.slug}`}>
                    <div className="w-[80px] h-[80px] overflow-hidden rounded bg-white">
                      <Image
                        src={item.sizes[0].images[0]}
                        alt={item.productTitle}
                        width={80}
                        height={90}
                        className="w-full h-full object-cover hover:opacity-85 transition-links"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col gap-1 ml-4 max-w-xs">
                    <Link
                      href={`/products/${item.slug}`}
                      className="hover:text-egreen-800 cursor-pointer transition"
                    >
                      <p className="font-semibold leading-6">
                        {truncateText(item.productTitle, 50)}
                      </p>
                    </Link>
                    <p className="text-gray-500 text-xs">SKU: {item.skuCode}</p>
                    <p className="text-gray-500 text-sm">
                      Size: {item.sizes[0].size}
                    </p>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="w-1/5 text-gray-700">
                  ${item.sizes[0].price.toFixed(2)}
                </div>

                {/* Actions */}
                <div className="w-1/4 flex items-center justify-between gap-4 relative">
                  {/* View Product Button */}
                  <Link href={`/products/${item.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-egreen-800 text-white px-6 py-2 rounded-full hover:bg-egreen-700 transition-all"
                    >
                      View Product
                    </motion.button>
                  </Link>

                  {/* Remove from Wishlist */}
                  <Trash
                    size={20}
                    onClick={() => toggleWishlist(item)}
                    className="text-egray-700 hover:text-red-500 cursor-pointer transition-links"
                  />

                  {/* Added Date Tooltip */}
                  <Clock
                   size={20}
                    onMouseEnter={() => setHoveredItem(item.slug)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="text-egray-700 hover:text-egreen-700 cursor-pointer transition-links"
                  />
                  <AnimatePresence>
                    {hoveredItem === item.slug && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute flex items-center justify-center gap-1 w-max bottom-12 left-28 bg-white shadow-lg rounded-md p-2 text-xs text-gray-700"
                      >
                        <Clock size={12} className="-mt-0.5" /> Added on:{" "}
                        {new Date(item.addedAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}

          {/* Table Footer */}
                    <div className="flex border-b py-4 justify-between">
            <div className="flex items-center gap-1">
              <IoCaretBack className="text-egreen-800 text-lg" />
              <h2 className="text-base font-semibold cursor-pointer">
                Clear Wishlist
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-semibold cursor-pointer">
                Continue Shopping
              </h2>
              <IoCaretForward className="text-egreen-800 text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;