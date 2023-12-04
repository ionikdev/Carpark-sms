import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="">
      <Image
        src="/images/park.jpg"
        alt="/"
        width={500}
        height={500}
        className="w-[100vw] h-[70vh] hero object-cover"
      />

      <div className="w-full text-center mt-12">
        <div className="max-w-[1240px] w-full mx-auto p-2 flex justify-center">
          <div className="">
            <h1 className="font-bold max-w-[90%] md:max-w-[70%] m-auto text-2xl md:text-5xl sm:text-4xl  text-grey-700">
              Are you tired of endless searches for parking spaces?
            </h1>
            <p className="text-slate-500 font-medium py-6 max-w-[90%] md:max-w-[60%] m-auto text-sm sm:text-xl">
              Experience the convenience of finding, reserving, and paying for
              parking spaces effortlessly. Our system provides real-time updates
              on space availability, making your parking hassle-free.
            </p>

            <Link href="/signin/user">
              <button className="mb-6 bg-red-600 text-white py-3 px-6 font-bold rounded-md text-sm">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
