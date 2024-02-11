import React from "react";
import { useStateContext } from "../context";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { CustomButton } from "../components";

const Disconnect = () => {
  const { address, connectMetamask, disconnect } = useStateContext();
  const handleDisconnect = () => {
    if (!address) {
      connectMetamask();
      return;
    }

    const confirmDisconnect = confirm(
      "Do you really want to Disconnect from MetaMask"
    );
    if (confirmDisconnect) {
      disconnect();
    }
  };
  return (
    <div className=" flex items-center  flex-col rounded-[10px] sm:p-10 p-4 ">
      <div className="mt-10 w-3/4 flex items-center justify-center flex-col gap-10">
        <Jazzicon diameter={100} seed={jsNumberForAddress(`${address}`)} />

        {address && (
          <p className="font-epilogue font-semibold text-[18px] text-white">
            You are connected to {address}
          </p>
        )}
        {!address && (
          <p className="font-epilogue font-semibold text-[18px] text-white">
            Connect to MetaMask
          </p>
        )}
        <CustomButton
          btnType="button"
          title={address ? "Disconnect" : "Connect"}
          styles={address ? "bg-[#FF0000]" : "bg-[#8c6dfd]"}
          handleClick={handleDisconnect}
        />
      </div>
    </div>
  );
};

export default Disconnect;
