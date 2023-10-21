"use client";
import React, { useState } from "react";
import NumPadButton from "@/widgets/shared/buttons/NumPadButton";

const ThePhoneFormBanner = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  return (
    <div className="absolute px-[50px] w-[380px] h-full bg-[#86d3f4] text-center font-['Roboto'] font-normal z-20">
      <h2 className="mt-[50px] text-[1.625rem]">
        Введите ваш номер мобильного телефона
      </h2>

      <input type="phone" className="bg-transparent border-none outline-none" />

      <p className="mt-[10px] w-full text-[0.875rem] leading-[17px]">
        и с Вами свяжется наш менеджер для дальнейшей консультации
      </p>

      <div className="flex justify-between flex-wrap mt-[30px] w-full h-[250px]">
        <NumPadButton number={1} />

        <NumPadButton number={2} />

        <NumPadButton number={3} />

        <NumPadButton number={4} />

        <NumPadButton number={5} />

        <NumPadButton number={6} />

        <NumPadButton number={7} />

        <NumPadButton number={8} />

        <NumPadButton number={9} />

        <button className="w-[185px] h-[50px] hover:bg-[#000000] border-[#000000] border-2 hover:text-[#ffffff] font-medium duration-[400ms] ease-in-out">
          Стереть
        </button>

        <NumPadButton number={10} />
      </div>

      <div className="flex justify-between items-center mt-[30px] w-full h-[50px]">
        <input
          type="checkbox"
          className="hidden"
          value={isConfirmed}
          onClick={() => setIsConfirmed(!isConfirmed)}
          id="FAQApproveInput"
        />

        <label
          htmlFor="FAQApproveInput"
          className="flex justify-center items-center w-[40px] h-[40px] border-[#000000] border-2 cursor-pointer"
        >
          {isConfirmed && (
            <img
              src="/static/CheckedIcon.svg"
              alt="Принять условия согласия на обработку персональных данных"
            />
          )}
        </label>

        <p className="w-[80%] text-[#4e4e4e] text-[0.875rem] text-left">
          Согласие на обработку персональных данных
        </p>
      </div>

      <button
        className={`mt-[20px] w-full h-[50px] border-[1px] ${
          isConfirmed && isPhoneVerified
            ? "bg-[#000000] border-[#000000] text-[#ffffff]"
            : "border-[#4e4e4e] text-[#4e4e4e]"
        } text-[1rem] font-medium`}
      >
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </div>
  );
};

export default ThePhoneFormBanner;
