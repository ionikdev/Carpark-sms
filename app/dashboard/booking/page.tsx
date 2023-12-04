"use client";
import axiosClient from "@/Services/axiosInstance";
import UserDetails from "@/components/Dashboard/SpaceDetails";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { RootState } from "@/context/Redux/store/store";
import React, { useEffect, useState } from "react";

import { CgSpaceBetweenV } from "react-icons/cg";

import { useSelector } from "react-redux";

interface Carpark {
  id: number;
  carpark_name: string;
}

const page = () => {
  const [showModal6, setShowModal6] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [space, setSpace] = useState<Carpark[]>([]);

  const token = useSelector((state: RootState) => state.auth.token);
  const client = axiosClient(token);

  const openModal6 = (trip: any) => {
    setSelectedUser(trip);
    setShowModal6(true);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (token) {
          const response = await client.get("/get-space");
          console.log(response);

          if (isMounted) {
            setSpace(response.data.data.spaces);
          } else {
            console.error("Error fetching data:");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (token && isLoading) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [token, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <DefaultLayout>
      <div className=" mt-16">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span
            className="text-black text-center font-bold text-lg 
          mx-auto md:text-2xl mb-5"
          >
            Book, Reserve and Pay for Carpack Space
          </span>
        </div>

        {/* Trip card number 2 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 mt-5">
          {space.map((space: any) => (
            <div
              key={space.id}
              className="w-full flex flex-col gap-3 md:px-5 px-2"
            >
              <div className="px-5 py-3 border bg-black text-white border-gray-200 shadow-xl rounded-3xl">
                <div className="flex items-center gap-3 card__header">
                  {/* <Image
                  src={
                    trip && trip.user_details && trip.user_details.length > 0
                      ? trip.user_details[0].profile_pic
                      : "https://ui-avatars.com/api/?name=Trafull&color=184391&background=fff"
                  }
                  width={50}
                  height={60}
                  className="object-cover rounded-full"
                  alt=""
                /> */}
                  <div className="text">
                    <h2 className="text-sm"> Park Name</h2>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-gray-500">
                        {space.carpark?.carpark_name ?? "carpack name"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card__body">
                  <div className="flex items-center justify-between py-2 mt-5 border-t border-dotted border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-sm font-light">Space Name</span>
                      <span className="text-sm font-bold">
                        {space?.space_name ?? "carpack name"}
                      </span>
                    </div>
                    <CgSpaceBetweenV className="text-700-400" size={55} />
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-light"> Space Type</span>
                      <span className="text-sm font-bold">
                        {" "}
                        {space?.space_type ?? "carpack name"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-dotted border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-sm font-light">Availability</span>
                      <span className="text-sm font-light">
                        Available,Booked, Reserved
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-light"></span>
                      <span className="text-sm font-bold">
                        {space?.status ?? "Available"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-dotted border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-sm font-light">
                        Carpack Address
                      </span>
                      <span className="text-sm font-bold">
                        {space.carpark?.address ?? "carpack name"}
                      </span>
                    </div>
                    {/* <div className="flex flex-col items-end">
                          <span className="text-sm font-light">
                            Available space
                          </span>
                          <span className="text-sm font-bold">1</span>
                        </div> */}
                  </div>

                  <div className="flex justify-end rounded-3xl">
                    <button
                      onClick={() => openModal6(space.user)}
                      className="flex items-center px-5 py-3 font-bold bg-red-600 cursor-pointer rounded-xl"
                    >
                      <span>see more</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-3 border border-gray-200 shadow-xl rounded-3xl">
                <div className="text">
                  <span className="text-2xl font-bold ml-7">Amount</span>
                </div>
                <div className="text">
                  <span className="text-xl font-bold ml-7">
                    {" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(Number(space?.amount ?? "amount"))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalWrapper isVisible={showModal6} onClose={() => setShowModal6(false)}>
        {selectedUser && <UserDetails space={selectedUser} />}
      </ModalWrapper>
    </DefaultLayout>
  );
};
export default page;
