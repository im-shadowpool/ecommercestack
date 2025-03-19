import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Import Link from Next.js
import ShopMegaMenu from "./ShopMegaMenu"; // Import the ShopMegaMenu component

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
  // Calculate the center position for the Shop Mega Menu
  const isShopMenu = openMenu === "shop";
  const shopMenuPosition = isShopMenu
    ? `calc(50% - ${window.innerWidth > 768 ? "300px" : "150px"})` // Adjust based on screen width
    : position;

  return (
    <div
      className="absolute top-[100%] mt-2"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ left: isShopMenu ? shopMenuPosition : position, minWidth: "300px" }}
    >
      <AnimatePresence mode="wait">
        {openMenu && (
          <motion.div
            layoutId="megaMenu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`bg-white shadow-lg rounded-md p-6 border relative z-20 ${
              isShopMenu ? "max-w-[900px] mx-auto" : "w-auto"
            }`} // Adjust width for Shop Mega Menu
          >
            {/* Conditionally render ShopMegaMenu or default menu content */}
            {isShopMenu ? (
              <ShopMegaMenu />
            ) : (
              <motion.ul
                key={openMenu}
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
                {menuContent[openMenu]?.map((item, index) => (
                  <Link href={`/${openMenu}/${item.toLowerCase().replace(/ /g, "-")}`} key={index}>
                    <motion.li
                      variants={itemVariants}
                      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                      className="border-b border-dashed pb-2 hover:border-egreen-700 hover:text-black transition-all"
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