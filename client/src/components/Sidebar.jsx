import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { navlinks, themeModes } from "../constants";
import Icon from "./Icon";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Dashboard");
  const [themeMode, setThemeMode] = useState("System");
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
                setIsActive(Link.name);
                navigate(Link.link);
              }}
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
              handleClick={() => {
                setThemeMode(mode.name);
                setIsActive(mode.name);
                console.log(mode);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
