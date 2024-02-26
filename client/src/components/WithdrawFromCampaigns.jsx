import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import WithdrawCard from "./WithdrawCard";
import { useStateContext } from "../context";
import { loader } from "../assets";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawFromCampaigns = ({ title, campaigns, isLoading }) => {
  const navigate = useNavigate();

  const { withdraw } = useStateContext();

  const state = campaigns.find((campaign) => {
    return campaign;
  });

  const handleWithdraw = async (campaign) => {
    if (campaign.amountCollected == 0) {
      toast("❌ No donations found for this campaign", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (campaign.deadline >= Date.now()) {
      toast("❌ You can't withdraw campaign before deadline", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      await withdraw(campaign.id);
      navigate("/");
    }
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-lg text-black dark:text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-sm leading-8 text-[#4e4e4e] dark:text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <WithdrawCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleWithdraw(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default WithdrawFromCampaigns;
