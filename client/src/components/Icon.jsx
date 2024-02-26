import React, { useState } from "react";

const Icon = ({ styles, name, imgUrl, isActive }) => {
  const [hovered, setHovered] = useState(false);
  const [fadeOutTimer, setFadeOutTimer] = useState(null);

  const handleMouseEnter = () => {
    setHovered(true);

    const timer = setTimeout(() => {
      setHovered(false);
    }, 1500);
    setFadeOutTimer(timer);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    clearTimeout(fadeOutTimer);
  };

  return (
    <div
      className={`relative w-12 h-12 rounded-xl cursor-pointer flex justify-center items-center ${
        isActive && "bg-[#c8cbcecb] dark:bg-[#2c2f32]"
      } ${styles}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered && (
        <div className="absolute top-1 left-[4.5rem] dark:bg-[#6F01Ec]  bg-[#c8cbcecb] dark:text-white text-[#6F01Ec] py-2 px-3 rounded-md font-epilogue">
          {name}
        </div>
      )}

      {!isActive ? (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${name === "FundVerse" && "w-full h-full"}`}
        />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${!isActive && "grayscale"} `}
        />
      )}
    </div>
  );
};

export default Icon;
