import React from "react";
import { useStateContext } from "../context";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
const Disconnect = () => {
  const { address } = useStateContext();

  return (
    <div className="bg-[#1c1c24] flex items-center  flex-col rounded-[10px] sm:p-10 p-4 ">
      <div className="flex items-center justify-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px] ">
        <h1 className=" font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white ">
          Disconnect
        </h1>
      </div>
      <div className="mt-10">
        <Jazzicon diameter={100} seed={jsNumberForAddress(`${address}`)} />

        <h2 className="text-white">Kiran Mahajan</h2>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Disconnect;
