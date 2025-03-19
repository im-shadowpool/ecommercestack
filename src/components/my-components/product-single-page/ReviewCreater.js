import { useState } from "react";
import { motion } from "framer-motion";

export default function ReviewCreater({ producttitle }) {
  const [review, setReview] = useState({
    name: "",
    subject: "",
    reviewText: "",
    price: 0,
    value: 0,
    quality: 0,
  });

  const handleChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (review.name && review.subject && review.reviewText) {
      console.log("Review Submitted", review);
      setReview({
        name: "",
        subject: "",
        reviewText: "",
        price: 0,
        value: 0,
        quality: 0,
      });
    }
  };

  return (

      <div className="flex flex-col gap-4 p-4 border">
        <h2 className="text-egreen-950 text-2xl font-semibold">
          {producttitle}
        </h2>
        <div className="flex gap-4">
          {["price", "value", "quality"].map((field) => (
            <div
              key={field}
              className="flex flex-col bg-white rounded-md max-w-fit px-4 py-1"
            >
              <span className="capitalize text-sm font-light">{field}:</span>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.span
                    whileHover={{ scale: 2 }}
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      review[field] >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleChange(field, star)}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-[50%] ">
              <p className="text-sm">
                Nickname<span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                placeholder="Your Name"
                value={review.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border p-4 mb-2 rounded bg-white/50 focus:border-egreen-800 focus:outline-none focus:none"
              />
            </div>
            <div className="flex flex-col gap-1 w-[50%] ">
              <p className="text-sm">
                Subject<span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                placeholder="Subject"
                value={review.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="border p-4 mb-2 rounded bg-white/50 focus:border-egreen-800 focus:outline-none focus:none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <p className="text-sm">
              Review<span className="text-red-600">*</span>
            </p>
            <textarea
              placeholder="Your Review"
              value={review.reviewText}

              onChange={(e) => handleChange("reviewText", e.target.value)}
              className="border p-4 mb-2 rounded bg-white/50 focus:border-egreen-800 focus:outline-none focus:none"
              
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-egreen-700 text-white px-6 py-2 rounded w-fit"
          >
            Submit Review
          </button>
        </div>
      </div>
    
  );
}
