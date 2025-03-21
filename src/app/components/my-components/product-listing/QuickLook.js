import { useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart, Minimize2 } from "lucide-react";

export default function QuickLook({ product, onClose }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(selectedSize.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skuSizeCode, setSkuSizeCode] = useState(product.sizes[0].skuCode);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleWishlistClick = () => {
    setIsWishlistAnimating(true);
    toggleWishlist(product);
    setTimeout(() => setIsWishlistAnimating(false), 400); // Animation effect
  };

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
  }, [product]);

  const handleAddToCart = async () => {
    setLoading(true); // Start loading
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    addToCart({ ...product, quantity, selectedSize });
    setLoading(false); // Stop loading
    setQuantity(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedImage(size.images[0]);
    setQuantity(1);
    setSkuSizeCode(size.skuCode);
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

  return (
    <motion.div
      className="fixed inset-0 m-0 flex items-center justify-center bg-black bg-opacity-50 z-10 quicklookpopup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClose} // Close when clicking outside the modal content
    >
      <motion.div
        className="bg-white  p-6 rounded-lg max-w-[70%] w-full"
        onClick={(e) => e.stopPropagation()} // Prevent click events from bubbling up to the overlay
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container relative mx-auto flex flex-col md:flex-row gap-6 items-center">
          <div
            onClick={onClose}
            className="absolute cursor-pointer -right-1 -top-1 text-gray-600 hover:text-green-800 transition-links"
          >
            <Minimize2 size={22} className="" />
          </div>
          {/* Product Image Wrapper */}
          <div className="w-full md:max-w-[50%] flex gap-4">
            <div className="flex flex-col gap-2 justify-center items-center">
              {selectedSize.images.map((archiveImg, idx) => (
                <img
                  key={idx}
                  src={archiveImg}
                  alt="thumbnail"
                  className={`w-20 h-16 object-cover cursor-pointer rounded-lg border transition-all ${
                    selectedImage === archiveImg
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(archiveImg)}
                />
              ))}
            </div>
            <div className="w-full h-[300px] md:h-[25rem] relative overflow-hidden bg-white flex justify-center flex-col">
              <InnerImageZoom
                src={selectedImage}
                zoomSrc={selectedImage}
                zoomScale={1.1}
                zoomType="hover"
                hideHint={true}
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Side details */}
          <div className="w-full md:min-w-[50%] flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-egray-950 pr-3">
                {product.productTitle}
              </h2>
              <p className="text-egray-700">
                If you purchase this product you will earn{" "}
                <strong>{rewardPoints}</strong> Points worth{" "}
                <strong>${rewardValue}!</strong>
              </p>

              <h3 className="text-egreen-900 text-2xl font-bold">
                ${selectedSize.price}
              </h3>
              <div>
                <p className="text-egray-700">{product.shortDesc}</p>
              </div>
              <div className="flex gap-4">
                {product.available ? (
                  <div className="flex flex-col bg-skygreen-50 rounded-md max-w-fit px-4 py-1">
                    <span className="text-xs font-light">Available</span>
                    <span className="text-md text-egreen-900 font-semibold">
                      In Stock
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col bg-skygreen-50 rounded-md max-w-fit px-4 py-1">
                    <span className="text-xs font-light">Available</span>
                    <span className="text-md text-egreen-900 font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}

                <div className="flex flex-col bg-skygreen-50 rounded-md max-w-fit px-4 py-1">
                  <span className="text-xs font-light">SKU</span>
                  <span className="text-md text-egreen-900 font-semibold">
                    {skuSizeCode}
                  </span>
                </div>
              </div>
            </div>
            {/* Size Selections */}
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold block">Size</p>
                <div className="flex gap-x-3 gap-y-2 flex-wrap ">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={
                        "py-1 px-3 text-sm rounded-lg border transition-all " +
                        (selectedSize.size === size.size
                          ? "border-green-500 bg-white"
                          : "border-gray-300")
                      }
                      onClick={() =>
                        selectedSize.size !== size.size &&
                        handleSizeChange(size)
                      }
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
              {/* Size Selections Closed */}
              <div className="flex flex-row gap-4 items-center justify-start">
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
                        // initial={{ opacity: 0, x: (direction || 1) * 20 }} // Ensure default value
                        // animate={{ opacity: 1, x: 0 }}
                        // exit={{ opacity: 0, x: (direction || 1) * -20 }} // Ensure default value
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
      </motion.div>
    </motion.div>
  );
}
