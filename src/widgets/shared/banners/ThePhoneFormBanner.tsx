"use client";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";

import NumPadButton from "@/widgets/shared/buttons/NumPadButton";

interface ThePhoneFormBunnerProps {
  callback: () => void;
}

const ThePhoneFormBanner: React.FC<ThePhoneFormBunnerProps> = ({
  callback,
}) => {
  let [phoneNumber, setPhoneNumber] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);

  const checkPhoneNumberValid = () => {
    phoneNumber = phoneNumber.replace(/[\(\)_\-\+]/g, "");

    if (phoneNumber[0] === "7") {
      phoneNumber = phoneNumber.slice(1);
    }

    axios
      .post(
        `http://apilayer.net/api/validate?access_key=45f87171678e25604922fe59302e5dfd&number=${phoneNumber.slice(
          0,
          11,
        )}&country_code=RU`,
      )
      .then((res: any) => {
        if (!res.data.valid) {
          setIsPhoneInvalid(!res.data.valid);
          setTimeout(() => clearPhoneNumber(), 5000);
        } else {
          callback();
        }
      });
  };

  const addNumberToPhoneNumber = (number: string) => {
    setPhoneNumber(phoneNumber + number);
  };

  const clearPhoneNumber = () => {
    setPhoneNumber("");
    setIsPhoneInvalid(false);
  };

  return (
    <>
      <h2 className="mt-[50px] text-[1.625rem]">
        Введите ваш номер мобильного телефона
      </h2>

      <form className="mt-[10px]">
        <InputMask
          type="tel"
          mask="+7\(999)999-99-99"
          alwaysShowMask={true}
          onChange={(event) => setPhoneNumber(event.target.value)}
          value={phoneNumber}
          className={`w-[100%] h-[40px] bg-transparent border-none ${
            isPhoneInvalid ? "text-[#ea0000]" : ""
          } text-[2rem] text-center outline-none`}
        />

        <p className="mt-[10px] w-full text-[0.875rem] leading-[17px]">
          и с Вами свяжется наш менеджер для дальнейшей консультации
        </p>

        <div className="flex justify-between flex-wrap mt-[30px] w-full h-[250px]">
          <NumPadButton number={1} callback={addNumberToPhoneNumber} />

          <NumPadButton number={2} callback={addNumberToPhoneNumber} />

          <NumPadButton number={3} callback={addNumberToPhoneNumber} />

          <NumPadButton number={4} callback={addNumberToPhoneNumber} />

          <NumPadButton number={5} callback={addNumberToPhoneNumber} />

          <NumPadButton number={6} callback={addNumberToPhoneNumber} />

          <NumPadButton number={7} callback={addNumberToPhoneNumber} />

          <NumPadButton number={8} callback={addNumberToPhoneNumber} />

          <NumPadButton number={9} callback={addNumberToPhoneNumber} />

          <button
            type="button"
            onClick={() => clearPhoneNumber()}
            className="w-[185px] h-[50px] hover:bg-[#000000] focus:bg-[#000000] border-[#000000] border-2 hover:text-[#ffffff] focus:text-[#ffffff] font-medium duration-[400ms] ease-in-out"
          >
            Стереть
          </button>

          <NumPadButton number={0} callback={addNumberToPhoneNumber} />
        </div>

        {!isPhoneInvalid ? (
          <div className="flex justify-between items-center mt-[30px] w-full h-[50px]">
            <input
              type="checkbox"
              className="hidden"
              onClick={() => setIsConfirmed(!isConfirmed)}
              id="FAQApproveInput"
            />

            <label
              htmlFor="FAQApproveInput"
              tabIndex="0"
              onKeyDown={() => setIsConfirmed(!isConfirmed)}
              className="flex justify-center items-center w-[40px] h-[40px] border-[#000000] border-2 cursor-pointer"
            >
              {isConfirmed && (
                <img
                  src="/static/icon/CheckedIcon.svg"
                  alt="Принять условия согласия на обработку персональных данных"
                />
              )}
            </label>

            <p className="w-[80%] text-[#4e4e4e] text-[0.875rem] text-left">
              Согласие на обработку персональных данных
            </p>
          </div>
        ) : (
          <p className="text-[#ea0000] text-[1rem]">НЕВЕРНО ВВЕДЁН НОМЕР</p>
        )}

        <button
          type="button"
          onClick={() => checkPhoneNumberValid()}
          className={`mt-[20px] w-full h-[50px] border-[1px] ${
            isConfirmed && phoneNumber.replace(/[\(\)_\-\+]/g, "").length >= 10
              ? "bg-[#000000] border-[#000000] text-[#ffffff]"
              : "border-[#4e4e4e] text-[#4e4e4e]"
          } text-[1rem] font-medium duration-[400ms] ease-in-out`}
        >
          ПОДТВЕРДИТЬ НОМЕР
        </button>
      </form>
    </>
  );
};

export default ThePhoneFormBanner;
