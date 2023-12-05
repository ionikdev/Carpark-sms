import { TbBus } from "react-icons/tb";
import { RiPencilRulerFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
export const capital = [
  {
    title: "Capital Account",
    amount: " ₦14,000,000",
    logo: " ",
  },
  {
    title: "Capital Account",
    amount: " ₦14,000,000",
    logo: " ",
  },
  {
    title: "Capital Account",
    amount: " ₦14,000,000",
    logo: " ",
  },
];

export const activities = [
  {
    id: 1,
    title: "Booked Spaced ",
    amount: <p className="text-[#FF852D] text-sm"> port a5</p>,
    logo: (
      <div className="bg-[#F9E8DE] text-3xl rounded-md p-2">
        {" "}
        <TbBus />
      </div>
    ),
  },
  {
    id: 2,
    title: "Booked Spaced ",
    amount: <p className="text-[#F52E2E] text-sm"> port a7</p>,
    logo: (
      <div className="bg-[#F7B1B3] text-3xl rounded-md p-2">
        {" "}
        <RiPencilRulerFill />
      </div>
    ),
  },
  {
    id: 3,
    title: "Reserved Booking",
    amount: <p className="text-[#F52E2E] text-sm"> ₦14,000,000</p>,
    logo: (
      <div className="bg-[#F7B1B3] text-3xl rounded-md p-2">
        {" "}
        <RiPencilRulerFill />
      </div>
    ),
  },
  {
    id: 4,
    title: "Allocated Space",
    amount: <p className="text-[#04A10B] text-sm"> port a5</p>,
    logo: (
      <div className="bg-[#B6E1BB] text-3xl rounded-md p-2">
        {" "}
        <GiTakeMyMoney />
      </div>
    ),
  },
];
