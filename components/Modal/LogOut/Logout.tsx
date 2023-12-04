const Logout = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-2xl font-bold ">Logout</p>
        <p className="text-sm ">
          {" "}
          Are you sure you want sure you want to logout?
        </p>
        <div className="flex items-center gap-10 ">
          <button className="bg-[#BFE3F5] p-2 px-5 hover:bg-[#00000096] border-2 border-black border-opacity-30 rounded-xl">
            {" "}
            Cancel
          </button>
          {/* <Link to="/Login"> */}
          <button className=" bg-[#BFE3F5] p-2 px-5 hover:bg-[#00000096] border-2 border-black border-opacity-30 rounded-xl">
            {" "}
            Logout
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default Logout;
