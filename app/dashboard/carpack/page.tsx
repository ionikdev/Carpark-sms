"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

import axiosClient from "@/Services/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/context/Redux/store/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { AiOutlineCar } from "react-icons/ai";

interface FormData {
  carpark_name: string;
  address: string;
  max_capacity: number;
  route_information: string;
}

const Page = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({});

  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const client = axiosClient(token);

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const response = await client.post("/carpack", data);
      router.push("/dashboard");
      toast.success("Successfully,  Carpack added successfully");
    } catch (error: any) {
      console.error("Error submitting the form:", error);

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
    <DefaultLayout>
      <section className="w-full ">
        <div className="max-w-[1140px] lg:mx-auto mx-5 mt-10">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-sm lg:text-3xl">Add Carpark</h1>
          </div>
          <section className="mx-auto pt-14 shadow-md my-10 border border-gray-200 rounded-xl">
            <div className="bg-[#CCCCCC26] border-x-2 w-full bg-opacity-20">
              <h1 className=" text-[#000000] font-bold text-lg xl:text-2xl px-4 py-2">
                Enter Carpack details
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:py-10  md:px-8 xl:px-10 mx-3 py-5 gap-4 lg:gap-x-8 xl:gap-x-20 2xl:gap-x-32">
                <div className="w-full">
                  <h2 className="font-semibold text-sm md:text-lg xl:text-xl my-2">
                    Carpack Name
                  </h2>

                  <div
                    className="bg-gray-100 border border-transparent rounded-md px-5 w-full font-semibold py-3
                   outline-none  gap-2 items-center hover:border-red-500"
                  >
                    <div className="flex justify-between gap-4 ">
                      <AiOutlineCar size={20} />
                      <Controller
                        name="carpark_name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="h-full w-full bg-transparent border-none outline-none "
                          />
                        )}
                      />
                    </div>
                  </div>
                  {errors.carpark_name && (
                    <span className="text-red-500">
                      {errors.carpark_name.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <h2 className="font-semibold text-sm md:text-lg xl:text-xl my-2">
                    max_capacity(only number)
                  </h2>

                  <div
                    className="bg-gray-100 border border-transparent rounded-md px-5 w-full font-semibold py-3
                   outline-none  gap-2 items-center hover:border-red-500"
                  >
                    <div className="flex items-center gap-4 ">
                      <AiOutlineCar size={20} />
                      <Controller
                        name="max_capacity"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            required
                            className="h-full w-full bg-transparent border-none outline-none "
                          />
                        )}
                      />
                    </div>
                  </div>
                  {errors.max_capacity && (
                    <span className="text-red-500">
                      {errors.max_capacity.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <h2 className="font-semibold text-sm md:text-lg xl:text-xl my-2">
                    Carpack Address
                  </h2>

                  <div
                    className="bg-gray-100 border border-transparent rounded-md px-5 w-full font-semibold py-3
                   outline-none  gap-2 items-center border-red-500"
                  >
                    <Controller
                      name="address"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="carpack address"
                          className="bg-transparent w-full outline-none border-none text-lg font-semibold"
                          rows={5}
                        />
                      )}
                    />
                  </div>
                </div>
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </div>

              <div className="flex items-center justify-center button">
                <button
                  type="submit"
                  className="px-16 py-2 font-semibold bg-red-600 rounded-md  text-white"
                >
                  Continue
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Page;
