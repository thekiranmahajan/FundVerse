import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { navlinks, themeModes } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
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
      className={`relative w-12 h-12 rounded-xl  ${
        isActive && isActive === name && "bg-[#f0f0f0] dark:bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered && (
        <div className="absolute top-1 left-20 #f0f0f0a7 dark:bg-[#2c2f32a7] text-black dark:text-white py-2 px-3 rounded-md font-epilogue">
          {name}
        </div>
      )}
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
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

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          name="FundVerse"
          styles="w-[52px] h-[52px] bg-[#f0f0f0] dark:bg-[#2c2f32]"
          imgUrl={logo}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((Link) => (
            <Icon
              key={Link.name}
              {...Link}
              isActive={isActive}
              handleClick={() => {
                if (!Link.disabled) {
                  setIsActive(Link.name);
                  navigate(Link.link);
                }
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center flex-col gap-1">
          {themeModes.map((mode) => (
            <Icon
              key={mode.name}
              {...mode}
              handleClick={() => setIsActive(mode.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
