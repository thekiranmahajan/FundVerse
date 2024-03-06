import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
import { v4 as uuidv4 } from "uuid";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigateDetails = (campaign) => {
    console.log("campaigns from DisplayCampaigns", campaign);
    navigate(`/campaign-details/${campaign.id}`);
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-lg text-black dark:text-white text-left">
        {title} ({campaigns?.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px] ">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-24 h-24 object-contain "
          />
        )}
        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-sm leading-8 text-[#4e4e4e] dark:text-[#818183] ">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns?.length > 0 && (
          <>
            {campaigns?.map((campaign) => (
              <FundCard
                key={uuidv4()}
                {...campaign}
                handleClick={() => handleNavigateDetails(campaign)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
