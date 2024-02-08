import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    console.log("Campaigns from Home.jsx: ", data);
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(contract);
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
