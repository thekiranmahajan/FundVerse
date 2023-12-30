import React, { useState } from "react";

const Expandable = ({ children, maxChars = 300 }) => {
  let [expanded, setExpanded] = useState(true);

  if (children.length <= maxChars) return <p>{children}</p>;

  let text = expanded ? children.substring(0, maxChars) : children;

  return (
    <div>
      <p className=" font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
        {text}...
      </p>
      <span
        onClick={() => setExpanded(!expanded)}
        className=" cursor-pointer font-epilogue font-normal text-[16px] text-[#8c6dfd] leading-[26px] text-justify"
      >
        {expanded ? "Read More >>" : "Read Less <<"}
      </span>
    </div>
  );
};

export default Expandable;
