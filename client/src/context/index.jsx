import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x9AACca225D2EAa1fc2F2D25B24398ea6870Ed795"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, //owner's address
          form.name, //name of creater
          form.title, //title of campaign
          form.category, //category of fund raised
          form.description, //description of campaign
          form.target, //target amount of campaign
          new Date(form.deadline).getTime(), //deadline of campaign
          form.image, //img of campaign
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  const updateCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, //owner's address
          form.name, //name of creater
          form.title, //title of campaign
          form.category, //category of fund raised
          form.description, //description of campaign
          form.target, //target amount of campaign
          new Date(form.deadline).getTime(), //deadline of campaign
          form.image, //img of campaign
        ],
      });

      console.log("contract update success", data);
    } catch (error) {
      console.log("contract update failure", error);
    }
  };

  const deleteCampaign = async (pId) => {
    await contract.call("deleteCampaign", [pId]);
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      name: campaign.name,
      title: campaign.title,
      category: campaign.category,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaign = await getCampaigns();
    const filteredCampaigns = allCampaign.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const getSingleCampaign = async (pId) => {
    const allCampaign = await getCampaigns();
    const filteredCampaign = allCampaign.filter(
      (campaign) => campaign.pId === pId
    );
    return filteredCampaign;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        deleteCampaign,
        updateCampaign,
        getSingleCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
