import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[20px] w-full  flex items-center justify-center text-black dark:text-white gap-2 font-epilogue p-4 mt-10 text-center shadow-md ">
      Copyright &copy; {1900 + new Date().getYear()}
      <a target="_blank" href="https://github.com/thekiranmahajan/FundVerse">
        <span className="inline-block text-center px-4 py-2 rounded-lg bg-[#c8cbcecb] dark:bg-[#2c2f32] text-[#6F01Ec]  font-semibold">
          FundVerse
        </span>
      </a>
      All Rights Reserved.
    </div>
  );
};

export default Footer;
