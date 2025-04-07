import Image from "next/image";
import "./Home.css";

export default function ThirdInfoSection() {
  return (
    <div
      className="relative min-h-[90vh] p-24 bg-cover bg-center place-content-center text-gray-800"
      style={{ backgroundImage: "url('/homepage-assets/section1-bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between gap-24">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-900">
            Our Purpose
          </p>
          <h2 className="text-7xl font-bold text-[#aaa298] mt-2">
            REDUCE SINGLE PLASTIC USE
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative flex mx-auto gap-20">
            <Image
              src="/homepage-assets/leave.png"
              alt="Leaf"
              className="w-64 mx-auto transform-cpu rotate-[340deg]"
              width={200}
              height={200}
            />
            <Image
              src="/homepage-assets/leave.png"
              alt="Leaf"
              className="w-64 mx-auto scale-x-[-1] transform-cpu rotate-[380deg]"
              width={200}
              height={200}
            />
            <Image
              src="/homepage-assets/softwash-home.webp"
              alt="Euca Laundry Powder"
              className="w-80 mx-auto absolute left-32 bottom-0 bounce-slowly"
              width={400}
              height={400}
            />
          </div>
          <div className="max-w-[16rem] text-egray-700 text-sm flex flex-col justify-between gap-6">
            <p>
            Many plastics are not easily recycled. Reducing single use plastic use is the most effective means of avoiding this waste. Euca encourage customers to purchase our eco boxes in bulk and refill into reusable containers like our forever spray bottle or other glass jars you might have at home.

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
