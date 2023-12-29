import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#13131a] h-20">
      <div className=" bg-[#1c1c24] rounded-[20px] w-[95vw] py-3  flex items-center justify-center mx-auto   text-white gap-4 font-epilogue">
        Copyright &copy; {1900 + new Date().getYear()}
        <a target="_blank" href="https://github.com/thekiranmahajan/FundVerse">
          <span className="inline-block text-center px-2 py-2 rounded-lg bg-[#2c2f32] text-[#4acd8d] mr-2 font-semibold">
            FundVerse
          </span>{" "}
          All Rights Reserved.
        </a>
      </div>
    </div>
  );
};

export default Footer;
