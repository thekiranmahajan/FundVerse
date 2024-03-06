import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStateContext } from "../context";
import { WithdrawCard } from "../components";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { toast } from "react-toastify";

const Withdraw = () => {
  const {
    withdraw,
    isLoading,
    address,
    contract,
    campaigns,
    getUserCampaigns,
    userCampaigns,
  } = useStateContext();
  const navigate = useNavigate();

  const handleWithdraw = async (campaign) => {
    if (campaign?.amountCollected == 0) {
      toast.warning("No donations found for this campaign", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (campaign?.deadline >= Date.now()) {
      toast.error("You can't withdraw campaign before deadline", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      await withdraw(campaign?.id);
      navigate("/");
    }
  };
  useEffect(() => {
    getUserCampaigns();
  }, [contract, address, campaigns]);

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-lg text-black dark:text-white text-left">
        Withdraw Campaigns ({userCampaigns?.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-24 h-24 object-contain" />
        )}

        {!isLoading && userCampaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-sm leading-8 text-[#4e4e4e] dark:text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          userCampaigns?.length > 0 &&
          userCampaigns?.map((campaign) => (
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

export default Withdraw;
