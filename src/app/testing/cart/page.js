"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoCaretForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import { ChevronDown } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1);
  const [applyCouponIsOpen, setApplyCouponIsOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoadingCart(false), 1000);
  }, []);

  const handleQuantityChange = (item, change) => {
    setDirection(change > 0 ? 1 : -1);
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(item.slug, item.selectedSize, newQuantity);
  };

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    console.log("CART:", cart);

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Failed to initiate checkout!");
      setLoading(false);
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );
  const freeShippingThreshold = 200;
  const isEligibleForFreeShipping = cartTotal >= freeShippingThreshold;

  return (
    <div className="container mx-auto">
      <div className="w-[90%] mx-auto">
        {/* Page Title */}
        <section className="py-10 flex justify-center">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        </section>
        {/* Cart Wrapper */}
        <div className="flex flex-row gap-6 my-10">
          {/* Product Sidebar */}
          <div className="w-[70%]">
            {/* Table head */}
            <div className="flex border-b pb-2">
              <div className="w-1/2">
                <h2 className="text-lg font-semibold">Product</h2>
              </div>
              <div className="w-1/4">
                <h2 className="text-lg font-semibold">Price</h2>
              </div>
              <div className="w-1/6">
                <h2 className="text-lg font-semibold">Quantity</h2>
              </div>
              <div className="w-1/6">
                <h2 className="text-lg font-semibold">Total</h2>
              </div>
            </div>

            {/* Table Body */}

            {isLoadingCart ? ( // Skeleton Loader for products
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex items-center border-b py-4"
                >
                  <div className="w-1/2 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-300 rounded"></div>
                    <div className="flex flex-col gap-1">
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                      <div className="w-16 h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="w-1/4 ml-[3.5rem] mr-[1.5rem] h-4 bg-gray-300 rounded"></div>
                  <div className="w-1/6 mr-4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1/6 mr-4 h-4 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : cart.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No products added to cart.</p>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={`${item.slug}-${item.selectedSize.size}`}
                  className="flex items-center border-b py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-1/2 flex items-center">
                    <a
                      href={`/products/${item.slug}`}
                      className="cursor-pointer"
                    >
                      <img
                        src={item.selectedSize.images[0]}
                        alt={item.productTitle}
                        className="w-20 h-20 object-cover rounded hover:opacity-75 transition-links"
                      />
                    </a>

                    <div className="flex  flex-col gap-1 ml-4">
                      <a
                        href={`/products/${item.slug}`}
                        className=" hover:text-egreen-800 cursor-pointer transition-links"
                      >
                        <p className="font-semibold">{item.productTitle}</p>
                      </a>

                      <p className="text-gray-500 text-xs">
                        SKU: {item.skuCode}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Size: {item.selectedSize.size}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/4 text-gray-700">
                    ${item.selectedSize.price.toFixed(2)}
                  </div>
                  <div className="w-1/6 flex items-center">
                    <div className="flex bg-gray-200 items-center justify-between gap-2 rounded-full px-3">
                      <button
                        className=""
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        -
                      </button>
                      <div className="relative w-6 h-8 overflow-hidden flex justify-center">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={item.quantity}
                            initial={{ opacity: 0, x: (direction || 1) * 20 }} // Ensure default value
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: (direction || 1) * -20 }} // Ensure default value
                            transition={{
                              type: "tween",
                              duration: 0.3,
                              ease: "easeInOut",
                            }}
                            className="absolute top-1 text-md font-semibold"
                          >
                            {item.quantity}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <button
                        className=""
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-1/6 flex items-center justify-between">
                    <span className="text-gray-700">
                      ${(item.selectedSize.price * item.quantity).toFixed(2)}
                    </span>
                    <CiTrash
                      onClick={() =>
                        removeFromCart(item.slug, item.selectedSize.size)
                      }
                      className="text-black hover:text-red-500 text-2xl cursor-pointer transition-links"
                    />
                  </div>
                </motion.div>
              ))
            )}

            {/* Table Footer */}
            <div className="flex border-b py-4 justify-between">
              <div className="flex items-center gap-1">
                <IoCaretBack className="text-egreen-800 text-lg" />{" "}
                <h2 className="text-base font-semibold">Clear shopping cart</h2>
              </div>

              <div className="flex items-center gap-1">
                <h2 className="text-base font-semibold">Continue shopping</h2>
                <IoCaretForward className="text-egreen-800 text-lg" />
              </div>
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="w-[30%] border rounded-sm bg-white">
            {isLoadingCart ? (
              <div className="animate-pulse flex flex-col gap-4 p-4">
                <div className="w-full h-6 bg-gray-300 rounded"></div>
                <div className="w-full h-6 bg-gray-300 rounded"></div>
                <div className="w-full h-6 bg-gray-300 rounded"></div>
                <div className="w-full h-10 bg-gray-300 rounded"></div>
              </div>
            ) : cart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                {" "}
                {/* Apply Discount */}{" "}
                <div className="border-b-2 overflow-hidden">
                  <button
                    onClick={() => setApplyCouponIsOpen(!applyCouponIsOpen)}
                    className="w-full flex justify-between items-center p-4 transition"
                  >
                    <span
                      className={`font-medium transition-links ${
                        applyCouponIsOpen ? "text-egreen-700" : "text-gray-900"
                      }`}
                    >
                      Apply Discount Code
                    </span>
                    <motion.div
                      animate={{ rotate: applyCouponIsOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown
                        className={`transition-links ${
                          applyCouponIsOpen
                            ? "text-egreen-700"
                            : "text-gray-700"
                        }`}
                      />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      applyCouponIsOpen
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-7 px-4 flex flex-col gap-4 ">
                      <input
                        type="text"
                        className="w-full border text-egray-700 rounded bg-transparent outline-none focus:none p-2"
                        placeholder="Enter discount code"
                      />
                      <button className="px-4 py-2 text-sm w-fit bg-egreen-700 hover:bg-egreen-800 text-white transition-links rounded">
                        Apply Discount
                      </button>
                    </div>
                  </motion.div>
                </div>
                {/* Shipping Adress */}
                <div className="border-b-2 overflow-hidden">
                  <button
                    onClick={() => setShippingAddress(!shippingAddress)}
                    className="w-full flex justify-between items-center p-4 transition"
                  >
                    <span
                      className={`font-medium transition-links ${
                        shippingAddress ? "text-egreen-700" : "text-gray-900"
                      }`}
                    >
                      Estimate Shipping and Tax
                    </span>
                    <motion.div
                      animate={{ rotate: shippingAddress ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown
                        className={`transition-links ${
                          shippingAddress ? "text-egreen-700" : "text-gray-700"
                        }`}
                      />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      shippingAddress
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-7 px-4 flex flex-col gap-4 ">
                      <p className="text-egray-700 text-sm">
                        Enter your destination to get a shipping estimate.
                      </p>
                      <p className="bg-red-500 p-4 text-sm rounded-sm text-white">
                        <span className="block font-semibold mb-1">
                          Shippit Method:
                        </span>
                        To calculate shipping for your address, please send us
                        your full address details and the products you want to
                        order to info@eucaonline.com.au and we will confirm the
                        best costs to ship your order to your address.
                      </p>
                    </div>
                  </motion.div>
                </div>
                {/* Subtotal and Checkout */}
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex flex-col gap-4">
                    <div className="w-full flex justify-between items-center">
                      <h4 className="w-fit text-start text-egray-700">
                        Subtotal
                      </h4>
                      <p className="w-fit text-end font-semibold text-egray-950">
                        ${cartTotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <h4 className="w-fit text-start text-egray-700">
                        Shipping (Shippit Method)
                      </h4>
                      <p className="w-fit text-end font-semibold text-egray-950">
                        $0.00
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <h4 className="w-fit text-start text-egray-700">Tax</h4>
                      <p className="w-fit text-end font-semibold text-egray-950">
                        $0.00
                      </p>
                    </div>
                    <div className="w-full border-t py-4  flex justify-between items-center">
                      <h4 className="w-fit text-start text-egray-700">
                        Order Total
                      </h4>
                      <p className="w-fit text-end font-semibold text-egreen-900">
                        ${cartTotal.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-egreen-800 hover:bg-green-700 transition-links text-white py-2 rounded"
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
