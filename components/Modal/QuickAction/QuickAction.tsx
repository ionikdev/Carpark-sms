import { quickAction } from "./data";

const QuickAction = () => {
  return (
    <main className=" ">
      <p className=" font-bold p-2 mb-3"> Quick Actions</p>
      <div className=" grid grid-cols-4 items-center gap-5 ">
        {quickAction.map((item) => (
          <div
            key={item.id}
            className=" flex flex-col items-center justify-center text-black
           bg-[#F8F9FC]  border-2 border-gray-300 shadow-lg h-[100%] rounded-md m-2 "
          >
            <div className=" text-3xl">{item.logo}</div>
            <div className=" max-w-[100px] text-center text-[13px] px-1">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default QuickAction;
