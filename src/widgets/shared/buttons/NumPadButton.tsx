import React from "react";

const NumPadButton = ({ number }) => {
  return (
    <button className="w-[90px] h-[50px] hover:bg-[#000000] border-[#000000] border-2 hover:text-[#ffffff] font-medium duration-[400ms] ease-in-out">
      {number}
    </button>
  );
};

export default NumPadButton;
