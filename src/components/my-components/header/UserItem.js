"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { useAuth } from "@/app/context/UserContext";


export default function UserItem() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Example authentication context
  const menuRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     console.log("Clicked on:", event.target);
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);
  useEffect(() => {
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  document.addEventListener("pointerdown", handleClickOutside);
  return () => document.removeEventListener("pointerdown", handleClickOutside);
}, []);

  return (
    <div className="relative" ref={menuRef}>
      <RxAvatar
        className="text-white text-2xl cursor-pointer hover:text-white/70"
        onClick={() => setIsOpen(!isOpen)}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 max-w-fit min-w-60 bg-white shadow-lg rounded-lg overflow-hidden z-50"
          >
            {/* Logged-in View */}
            {user ? (
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <RxAvatar className="text-gray-500 text-3xl" />
                  <div>
                    <p className="text-gray-800 font-semibold">Hello, {user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <hr className="my-2" />
                <Link onClick={() => setIsOpen(false)} href="/account" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  My Account
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/orders" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Orders
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/wishlist" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Wishlist
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/cart" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Cart
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/settings" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Settings
                </Link>

                {/* Admin Panel - Visible Only to Admins */}
                {user.isAdmin && (
                  <>
                    <hr className="my-2" />
                    <p className="text-gray-500 px-4 text-xs uppercase">Admin Panel</p>
                    <Link href="/admin" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                      Dashboard
                    </Link>
                    <Link href="/admin/products" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                      Manage Products
                    </Link>
                    <Link href="/admin/orders" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                      Manage Orders
                    </Link>
                  </>
                )}

                {/* Support & Logout */}
                <hr className="my-2" />
                <Link onClick={() => setIsOpen(false)} href="/support" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Customer Support
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/returns" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Returns & Refunds
                </Link>
                <button
                
                  onClick={() => {
                    logout();
                    setIsOpen(false)
                  }}
                  className="w-full text-left py-2 text-red-600 hover:bg-gray-100 px-4"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Guest View (Before Login)
              <div className="p-4">
                <Link onClick={() => setIsOpen(false)} prefetch={true} href="/login" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Login
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/register" className="block py-2 text-gray-700 hover:bg-gray-100 px-4">
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
