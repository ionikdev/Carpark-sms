"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "@/Services/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/context/Redux/store/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { AiOutlineCar } from "react-icons/ai";

interface FormData {
  carpark_id: number;
  space_name: string;
  space_type: string;
}

interface Carpark {
  id: number;
  carpark_name: string;
}

const Page = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const client = axiosClient(token);
  const [carparks, setCarpacks] = useState<Carpark[]>([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({});

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        console.log("last", token);
        const response = await client.get("/get-carpack");
        console.log(response);

        if (isMounted) {
          setCarpacks(response.data.data.carparks);
        } else {
          console.error("Error fetching data:");
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

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      const response = await client.post("/space", data);
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
            <h1 className="font-bold text-sm lg:text-3xl">
              Attach Space to Carpack
            </h1>
          </div>
          <section className="mx-auto pt-14 shadow-md my-10 border border-gray-200 rounded-xl">
            <div className="bg-[#CCCCCC26] border-x-2 w-full bg-opacity-20">
              <h1 className=" text-[#000000] font-bold text-lg xl:text-2xl px-4 py-2">
                Enter Space details
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 px-2 md:py-10  md:px-8 xl:px-10 mx-3 py-5 gap-4 lg:gap-x-8 xl:gap-x-20 2xl:gap-x-32">
                <div className="w-full">
                  <h2 className="font-semibold text-sm md:text-lg xl:text-xl my-2">
                    Space Type
                  </h2>

                  <div
                    className="bg-gray-100 border border-transparent rounded-md px-5 w-full font-semibold py-3
                   outline-none  gap-2 items-center hover:border-red-500"
                  >
                    <Controller
                      name="carpark_id"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center gap-4 ">
                          <AiOutlineCar size={20} />
                          <select
                            {...field}
                            className="bg-transparent outline-none border-none w-full font-semibold"
                          >
                            <option>select</option>
                            {carparks &&
                              carparks.map((carpark: Carpark) => (
                                <option key={carpark.id} value={carpark.id}>
                                  {carpark.carpark_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}
                    />
                  </div>
                  {errors.space_type && (
                    <span className="text-red-500">
                      {errors.space_type.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <h2 className="font-semibold text-sm md:text-lg xl:text-xl my-2">
                    Space Name
                  </h2>

                  <div
                    className="bg-gray-100 border border-transparent rounded-md px-5 w-full font-semibold py-3
                   outline-none  gap-2 items-center hover:border-red-500"
                  >
                    <div className="flex justify-between gap-4 ">
                      <AiOutlineCar size={20} />
                      <Controller
                        name="space_name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Port A1, Port A2"
                            className="h-full w-full bg-transparent border-none outline-none "
                          />
                        )}
                      />
                    </div>
                  </div>
                  {errors.space_name && (
                    <span className="text-red-500">
                      {errors.space_name.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <h2 className="font-semibold text-sm md:text-lg xl:text-xl my-2">
                    Space Type
                  </h2>

                  <div
                    className="bg-gray-100 border border-transparent rounded-md px-5 w-full font-semibold py-3
                   outline-none  gap-2 items-center hover:border-red-500"
                  >
                    <div className="flex items-center gap-4 ">
                      <AiOutlineCar size={20} />
                      <Controller
                        name="space_type"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="bg-transparent outline-none border-none w-full font-semibold"
                          >
                            <option>Standard</option>
                            <option>Handicapped</option>
                            <option>Reserved</option>
                          </select>
                        )}
                      />
                    </div>
                  </div>
                  {errors.space_type && (
                    <span className="text-red-500">
                      {errors.space_type.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex mb-10 items-center justify-center button">
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
