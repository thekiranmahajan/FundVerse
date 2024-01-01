import React, { useState, useEffect } from "react";

import { useStateContext } from "../context";
import { Loader, WithdrawFromCampaigns } from "../components";

const Withdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className="bg-[#1c1c24] flex items-center justify-center flex-col rounded-[10px] sm:p-10 p-4 ">
      {isLoading && <Loader />}
      <div className="flex items-center justify-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] ">
        <h1 className=" font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white ">
          Withdraw
        </h1>
      </div>
      <div className=" w-full mt-[65px] flex flex-col gap-[30px] ">
        <WithdrawFromCampaigns
          title="My Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      </div>
    </div>
  );
};

export default Withdraw;
