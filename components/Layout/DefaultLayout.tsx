"use client";
import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface DefaultLayoutProps {
  children: ReactNode;
  bg?: string;
}

const DefaultLayout = ({
  children,
  bg = "bg-[#F8F9FC]",
}: DefaultLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto ">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div
              className={`mx-auto max-w-screen-2xl h-fit mt-10  p-4 md:p-6 2xl:p-10 ${bg} `}
            >
              {children}
            </div>
          </main>
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
