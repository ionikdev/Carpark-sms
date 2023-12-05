"use client";
import axiosClient from "@/Services/axiosInstance";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import { RootState } from "@/context/Redux/store/store";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Transaction {
  reference: string;
  amount: string;
  type: string;
  status: string;
  from_user: {
    username: string;
  };
  to_user: {
    username: string;
  };
}
function getStatusColor(status: string): string {
  switch (status) {
    case "success":
      return "#08E06C"; // Green
    case "cancelled":
      return "#FF5631"; // Red
    case "Pending":
      return "#FFD700"; // Yellow
    default:
      return "#61748D"; // Default color
  }
}
function page() {
  const token = useSelector((state: RootState) => state.auth.token);
  const client = axiosClient(token);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await client.get("/transactions");
        if (isMounted) {
          setTransactions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [client]);

  return (
    <DefaultLayout>
      <div className="flex flex-col w-full pt-10 px-4 bg-white rounded-2xl ">
        <div className="header">
          <h2 className="text-xl font-bold">Activities</h2>
        </div>
        <div className="overflow-x-auto">
          {/* {transactions.length === 0 ? (
            <div className=" mx-auto flex items-center justify-center ">
              No Transactions
            </div>
          ) : ( */}
          <table className="table-auto w-full text-[#0F0400] ">
            <thead className="text-base leading-6 font-bold">
              <tr className="border-b">
                <th className="px-6 py-3 text-left  tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left  tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left tracking-wider">Caprack</th>
                <th className="px-6 py-3 text-left tracking-wider">Space</th>
                <th className="px-6 py-3 text-left tracking-wider">date</th>
                <th className="px-6 py-3 text-left tracking-wider">Status</th>
              </tr>
            </thead>

            <tbody className="font-bold text-sm leading-5 my-10">
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {transaction.reference}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap leading-6">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(Number(transaction.amount ?? "amount"))}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap leading-5 text-[#61748D]">
                    {transaction.type ?? "type"}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap leading-5 text-[#61748D]">
                    {transaction.from_user.username ?? "class"}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap leading-5 text-[#61748D]">
                    {transaction.to_user.username ?? "name"}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <button
                      style={{
                        backgroundColor: getStatusColor(transaction.status),
                      }}
                      className="opacity-80 rounded-3xl px-5 py-2"
                    >
                      {transaction.status ?? "avaialavbe"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* )} */}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default page;
