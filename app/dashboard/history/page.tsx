import DefaultLayout from "@/components/Layout/DefaultLayout";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <DefaultLayout>
      <div className=" animate-bounce  mt-28 flex items-center justify-center text-3xl">
        Coming Soon
      </div>
    </DefaultLayout>
  );
};

export default page;
