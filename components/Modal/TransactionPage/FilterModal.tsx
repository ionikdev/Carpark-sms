import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { LuCalendarRange } from "react-icons/lu";

const FilterModal = () => {
  const [filters, setFilters] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
    option7: false,
    option8: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };

  return (
    <div>
      <div className="text-2xl font-bold border-b border-s-fuchsia-200">
        Filter Results
      </div>
      <div className="grid grid-cols-5 text-sm gap-5 p-4 max-w-[50vw]">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option1"
            checked={filters.option1}
            onChange={handleCheckboxChange}
          />
          <p>Logistics</p>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option2"
            checked={filters.option2}
            onChange={handleCheckboxChange}
          />
          <p>Services and main</p>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option3"
            checked={filters.option3}
            onChange={handleCheckboxChange}
          />
          <p>Repairs</p>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option4"
            checked={filters.option4}
            onChange={handleCheckboxChange}
          />
          <p>SS3/WAEC</p>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option5"
            checked={filters.option5}
            onChange={handleCheckboxChange}
          />
          <p>Transportation</p>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option6"
            checked={filters.option6}
            onChange={handleCheckboxChange}
          />
          <p>Electronics</p>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option7"
            checked={filters.option7}
            onChange={handleCheckboxChange}
          />
          <p>Teaching aid</p>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="option8"
            checked={filters.option8}
            onChange={handleCheckboxChange}
          />
          <p>Practical/lab</p>
        </label>
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="flex items-start gap-4 p-3 border rounded-md w-fit border-opacity-20">
          <div className="flex items-center justify-center gap-3 p-3 border rounded-md border-opacity-20 ">
            <p>Start Date</p>
            <LuCalendarRange />
          </div>
          <div className="flex items-center justify-center gap-3 p-3 border rounded-md border-opacity-20 ">
            <p>End Date</p>
            <LuCalendarRange />
          </div>
        </div>
        <div className="flex items-start gap-4 p-3 border rounded-md w-fit border-opacity-20">
          <div className="flex items-center justify-center gap-4 p-3 border rounded-md border-opacity-20 ">
            <p>Amount less than </p>
            <BiArrowToLeft />
          </div>
          <div className="flex items-center justify-center gap-3 p-3 border rounded-md border-opacity-20 ">
            <p>Amount greater than </p>
            <BiArrowToLeft />
          </div>
        </div>
      </div>
      <button className=" bg-[#0192D9] rounded-md p-2 flex text-white mx-auto mt-8">
        Apply Filter
      </button>
    </div>
  );
};

export default FilterModal;
