"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import pagination styles
import { Pagination } from "swiper/modules"; // Import Pagination module
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    testimonialTitle: "My best decision ever!",
    text: "I am thrilled with the Euca products knowing that every cleaning product that I buy has integrity in the making, honest disclosure and transparency regarding ingredients and genuine pride in a truly Ozzie grown company that has had to compete with the giants on the market and their covert practices...",
    author: "North QLD",
    imageUrl:
      "/homepage-assets/copy-of-untitled-27-removebg-preview-removebg-preview_1__1.png",
  },
  {
    testimonialTitle: "Real Feedback (not made up stuff)",
    text: "Judith said 'I like the idea. The chamber makes it really easy to fill a bottle and I would purchase again.' Alison said 'I love the idea of less packaging, requires less storage space in my cupboard'.",
    author: "Euca",
    imageUrl:
      "/homepage-assets/euca-laundry-powder-full-range-1-removebg_2.png",
  },
  {
    testimonialTitle: "Fantastic Products and even better service",
    text: "Best laundry powder I’ve used, cleans hubbies dirty work gear and cricket whites come up perfect! Soft wash all the way for our towels, jumpers and blankets. Love the biodegradable packaging. Superfast freight to country areas, straight to my door.",
    author: "Rachael G, VIC",
    imageUrl:
      "/homepage-assets/copy-of-untitled-27-removebg-preview-removebg-preview_1__1.png",
  },
  {
    testimonialTitle: "This ticks all the boxes for me.",
    text: "My washing ranges from heavy duty to delicate & Euca does it all. I have sensitive skin & I have had no problems, the powder dissolves well. I use half the amount of what I used to use with other brands. We love the clean, fresh, natural smell. I love Euca’s environmentally & animal friendly ethos & that it’s Australian.",
    author: "Pip",
    imageUrl:
      "/homepage-assets/euca-laundry-powder-full-range-1-removebg_2.png",
  },
  {
    testimonialTitle: "Fantastic",
    text: "I suffer from severe dermatitis I can’t recommend this enough it leaves clothes (even dirty construction worker clothes) extremely clean and smelling amazing. I’ve even converted my super fussy 'I’ll only use radiant' Mum and other family members and friends. We love it!",
    author: "Kiza Gippsland, VIC",
    imageUrl:
      "/homepage-assets/copy-of-untitled-27-removebg-preview-removebg-preview_1__1.png",
  },
];

export default function HomeTestimonials() {
  const swiperRef = useRef(null);

  return (
    <div
      className="relative home-testimonial-slider min-h-[90vh] p-24 bg-cover bg-center flex flex-col items-center justify-evenly"
      style={{ backgroundImage: "url('/homepage-assets/testimonial-bg.jpg')" }}
    >
      <div className="mb-24">
        <h2 className="uppercase text-7xl font-bold text-[#aaa298]">
          Testimonials
        </h2>
      </div>
      {/* Swiper Container */}
      <div className="relative w-full max-w-4xl">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop
          speed={600}
          pagination={{ clickable: true }} // Enable pagination
          modules={[Pagination]} // Add Pagination module
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="p-6 text-center flex flex-col items-center gap-4 mb-4"
              >
                <Image
                  src={testimonial.imageUrl}
                  width={200}
                  height={200}
                  alt="Testimonial"
                />
                <h3 className="font-bold">{testimonial.testimonialTitle}</h3>
                <p className="text-gray-700">{testimonial.text}</p>
                <h4 className="font-bold">{testimonial.author}</h4>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full text-gray-600 cursor-pointer"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <ChevronLeft size={38} strokeWidth={1} />
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full text-gray-600 cursor-pointer"
          onClick={() => swiperRef.current.slideNext()}
        >
          <ChevronRight size={38} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
