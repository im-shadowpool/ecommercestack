import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-[90vh] justify-center h-min bg-white">
      <Image
        src="https://www.eucaonline.com.au/media/Euca_Plant_Images/Mascot.svg"
        alt="404"
        width={400}
        height={400}
      />
      <div className="flex flex-col items-center gap-5 pb-10">
      <h1 className="text-6xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <button className="w-fit  bg-egreen-800 hover:bg-green-700 transition-links text-white py-2 px-4 rounded">
        Brose Homepage
      </button>
        </div>

    </div>
  );
}
