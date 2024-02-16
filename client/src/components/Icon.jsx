import React, { useState, useEffect } from "react";

const Icon = ({ styles, name, imgUrl, isActive, handleClick, themeMode }) => {
  const [hovered, setHovered] = useState(false);
  const [fadeOutTimer, setFadeOutTimer] = useState(null);

  const handleMouseEnter = () => {
    setHovered(true);

    const timer = setTimeout(() => {
      setHovered(false);
    }, 1000);
    setFadeOutTimer(timer);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    clearTimeout(fadeOutTimer);
  };
  // console.log(`${name} === ${themeMode} isActive === ${isActive}`);
  return (
    <div
      className={`relative w-12 h-12 rounded-xl cursor-pointer flex justify-center items-center ${
        isActive === name && "bg-[#00000020] dark:bg-[#2c2f32]"
      }${themeMode === name && "bg-[#00000071] dark:bg-[#2c2f32]"} ${styles}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered && (
        <div className="absolute top-1 left-20 bg-[#6F01Ec] dark:bg-[#2c2f32a7] text-white dark:text-[#6F01Ec] py-2 px-3 rounded-md font-epilogue">
          {name}
        </div>
      )}

      {!isActive ? (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${
            name === "FundVerse" && "w-[110%] h-[110%]"
          }`}
        />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"} `}
        />
      )}
    </div>
  );
};

export default Icon;
