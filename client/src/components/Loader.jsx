import React from "react";
import { loader } from "../assets";
const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img className="w-24 h-24" src={loader} alt="loader" />
      <p className="mt-[20px] font-epilogue text-[20px] text-center text-black dark:text-white font-bold">
        Transaction is in progress <br />
        Please wait...
      </p>
    </div>
  );
};

export default Loader;
