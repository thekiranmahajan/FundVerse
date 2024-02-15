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
  return (
    <div
      className={`relative w-12 h-12 rounded-xl cursor-pointer flex justify-center items-center ${
        isActive && isActive === name && "bg-[#00000020] dark:bg-[#2c2f32]"
      }${themeMode === name && "bg-[#00000020] dark:bg-[#2c2f32]"} ${styles}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered && (
        <div className="absolute top-1 left-20 bg-[#f0f0f0a7] dark:bg-[#2c2f32a7] text-black dark:text-white py-2 px-3 rounded-md font-epilogue">
          {name}
        </div>
      )}

      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2`} />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

export default Icon;
