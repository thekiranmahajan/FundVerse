import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { navlinks, themeModes } from "../constants";
import Icon from "./Icon";
import { useStateContext } from "../context";
import ThemeModeIcon from "./ThemeModeIcon";

const Sidebar = () => {
  const { toggleTheme, themeMode } = useStateContext();
  const [isThemeActive, setIsThemeActive] = useState(themeMode);

  const handleLinkClick = (Link) => {
    setIsActive(Link.name);
  };
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] ">
      <NavLink to="/">
        <Icon
          name="FundVerse"
          styles="w-[52px] h-[52px] bg-[#f0f0f0] dark:bg-[#2c2f32] shadow-md "
          imgUrl={logo}
        />
      </NavLink>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 shadow-md">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((Link) => (
            <NavLink key={Link.name} to={Link.route}>
              {({ isActive }) => (
                <Icon
                  {...Link}
                  isActive={isActive}
                  handleClick={() => handleLinkClick(Link)}
                />
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center justify-center flex-col gap-1">
          {themeModes.map((mode) => (
            <ThemeModeIcon
              key={mode.name}
              {...mode}
              isThemeActive={isThemeActive}
              handleClick={() => {
                toggleTheme(mode.name);
                setIsThemeActive(mode.name);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
