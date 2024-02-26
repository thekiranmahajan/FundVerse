import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../context";
import { cross, logo, menu, search } from "../assets";
import { navlinks } from "../constants";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { ConnectWallet, darkTheme, lightTheme } from "@thirdweb-dev/react";
import ThemeModes from "./ThemeModes";

const Navbar = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { address, themeMode } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[100px] shadow-md">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-sm placeholder:text-[#6e7682]  text-black dark:text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#6F01Ec] flex justify-center items-center cursor-pointer shadow-md">
          <img
            src={search}
            alt="search"
            className="w-[18px] h-[18px] object-contain "
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <ConnectWallet
          className={
            "!font-epilogue !bg-[#03dac5] !mr-5 !shadow-md !outline-none !font-semibold"
          }
          theme={
            (themeMode === "Light" &&
              lightTheme({
                colors: {
                  accentButtonBg: "#03dac5",
                  primaryButtonBg: "#03dac5",
                  accentText: "#03dac5",
                },
              })) ||
            (themeMode === "Dark" &&
              darkTheme({
                colors: {
                  accentButtonBg: "#03dac5",
                  primaryButtonBg: "#03dac5",
                  accentText: "#03dac5",
                },
              }))
          }
          modalTitle={"FundVerse"}
          modalSize={"wide"}
          welcomeScreen={{
            img: {
              src: `${logo}`,
              width: 200,
              height: 200,
            },
            title:
              "Welcome To FundVerse: A Decentralised CrowdFunding Application",
          }}
          modalTitleIconUrl={logo}
          showThirdwebBranding={false}
        />
        <NavLink to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#f0f0f0] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer overflow-hidden shadow-md">
            <Jazzicon
              className="w-[60%] h-[60%] object-contain"
              diameter={52}
              seed={jsNumberForAddress(`${address}`)}
            />
          </div>
        </NavLink>
      </div>

      {/* small screen navigation */}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-14 h-14 rounded-xl bg-[#f0f0f0] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer shadow-md">
          <NavLink
            to="/"
            className="flex items-center justify-center h-full w-full"
          >
            <img src={logo} alt="Logo" className="w-4/5 h-4/5 object-contain" />
          </NavLink>
        </div>

        <img
          src={toggleDrawer ? cross : menu}
          alt="Hamburger Menu"
          className={`${
            toggleDrawer ? "w-12 -rotate-90" : "w-9 h-9 "
          } object-contain cursor-pointer transition-transform duration-200 select-none `}
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-20 right-0 left-0 bg-[#f2f2f2] dark:bg-[#1c1c24] z-10 shadow-secondary py-4 cursor-pointer rounded-xl ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4 ">
            {navlinks.map((Link) => (
              <NavLink key={Link.name} to={Link.route}>
                {({ isActive }) => (
                  <li
                    className={`flex p-4 ${
                      isActive && "bg-[#e5e5e5] dark:bg-[#3a3a43]"
                    }`}
                    onClick={() => {
                      setToggleDrawer(false);
                    }}
                  >
                    <img src={Link.imgUrl} alt={Link.name} />
                    <p
                      className={`ml-5 font-epilogue font-semibold text-sm ${
                        isActive
                          ? "text-[#6F01Ec]"
                          : "text-[#4d4d4d] dark:text-[#808191]"
                      }`}
                    >
                      {Link.name}
                    </p>
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
          <div className="flex justify-evenly items-center flex-wrap gap-2 mx-2">
            <ConnectWallet
              className={
                "!font-epilogue !bg-[#03dac5] !mr-5 !shadow-md !outline-none !font-semibold"
              }
              theme={
                (themeMode === "Light" &&
                  lightTheme({
                    colors: {
                      accentButtonBg: "#03dac5",
                      primaryButtonBg: "#03dac5",
                      accentText: "#03dac5",
                    },
                  })) ||
                (themeMode === "Dark" &&
                  darkTheme({
                    colors: {
                      accentButtonBg: "#03dac5",
                      primaryButtonBg: "#03dac5",
                      accentText: "#03dac5",
                    },
                  }))
              }
              modalTitle={"FundVerse"}
              modalSize={"wide"}
              welcomeScreen={{
                img: {
                  src: `${logo}`,
                  width: 200,
                  height: 200,
                },
                title:
                  "Welcome To FundVerse: A Decentralised CrowdFunding Application",
              }}
              modalTitleIconUrl={logo}
              showThirdwebBranding={false}
            />
            <div className="flex justify-evenly items-center w-40">
              <ThemeModes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
