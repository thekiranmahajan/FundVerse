import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import WithdrawCard from "./WithdrawCard";
import { useStateContext } from "../context";
import { loader } from "../assets";
import Loader from "./Loader";

const WithdrawFromCampaigns = ({ title, campaigns }) => {
  const navigate = useNavigate();
  const { withdraw } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const state = campaigns.find((campaign) => {
    return campaign;
  });

  console.log(state);

  const handleWithdraw = async () => {
    setIsLoading(true);

    console.log("state", state.pId);

    await withdraw(state.pId);
    navigate("/");

    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={Loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <WithdrawCard
              key={uuidv4()}
              {...campaign}
              handleClick={handleWithdraw}
            />
          ))}
      </div>
    </div>
  );
};

export default WithdrawFromCampaigns;
