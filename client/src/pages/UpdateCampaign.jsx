import React, { useState } from "react";
import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateCampaign } = useStateContext();
  const { state } = useLocation();

  const defaultDeadline = new Date(state.deadline)
    .toISOString()
    .substring(0, 10);

  const [form, setForm] = useState({
    id: state.id,
    name: state.name,
    title: state.title,
    category: state.category,
    description: state.description,
    target: state.target,
    deadline: defaultDeadline,
    image: state.image,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdating) return;
    setIsUpdating(true);
    const isFormChanged =
      JSON.stringify(form) !==
      JSON.stringify({
        id: state.id,
        name: state.name,
        title: state.title,
        category: state.category,
        description: state.description,
        target: state.target,
        deadline: defaultDeadline,
        image: state.image,
      });

    if (!isFormChanged) {
      toast("❌ No changes made. Please make changes before updating.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsUpdating(false);
      return;
    }
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);

        await updateCampaign({
          ...form,
        });
        setIsLoading(false);
        setIsUpdating(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
        setIsUpdating(false);
      }
    });
  };
  return (
    <div className="bg-[#f2f2f2] dark:bg-[#1c1c24] flex justify-center items-center flex-col rounded-xl sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#e5e5e5] dark:bg-[#3a3a43] rounded-xl">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-lg leading-[38px] text-[#131418] dark:text-white">
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

        <div className="w-full flex justify-center items-center p-4 bg-[#03dac5] h-[120px] rounded-xl ">
          <img
            src={money}
            alt="money"
            className="  w-10 h-10 object-contain
          
          "
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-5 ">
            You'll get 100% of the raised amount
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
            styles="bg-[#6F01Ec]"
            isDisabled={isUpdating || isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateCampaign;
