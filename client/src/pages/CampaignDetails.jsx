import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import {
  CountBox,
  CustomButton,
  Loader,
  Expandable,
  FormField,
} from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { share } from "../assets";
const CampaignDetails = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const {
    getDonations,
    contract,
    address,
    donate,
    deleteCampaign,
    campaigns,
    isLoading,
    setIsLoading,
  } = useStateContext();
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [campaign, setCampaign] = useState([]);
  const [injectMetaTags, setInjectMetaTags] = useState(false);

  useEffect(() => {
    if (contract) {
      fetchDonators();
    }
  }, [contract, address]);

  useEffect(() => {
    if (campaigns && campaigns.length > 0) {
      const foundCampaign = campaigns.find((c) => c.id === Number(campaignId));
      setCampaign(foundCampaign);
    }
  }, [campaigns, campaignId]);

  const fetchDonators = async () => {
    const data = await getDonations(campaignId);
    setDonators(data);
  };

  const handleDonate = async () => {
    setIsLoading(true);
    if (!address) {
      toast.error("Please connect to MetaMask🦊", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setIsLoading(false);
      return;
    }
    if (amount === 0 || amount === "") {
      toast.error("Please enter a valid donation amount.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setIsLoading(false);
      return;
    }

    try {
      await donate(campaign?.id, amount);
      navigate("/");
    } catch (error) {
      console.error("Error donating:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          image: campaign?.image,
          title: campaign?.title,
          text: campaign?.description,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API not supported");
    }
    setInjectMetaTags(true);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    const confirmDelete = confirm("Do you really want to delete this Campaign");
    if (!confirmDelete) {
      toast.warning(
        "🤔 No campaign is deleted. You've canceled the operation.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );

      setIsLoading(false);
      return;
    }
    await deleteCampaign(campaign?.id);

    navigate("/");
    setIsLoading(false);
  };
  const remainingDays = daysLeft(campaign?.deadline);

  if (campaigns?.length <= 0) return <Loader />;
  return (
    <div>
      {injectMetaTags && (
        <Helmet>
          <meta property="og:title" content={campaign?.title} />
          <meta property="og:description" content={campaign?.description} />
          {campaign?.image && (
            <meta property="og:image" content={campaign?.image} />
          )}
        </Helmet>
      )}
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={campaign?.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl "
          />
          <div className="relative w-full h-[5px] bg-[#e5e5e5] dark:bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#6F01Ec]"
              style={{
                width: `${calculateBarPercentage(
                  campaign?.target,
                  campaign?.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full md:flex-wrap sm:flex-row flex-col justify-between sm:items-start items-center gap-[30px]">
          <CountBox
            title="Days Left"
            value={remainingDays == 0 ? "Ended" : remainingDays.toString()}
          />
          <CountBox
            title={`Raised of ${campaign?.target}`}
            value={campaign?.amountCollected}
          />
          <CountBox title="Total Backers" value={donators?.length} />
        </div>
      </div>

      <div className="mt-16 flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white uppercase flex gap-2 items-center ">
              {campaign?.title}{" "}
              <img
                className="h-8 cursor-pointer"
                onClick={handleShare}
                src={share}
                alt="share"
              />
            </h4>
            <p className="mt-[3px] font-epilogue font-normal   leading-[18px] text-[#4d4d4d] dark:text-[#808191]">
              {campaign?.category}
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
                  seed={jsNumberForAddress(`${campaign?.owner}`)}
                />
              </div>
              <div className="w-full">
                <h4 className="font-epilogue font-semibold text-sm text-black dark:text-white truncate ">
                  {campaign?.name} is organizing this fundraiser for{" "}
                  {campaign?.category} category.
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[13px] text-[#4d4d4d] dark:text-[#808191] truncate">
                  {campaign?.owner}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white  uppercase">
              Story
            </h4>

            <div className="mt-[20px] text-[#4d4d4d] dark:text-[#808191]">
              <Expandable>{campaign?.description}</Expandable>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-lg text-black dark:text-white uppercase">
              Donors
            </h4>
            <div className=" mt-[20px] flex flex-col gap-4">
              {donators?.length > 0 ? (
                donators?.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal   text-[#78787c] dark:text-[#b2b3bd] leading-[26px] truncate">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal   text-[#4d4d4d] dark:text-[#808191] leading-[26px] mr-3">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal   text-[#4d4d4d] dark:text-[#808191] leading-[26px] text-justify">
                  No Donors yet. Be the first one to donate!
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
            <p className=" font-epilogue font-medium text-[20px ] leading-8 text-center text-[#4d4d4d] dark:text-[#808191] ">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <FormField
                labelName="Amount"
                placeholder="ETH 0.1"
                inputType="number"
                value={amount}
                handleChange={(e) => setAmount(e.target.value)}
              />
              <div className="my-[20px] p-4 bg-[#eaeaea] dark:bg-[#13131a] rounded-xl ">
                <h4 className="font-epilogue font-semibold text-sm leading-[22px] text-black dark:text-white ">
                  Empower change. Support now.
                </h4>
                <p className=" mt-[20px] font-epilogue font-normal leading-[22px] text-[#4d4d4d] dark:text-[#808191] ">
                  Transform lives, shape the future. Your donation fuels
                  progress. Join us, make an impact.
                </p>
              </div>
              <CustomButton
                btnType="button"
                title={
                  remainingDays === 0 ? "Deadline Reached" : "Fund Campaign"
                }
                styles={`w-full bg-[#6F01Ec] ${
                  remainingDays === 0 && "!text-white"
                }`}
                isDisabled={remainingDays === 0}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 mb-[30px]">
        {address == campaign?.owner && (
          <div className="flex flex-wrap justify-between gap-[40px]">
            <Link to={`/update-campaign/${campaign?.id}`} className="w-[31%]">
              <CustomButton
                btnType="button"
                id={campaign?.id}
                title="Update Campaign"
                styles="w-full bg-[#03dac5]"
                isDisabled={isLoading}
              />
            </Link>

            <CustomButton
              btnType="button"
              title="Delete Campaign"
              styles=" w-[31%] bg-[#ff3333] dark:bg-[#FF0000] !text-white"
              handleClick={handleDelete}
              isDisabled={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
