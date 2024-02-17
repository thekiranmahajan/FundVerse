import React from "react";

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
  isDisabled = false,
}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold  dark:text-black text-white min-h-[52px] px-4 rounded-xl transition-all duration-300 hover:scale-95 focus:scale-105 outline-none focus:ring-4 ring-[#6F01Ec] shadow-md ${styles} ${
        isDisabled && "grayscale cursor-not-allowed"
      }`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
