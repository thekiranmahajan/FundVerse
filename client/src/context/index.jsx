import React, { useContext, createContext, useState, useEffect } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useDisconnect,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contractABI } from "../constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xeB2c1117Fa592aaF3918C9404be08C0bCDCa2cFf",
    contractABI
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connectMetamask = useMetamask();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();

  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "System"
  );

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onWindowMatch = () => {
      if (
        localStorage.getItem("themeMode") === "Dark" ||
        (!localStorage.getItem("themeMode") && systemTheme.matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    onWindowMatch();

    systemTheme.addEventListener("change", onWindowMatch);

    return () => {
      systemTheme.removeEventListener("change", onWindowMatch);
    };
  }, []);

  const toggleTheme = (mode) => {
    setThemeMode(mode);
  };

  useEffect(() => {
    switch (themeMode) {
      case "Dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("themeMode", "Dark");
        break;
      case "Light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("themeMode", "Light");
        break;
      default:
        localStorage.removeItem("themeMode");
        break;
    }
  }, [themeMode]);

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.name,
          form.title,
          form.category,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
      toast("✅ Campaign created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(
        "contract call success",
        data,
        "form from createCampaign",
        form
      );
    } catch (error) {
      toast("❌ Error while creating Campaign, please 🙏🏻 try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("contract call failure", error);
    }
  };
  const updateCampaign = async (form) => {
    try {
      const data = await contract.call("updateCampaign", [
        form.id,
        form.name,
        form.title,
        form.category,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      toast("✅ Campaign updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("contract update success", data);
      return data;
    } catch (error) {
      toast("❌ Error while updating Campaign, please 🙏🏻 try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("contract update failure", error);
    }
  };

  const deleteCampaign = async (pId) => {
    try {
      const data = await contract.call("deleteCampaign", [pId]);

      toast("✅ Campaign deleted 🚮 successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Campaign delete success", data);
      return data;
    } catch (error) {
      toast("❌ Error while deleting Campaign, please 🙏🏻 try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Campaign delete failure", error);
    }
  };

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call("donateToCampaign", [pId], {
        value: ethers.utils.parseEther(amount),
      });

      toast("🫡 Campaign funded successfully. Thanks for collaboration😊", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return data;
    } catch (err) {
      toast("❌ Error while Donating Campaign, please 🙏🏻 try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Error occurred while making donation", err);
    }
  };

  const withdraw = async (pId) => {
    try {
      const data = await contract.call("withdrawDonations", [pId]);

      toast("🤑 Campaign funds successfully withdrawn", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return data;
    } catch (err) {
      toast("❌ Error occurred while withdrawing funds.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Error occurred while withdrawing funds", err);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");
    console.log("campaigns from contract", campaigns);
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
    console.log(parsedCampaigns);
    return parsedCampaigns;
  };

  //   const getCampaigns = async () => {
  //     const campaigns = await contract.call("getCampaigns");
  //     console.log("campaigns from contract",campaigns);

  //     const parsedCampaigns = campaigns
  //         .filter(campaign => campaign.owner !== "0x0000000000000000000000000000000000000000")
  //         .map((campaign, i) => ({
  //             owner: campaign.owner,
  //             name: campaign.name,
  //             title: campaign.title,
  //             category: campaign.category,
  //             description: campaign.description,
  //             target: ethers.utils.formatEther(campaign.target.toString()),
  //             deadline: campaign.deadline.toNumber(),
  //             amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
  //             image: campaign.image,
  //             pId: i,
  //         }));

  //     console.log(parsedCampaigns);
  //     return parsedCampaigns;
  // };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const getFilteredCampaigns = async (searchText) => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredCampaigns;
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
        connectMetamask,
        disconnect,
        connectionStatus,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        withdraw,
        getDonations,
        deleteCampaign,
        updateCampaign,
        getFilteredCampaigns,
        toggleTheme,
        themeMode,
      }}
    >
      <ToastContainer />
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
