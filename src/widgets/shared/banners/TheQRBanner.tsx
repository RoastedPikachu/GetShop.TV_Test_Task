"use client";
import React, { useState, useEffect } from "react";

interface TheQRBannerProps {
  callback: () => void;
}

const TheQRBanner: React.FC<TheQRBannerProps> = ({ callback }) => {
  const [isBannerShowed, setIsBannerShowed] = useState(false);

  const handleClick = () => {
    callback();
  };

  useEffect(() => {
    setTimeout(() => setIsBannerShowed(true), 5000);
  }, []);

  return (
    <div
      className={`absolute top-[calc(50%-180px)] right-0 w-[250px] h-[360px] bg-[#86d3f4] text-[1rem] text-center font-["Roboto"] font-medium ${
        isBannerShowed ? "opacity-1" : "opacity-0"
      } duration-[400ms] ease-in-out`}
    >
      <h2 className="mt-[20px]">
        ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! <br /> ПОДАРИТЕ ЕМУ СОБАКУ!
      </h2>

      <img
        src="/static/QRCode.png"
        alt="QR-код"
        className="mt-[15px] mx-[calc(50%-62.5px)] w-[125px] h-[125px]"
      />

      <p className="mt-[20px] mx-[20%] w-[60%] text-[0.875rem] font-normal leading-[17px]">
        Сканируйте QR-код или нажмите ОК
      </p>

      <button
        tabIndex="1"
        onClick={() => handleClick()}
        className="mt-[15px] mx-[calc(50%-75px)] w-[150px] h-[50px] bg-[#000000] hover:bg-[#86d3f4] focus:bg-[#86d3f4] border-[#000000] border-2 text-[#86d3f4] hover:text-[#000000] focus:text-[#000000] text-[1rem] duration-[400ms] ease-in-out"
      >
        ОК
      </button>
    </div>
  );
};

export default TheQRBanner;
