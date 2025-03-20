"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } =
    useCart();

  // console.log("CART:", cart);

  const cartTotal = cart.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );

  const freeShippingThreshold = 150;
  const isEligibleForFreeShipping = cartTotal >= freeShippingThreshold;
  const progressWidth = Math.min(
    (cartTotal / freeShippingThreshold) * 100,
    100
  );

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleRemove = (productId, sizeId) => {
    removeFromCart(productId, sizeId);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-blue bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Drawer */}
            <motion.div
              className="fixed right-0 top-0 h-full w-[26rem] bg-white p-6 shadow-lg z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 40 }}
            >
              {/* Close Button */}

              <IoMdClose
                onClick={() => setIsCartOpen(false)}
                className="absolute top-7 right-4 text-egray-800 hover:text-egreen-700 cursor-pointer transition-links text-xl"
              />

              <h2 className="text-xl font-bold text-egreen-950 mb-4">
                Shopping Cart
              </h2>

              {/* Free Shipping Progress Bar */}
              <div className="mb-4">
                <div className="relative bg-gray-200 h-2 rounded">
                  <motion.div
                    className="bg-green-500 h-2 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {isEligibleForFreeShipping ? (
                  <p className="text-green-600 text-sm text-center mt-1">
                    🎉 Congratulations! Your order is eligible for FREE
                    Delivery.
                  </p>
                ) : (
                  <p className="text-gray-600 text-sm text-center mt-1">
                    Spend ${(freeShippingThreshold - cartTotal).toFixed(2)} more
                    for FREE Delivery.
                  </p>
                )}
              </div>

              {/* Cart Items */}

              <AnimatePresence>
                {cart.length > 0 ? (
                  <ul className="space-y-4 flex-1 overflow-y-auto cart-offcanvas-scroller">
                    {cart.map((item) => (
                      <motion.li
                        key={item.selectedSize._id} // Unique stable key
                        layoutId={item.selectedSize._id} // Improves animation smoothness
                        className="flex items-center justify-between py-2 mr-2 border-b"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.9 }} // Smoother shrink & fade-out effect
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }} // Smooth bounce effect
                        layout // Ensures smooth movement of remaining items
                      >
                        <Link href={`/products/${item.productSlug}`}>
                        <img
                          src={item.selectedSize.images[0]}
                          alt={item.selectedSize.productTitle}
                          className="w-20 h-20 object-cover rounded hover:opacity-85 transition-links"
                        />
                        </Link>

                        <div className="flex-1 flex-col ml-3">
                        <Link href={`/products/${item.productSlug}`}>
                          <p className="font-semibold text-md hover:text-egreen-800 transition-links">
                            {truncateText(item.selectedSize.productTitle, 60)}
                          </p>
                          </Link>
                          <p className="text-gray-800 text-sm">
                            Size: {item.selectedSize.size}
                          </p>
                          <div className="flex flex-row justify-between items-end">
                            <div className="flex items-center">
                              <p className="text-gray-800 text-sm">
                                Qty: {item.quantity}
                              </p>
                              <span className="text-gray-800 text-sm px-1">
                                {" "}
                                *{" "}
                              </span>
                              <p className="text-egreen-800 text-lg">
                                ${item.selectedSize.price.toFixed(2)}
                              </p>
                            </div>
                            <div
                              onClick={() =>
                                handleRemove(
                                  item.product,
                                  item.selectedSize._id
                                )
                              }
                              className="text-red-800 font-normal cursor-pointer text-sm transition-all hover:text-red-600"
                            >
                              <p>Remove</p>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col gap-4 items-center text-center py-10">
                    <p className="text-gray-500">No products added to cart.</p>
                    <button className="w-fit bg-egreen-800 hover:bg-green-700 transition-links text-white py-2 px-4 rounded">
                      View all products
                    </button>
                  </div>
                )}
              </AnimatePresence>

              {/* Subtotal & Checkout */}
              {cart.length > 0 && (
                <motion.div
                  className="mt-6 border-t pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal:</span>
                    <span>${cartTotal?.toFixed(2)}</span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mt-1">
                      Taxes and shipping calculated at checkout
                    </p>
                  </div>
                  <div className="mt-4 flex w-full space-x-2">
                    <Link
                      onClick={() => setIsCartOpen(false)}
                      prefetch={true}
                      href="/cart"
                      className="flex-1"
                    >
                      <button className="w-full py-2 bg-egray-900 hover:bg-black transition-links text-white rounded">
                        View Cart
                      </button>
                    </Link>
                    <Link
                      onClick={() => setIsCartOpen(false)}
                      prefetch={true}
                      href="/cart"
                      className="flex-1"
                    >
                      <button className="w-full py-2 bg-egreen-800 hover:bg-egreen-950 transition-links text-white rounded">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
