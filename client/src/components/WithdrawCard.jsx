import React from "react";

import { tagType } from "../assets";
import { daysLeft } from "../utils";
import CustomButton from "./CustomButton";

const WithdrawCard = ({
  pId,
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
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] ">
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col mt-[20px]">
        <div className="flex flex-row items-center mb-[10px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[20px] h-[20px] object-contain"
          />
          <p className="ml-[12px] w-full h-[20px]  font-epilogue font-medium text-[#808191] ">
            {category}
          </p>

          <p className="ml-[12px]  w-full   font-epilogue font-medium text-[#808191] text-right leading-[26px] truncate">
            Campaign Id: {pId}
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised out of {target}
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <CustomButton
            btnType="button"
            pId
            title="Withdraw from Campaign"
            styles="w-full bg-[#8c6dfd] cursor-pointer"
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default WithdrawCard;
