import { useState } from "react";
import productsdesc from "@/product-data/productsdesc.json";
import ReviewCreater from "./ReviewCreater";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductDescription({ selectedSizeTitle }) {
  const [activeTab, setActiveTab] = useState("Details");

  const productdescription = productsdesc.find(
    (prod) => "freshpaws-pet-shampoo" === "freshpaws-pet-shampoo"
  );

  return (
    <div className="padding-container py-8 mb-28">
      <div className="border-b flex mb-4">
        {["Details", "More Information", "Reviews"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab ? "border-b-2 border-egreen-700" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* TAB CONTENT */}
      {activeTab === "Details" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[80%]"
        >
          <div className="max-w-full flex flex-col gap-4 border p-4">
            {productdescription.details.map((item, index) => {
              switch (item.type) {
                case "h2-Special":
                  return (
                    <h2
                      className="text-egreen-950 text-2xl font-semibold"
                      key={item.id || index}
                    >
                      {selectedSizeTitle}
                    </h2>
                  );
                case "p":
                  return (
                    <p className="text-egray-700" key={item.id || index}>
                      {item.content}
                    </p>
                  );
                case "list":
                  return (
                    <ul
                      key={item.id || index}
                      className="list-disc list-inside text-egray-700 space-y-2"
                    >
                      {item.content.map((list, ind) => (
                        <li className="" key={ind}>
                          {list}
                        </li>
                      ))}
                    </ul>
                  );
                case "img":
                  return (
                    <Image
                      key={item.id || index}
                      src={item.src}
                      alt={item.alt}
                      width={560}
                      height={315}
                      className="object-cover"
                    />
                  );
                case "iframe":
                  return (
                    <iframe
                      key={item.id || index}
                      width="560"
                      height="315"
                      src={item.src}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </motion.div>
      )}

      {activeTab === "More Information" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[80%]"
        >
          <div className="max-w-full flex flex-col gap-4">
            {productdescription.moreInfo.map((info, index) => (
              <div key={index} className="p-4 border">
                {Object.entries(info).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "Reviews" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-[80%]"
        >
          <ReviewCreater producttitle={selectedSizeTitle} />
        </motion.div>
      )}
    </div>
  );
}
