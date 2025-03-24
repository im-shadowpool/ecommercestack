"use client";

import Image from "next/image";
import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { useAuth } from "@/app/context/UserContext";

export default function Footer() {
  const { user } = useAuth();

  if (!user) return null;
  return (
    <footer className="bg-skygreen-100 py-8 px-12">
      {/* Social Networks Section */}
      <div className="flex items-center align-middle justify-center gap-4 mb-8">
        <p className="text-lg font-semibold">
          Get connected with us on social networks:
        </p>
        <div className="flex justify-center items-center align-middle gap-4">
          <a
            target="_blank"
            href="https://www.facebook.com/Euca.laundry.Eucalyptus.cleaning/"
            className=""
          >
            <CiFacebook className="text-egray-700 hover:text-black transition duration-300 text-3xl" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/eucaonlinecleaningproducts/?hl=en"
            className=""
          >
            <CiInstagram className="text-egray-700 hover:text-black transition duration-300 text-3xl" />
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCvYrGVTHJiX3JkeXdYTFgvg"
            className=""
          >
            <CiYoutube className="text-egray-700 hover:text-black transition duration-300 text-3xl" />
          </a>
        </div>
      </div>

      {/* Footer Content Grid */}

      <div className="container mx-auto flex gap-36">
        {/* About Section (35% width) */}
        <div className="w-[35%] flex flex-col gap-4">
          {/* <h5 className="text-xl text-egray-900 font-bold ">TW Elements</h5> */}
          <Image
            src="https://www.eucaonline.com.au/pub/media/banner/proud-product.png"
            alt="Euca Logo"
            width={250}
            height={250}
          />
          <p className="text-egray-700">
            The philosophy from Charles Henry Goodall continues today through
            Charles Leighton (Leigh) Goodall, striving for perfection in
            quality.
          </p>
          <Image
            src="https://www.eucaonline.com.au/pub/media/wysiwyg/rsz_leigh_goodall_-_signature.png"
            alt="Euca Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Remaining Sections (65% width, divided into three equal parts) */}
        <div className="w-[65%] flex flex-row justify-between gap-8">
          {/* Products Section */}
          <div>
            <h5 className="text-xl text-egray-900 font-bold mb-4">
              Information
            </h5>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  Safety Data Sheets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  The Facts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* User Area Section */}
          <div>
            <h5 className="text-xl font-bold text-egray-900 mb-4">User area</h5>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  My Cart
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  Wholesale Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-egray-700 hover-link hover:text-black transition duration-300"
                >
                  Checkout
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h5 className="text-xl font-bold text-egray-900 mb-4">Contact</h5>

            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-egray-700 hover:text-black transition duration-300">
                <CiLocationOn className="text-egray-700 text-lg stroke-[0.5px]" />
                Unit 1 / 25 Burns Rd, Altona VIC 3018
              </li>
              <li className="flex items-center gap-2 text-egray-700 hover:text-black transition duration-300">
                <CiMail className="text-egray-700 text-lg stroke-[0.5px]" />
                admin@eucaonline.com.au
              </li>
              <li className="flex items-center gap-2 text-egray-700 hover:text-black transition duration-300">
                <CiPhone className="text-egray-700 text-lg stroke-[0.5px]" />
                03 8368 2522
              </li>
              <li className="flex items-center gap-2 text-egray-700 hover:text-black transition duration-300">
                <CiPhone className="text-egray-700 text-lg stroke-[0.5px]" />+
                01 234 567 89
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-900">
        © 2025 Copyright:{" "}
        <span className="font-semibold">
          <a href="https://www.eucaonline.com.au/" className="hover-link">
            Euca Online.
          </a>
        </span>{" "}
        Website designed & developed by{" "}
        <span className="font-semibold">
          {" "}
          <a
            href="https://www.elephantintheboardroom.com.au/"
            className="hover-link"
          >
            {" "}
            Elephant in the Boardroom.
          </a>
        </span>
      </div>
    </footer>
  );
}
