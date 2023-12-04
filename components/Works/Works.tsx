"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Works() {
  return (
    <div className="bg-white">
      <div className="w-full text-center mt-20">
        <div className="max-w-[1240px] w-full mx-auto p-2 flex justify-center">
          <div className="">
            <h1 className="font-bold max-w-[90%] md:max-w-[70%] m-auto capitalize text-2xl md:text-3xl sm:text-4xl  text-grey-700">
              Park Smarter, Travel Easier: Your Seamless Parking Solution!
            </h1>
            <p className="text-slate-500 font-medium py-6 max-w-[90%] md:max-w-[60%] m-auto text-sm sm:text-xl">
              Effortless Parking Solutions for Your Everyday Journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Works;
