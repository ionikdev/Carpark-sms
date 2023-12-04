"use client ";
import { Fragment, useState } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { RootState } from "@/context/Redux/store/store";
import { useSelector } from "react-redux";
import axiosClient from "@/Services/axiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserDetails {
  id: any;
  username: string;
  email: string;
  phone: number;
}

interface SpaceDetailsProps {
  space: UserDetails;
}

function SpaceDetails({ space }: SpaceDetailsProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationDate, setReservationDate] = useState("");

  const token = useSelector((state: RootState) => state.auth.token);
  const client = axiosClient(token);
  const router = useRouter();

  const handleDateChange = (selectedDate: string) => {
    setReservationDate(selectedDate);
  };

  const handleBookNowClick = () => {
    setShowBookingForm(true);
    setShowReservationForm(false);
  };

  const handleReserveClick = () => {
    setShowReservationForm(true);
    setShowBookingForm(false);
  };
  console.log(space.id);

  const handlePayment = async () => {
    try {
      const response = await client.post(
        `/spaces/${space.id}/create-booking-payment`
      );
      router.push("/dashboard");
      toast.success("Payment initiated successfully!");
    } catch (error: any) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await client.post(
        `/spaces/${space.id}/create-booking-reservation`,
        {
          reservation_date: reservationDate,
        }
      );
      router.push("/dashboard");
      toast.success(" Space Reserved successfully!");
    } catch (error: any) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Fragment>
      <>
        <div className="bg-white w-[90%] md:w-[550px] py-10 px-9 rounded-[36px]">
          <div className="modalHeader flex justify-between gap-2 items-center">
            <span className="font-bold text-xl md:text-3xl">
              Booking details
            </span>

            <span
              onClick={handleBookNowClick}
              className="hover:bg-red-600 bg-black text-white px-2 flex-shrink-0  md:px-6 text-sm py-1 md:py-3 rounded-md cursor-pointer font-semibold"
            >
              Book Now
            </span>

            <div className="">
              <span
                onClick={handleReserveClick}
                className="hover:bg-red-600 bg-black text-white px-2 md:px-6 text-sm py-1 md:py-3 rounded-md cursor-pointer font-semibold"
              >
                Reserve
              </span>
            </div>
          </div>

          <div className="profile my-7 flex items-center gap-5">
            {/* <Image
              src={
                trip &&
                trip.user_details &&
                trip.user_details.length > 0 &&
                trip.user_details[0].profile_pic
                  ? trip.user_details[0].profile_pic
                  : "Img" // Provide a default image URL here
              }
              width={50}
              height={60}
              className="object-cover rounded-full"
              alt=""
            /> */}
            <div className="flex flex-col">
              <span className="font-bold text-lg">Name</span>
              <span className="text-gray-400 text-sm">
                {" "}
                {space.username ?? "user name"}
              </span>
            </div>
          </div>

          <div className="content mt-5">
            <div className="content-text">
              <div className="flex flex-wrap items-start gap-3">
                <div>
                  <h5 className="text-[16px]">Email Address</h5>
                  <p className="text-[12px] text-gray-400">
                    {" "}
                    {space.email ?? "user email "}
                  </p>
                </div>
                <div className="">
                  <h5 className="text-[16px]">Phone Number</h5>
                  <p className="text-[12px] text-gray-400">
                    {" "}
                    {space.phone ?? "user phone-number "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showBookingForm && (
            <>
              <button
                onClick={handlePayment}
                className=" hover:bg-red-600 bg-black p-4 text-center w-full mt-2 text-white  rounded-md "
              >
                Pay now
              </button>
            </>
          )}
          {showReservationForm && (
            <>
              <form
                onSubmit={handleReservation}
                className="flex justify-center gap-5 flex-col m-auto w-full md:w-[65%] my-5"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-center text-[16px]">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="bg-gray-300 w-full border-black text-[14px] h-12  flex outline-black items-center px-5 rounded-lg"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className=" hover:bg-red-600 bg-black p-4 text-center w-full mt-2 text-white  rounded-md "
                  >
                    Pay now
                  </button>
                  <span className=" text-sm text-gray-500 text-center">
                    Please note extral charges will be added{" "}
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </>
    </Fragment>
  );
}

export default SpaceDetails;
