import React from "react";
import { useStateContext } from "../context";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { CustomButton } from "../components";

const Disconnect = () => {
  const { address, connectMetamask, disconnect } = useStateContext();
  const handleDisconnect = () => {
    if (!address) {
      connectMetamask();
    } else {
      const confirmDisconnect = confirm(
        "Do you really want to Disconnect from MetaMask"
      );
      if (confirmDisconnect) {
        disconnect();
      }
    }
  };

  return (
    <div className="flex items-center flex-col rounded-xl sm:p-10 p-4">
      <div className="mt-10 w-3/4 flex items-center justify-center flex-col gap-10">
        <Jazzicon diameter={100} seed={jsNumberForAddress(`${address}`)} />

        <div className="font-epilogue font-semibold text-lg text-black dark:text-white h-16 flex items-center justify-center transition-all duration-300">
          {address ? (
            <p className="flex items-center justify-center flex-col text-[#131418]">
              You are connected to
              <span className="  text-gray-400 truncate">{address}</span>
            </p>
          ) : (
            "Connect to MetaMask"
          )}
        </div>

        <CustomButton
          btnType="button"
          title={address ? "Disconnect" : "Connect"}
          styles={address ? "bg-[#ff3333] " : "bg-[#03dac5] "}
          handleClick={handleDisconnect}
        />
      </div>
    </div>
  );
};

export default Disconnect;
