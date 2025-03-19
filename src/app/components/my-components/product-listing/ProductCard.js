import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Link as LinkIcon, Heart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import QuickLook from "./QuickLook";
import Link from "next/link";
import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductCard({
  product,
  view,
  selectedSize,
  onSizeChange,
}) {
  const { addToCart } = useCart();
  // const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { wishlist, toggleWishlist } = useWishlist();
  const [direction, setDirection] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showQuickLook, setShowQuickLook] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const handleWishlistClick = () => {
    setIsWishlistAnimating(true);
    toggleWishlist(product);
    setTimeout(() => setIsWishlistAnimating(false), 400); // Animation effect
  };


  const handleAddToCart = async () => {
    setLoading(true); // Start loading
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    addToCart({ ...product, quantity, selectedSize });
    setLoading(false); // Stop loading
    setQuantity(1);
  };

  const handleQuantityChange = (change) => {
    if (quantity + change < 1) return;
    setDirection(isNaN(change) ? 1 : change > 0 ? 1 : -1);

    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const hasMultipleImages = selectedSize.images.length > 1;
  const currentImage =
    isHovered && hasMultipleImages
      ? selectedSize.images[1]
      : selectedSize.images[0];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 23,
          duration: 0.5,
        }}
        className={
          view === "grid"
            ? "border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm"
            : "flex flex-col items-center sm:flex-row gap-4 p-4 border rounded-lg bg-white shadow-sm z-0"
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <motion.div
          layout="position"
          className={
            view === "grid"
              ? "h-64 w-full relative"
              : "w-full sm:w-56 h-56 flex-shrink-0 relative z-0"
          }
        >
          <Link href={`/products/${product.slug}`}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={product.productTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full object-contain absolute top-0 left-0 z-0"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </AnimatePresence>
          </Link>

          {view === "grid" && (
            <motion.div
              className="absolute inset-0 flex justify-center items-end gap-4 pb-4"
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlistClick}
                disabled={isWishlistAnimating} 
                className={`hover:bg-egreen-900 bg-black  cursor-pointer rounded-full p-2 transition-colors group ${isWishlistAnimating ? "opacity-50" : "opacity-100"}`}
              >
                <Heart
                  fill={(isWishlisted ? "#fff" : "transparent")}
                  size={20}
                  className="stroke-2 text-white transition-links"
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuickLook(true)}
                className="hover:bg-egreen-900 bg-black  cursor-pointer rounded-full p-2 transition-colors group"
              >
                <Eye
                  size={20}
                  className="stroke-2 text-white transition-links"
                />
              </motion.div>
              <Link href={`/products/${product.slug}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:bg-egreen-900 bg-black  cursor-pointer rounded-full p-2 transition-colors group"
                >
                  <LinkIcon
                    size={20}
                    className="stroke-2 text-white transition-links"
                  />
                </motion.div>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Content Container */}
        <motion.div
          layout="position"
          className={
            view === "grid"
              ? "p-4 flex flex-col flex-auto justify-between"
              : "p-4 flex flex-col justify-between flex-grow"
          }
        >
          <Link href={`/products/${product.slug}`}>
            <motion.h2
              layout="position"
              className={`
            ${
              view === "grid"
                ? "text-lg font-bold mb-2 transition-links"
                : "text-xl font-bold mb-3 transition-links"
            }
            ${isHovered ? "text-egreen-800" : ""}
          `}
              title={product.productTitle}
            >
              {view === "grid"
                ? truncateText(product.productTitle, 50)
                : product.productTitle}
            </motion.h2>
          </Link>
          {view === "list" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 mb-4"
            >
              {product.shortDesc}
            </motion.p>
          )}

          <motion.div layout="position">
            {view === "grid" ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <motion.select
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    value={selectedSize.size}
                    onChange={(e) => {
                      const newSize = product.sizes.find(
                        (s) => s.size === e.target.value
                      );
                      onSizeChange(newSize);
                      setQuantity(1);
                    }}
                    className="border rounded px-2 py-1 max-w-48 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    {product.sizes.map((sizeOption) => (
                      <option key={sizeOption.size} value={sizeOption.size}>
                        {sizeOption.size}
                      </option>
                    ))}
                  </motion.select>
                  <span className="font-bold text-egreen-700 text-lg">
                    ${selectedSize.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex w-full items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    // whileTap={{ scale: 1 }}
                    className="flex bg-gray-200 items-center justify-between gap-2 rounded-full px-3"
                  >
                    <button
                      className="py-1 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <div className="relative w-6 h-8 overflow-hidden flex justify-center align-middle">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={quantity}
                          initial={{ opacity: 0, x: (direction || 1) * 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: (direction || 1) * -20 }}
                          transition={{
                            type: "tween",
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          className="absolute top-1 text-md font-semibold"
                        >
                          {quantity}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <button
                      className="py-1 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </motion.div>
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={loading}
                    whileHover={{ scale: 1.009 }}
                    whileTap={{ scale: 0.99 }}
                    // className="bg-egreen-800 text-white px-8 py-2 rounded-lg hover:bg-egreen-700 transition-all flex-grow"
                    className={`text-white w-full px-4 py-2 rounded-full transition-all flex-grow ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-egreen-800 hover:bg-egreen-700"
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
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-egreen-700 text-xl">
                    ${selectedSize.price.toFixed(2)}
                  </span>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={
                          "py-1 px-3 rounded-lg border text-sm transition-colors " +
                          (selectedSize.size === size.size
                            ? "border-egreen-700 bg-egreen-700 text-white"
                            : "border-gray-300 hover:border-egreen-500")
                        }
                        onClick={() =>
                          selectedSize.size !== size.size &&
                          (onSizeChange(size) || setQuantity(1))
                        }
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="hover:bg-egreen-900 border cursor-pointer rounded-full p-2 transition-colors group"
                    onClick={() => setShowQuickLook(true)}
                  >
                    <Eye
                      size={20}
                      className="text-egray-600 stroke-2 group-hover:text-white"
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlistClick}
                    disabled={isWishlistAnimating} 
                    className= {`hover:bg-egreen-900 border cursor-pointer rounded-full p-2 transition-colors 
                    group ${isWishlistAnimating ? "opacity-50" : "opacity-100"}`}
                  >
                    <Heart
                      fill={(isWishlisted ? "#0e5932 " : "transparent")}
                      size={20}
                      className="text-egray-600 stroke-2 group-hover:text-white"
                    />
                  </motion.button>
                  <div className="flex bg-gray-200 items-center justify-between gap-2 rounded-full px-3">
                    <button
                      className="px-2 py-1 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <div className="relative w-6 h-10 overflow-hidden flex justify-center align-middle ">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={quantity}
                          initial={{ opacity: 0, x: (direction || 1) * 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: (direction || 1) * -20 }}
                          transition={{
                            type: "tween",
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          className="absolute top-2 text-md font-semibold"
                        >
                          {quantity}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <button
                      className="px-2 py-1 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={loading}
                    whileHover={{ scale: 1.009 }}
                    whileTap={{ scale: 0.99 }}
                    // className="bg-egreen-800 text-white px-8 py-2 rounded-lg hover:bg-egreen-700 transition-all flex-grow"
                    className={`text-white px-8 py-2 rounded-lg  transition-all flex-grow ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-egreen-800 hover:bg-egreen-700"
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
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showQuickLook && (
          <QuickLook
            product={product}
            onClose={() => setShowQuickLook(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
