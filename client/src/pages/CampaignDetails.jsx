import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader, Expandable } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getDonations, contract, address, donate, deleteCampaign } =
    useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const id = state.pId;
  const name = state.name;
  const title = state.title;
  const category = state.category;
  const description = state.description;
  const target = state.target;
  const deadline = state.deadline;
  const image = state.image;

  const handleUpdate = () => {
    navigate(`/update-campaign/${state.pId}`, {
      state: {
        id,
        name,
        title,
        category,
        description,
        target,
        deadline,
        image,
      },
    });
  };

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };
  const handleDelete = async () => {
    setIsLoading(true);

    await deleteCampaign(state.pId);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl "
          />
          <div className="relative w-full h-[5px] bg-[#e5e5e5] dark:bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#48d48a] dark:bg-[#1dc071]
          "
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full md:flex-wrap sm:flex-row flex-col justify-between sm:items-start items-center gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white uppercase">
              {state.title}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[16px] leading-[18px] text-[#4d4d4d] dark:text-[#808191]">
              {state.category}
            </p>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white uppercase">
              Organizer
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#f0f0f0] dark:bg-[#2c2f32] cursor-pointer overflow-hidden">
                <Jazzicon
                  className="w-1/2 h-1/2 object-contain"
                  diameter={52}
                  seed={jsNumberForAddress(`${state.owner}`)}
                />
              </div>
              <div className="w-full">
                <h4 className="font-epilogue font-semibold text-[14px] text-black dark:text-white truncate ">
                  {state.name} is organizing this fundraiser for{" "}
                  {state.category} category.
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[13px] text-[#4d4d4d] dark:text-[#808191] truncate">
                  {state.owner}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white  uppercase">
              Story
            </h4>

            <div className="mt-[20px] text-[#4d4d4d] dark:text-[#808191]">
              <Expandable>{state.description}</Expandable>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white uppercase">
              Donators
            </h4>
            <div className=" mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#78787c] dark:text-[#b2b3bd] leading-[26px] truncate">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#4d4d4d] dark:text-[#808191] leading-[26px] mr-3">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#4d4d4d] dark:text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one to donate!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" flex-1">
          <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white uppercase">
            Fund
          </h4>
          <div className=" mt-[20px] flex flex-col p-4 bg-[#f2f2f2] dark:bg-[#1c1c24] rounded-xl ">
            <p className=" font-epilogue font-medium text-[20px ] leading-[30px] text-center text-[#4d4d4d] dark:text-[#808191] ">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className=" w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#e5e5e5] dark:border-[#3a3a43] bg-transparent font-epilogue  dark:text-white text-lg leading-[30px] placeholder:text-[#6e7682] text-[#4b5264] rounded-xl "
              />
              <div className="my-[20px] p-4 bg-[#eaeaea] dark:bg-[#13131a] rounded-xl ">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-black dark:text-white ">
                  Back it because you believe in it.
                </h4>
                <p className=" mt-[20px] font-epilogue font-normal leading-[22px] text-[#4d4d4d] dark:text-[#808191] ">
                  Support the project for no reward, just it speaks to you.
                </p>
              </div>
              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#d7b4ff] dark:bg-[#ac73ff]"
                isDisabled={remainingDays === "Ended"}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[60px] mb-[30px]">
        {address == state.owner && (
          <div className="flex flex-wrap justify-between gap-[40px]">
            <CustomButton
              btnType="button"
              id={state.pId}
              title="Update Campaign"
              styles="w-[31%] bg-[#d7b4ff] dark:bg-[#ac73ff]"
              handleClick={handleUpdate}
            />

            <CustomButton
              btnType="button"
              title="Delete Campaign"
              styles=" w-[31%] bg-[#ff3333] dark:bg-[#FF0000]"
              handleClick={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
