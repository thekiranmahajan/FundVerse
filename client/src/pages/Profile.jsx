import React, { useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = () => {
  const {
    isLoading,
    address,
    contract,
    campaigns,
    getUserCampaigns,
    userCampaigns,
  } = useStateContext();

  useEffect(() => {
    getUserCampaigns();
  }, [contract, address, campaigns]);

  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={userCampaigns}
    />
  );
};

export default Profile;
