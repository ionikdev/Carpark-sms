import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="w-full bg-red-700 pt-4">
      <div className="max-w-[1140px] mx-5 lg:m-auto pt-20">
        <div className="flex flex-col gap-5 justify-center items-center mx-auto text-xl tracking-widest font-semibold">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />

          <div className="flex gap-5 mt-4">
            <span className="cursor-pointer w-fit text-lg font-medium hover:font-bold duration-200">
              <Link href="/signin/admin">Admin</Link>
            </span>
            <span className="cursor-pointer w-fit text-lg font-medium hover:font-bold duration-200">
              <Link href="/signin/operator">Operator</Link>
            </span>
          </div>
        </div>

        <span className="flex justify-center items-center mx-auto text-xl tracking-widest font-semibold mt-20 pb-10">
          © Copyright - Ionikdev 2023
        </span>
      </div>
    </div>
  );
}

export default Footer;
