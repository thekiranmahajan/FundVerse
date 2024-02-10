import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#1c1c24] rounded-[20px] w-full  flex items-center justify-center   text-white gap-4 font-epilogue p-4 mt-10">
      Copyright &copy; {1900 + new Date().getYear()}
      <a target="_blank" href="https://github.com/thekiranmahajan/FundVerse">
        <span className="inline-block text-center px-2 py-2 rounded-lg bg-[#2c2f32] text-[#4acd8d] mr-2 font-semibold">
          FundVerse
        </span>
      </a>
      All Rights Reserved.
    </div>
  );
};

export default Footer;
