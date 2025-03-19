"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Preloader animations
  const preloaderVariants = {
    // hidden: { y: "-100vh" },
    visible: { y: 0, transition: { duration: 0.4, ease: "easeIn" } },
    exit: { y: "100vh", transition: { duration: 0.9, ease: "circInOut" } },
  };

  // Page transitions
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
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
            <Image
              src="https://www.eucaonline.com.au/media/banner/Benny-euca-loader.gif"
              alt="Loading..."
              width={300}
              height={300}
              priority
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content - No Blank Screen! */}
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
