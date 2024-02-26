import React, { useState } from "react";
import { themeModes } from "../constants";
import { useStateContext } from "../context";

const ThemeModes = () => {
  const { toggleTheme, themeMode } = useStateContext();
  const [isThemeActive, setIsThemeActive] = useState(themeMode);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredTimeout, setHoveredTimeout] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);

    clearTimeout(hoveredTimeout);

    const timeout = setTimeout(() => {
      setHoveredIndex(null);
    }, 1000);

    setHoveredTimeout(timeout);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoveredTimeout);
    setHoveredIndex(null);
  };

  return (
    <>
      {themeModes.map((mode, index) => (
        <div
          key={mode.name}
          className={`relative w-12 h-12 rounded-xl cursor-pointer flex justify-center items-center ${
            isThemeActive === mode.name && "bg-[#c8cbcecb] dark:bg-[#2c2f32]"
          }`}
          onClick={() => {
            toggleTheme(mode.name);
            setIsThemeActive(mode.name);
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredIndex === index && (
            <div className="z-30 absolute sm:top-1 sm:left-[4.5rem] top-16 dark:bg-[#6F01Ec] bg-[#c8cbcecb] dark:text-white text-[#6F01Ec] py-2 px-3 rounded-md font-epilogue">
              {mode.name}
            </div>
          )}

          <img
            src={mode.imgUrl}
            alt="Theme Mode"
            className={`w-1/2 h-1/2 ${
              isThemeActive !== mode.name && "grayscale"
            }`}
          />
        </div>
      ))}
    </>
  );
};

export default ThemeModes;
