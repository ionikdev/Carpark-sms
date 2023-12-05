"use client";
import { useEffect, useRef, useState } from "react";
import { LuActivity, LuLayoutDashboard } from "react-icons/lu";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineBarChart,
  AiOutlineDingtalk,
} from "react-icons/ai";

import Link from "next/link";
import { GrTransaction } from "react-icons/gr";
import { BsRecordBtn } from "react-icons/bs";
import { BiUserPlus } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { GiJeep } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "@/context/Redux/store/store";
import { RiOperaFill, RiSecurePaymentLine } from "react-icons/ri";
import { MdFeedback } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isUser = user?.role;

  const sidebar = useRef<any>(null);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleMinimize = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <aside
      ref={sidebar}
      className={` hidden md:flex relative left-0 top-0 z-[9999]  h-screen flex-col overflow-y-hidden bg-white duration-500 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${isSidebarMinimized ? "w-[5vw]" : "w-[16vw]"}`}
    >
      <header className="flex items-center justify-around p-2 mt-20">
        <div className="w-[32] h-[32] rounded-full p-2 shadow-md shadow-[#dce0ea]  ">
          <BiUserPlus />
        </div>
        {!isSidebarMinimized && <p className="font-bold text-center">sms</p>}
        <button
          onClick={toggleMinimize}
          className="absolute top-[25%] overflow-x-hidden shadow-2xl right-0   w-fit h-fit p-3 rounded-full hover:bg-[gray]"
        >
          {isSidebarMinimized ? (
            <AiOutlineArrowRight />
          ) : (
            <AiOutlineArrowLeft />
          )}
        </button>
      </header>

      <main
        className={`flex   items-center flex-col justify-center   ${
          isSidebarMinimized
            ? "text-[20px] items-center "
            : "text-[12px] items-center "
        }  cursor-pointer ${isSidebarMinimized ? "mt-28 px-5 " : "mt-20"}`}
      >
        <ul className=" my-auto  space-y-7">
          <Link href="/dashboard">
            <li
              className={`flex items-center w-full gap-2 ${
                pathname === "/dashboard"
                  ? !isSidebarMinimized
                    ? "bg-red-700 text-white font-bold py-3 px-5 rounded-2xl w-full"
                    : "px-5"
                  : "px-5"
              }`}
            >
              <LuLayoutDashboard />
              {!isSidebarMinimized && <p>Dashboard</p>}
            </li>
          </Link>

          {isUser === "admin" || isUser === "operator" ? (
            <Link href="/dashboard/carpack">
              <li
                className={` flex items-center mt-5  w-full gap-2 ${
                  pathname === "/dashboard/carpack"
                    ? !isSidebarMinimized
                      ? "bg-red-700 text-white  font-bold py-3 px-5 rounded-2xl w-full"
                      : "px-5 "
                    : " px-5 "
                }`}
              >
                <GiJeep />
                {!isSidebarMinimized && <p> Add Carpack</p>}
              </li>
            </Link>
          ) : null}
          {isUser === "admin" || isUser === "operator" ? (
            <Link href="/dashboard/space">
              <li
                className={` flex items-center mt-5  w-full gap-2 ${
                  pathname === "/dashboard/space"
                    ? !isSidebarMinimized
                      ? "bg-red-700 text-white  font-bold py-3 px-5 rounded-2xl w-full"
                      : "px-5 "
                    : " px-5 "
                }`}
              >
                <GrTransaction />
                {!isSidebarMinimized && <p> Add Space</p>}
              </li>
            </Link>
          ) : null}
          <Link href="/dashboard/booking">
            <li
              className={` flex items-center mt-5  w-full gap-2 ${
                pathname === "/dashboard/booking"
                  ? !isSidebarMinimized
                    ? "bg-red-700 text-white font-bold py-3 px-5  rounded-2xl w-full"
                    : "px-5 "
                  : " px-5 "
              }`}
            >
              <TbBrandBooking />
              {!isSidebarMinimized && <p>Booking</p>}
            </li>
          </Link>
          {isUser === "user" || isUser === "operator" ? (
            <Link href="/dashboard/activities">
              <li
                className={` flex items-center mt-5  w-full gap-2 ${
                  pathname === "/dashboard/activities"
                    ? !isSidebarMinimized
                      ? "bg-red-700 text-white font-bold py-3 px-5  rounded-2xl w-full"
                      : "px-5 "
                    : " px-5 "
                }`}
              >
                <LuActivity />
                {!isSidebarMinimized && <p>Activity</p>}
              </li>
            </Link>
          ) : null}
          {isUser === "admin" ? (
            <Link href="/dashboard/add-operators">
              <li
                className={` flex items-center mt-5  w-full gap-2 ${
                  pathname === "/dashboard/add-operators"
                    ? !isSidebarMinimized
                      ? "bg-red-700 text-white font-bold py-3 px-5  rounded-2xl w-full"
                      : "px-5 "
                    : " px-5 "
                }`}
              >
                <RiOperaFill />
                {!isSidebarMinimized && <p>Add Operator</p>}
              </li>
            </Link>
          ) : null}
          {isUser === "user" || isUser === "operator" ? (
            <Link href="/dashboard/feedback">
              <li
                className={` flex items-center mt-5  w-full gap-2 ${
                  pathname === "/dashboard/feedback"
                    ? !isSidebarMinimized
                      ? "bg-red-700 text-white font-bold py-3 px-5  rounded-2xl w-full"
                      : "px-5 "
                    : " px-5 "
                }`}
              >
                <MdFeedback />
                {!isSidebarMinimized && <p> Send Feedbacks</p>}
              </li>
            </Link>
          ) : null}
          {isUser === "operator" || isUser === "admin" ? (
            <Link href="/dashboard/feedback">
              <li
                className={` flex items-center mt-5  w-full gap-2 ${
                  pathname === "/dashboard/feedback"
                    ? !isSidebarMinimized
                      ? "bg-red-700 text-white font-bold py-3 px-5  rounded-2xl w-full"
                      : "px-5 "
                    : " px-5 "
                }`}
              >
                <MdFeedback />
                {!isSidebarMinimized && <p> View Feedback</p>}
              </li>
            </Link>
          ) : null}
          {isUser === "admin" ? (
            <Link href="/dashboard/feedback">
              <li
                className={` flex items-center mt-5  w-full gap-2 ${
                  pathname === "/dashboard/feedback"
                    ? !isSidebarMinimized
                      ? "bg-red-700 text-white font-bold py-3 px-5  rounded-2xl w-full"
                      : "px-5 "
                    : " px-5 "
                }`}
              >
                <RiSecurePaymentLine />
                {!isSidebarMinimized && <p>Payment</p>}
              </li>
            </Link>
          ) : null}

          <Link href="/dashboard/history">
            <li
              className={` flex items-center mt-5  w-full gap-2 ${
                pathname === "/dashboard/history"
                  ? !isSidebarMinimized
                    ? "bg-red-700 text-white font-bold py-3 px-5  rounded-2xl w-full"
                    : "px-5 "
                  : " px-5 "
              }`}
            >
              <FaHistory />
              {!isSidebarMinimized && <p>History</p>}
            </li>
          </Link>
        </ul>
      </main>
    </aside>
  );
};

export default Sidebar;
