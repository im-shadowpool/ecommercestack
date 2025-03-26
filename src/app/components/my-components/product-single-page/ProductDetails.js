"use client";

import { useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";

export default function ProductDetails({ productAPI }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(productAPI.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skuSizeCode, setSkuSizeCode] = useState(productAPI.sizes[0].skuCode);
  const [selectedSizeTitle, setSelectedSizeTitle] = useState(
    productAPI.sizes[0].productTitle
  );
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const isWishlisted = wishlist.some((item) => item._id === productAPI._id);

  const handleWishlistClick = () => {
    setIsWishlistAnimating(true);
    toggleWishlist(productAPI);
    setTimeout(() => setIsWishlistAnimating(false), 400); // Animation effect
  };

  useEffect(() => {
    setSelectedSize(productAPI.sizes[0]);
  }, [productAPI]);

  const handleAddToCart = async () => {
    setLoading(true); // Start loading
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    addToCart({ ...productAPI, quantity, selectedSize });
    setLoading(false); // Stop loading
    setQuantity(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // setSelectedImage(size.images[0]);
    setQuantity(1);
    setSkuSizeCode(size.skuCode);
    setSelectedSizeTitle(size.productTitle);
    const newRewardPoints = Math.round(size.price);
    setRewardPoints(newRewardPoints);
    setRewardValue((newRewardPoints * 0.02).toFixed(2));
  };

  const handleQuantityChange = (change) => {
    if (quantity + change < 1) return;
    setDirection(isNaN(change) ? 1 : change > 0 ? 1 : -1);

    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);

    const newRewardPoints = Math.round(selectedSize.price) * newQuantity;
    setRewardPoints(newRewardPoints);
    setRewardValue((newRewardPoints * 0.02).toFixed(2));
  };

  const [rewardPoints, setRewardPoints] = useState(
    Math.round(selectedSize.price)
  );
  const [rewardValue, setRewardValue] = useState(
    (rewardPoints * 0.02).toFixed(2)
  );

  const hasMultipleSizes = productAPI.sizes.length > 1;
  const startingPrice = hasMultipleSizes ? productAPI.sizes[0].price : null;
  const endingPrice = hasMultipleSizes
    ? productAPI.sizes[productAPI.sizes.length - 1].price
    : null;

  return (
    <div className="">
      {/* Page Title */}
      <section>
        <div className="bg-white py-12">
          <div className="padding-container flex flex-col gap-2">
            <h2 className="text-3xl font-semibold text-egreen-800">
              Products: {productAPI.productTitle}
            </h2>
            {/* breadcrumbs */}
            <div className="flex gap-2">
              <span className="text-egray-700">Home</span>
              <span className="text-egray-700">/</span>
              <span className="text-egray-700">Products</span>
              <span className="text-egray-700">/</span>
              <span className="text-egray-700">{productAPI.productTitle}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Wrapper */}
      <div className="py-4 mt-8 padding-container flex flex-col md:flex-row gap-8 items-center">
        {/* Product Image Wrapper */}
        <ProductImage selectedSize={selectedSize} />

        {/* Product Side details */}
        <div className="w-full md:min-w-[50%] flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold text-egray-950">
              {productAPI.productTitle}
            </h1>
            <p className="text-egray-700">
              If you purchase this product you will earn{" "}
              <strong>{rewardPoints}</strong> Points worth{" "}
              <strong>${rewardValue}!</strong>
            </p>

            {hasMultipleSizes && (
              <div className="flex gap-4">
                <h3 className="text-egray-900 text-xl font-semibold">
                  ${startingPrice.toFixed(2)} - ${endingPrice.toFixed(2)}
                </h3>
              </div>
            )}
            <h3 className="text-egreen-900 text-2xl font-bold">
              ${selectedSize.price.toFixed(2)}
            </h3>
            <div>
              <p className="text-egray-700 w-[85%]">{productAPI.shortDesc}</p>
            </div>
            <div className="flex gap-4">
              {productAPI.available ? (
                <div className="flex flex-col bg-white rounded-md max-w-fit px-4 py-1">
                  <span className="text-xs font-light">Available</span>
                  <span className="text-md text-egreen-900 font-semibold">
                    In Stock
                  </span>
                </div>
              ) : (
                <div className="flex flex-col bg-white rounded-md max-w-fit px-4 py-1">
                  <span className="text-xs font-light">Available</span>
                  <span className="text-md text-egreen-900 font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}

              <div className="flex flex-col bg-white rounded-md max-w-fit px-4 py-1">
                <span className="text-xs font-light">SKU</span>
                <span className="text-md text-egreen-900 font-semibold">
                  {skuSizeCode}
                </span>
              </div>
            </div>
          </div>
          {/* Size Selections */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold block">Size</p>
              <div className="flex gap-x-2 gap-y-3 flex-wrap">
                {productAPI.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={
                      "py-2 px-4 rounded-lg border transition-all " +
                      (selectedSize.size === size.size
                        ? "border-green-500 bg-white"
                        : "border-gray-300")
                    }
                    onClick={() =>
                      selectedSize.size !== size.size && handleSizeChange(size)
                    }
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
            {/* Size Selections Closed */}
            <div className="flex flex-row gap-4 items-center justify-start mt-4">
              {/* Quantity */}
              <div className="flex items-center gap-4 ">
                <button
                  className="p-2 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <div className="relative w-6 h-8 overflow-hidden flex justify-center">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.span
                      key={quantity}
                      initial={{
                        opacity: 0,
                        x: isNaN(direction) ? 20 : direction * 20,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: isNaN(direction) ? -20 : direction * -20,
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="absolute top-0.5 text-lg font-semibold"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <button
                  className="p-2 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              {/* Add to cart */}
              <div className="w-[40%]">
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className={`w-full transition-all py-2 rounded-lg text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-egreen-600 hover:bg-egreen-700"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Adding...
                    </div>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
              {/* Add to Favs */}
              <motion.div
                className={`p-2.5 w-fit h-fit rounded-full flex justify-center bg-gray-200 items-center cursor-pointer ${
                  isWishlistAnimating ? "opacity-50" : "opacity-100"
                }`}
                onClick={handleWishlistClick}
                disabled={isWishlistAnimating}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: 1.1, opacity: 1 }}
              >
                <motion.div
                  key="filled"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Heart
                    fill={isWishlisted ? "#0a8b44" : "transparent"}
                    size={18}
                    className="align-middle text-egreen-700"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* TABS */}
      <ProductDescription selectedSizeTitle={selectedSizeTitle} />
    </div>
  );
}
