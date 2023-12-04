type Loader = {
  message?: string;
};

const Loading = ({ message }: Loader) => {
  return (
    <>
      <div className=" flex flex-col gap-3 items-center justify-center h-screen ">
        <div className="spinner "></div>
        <p className=" font-bold text-lg md:text-2xl font-mono "> {message}</p>
      </div>
    </>
  );
};

export default Loading;
