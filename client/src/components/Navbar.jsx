import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { logo, menu, search } from "../assets";
import { navlinks } from "../constants";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#6e7682]  text-black dark:text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#6F01Ec] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[18px] h-[18px] object-contain "
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <ConnectWallet
          className={`!font-epilogue ${
            address || "!bg-[#03dac5]"
          } !text-black dark:text-white !mr-5`}
          modalSize="wide"
          welcomeScreen={{
            title: "Your Team LEAD MR. MAHAJAN",
            subtitle: "😂😂😂😂",
            img: {
              src: `${logo}`,
              width: 300,
            },
          }}
          modalTitle="Welcome to FundVerse"
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#f0f0f0] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer overflow-hidden">
            <Jazzicon
              className="w-[60%] h-[60%] object-contain"
              diameter={52}
              seed={jsNumberForAddress(`${address}`)}
            />
          </div>
        </Link>
      </div>

      {/* small screen navigation */}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-xl bg-[#f0f0f0] dark:bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="Logo"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#f2f2f2] dark:bg-[#1c1c24] z-10 shadow-secondary py-4 cursor-pointer ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4 ">
            {navlinks.map((Link) => (
              <li
                key={Link.name}
                className={`flex p-4 ${
                  isActive === Link.name && "bg-[#e5e5e5] dark:bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(Link.name);
                  setToggleDrawer(false);
                  navigate(Link.link);
                }}
              >
                <img src={Link.imgUrl} alt={Link.name} />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === Link.name
                      ? "text-[#48d48a]  dark:text-[#6F01Ec]"
                      : "text-[#4d4d4d] dark:text-[#808191]"
                  }`}
                >
                  {Link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <ConnectWallet
              className={`!font-epilogue ${
                address || "!bg-[#03dac5]"
              } !text-black dark:text-white !mr-5`}
              modalSize="wide"
              welcomeScreen={{
                title: "Your Team LEAD MR. MAHAJAN",
                subtitle: "😂😂😂😂",
                img: {
                  src: `${logo}`,
                  width: 300,
                },
              }}
              modalTitle="Welcome to FundVerse"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
