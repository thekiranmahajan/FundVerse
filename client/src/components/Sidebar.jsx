import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { navlinks, themeModes } from "../constants";
import Icon from "./Icon";
import { useStateContext } from "../context";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Dashboard");
  const { toggleTheme, themeMode } = useStateContext();

  const handleLinkClick = (Link) => {
    setIsActive(Link.name);
    navigate(Link.link);
  };
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] ">
      <Link to="/">
        <Icon
          name="FundVerse"
          styles="w-[52px] h-[52px] bg-[#f0f0f0] dark:bg-[#2c2f32] shadow-md overflow-hidden"
          imgUrl={logo}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 shadow-md">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((Link) => (
            <Icon
              key={Link.name}
              {...Link}
              isActive={isActive}
              handleClick={() => handleLinkClick(Link)}
            />
          ))}
        </div>

        <div className="flex items-center justify-center flex-col gap-1">
          {themeModes.map((mode) => (
            <Icon
              key={mode.name}
              {...mode}
              isActive={isActive}
              themeMode={themeMode}
              handleClick={() => toggleTheme(mode.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
