"use client";
import { plans } from "./data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function Plan() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const images = [
    "/assets/image2.png",
    "/assets/image5.png",
    "/assets/image3.png",
    "/assets/image4.png",
  ];

  return (
    <div className="w-full">
      <div className="bg-gray-100 w-full my-10">
        <div className="max-w-[1140px] mx-5 lg:m-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 pt-20">
          {plans.map((item) => (
            <div
              key={item.id}
              className="bg-black text-center mb-5 md:mb-0 gap-5 py-9 rounded-xl flex flex-col items-center justify-start md:hover:translate-y-5 ease-in-out duration-300 hover:bg-red-800 text-gray-500 hover:text-white cursor-pointer"
            >
              {/* <IoIosPeople className="bg-gray-100 text-black text-5xl p-2 rounded-xl" /> */}
              <h3 className="text-bold text-white  text-2xl">{item.title}</h3>
              <p className="max-w-[85%]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plan;
