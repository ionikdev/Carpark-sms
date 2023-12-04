"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { setUser, setToken } from "@/context/Redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosClient from "@/Services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/Redux/store/store";
import { useForm, Controller } from "react-hook-form";

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const client = axiosClient();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  interface FormData {
    username: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await client.post("/register", data);
      const userData = response.data.data.user;
      const authToken = response.data.data.token;

      dispatch(setUser(userData));
      dispatch(setToken(authToken));
      router.push("/dashboard");
      toast.success("Login Successfully");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-10">
      <div className=" flex md:flex-row flex-col items-center justify-between md:mx-auto mx-5 mt-16">
        <div className="hero-image-container  w-full rounded-3xl">
          <Image
            src="/images/signin.jpg"
            alt="/"
            width={500}
            height={500}
            className=" object-cover  rounded-3xl"
          />
        </div>

        <div className="w-full md:max-w-[80%]  text-white md:mx-2 shadow-2xl shadow-red-500  bg-black py-5 px-2   rounded-2xl border border-gray-200">
          <div className="flex flex-col items-center justify-center gap-5 heading">
            <h2 className="text-3xl font-bold ">Register</h2>
            <span className="text-center text-[14px] w-full md:w-[65%] text-gray-500">
              Find, reserve, and pay for parking hassle-free. Login to manage
              your bookings, access available spots, and simplify your parking
              experience.
            </span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center gap-5 flex-col m-auto w-full md:w-[65%] my-10"
          >
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Username</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="ionikdev"
                    className=" bg-red-200 text-black w-full border-none placeholder:text-gray-500 ring-2 ring-white text-[14px] h-10  flex outline-none items-center px-5 rounded-2xl"
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Phone Number</label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone Number is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="09057560881"
                    className=" bg-red-200 text-black w-full border-none placeholder:text-gray-500 ring-2 ring-white text-[14px] h-10  flex outline-none items-center px-5 rounded-2xl"
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Email address</label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="John doe@gmail.com"
                    className=" bg-red-200 text-black w-full border-none placeholder:text-gray-500 ring-2 ring-white text-[14px] h-10  flex outline-none items-center px-5 rounded-2xl"
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="font-semibold text-[16px]">Password</label>
              <div className="relative flex items-center h-10 border-yellow-200 rounded-full">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className=" bg-red-200 text-black  w-full border-none placeholder:text-gray-500 ring-2 ring-white text-[14px] h-10 outline-none  flexitems-center px-5 rounded-2xl"
                    />
                  )}
                />

                {showPassword ? (
                  <BsEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute top-[35%] text-black right-5 translate-x-px cursor-pointer"
                  />
                ) : (
                  <BsEye
                    onClick={togglePasswordVisibility}
                    className="absolute top-[35%] text-black right-5 translate-x-px cursor-pointer"
                  />
                )}
              </div>
              {errors.password && (
                <span className="text-red-500 mt-2">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <label className="font-semibold text-[16px]">
                Confirm Password
              </label>
              <div className="relative flex items-center h-10 border-yellow-200 rounded-full">
                <Controller
                  name="password_confirmation"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className=" bg-red-200 text-black  w-full border-none placeholder:text-gray-500 ring-2 ring-white text-[14px] h-10 outline-none  flexitems-center px-5 rounded-2xl"
                    />
                  )}
                />

                {showPassword ? (
                  <BsEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute top-[35%] text-black right-5 translate-x-px cursor-pointer"
                  />
                ) : (
                  <BsEye
                    onClick={togglePasswordVisibility}
                    className="absolute top-[35%] text-black right-5 translate-x-px cursor-pointer"
                  />
                )}
              </div>
              {errors.password && (
                <span className="text-red-500 mt-2">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Controller
              name="role"
              defaultValue="user"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="string"
                  style={{ display: "none" }}
                  className=" bg-red-200 text-black w-full border-none placeholder:text-gray-500 ring-2 ring-white text-[14px] h-10  flex outline-none items-center px-5 rounded-2xl"
                />
              )}
            />
            <Link href="/signin/user">
              <div className="flex justify-end mx-auto mr-0 cursor-pointer w-fit">
                <span className="text-[12px] font-semibold w-fit">Sign In</span>
              </div>
            </Link>

            <div className="flex items-center justify-center button">
              <button
                type="submit"
                className="px-16 py-2 font-semibold bg-red-600 rounded-md  text-white"
              >
                {isLoading ? "Loading..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
