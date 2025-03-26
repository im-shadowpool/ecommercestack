import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ShopMegaMenu from "./ShopMegaMenu";
import { useEffect, useState, useRef } from "react";

const menuContent = {
  wholesale: ["Wholesale Login", "Wholesale Signup"],
  about: ["About Us", "Testimonials", "Eucalyptus Oil", "Our Friends", "Stockists"],
  media: ["Blog", "Euca Video"],
  faqs: ["Safety Data Sheets (SDS)", "The Facts", "Product Care"],
  contact: ["Contact Us", "Customer Support"],
};

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export default function MegaMenu({ openMenu, hovering, position, setHovering }) {
  const [isClient, setIsClient] = useState(false);
  const [delayedOpenMenu, setDelayedOpenMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Keep menu open when hovering over menu or trigger
  useEffect(() => {
    if (openMenu) {
      setDelayedOpenMenu(openMenu);
    } else {
      const timer = setTimeout(() => {
        setDelayedOpenMenu(null);
      }, 300); // Slightly longer delay before closing
      return () => clearTimeout(timer);
    }
  }, [openMenu]);

  if (!isClient) return null;

  const isShopMenu = delayedOpenMenu === "shop";
  const shopMenuPosition = isShopMenu
    ? `calc(50% - ${window.innerWidth > 768 ? "300px" : "150px"})`
    : position;

  return (
    <div
      ref={menuRef}
      className="absolute top-[100%] mt-2"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={(e) => {
        // Check if we're leaving to go to a non-menu element
        if (!e.relatedTarget || !menuRef.current?.contains(e.relatedTarget)) {
          setHovering(false);
        }
      }}
      style={{ 
        left: isShopMenu ? shopMenuPosition : position, 
        minWidth: "300px",
        pointerEvents: !hovering && !delayedOpenMenu ? "none" : "auto"
      }}
    >
      <AnimatePresence>
        {(hovering || delayedOpenMenu) && (
          <motion.div
            layoutId="megaMenu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`bg-white shadow-lg rounded-md p-6 border relative z-20 ${
              isShopMenu ? "max-w-[900px] mx-auto" : "w-auto"
            }`}
          >
            {isShopMenu ? (
              <ShopMegaMenu />
            ) : (
              <motion.ul
                key={delayedOpenMenu}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
                  exit: { opacity: 0, y: -10 },
                }}
                className="flex flex-col gap-5 text-gray-600"
              >
                {menuContent[delayedOpenMenu]?.map((item, index) => (
                  <Link 
                    href={`/${delayedOpenMenu}/${item.toLowerCase().replace(/ /g, "-")}`} 
                    key={index}
                    passHref
                  >
                    <motion.li
                      variants={itemVariants}
                      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                      className="border-b border-dashed pb-2 hover:border-egreen-700 hover:text-black transition-all cursor-pointer"
                    >
                      {item}
                    </motion.li>
                  </Link>
                ))}
              </motion.ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}