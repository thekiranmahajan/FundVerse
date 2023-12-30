import React, { useState, useEffect } from "react";
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

  console.log(state);

  const [form, setForm] = useState({
    name: state.name,
    title: state.title,
    category: state.category,
    description: state.description,
    target: state.target,
    deadline: state.deadline,
    image: state.image,
  });

  const initialValues = {
    name: state.name,
    title: state.title,
    category: state.category,
    description: state.description,
    target: state.target,
    deadline: state.deadline,
    image: state.image,
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        console.log("form", form);
        console.log("target", form.target);
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
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Edit Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            defaultValue={initialValues.name}
            labelName="YourName *"
            placeholder="John Doe"
            inputType="text"
            handleChange={(e) => handleFormFieldChange("name", e)}
          />

          <FormField
            defaultValue={initialValues.title}
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />

          <FormField
            defaultValue={initialValues.category}
            labelName="Select Category *"
            placeholder="Select..."
            isCategory
            value={form.category}
            handleChange={(e) => handleFormFieldChange("category", e)}
          />
        </div>

        <FormField
          defaultValue={initialValues.description}
          labelName="Story *"
          placeholder="Write a your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />

          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get (100 - platformFee)% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            defaultValue={initialValues.target}
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          <FormField
            defaultValue={initialValues.deadline}
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          defaultValue={initialValues.image}
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
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCampaign;
