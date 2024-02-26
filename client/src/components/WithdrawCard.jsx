import React from "react";
import { tagType } from "../assets";
import { daysLeft } from "../utils";
import CustomButton from "./CustomButton";

const WithdrawCard = ({
  id,
  title,
  category,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#f2f2f2] dark:bg-[#1c1c24] cursor-pointer shadow-md hover:scale-95 focus:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4 ">
        <div className="flex items-center justify-between mb-[18px]">
          <div className="flex items-center justify-center">
            <img
              src={tagType}
              alt="tag"
              className="w-[17px] h-[17px] object-contain "
            />
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] h-[17px] text-[#4d4d4d] dark:text-[#808191] ">
              {category}
            </p>
          </div>

          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] h-[17px] text-[#4d4d4d] dark:text-[#808191] ">
            Campaign Id: {id}
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold   text-black dark:text-white text-left leading-[26px] truncate ">
            {title}
          </h3>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-sm text-[#78787c] dark:text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#4d4d4d] dark:text-[#808191] sm:max-w-[120px] truncate">
              Raised out of {target}
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-sm text-[#78787c] dark:text-[#b2b3bd] leading-[22px] text-center">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#4d4d4d] dark:text-[#808191] sm:max-w-[120px] truncate">
              Days left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px] ">
          <CustomButton
            btnType="button"
            title="Withdraw from Campaign"
            styles="w-full bg-[#6F01Ec]  !text-white  cursor-pointer"
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default WithdrawCard;
