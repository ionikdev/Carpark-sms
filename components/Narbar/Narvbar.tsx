"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineCar, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
  MdDashboard,
  MdOutlineConnectWithoutContact,
  MdOutlineSupportAgent,
  MdPermIdentity,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BsBox2Heart, BsPersonBoundingBox } from "react-icons/bs";
import { BiLogOut, BiLogoInvision, BiTrip, BiUserCircle } from "react-icons/bi";

import { usePathname, useRouter } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiSpaceNeedle } from "react-icons/gi";
import { RiLoginBoxLine } from "react-icons/ri";
import { TbBrandBooking, TbLogin2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/Redux/store/store";
import { setUser } from "@/context/Redux/slices/authSlice";
import { IoIosLogIn, IoMdLogOut } from "react-icons/io";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [nav, setNav] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const token = authState.token;
  const username = authState.user?.username;

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNav = () => {
    setNav(true);

    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleNavClose = () => {
    setNav(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (authState.user) {
        setIsUserLoaded(true);
      }

      if (!authState.user && !isUserLoaded) {
        const userFromLocalStorage = localStorage.getItem("user");
        const storedUser = userFromLocalStorage
          ? JSON.parse(userFromLocalStorage)
          : null;

        if (storedUser) {
          dispatch(setUser(storedUser));
        }

        setIsUserLoaded(true);
      }
    }
  }, [authState.user, dispatch, isUserLoaded]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (nav) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [nav]);

  //   const handleLogout = () => {
  //     dispatch(setUser(null));
  //     dispatch(setToken(null));

  //     localStorage.removeItem("user");
  //     localStorage.removeItem("access_token");
  //     toast.success("Logout!,Successfully ");

  //     router.push("/signin");
  //   };

  return (
    <div
      className={`fixed w-full h-20 nav z-[9999999] ${
        isScrolled ? " bg-black text-white" : " bg-black text-white"
      }`}
    >
      <div className="max-w-[1140px] mx-5 lg:m-auto h-full flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2  cursor-pointer">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            {/* <span className="text-2xl font-bold  lg:text-3xl">Trafull</span> */}
          </div>
        </Link>
        <div className="hidden md:flex justify-center gap-5">
          <Link
            className={`${
              pathname === "/" ? " border-b-2 border-red-600 pb-2" : ""
            }`}
            href="/"
          >
            <li className={`flex  items-center gap-1`}>
              <AiOutlineCar size={30} />
              <span className="mr-5 font-semibold "> Car Park</span>
            </li>
          </Link>
          <Link
            className={`${
              pathname === "/" ? " border-b-2 border-red-600 pb-2" : ""
            }`}
            href="/"
          >
            <li className="flex items-center gap-1">
              <GiSpaceNeedle size={30} />
              <span className="mr-5 font-semibold ">Available Space</span>
            </li>
          </Link>

          <Link
            className={`${
              pathname === "/" ? " border-b-2 border-red-600 pb-2" : ""
            }`}
            href="/"
          >
            <li className="flex items-center gap-1">
              <TbBrandBooking size={30} />
              <span className="mr-5 font-semibold ">Space Booking</span>
            </li>
          </Link>
        </div>
        <div> </div>
        <div className="items-center hidden gap-5 md:flex">
          {token ? (
            <div className="flex items-center " onMouseEnter={handleMouseEnter}>
              <span className="mr-2 font-bold">{username}</span>
              <div className="relative group">
                <span className="cursor-pointer ">
                  <BsPersonBoundingBox size={30} />
                </span>
                {isDropdownOpen ? (
                  <div className="dropdown-content hidden group-hover:block absolute -top-4 right-0 mt-2">
                    <div className="rounded-md bg-white border z-[99999] border-gray-300 shadow-lg mt-12 py-2">
                      <div className="hover:bg-red-700 hover:text-white flex items-center gap-2 justify-center px-5">
                        <MdDashboard size={25} />
                        <Link href="dashboard" onClick={handleMouseLeave}>
                          <button className="hover:text-white block w-full text-left  py-2 text-sm text-gray-700 ">
                            Dashboard
                          </button>
                        </Link>
                      </div>
                      <div className="hover:bg-red-700 hover:text-white flex items-center gap-2 justify-center px-5">
                        <IoMdLogOut size={25} className="" />
                        <button
                          //   onClick={handleLogout}
                          className="block w-full text-left hover:text-white  py-2 text-sm text-gray-700 "
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                    {/* Add more items with icons as needed */}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin/user">
                <span className="flex items-center gap-2 font-semibold ">
                  <IoIosLogIn className="text-3xl" />
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="flex items-center gap-2 font-semibold ">
                  <MdPermIdentity className="text-3xl" />
                  Register
                </span>
              </Link>
            </>
          )}
        </div>
        <div onClick={handleNav} className="md:hidden text-white">
          <AiOutlineMenu className="cursor-pointer" size={25} />
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] p-10 ease-in duration-500"
          }
        >
          <div onClick={handleNavClose}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                  />
                  {/* <span className="text-2xl font-bold text-black lg:text-3xl">
                    Trafull
                  </span> */}
                </Link>
              </div>
              <div
                onClick={handleNavClose}
                className="p-2 cursor-pointer text-black shadow-slate-100"
              >
                <AiOutlineClose size={25} />
              </div>
            </div>

            <div className="my-4 border-b border-gray-300">
              <p className="w-[85%] md:w-[90%] py-4 text-black">
                Let&apos;s give you the best experience
              </p>
            </div>

            <div>
              <ul className="text-black">
                {token ? (
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 py-4 w-fit"
                  >
                    <LuLayoutDashboard size={25} />
                    <span className=" py-2 text-sm text-black font-bold ">
                      Dashboard
                    </span>
                  </Link>
                ) : (
                  ""
                )}

                <Link href="/" className="flex items-center gap-2 py-4 w-fit">
                  <AiOutlineCar size={30} />
                  <span className="font-semibold text-black">
                    Check for Space
                  </span>
                </Link>

                {token ? (
                  <button
                    // onClick={handleLogout}
                    className="flex items-center mt-28 gap-2 mr-5 font-semibold text-black"
                  >
                    <span>
                      <BiLogOut />
                    </span>
                    <p>Logout</p>
                  </button>
                ) : (
                  <div className="">
                    <Link href="/signup">
                      <span className="flex items-center gap-2 font-semibold mt-10 text-black">
                        <MdPermIdentity className="text-3xl" />
                        Sign Up
                      </span>
                    </Link>
                    <Link href="/signin/login">
                      <span className="flex items-center gap-2 font-semibold mt-5 text-black">
                        <MdPermIdentity className="text-3xl" />
                        Sign In
                      </span>
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
