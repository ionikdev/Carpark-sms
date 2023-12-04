import { AiOutlineCheck } from "react-icons/ai";
import { notificationData } from "./data";

const Notification = () => {
  return (
    <div>
      <div className=" font-bold border-b border-s-fuchsia-200">Notification</div>
      {notificationData.map((item) => (
        <div key={item.id} className="   p-2">
          <div className="flex items-center gap-3 justify-around drop-shadow-xl rounded-md
          hover:scale-110 cursor-pointer bg-white p-2 ">
            <span
              className={`${item.iconture ? "bg-[#B6E1BB]" : "bg-[#F7B1B3]"}
            p-2 rounded-sm text-xl ${
              item.iconture ? "text-[#04A10B]" : "text-[#404040]"
            }`}
            >
              <AiOutlineCheck />
            </span>
            <p className=" max-w-[280px] text-sm">
              Your approval for ₦1,500,000 to be added to the operations account
              have been approved
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
