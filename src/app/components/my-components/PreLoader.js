"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let timeout;

    const startLoading = () => {
      setIsLoading(true);
      timeout = setTimeout(() => setIsLoading(false), 1500); // Preloader duration
    };

    startLoading();

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Preloader animations
  const preloaderVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }, // Use a valid easing function
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }, // Use a valid easing function
    },
  };

  // Image animations
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut", // Use a valid easing function
        delay: 0.2,
      },
    },
  };

  // Page transitions
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }, // Use a valid easing function
    },
  };

  return (
    <>
      {/* Preloader - Runs on Initial Load & Page Changes */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={preloaderVariants}
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
          >
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src="https://www.eucaonline.com.au/media/banner/Benny-euca-loader.gif"
                alt="Loading..."
                width={300}
                height={300}
                priority
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Layout;