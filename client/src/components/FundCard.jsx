import React from "react";
import { useNavigate } from "react-router-dom";
import { tagType } from "../assets";
import { daysLeft } from "../utils";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const FundCard = ({
  id,
  owner,
  name,
  title,
  category,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  const navigate = useNavigate();
  const handleNavigateDetails = () => {
    navigate(`/campaign-details/${id}`);
  };
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#f2f2f2] dark:bg-[#1c1c24] cursor-pointer shadow-md hover:scale-95 focus:scale-105 transition-transform duration-300"
      onClick={handleClick || handleNavigateDetails}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4 ">
        <div className="flex flex-row items-center mb-[18px] ">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain "
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] h-[17px] text-[#4d4d4d] dark:text-[#808191] ">
            {category}
          </p>
        </div>
        <div className="block">
          <h3 className="font-epilogue font-semibold   text-black dark:text-white text-left leading-[26px]  truncate ">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-left leading-[18px] truncate  text-[#4d4d4d] dark:text-[#808191] ">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2 ">
          <div className="flex flex-col ">
            <h4 className="font-epilogue font-semibold text-sm text-[#78787c] dark:text-[#b2b3bd] leading-[22px] ">
              {amountCollected}
            </h4>
            <p className=" mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#4d4d4d] dark:text-[#808191] sm:max-w-[120px] truncate">
              Raised out of {target}
            </p>
          </div>
          <div className="flex flex-col ">
            <h4 className="font-epilogue font-semibold text-sm text-[#78787c] dark:text-[#b2b3bd] leading-[22px] text-center">
              {remainingDays}
            </h4>
            <p className=" mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#4d4d4d] dark:text-[#808191] sm:max-w-[120px] truncate ">
              Days Left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px] ">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#eaeaea] dark:bg-[#13131a] overflow-hidden ">
            <Jazzicon
              className="w-1/2 h-1/2 object-contain"
              diameter={30}
              seed={jsNumberForAddress(`${owner}`)}
            />
          </div>
          <div className="flex-1 font-epilogue font-normal text-[12px] text-[#4d4d4d] dark:text-[#808191] truncate">
            by{" "}
            <span className="font-epilogue leading-[22px] text-[#78787c] dark:text-[#b2b3bd]">
              {name}
            </span>
            <div className="flex flex-col">
              <span className=" font-epilogue font-normal text-[12px] text-[#78787c] dark:text-[#b2b3bd] leading-[18px] sm:max-w-[120px] truncate ">
                {owner}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
