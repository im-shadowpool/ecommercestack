import Image from "next/image";
import "./Home.css";

export default function SecondInfoSection() {
  return (
    <div
      className="relative min-h-[90vh] p-24 bg-cover bg-center place-content-center text-gray-800"
      style={{ backgroundImage: "url('/homepage-assets/section1-bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between gap-16">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-900">
            Natural and Environmentally friendly
          </p>
          <h2 className="text-7xl font-bold text-[#aaa298] mt-2">
            LOCALLY SOURCED
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
              src="/homepage-assets/home-castile.webp"
              alt="Euca Laundry Powder"
              className="w-80 mx-auto absolute left-32 bottom-0 bounce-slowly"
              width={400}
              height={400}
            />
            <Image
              src="/homepage-assets/Olive1.png"
              alt="Leaf"
              className="w-16 mx-auto scale-x-[-1] flex self-center absolute left-6"
              width={60}
              height={60}
            />
            <Image
              src="/homepage-assets/Olive1.png"
              alt="Leaf"
              className="w-16 mx-auto flex self-center absolute right-6"
              width={60}
              height={60}
            />
          </div>
          <div className="max-w-[16rem] text-egray-700 text-sm flex flex-col justify-between gap-6">
            <p>
              Castile soap, first made in Spain's Castile region, is a vegan,
              biodegradable soap that uses only vegetable oils instead of animal
              fats. By substituting animal fat with olive oil in the traditional
              soap-making process, Castile soap not only produces soap but also
              retains natural glycerine, making it gentler on the skin compared
              to regular bar soaps. Environmentally friendly and free from
              harmful additives, Castile soap is a pure, natural cleaner. In
              contrast, many modern "soaps" are actually synthetic detergents or
              surfactants, often petroleum-based and far less eco-friendly.
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
