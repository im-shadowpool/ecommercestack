"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { useCart } from "@/app/context/CartContext";
import MegaMenu from "./MegaMenu";
import { ChevronDown } from "lucide-react";
import UserItem from "./UserItem";
import SearchComponent from "./SearchComponent";
import { useAuth } from '@/app/context/UserContext'

const menuItems = [
  { name: "Shop", content: "shop" },
  { name: "Wholesale", content: "wholesale" },
  { name: "About us", content: "about" },
  { name: "Media", content: "media" },
  { name: "FAQ's", content: "faqs" },
  { name: "Contact", content: "contact" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [menuPosition, setMenuPosition] = useState(0);
  const { user } = useAuth();
  const menuRefs = useRef({});



  const { isCartOpen, setIsCartOpen, cart } = useCart();

  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);
}, []);



  useEffect(() => {
    if (!hovering) {
      const timer = setTimeout(() => setOpenMenu(null), 300);
      return () => clearTimeout(timer);
    }
  }, [hovering]);

  const handleMouseEnter = (menu) => {
    setOpenMenu(menu);
    setHovering(true);

    if (menuRefs.current[menu]) {
      const rect = menuRefs.current[menu]?.getBoundingClientRect();
      setMenuPosition(rect ? rect.left : 0);
    }
  };
  // if (!user) return null
  return (
    <header className="flex justify-between items-center py-3 bg-[#8ec298] relative">
      <div className="padding-container flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image src="/header-assets/logo.png" alt="Logo" width={95} height={95} />
          </Link>
          <span className="text-white text-sm w-36 font-semibold">
            A better way to clean the whole home!
          </span>
          <div className="flex gap-1 items-center">
          <Image src="/header-assets/euca_award_2021_cropped.png" alt="Logo 1" width={50} height={50} />
          <Image src="/header-assets/euca_award_2024_crop.png" alt="Logo 2" width={50} height={50} />
          <Image src="/header-assets/shippit-carbon.png" alt="Logo 3" width={50} height={50} />
            </div>
        </div>

        <nav className="relative">
  <ul className="flex space-x-8">
    {menuItems.map(({ name, content }) => (
      <li
        key={name}
        ref={(el) => (menuRefs.current[content] = el)}
        onMouseEnter={() => handleMouseEnter(content)}
        onMouseLeave={() => setHovering(false)}
        className="relative group"
      >
        <Link href="#" className="text text-white font-medium flex items-center gap-1 hover:text-white/80 transition-links">
          {name}
          <ChevronDown size={16} className="transition-links group-hover:rotate-180" />
        </Link>
      </li>
    ))}
  </ul>
</nav>


        <div className="flex items-center space-x-4">
          <SearchComponent />
          <div onClick={() => setIsCartOpen(true)} className="relative">
           <PiShoppingCartSimpleLight
            
            className="text-white text-2xl cursor-pointer hover:text-white/70"
          />
          {mounted && cartLength > 0 && (
  <span className="absolute -top-[3px] -right-[4px] bg-egreen-800 text-white text-[10px] rounded-full w-3.5 h-3.5 flex items-center justify-center cursor-pointer">
    {cartLength}
  </span>
)}

          </div>

          <UserItem />
          <Link href="/wishlist">
            <IoMdHeartEmpty className="text-white text-2xl cursor-pointer hover:text-white/70" />
          </Link>
        </div>
      </div>

      {/* Mega Menu Component */}
      <MegaMenu openMenu={openMenu} hovering={hovering} position={menuPosition} setHovering={setHovering} />
    </header>
  );
}