import PageTitle from "@/components/my-components/page-title/PageTitle";
import Image from "next/image";
import { GiAustralia } from "react-icons/gi";
import { FaBoxesStacked } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";



export default function AboutUsPage() {
  return (
    <div className="bg-white pb-10">
      <PageTitle title="About Us" />
      <div className="container my-10 max-w-[55%] mx-auto flex flex-col gap-4">
        <h2 className="text-4xl font-semibold">The Story of Euca</h2>
        <Image
          src={
            "https://www.eucaonline.com.au/media/wysiwyg/Eucalyptus_distilling_circa_1920.jpg"
          }
          alt="About EUCA"
          width={1000}
          height={1000}
        />
        <div className="flex flex-col gap-4">
          <p className="text-egray-700">
            It all started in 1952 in the rural township of Avoca, Victoria
            where the founder Charles Henry Goodall produced eucalyptus oil from
            his personal distillery.
          </p>
          <p className="text-egray-700">
            Many years later, after marrying Anne Adel Dimsey from Ballarat
            Victoria, a move was made to Melbourne where Charles opened his new
            eucalyptus trading business, “the Chemical Refining Company”.
          </p>
          <p className="text-egray-700">
            A move to the Melbourne suburb of Williamstown in 1960 followed,
            where a corrugated iron factory was built for the Chemical Refining
            Company, not much more than a humble shed for the growing business.
            It was basic, but it was ours.
          </p>

          <p className="text-egray-700">
            In 1978, Charles’s son, Charles Leighton Goodall joined the family
            business to take over after his father’s untimely death. The
            beginnings of Euca were unfolding.
          </p>

          <p className="text-egray-700">
            Further expansion was needed for the growing business so a move to a
            new modern specifically built facility happened in 2004, located in
            Altona, Melbourne, the current home of who we are known today,
            “Proud Products Pty Ltd”, guardians of the trade name Euca, being
            short for eucalyptus as it is the main base essential oil used in
            our comprehensive range of cleaning products.
          </p>

          <p className="text-egray-700">
            Along with eucalyptus, we have over time added further Australian
            essential oils such as citrus, lavender, jasmine, lemon myrtle,
            clove, coconut and more. All created to perform while being friendly
            to the ecology as well as to those using them.
          </p>

          <p className="text-egray-700">
            <a href="https://eucaonline.com.au" className="a-body-links">
              eucaonline.com.au
            </a>
          </p>

          <p className="text-egray-700">
            The philosophy from Charles Henry Goodall continues today through
            Charles Leighton (Leigh) Goodall, striving for perfection in
            quality, value for money and most of all service in supplying unique
            blends of Australian cleaning products that are all based on a rich
            family history of working with natural ingredients.
          </p>

          <p className="text-egray-700">
            Euca, still family made today by Proud Products Pty Ltd, in Altona,
            Melbourne.
          </p>
        </div>
        <Image
          src={
            "https://www.eucaonline.com.au/pub/media/wysiwyg/rsz_leigh_goodall_-_signature.png"
          }
          alt="About EUCA"
          width={100}
          height={100}
        />
        <Image
          src={
            "https://www.eucaonline.com.au/media/wysiwyg/Eucalyptus_distilling_circa_1920_s_2_.jpg"
          }
          alt="About EUCA"
          width={1000}
          height={1000}
        />

        <iframe
          width={"100%"}
          height={"500px"}
          src="https://www.youtube.com/embed/Y1jQcer0qd0?si=PkOvc7QjuQ_09IBl"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="w-full mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-egray-900">Why choose us?</h2>
            <button className="bg-egreen-800 text-white px-6 py-2 rounded-full hover:bg-egreen-700 transition-all">
              Contact us
            </button>
          </div>
          <div className="grid grid-cols-3 ">
            <div className="bg-white flex flex-col gap-4 items-center px-4 py-10 text-center shadow rounded-l-sm hover:shadow-md transition-links">
              <GiAustralia className="text-egray-700 text-7xl" />
              <h3 className="font-bold text-egray-900 text-lg">
                Australian Made & Owned
              </h3>
              <p className="text-egray-700 text-sm">
                Locally sourced products and Australian family owned for three
                generations.
              </p>
            </div>
            <div className="bg-egreen-800 flex flex-col gap-4 items-center px-4 py-10 text-center shadow  hover:shadow-md transition-links">
              <FaBoxesStacked className="text-gray-100 text-7xl" />
              <h3 className="font-bold text-egray-50 text-lg">
              Exceptional quality products
              </h3>
              <p className="text-egray-100 text-sm">
              Proud Products have quietly been innovating a whole range of unique cleaning products that out-perform expectations.
              </p>
            </div>
            <div className="bg-white flex flex-col gap-4 items-center px-4 py-10 text-center shadow rounded-r-sm hover:shadow-md transition-links">
              <MdOutlineSupportAgent className="text-egray-700 text-7xl" />
              <h3 className="font-bold text-egray-900 text-lg">
              Exceptional Customer service
              </h3>
              <p className="text-egray-700 text-sm">
              The team at Euca go out of their way to surprise and delight, and always like to use the old fashioned way of communicating.
              </p>
            </div>

          </div>
        </div>

        <div className="flex gap-4 mt-10">
            <div className="flex flex-col gap-4"> 
                <h3 className="font-bold text-egray-900 text-3xl">
                Our Laundry Products
                </h3>
                <p className="text-egray-700">Euca laundry products were designed and tested from the beginning as pure concentrate powders and liquids, with no added fillers like in supermarket brands. No added nasties that causes issues for human skins and bronchial airways. Euca’s unique blend is also extremely low in phosphate in the powder formula, and no Phosphate at all in the liquid, which make both very beneficial in grey water on plants.</p>
                <button className="w-fit bg-egreen-800 text-white px-6 py-2 rounded-full hover:bg-egreen-700 transition-all">
              Contact us
            </button>
            </div>
            <Image
                src="https://www.eucaonline.com.au/pub/media/wysiwyg/Best_Laundry_Logo.jpg"
                width={250}
                height={250}
                alt="Our Laundry Products"
            />
        </div>
        <div className="flex gap-4 mt-10 flex-row-reverse">
            <div className="flex flex-col gap-4"> 
                <h3 className="font-bold text-egray-900 text-3xl">
                Our Multi Range
                </h3>
                <p className="text-egray-700">Tuff was made originally to be a biodegradable “green” workshop cleaner / degreaser. The Citrus and Eucalyptus combine to make a powerful “Tough” cleaner that is completely non caustic and non corrosive. Tuff’s abilities quickly made its way into the “HOME” being a safe cleaner to use in the oven, on the BBQ, benches, laundry, bathroom …. anywhere . Why use a caustic cleaner in your home and cooking surfaces when you can use TUFF. We say “What doesn’t Tuff Clean”.</p>
                <button className="w-fit bg-egreen-800 text-white px-6 py-2 rounded-full hover:bg-egreen-700 transition-all">
              Shop Multi
            </button>
            </div>
            <Image
                src="https://www.eucaonline.com.au/pub/media/wysiwyg/Feb_Euca_Multi_Ready_To_Use.jpg"
                width={250}
                height={250}
                alt="Our Multi Range"
            />
        </div>
        <div className="flex gap-4 mt-10">
            <div className="flex flex-col gap-4"> 
                <h3 className="font-bold text-egray-900 text-3xl">
                Our Laundry Liquid
                </h3>
                <p className="text-egray-700">Our Best Laundry Liquid to date. Originally marketed as a wool was only, we designed this Laundry liquid to have more of the good bits of the Euca Laundry Liquid, plus we added some extra Eucalyptus as well. The blend will not remove lanolin from woolens so they return their warmth and softness. We quickly realised this benefit was perfect for hand washing delicate underwear, washing towels to make soft and fluffy, doonas to maintain warmth and a host of other laundry items.</p>
                <button className="w-fit bg-egreen-800 text-white px-6 py-2 rounded-full hover:bg-egreen-700 transition-all">
                Shop Laundry Liquid
            </button>
            </div>
            <Image
                src="https://www.eucaonline.com.au/pub/media/backgroundimage/Nov19_Euca_Laundry_Liquid.gif"
                width={250}
                height={250}
                alt="Our Laundry Liquid"
            />
        </div>
        <p className="text-egray-700 mt-10">
            The philosophy from Charles Henry Goodall continues today through
            Charles Leighton (Leigh) Goodall, striving for perfection in
            quality, value for money and most of all service in supplying unique
            blends of Australian cleaning products that are all based on a rich
            family history of working with natural ingredients.
          </p>
      </div>
    </div>
  );
}
