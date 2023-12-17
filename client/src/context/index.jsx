import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const stateContext = createContext();

export const stateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xba414382Bc80410495601964D7c3700Bc95ca2FA"
  );
  //0xba414382Bc80410495601964D7c3700Bc95ca2FA
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, //owner
        form.title, // title
        form.description, //description
        form.target,
        new Date(form.deadline).getTime(), //deadline
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };
  return (
    <stateContext.Provider
      value={{
        address,
        contract,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
