import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import WithdrawCard from "./WithdrawCard";
import { useStateContext } from "../context";
import { loader } from "../assets";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawFromCampaigns = ({ title, campaigns }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { withdraw } = useStateContext();

  const state = campaigns.find((campaign) => {
    return campaign;
  });

  console.log(state);

  const handleWithdraw = async () => {
    if (state.amountCollected == 0) {
      toast("❌ Error! No donations found for this campaign", {
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
      setIsLoading(true);

      await withdraw(state.pId);
      console.log("state", state.pId);

      navigate("/");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
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
