import React from "react";

interface NumPadButtonProps {
  number: number;
  callback: (number: string) => void;
}

const NumPadButton: React.FC<NumPadButtonProps> = ({ number, callback }) => {
  const handleClick = () => {
    callback(number.toString());
  };

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className="w-[90px] h-[50px] hover:bg-[#000000] focus:bg-[#000000] border-[#000000] border-2 hover:text-[#ffffff] focus:text-[#ffffff] font-medium duration-[400ms] ease-in-out"
    >
      {number}
    </button>
  );
};

export default NumPadButton;
