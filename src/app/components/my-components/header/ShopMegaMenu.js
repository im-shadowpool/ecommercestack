import Link from "next/link";
import { motion } from "framer-motion";

export default function ShopMegaMenu() {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className=" max-h-[400px] overflow-y-auto flex flex-col gap-6">

    <div className="flex flex-col gap-1.5 border-b-2 border-egray-200 border-dashed pb-5">
      <p className="text-egray-900 font-bold">
      Euca Online
      </p>
      <p className="text-egray-700">
      Eucalyptus Laundry & Household Cleaning. A better clean for the whole home.
      </p>
    </div>


      <div className="grid grid-cols-3 gap-6">

        

      {/* Column 1 - Laundry */}
      <div>
        <h3 className="font-bold text-egreen-800">
          <Link prefetch={true} href="/products" className="hover-link">
            All Products
          </Link>
        </h3>
        <h3 className="mt-2 font-bold text-gray-800">
          <Link href="#" className="hover-link">
          Specials + Packs
          </Link>
        </h3>
        <h3 className="mt-2 font-bold text-egreen-800">
          <Link prefetch={true} href="/category/laundry" className="hover-link">
            Laundry
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li>
            <Link href="#" className="hover-link">
              Laundry Powder
            </Link>
          </li>
          <li className="pl-4">— Eucalyptus Powder</li>
          <li className="pl-4">— Lemon Myrtle Powder</li>
          <li className="pl-4">— Workwear Laundry Powder</li>
          <li>
            <Link href="#" className="hover-link">
              Laundry Liquids
            </Link>
          </li>
          <li className="pl-4">— Eucalyptus Liquid</li>
          <li>
            <Link href="#" className="hover-link">
              Laundry Sanitiser
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Fabric Softener
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Soaker Brightener
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Linen Spray & Ironing Aid
            </Link>
          </li>
        </ul>
        <h3 className="mt-4 font-bold text-egreen-800">
          <Link href="/category/castile-soap" className="hover-link">
            Castile Soap
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li className="pl-4">— Eucalyptus</li>
          <li className="pl-4">— Unscented</li>
          <li className="pl-4">— Foaming Castile</li>
        </ul>
        <h3 className="mt-4 font-bold text-egreen-800">
          <Link href="/category/essential-oils" className="hover-link">
            Essential Oils
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li className="pl-4">— Eucalyptus</li>
        </ul>
      </div>

      {/* Column 2 - Dish Washing & House Cleaners */}
      <div>
        <h3 className="font-bold text-egreen-800">
          <Link href="/category/dish-washing" className="hover-link">
            Dish Washing
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li>
            <Link href="#" className="hover-link">
              Dish Washing Powder
            </Link>
          </li>
          <li className="pl-4">— Rinse Aid</li>
          <li>
            <Link href="#" className="hover-link">
              Dish Washing Liquid - Sinks
            </Link>
          </li>
          <li className="pl-4">— Tea Tree Oil</li>
        </ul>

        <h3 className="mt-4 font-bold text-egreen-800">
          <Link href="/category/house-cleaners" className="hover-link">
            House Cleaners
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li>
            <Link href="#" className="hover-link">
              Surface Spray/Cleaner
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Glass Cleaner
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Bench Tops/Cupboards
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Mould Remover
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Oven Cleaner
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Black Glass Cooktop Restorer
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Floor Cleaner
            </Link>
          </li>
        </ul>
        <h3 className="mt-4 font-bold text-egreen-800">
          <Link href="/category/outdoor-range" className="hover-link">
            NEW - Outdoor Range
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li className="pl-4">— Eco Citrus Hand Cleaner</li>
          <li className="pl-4">— Furniture Rejuvenator</li>
          <li className="pl-4">— Deck, wall and window cleaner</li>
        </ul>
      </div>

      {/* Column 3 - Pet Care & Personal Care */}
      <div>
        <h3 className="font-bold text-egreen-800">
          <Link href="/category/pet-care" className="hover-link">
            Pet Care
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li>
            <Link href="#" className="hover-link">
              Pet Shampoo
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Odour Remover
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Multi Purpose Cleaner
            </Link>
          </li>
        </ul>

        <h3 className="mt-4 font-bold text-egreen-800">
          <Link href="/category/personal-care" className="hover-link">
            Personal Care
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li>
            <Link href="#" className="hover-link">
              Hand Sanitiser
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Hand Wash
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Body Wash
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Shampoo/Conditioner
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Moisturiser & Skin Care
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Bath Oils and Wash
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Sunscreen
            </Link>
          </li>
        </ul>

        <h3 className="mt-4 font-bold text-egreen-800">
          <Link href="/category/industrial cleaners" className="hover-link">
            Industrial Cleaners
          </Link>
        </h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li>
            <Link href="#" className="hover-link">
              Degreasers
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Hand Cleaner
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Disinfectant
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Metal Polish
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Multi Purpose Cleaners
            </Link>
          </li>
          <li>
            <Link href="#" className="hover-link">
              Laundry Heavy Duty
            </Link>
          </li>
        </ul>
        <h3 className="mt-4 font-bold text-egreen-800">
          <Link href="/category/accessories-parts" className="hover-link">
            Accessories / Parts
          </Link>
        </h3>
      </div>

      {/* Column 4 - Image */}
      {/* <div>
        <img
          src="https://www.eucaonline.com.au/media/Euca_Plant_Images/Mascot.svg"
          alt="Euca Products"
          className="w-full rounded-md"
        />
      </div> */}
      </div>
      <div className="flex flex-col gap-1.5 border-t-2 border-egray-200 border-dashed pt-5">
      <p className="text-egray-900 font-bold">
      Austalian Owned & Made
      </p>
      <p className="text-egray-700">
      Our Australian made and owned cleaning products provide a complete range for everyday households and commercial industries. Our powerful, plant based products are designed to perform, be economical on your pocket and kind and gentle to allergy prone skin. Be assured of Euca’s guarantee of quality, service and value for money.
      </p>
    </div>

    </motion.div>
  );
}
