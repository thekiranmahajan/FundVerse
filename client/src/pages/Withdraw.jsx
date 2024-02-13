import React, { useState, useEffect } from "react";

import { useStateContext } from "../context";
import { WithdrawFromCampaigns } from "../components";

const Withdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    console.log(data, "userCampaigns from Withdraw");
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <>
      <div>
        <div className=" w-full mt-8 flex flex-col gap-[30px] ">
          <WithdrawFromCampaigns
            title="Withdraw Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
          />
        </div>
      </div>
    </>
  );
};

export default Withdraw;
