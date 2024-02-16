import React, { useState } from "react";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { updateCampaign } = useStateContext();
  const { state } = useLocation();

  const [form, setForm] = useState({
    id: state.id,
    name: state.name,
    title: state.title,
    category: state.category,
    description: state.description,
    target: state.target,
    deadline: state.deadline,
    image: state.image,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);

        await updateCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };
  return (
    <div className="bg-[#f2f2f2] dark:bg-[#1c1c24] flex justify-center items-center flex-col rounded-xl sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#e5e5e5] dark:bg-[#3a3a43] rounded-xl">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-lg leading-[38px] text-black dark:text-white">
          Edit Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="YourName *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />

          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />

          <FormField
            labelName="Select Category *"
            isCategory
            value={form.category}
            handleChange={(e) => handleFormFieldChange("category", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write a your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#b394ff] dark:bg-[#03dac5] rounded-xl">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />

          <h4 className="font-epilogue font-bold text-[25px] text-black dark:text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Update campaign"
            styles="bg-[#48d48a] dark:bg-[#6F01Ec]"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCampaign;
