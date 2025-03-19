import Image from "next/image";
import "./Home.css";
import { motion } from "framer-motion";

export default function FirstInfoSection() {
  return (
    <div
      className="relative min-h-[90vh] p-24 bg-cover bg-center place-content-center text-gray-800"
      style={{ backgroundImage: "url('/homepage-assets/section1-bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between gap-40">
        <div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-center md:text-left"
        >
          <p className="text-sm text-gray-900">
            Making Laundry Powder since circa 1959
          </p>
          <h2 className="text-7xl font-bold text-[#aaa298] mt-2">
            AUSTRALIAN MADE
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative flex mx-auto">
            <Image
              src="/homepage-assets/leave.png"
              alt="Leaf"
              className="w-64 mx-auto"
              width={200}
              height={200}
            />
            <Image
              src="/homepage-assets/leave.png"
              alt="Leaf"
              className="w-64 mx-auto scale-x-[-1]"
              width={200}
              height={200}
            />
            <Image
              src="/homepage-assets/australia-made-home-new.png"
              alt="Euca Laundry Powder"
              className="w-80 mx-auto absolute left-24 bottom-0 bounce-slowly"
              width={400}
              height={400}
            />
          </div>
          <div className="max-w-[16rem] text-egray-700 text-sm flex flex-col justify-between gap-6">
            <p>
              From humble beginnings in country Victoria, to a small factory in
              Williamstown and now Altona. Our unchanged laundry and cleaning
              product formula is an old family recipe using eucalyptus of
              course. The blend is special as it contains no harsh fillers or
              chemicals making it biodegradable, septic and grey water safe and
              kind to sensitive skin.
            </p>
            <button className="bg-egreen-800 font-bold self-start text-white px-6 py-2 rounded-full hover:bg-egreen-700 transition-all">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}