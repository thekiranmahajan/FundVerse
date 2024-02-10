import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  isCategory,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span
          className="font-epilogue font-medium text-[14px]
             leading-[22px] text-[#808191]  mb-[10px]"
        >
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          rows={10}
          placeholder={placeholder}
          className=" py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]
          "
        />
      ) : isCategory ? (
        <select
          required
          value={value}
          onChange={handleChange}
          className="py-[17px] sm:px-[25px] px-[20px] outline-none border-[1px] border-[#3a3a43]  font-epilogue text-white text-[14px]  rounded-[10px] sm:min-w-[300px] bg-[#1c1c24]"
        >
          <option value="">Select any Category</option>
          <option value="Fundraiser">Fundraiser</option>
          <option value="Crisis Relief">Crisis Relief</option>
          <option value="Emergency">Emergency</option>
          <option value="Education">Education</option>
          <option value="Medical">Medical</option>
          <option value="Non-Profit">Non-Profit</option>
          <option value="Personal">Personal</option>
          <option value="Environment">Environment</option>
          <option value="Animals">Animals</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          className=" py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] 
          "
        />
      )}
    </label>
  );
};

export default FormField;
