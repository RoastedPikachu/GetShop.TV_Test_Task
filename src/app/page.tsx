"use client";
import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

import TheQRBanner from "@/widgets/shared/banners/TheQRBanner";
import ThePhoneFormBanner from "@/widgets/shared/banners/ThePhoneFormBanner";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const [currentItem, setCurrentItem] = useState(0);
  const [isApplicationAccepted, setIsApplicationAccepted] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(false);

  const carouselRef = useRef(null);

  let buttons: any;

  let timeoutId: any;

  let youtubeVideo: any;

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden" || currentItem !== 0) {
      youtubeVideo?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*",
      );
    } else if (document.visibilityState === "visible" || currentItem === 0) {
      youtubeVideo?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*",
      );
    }
  };

  const handleUserActivity = () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setCurrentItem(0);
      handleVisibilityChange();
    }, 10000);
  };

  const handleKeyDown = (event) => {
    let currentFocusedIndex = Array.from(buttons).findIndex(
      (button) => button === document.activeElement,
    );

    if (event.key === "ArrowLeft") {
      event.preventDefault();

      currentFocusedIndex =
        currentFocusedIndex < 1 ? 0 : currentFocusedIndex - 1;
      buttons[currentFocusedIndex].focus();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      currentFocusedIndex =
        currentFocusedIndex === buttons.length - 1
          ? buttons.length - 1
          : currentFocusedIndex + 1;
      buttons[currentFocusedIndex].focus();
    }
  };

  const getNextSliderElement = () => {
    setCurrentItem(1);
    handleVisibilityChange();
  };

  const acceptApplication = () => {
    setIsApplicationAccepted(true);
  };

  useEffect(() => {
    buttons = document.querySelectorAll("button");
    youtubeVideo = document.getElementById("YoutubeVideo");

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    window.addEventListener("keydown", handleKeyDown);

    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <main className="relative w-[1280px] h-[720px]">
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        showArrows={false}
        selectedItem={currentItem}
        ref={carouselRef}
        className="relative w-full h-full"
      >
        {/*Отсюда брал параметры для проигрывателя: https://developers.google.com/youtube/player_parameters?hl=ru и https://developers.google.com/youtube/player_parameters?hl=ru#enablejsapi*/}

        <div className="relative w-[1280px] h-[720px]">
          <iframe
            width="1280"
            height="720"
            src="https://www.youtube.com/embed/M7FIvfx5J10?enablejsapi=1&si=q_LvnDNNmY05TBJc&autoplay=1&rel=0&playlist=M7FIvfx5J10&controls=0&loop=1&mute=1&cc_load_policy=0&iv_load_policy=3"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            allowFullScreen
            id="YoutubeVideo"
          ></iframe>

          <TheQRBanner callback={getNextSliderElement} />
        </div>

        <div className="relative w-[1280px] h-[720px]">
          <img
            src="/static/background/PhoneBannerBackgroundImage.png"
            alt=""
            className="absolute left-[0] w-full h-full z-10"
          />

          <div className="absolute px-[50px] w-[380px] h-full bg-[#86d3f4] text-center font-['Roboto'] font-normal z-20">
            {!isApplicationAccepted ? (
              <ThePhoneFormBanner callback={acceptApplication} />
            ) : (
              <>
                <h2 className="mt-[calc(50%+140px)] mx-[20%] w-[60%] text-[2rem] font-bold leading-[37px]">
                  ЗАЯВКА ПРИНЯТА
                </h2>

                <p className="mt-[15px]">
                  Держите телефон под рукой. Скоро с Вами свяжется наш менеджер.
                </p>
              </>
            )}
          </div>

          <button
            onMouseEnter={() => setIsButtonHover(true)}
            onMouseLeave={() => setIsButtonHover(false)}
            onFocus={() => setIsButtonHover(true)}
            onBlur={() => setIsButtonHover(false)}
            onClick={() => setCurrentItem(0)}
            className="absolute flex justify-center items-center top-[20px] right-[20px] w-[85px] h-[50px] bg-[#ffffff] hover:bg-[#000000] focus:bg-[#000000] border-[#000000] border-2 duration-[400ms] ease-in-out z-20"
          >
            <img
              src={`/static/icon/${
                isButtonHover ? "WhiteXMarkIcon.svg" : "XMarkIcon.svg"
              }`}
              alt="Закрыть баннер с вводом телефона"
            />
          </button>

          <div className="absolute bottom-[40px] right-[40px] flex justify-between items-center w-[320px] h-[110px] z-20">
            <p className="w-[60%] text-[#ffffff] text-[1rem] text-right font-['Roboto'] font-medium leading-[19px]">
              СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
            </p>

            <img
              src="/static/QRCode.png"
              alt="QR-код для получения дополнительной информации"
              className="w-[110px] h-[110px]"
            />
          </div>
        </div>
      </Carousel>
    </main>
  );
}
