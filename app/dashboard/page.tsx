"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { activities } from "@/components/UserComponent/DashboardData";
import { AiOutlineBank, AiFillPieChart } from "react-icons/ai";
import { BsActivity, BsFillCreditCard2FrontFill } from "react-icons/bs";
import { TbActivityHeartbeat, TbCarSuv } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { GiMoneyStack } from "react-icons/gi";
import LineChart from "@/components/Charts/LineChart";
import DoughnutChat from "@/components/Charts/DoughnutChat";
import { BiUserPlus } from "react-icons/bi";
import { activitiesProps } from "./types";
import { useSelector } from "react-redux";
import axiosClient from "@/Services/axiosInstance";
import { RootState } from "@/context/Redux/store/store";

type Amount = {
  logo?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  title: string;
  amount: number;
  logoBg?: string;
};

const Account = ({ logo, title, amount, logoBg }: Amount) => {
  return (
    <div className="flex gap-3">
      <span className={`text-3xl rounded-md p-2 ${logoBg}`}>{logo}</span>
      <div className="flex flex-col text-center mx-auto items-start align-middle ">
        <p className="text-sm">{title}</p>
        <div className="flex items-center">
          <span className="font-bold text-center">{amount}</span>
        </div>
      </div>
    </div>
  );
};

const Body = () => {
  const [totalUser, setTotalUser] = useState<0 | null>(null);
  const [totalOperator, setTotalOperator] = useState<0 | null>(null);
  const [totalAdmin, setTotalAdmin] = useState<0 | null>(null);
  const [totalCarPack, setTotalCarpack] = useState<0 | null>(null);
  const [totalSpace, setTotalSpace] = useState<0 | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const client = axiosClient(token);
  const user = useSelector((state: RootState) => state.auth.user);
  const isUser = user?.role;

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await client.get("/get-total-counts");
        console.log(response);
        if (isMounted) {
          setTotalUser(response.data.data.total_users);
          setTotalOperator(response.data.data.total_operators);
          setTotalAdmin(response.data.data.total_admins);
          setTotalCarpack(response.data.data.total_carpack);
          setTotalSpace(response.data.data.total_space);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <DefaultLayout>
      <main className="h-full">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-7">
          {/* First Section */}
          <div className="flex flex-col h-screen gap-5 overflow-y-auto md:col-span-5 md:ml-10 ">
            <div className="flex lg:flex-row flex-col  md:items-center justify-between md:px-4 gap-10 md:gap-1 bg-[#FFFFFF] w-[fit] h-[fit] p-10 rounded-lg shadow-sm shadow-gray-300">
              <div>
                {isUser === "admin" && (
                  <Account
                    logo={<BiUserPlus />}
                    logoBg="bg-[#FFF5F3]"
                    title="Total Users"
                    amount={totalUser ?? 0}
                  />
                )}
                {isUser === "user" && (
                  <Account
                    logo={<TbCarSuv />}
                    logoBg="bg-[#FFF5F3]"
                    title="Total Booking"
                    amount={totalUser ?? 0}
                  />
                )}
              </div>
              <div className="border-r border-gray-200 ">
                {isUser === "operator" && (
                  <Account
                    logo={<FaWallet />}
                    logoBg="bg-[#BFE3F5]"
                    title="Total Space Assigned"
                    amount={totalCarPack ?? 0}
                  />
                )}
              </div>
              <div className="px-3 border-r border-gray-200 ">
                <Account
                  logo={<AiOutlineBank />}
                  logoBg="bg-[#BFE3F5]"
                  title="Total Payment"
                  amount={totalUser ?? 0}
                />
              </div>
            </div>
            {/* Middle Body */}
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
              <div className="flex flex-col px-4  bg-primary1 w-full h-[fit] col-span-1 rounded-lg shadow-sm shadow-gray-300">
                <div className="font-bold pt-5 ">Overview</div>
                <div className="p-2">
                  <DoughnutChat />
                </div>
              </div>

              <div className="flex flex-col p-5 bg-primary1 w-full h-[50vh] col-span-1 rounded-lg shadow-sm shadow-gray-300">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">OverView</span>
                  <span className="w-auto h-auto p-2 text-3xl bg-white rounded-full shadow-md shadow-gray-300">
                    <CgMenuGridO />
                  </span>
                </div>

                <div className="flex flex-col items-start gap-2 mt-3">
                  <div className="flex items-center justify-around gap-2 p-2 border border-gray-300 rounded-xl">
                    <span className="text-xl">
                      <AiFillPieChart />
                    </span>
                    <span> Active Operator: {totalOperator ?? 0} </span>
                  </div>
                  <div className="flex items-center justify-around gap-2 p-2 border border-gray-300 rounded-xl">
                    <span className="text-xl">
                      <BsFillCreditCard2FrontFill />
                    </span>
                    <span>Initiate a transfer transaction</span>
                  </div>
                  <div className="flex items-center justify-around gap-2 p-2 border border-gray-300 rounded-xl">
                    <span className="text-xl">
                      <FaWallet />
                    </span>
                    <span>Fund operations account</span>
                  </div>
                  <div className="flex items-center justify-around gap-2 p-2 border border-gray-300 rounded-xl">
                    <span className="text-xl">
                      <GiMoneyStack />
                    </span>
                    <span>Record a cash transaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lower Body */}

            <div className="bg-[#FFFFFF] w-full h-[106vh] rounded-lg shadow-sm shadow-gray-300">
              <LineChart />
            </div>
          </div>

          {/* Second Section */}
          <div className="flex flex-col items-center md:mx-auto h-screen gap-2 overflow-y-auto md:col-span-2 ">
            <div className=" flex items-center justify-evenly gap-5  border rounded-lg p-2 m-3 bg-[#BFE3F5] ">
              <span className="text-4xl ">
                <BsActivity />
              </span>
              <span className="flex flex-col items-start gap-2 ">
                <p className="font-bold ">Last 7 activities</p>
              </span>
            </div>
            <div className=" flex flex-col items-start gap-3 p-3 px-5   bg-primary1 md:w-fit w-full md:h-[200vh] h-fit rounded-md ">
              {activities.map((item: activitiesProps) => (
                <div
                  className="flex justify-between items-center gap-3"
                  key={item.id}
                >
                  <div className="flex justify-between  flex-col items-center">
                    <p className="text-sm">{item.title}</p>
                    <div className="flex items-center">
                      <span className="text-xl">
                        <TbActivityHeartbeat />
                      </span>
                      <span className="font-bold">{item.amount}</span>
                    </div>
                  </div>
                  <span className={` text-[10px] italic `}>12:30am</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Body;
