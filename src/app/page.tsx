"use client";
import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

import TheQRBanner from "@/widgets/shared/banners/TheQRBanner";
import ThePhoneFormBanner from "@/widgets/shared/banners/ThePhoneFormBanner";

import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const [currentItem, setCurrentItem] = useState(0);

  const carouselRef = useRef(null);

  let timeoutId: number;

  let youtubeVideo: any;

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      youtubeVideo?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*",
      );
    } else if (document.visibilityState === "visible") {
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
    }, 10000);
  };

  useEffect(() => {
    youtubeVideo = document.getElementById("YoutubeVideo");

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <main className="relative w-[1280px] h-[720px]">
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        selectedItem={currentItem}
        ref={carouselRef}
        onChange={(index) => setCurrentItem(index)}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute flex justify-center items-center left-[25px] top-[10px] w-[70px] h-[40px] bg-[#ffffff] hover:bg-[#000000] border-[#000000] border-2 rounded-[25px] text-[#000000] hover:text-[#ffffff] text-[1.875rem] duration-[400ms] ease-in-out z-20"
            >
              ←
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute flex justify-center items-center right-[25px] top-[10px] w-[70px] h-[40px] bg-[#ffffff] hover:bg-[#000000] border-[#000000] border-2 rounded-[25px] text-[#000000] hover:text-[#ffffff] text-[1.875rem] duration-[400ms] ease-in-out z-20"
            >
              →
            </button>
          )
        }
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

          <TheQRBanner />
        </div>

        <div className="relative w-[1280px] h-[720px]">
          <img
            src="/static/PhoneBannerBackgroundImage.png"
            alt=""
            className="absolute left-[0] w-full h-full z-10"
          />

          <ThePhoneFormBanner />

          <button className="absolute flex justify-center items-center top-[20px] right-[20px] w-[85px] h-[50px] bg-[#ffffff] border-[#000000] border-2 z-20">
            <img
              src="/static/XMarkIcon.svg"
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

        <div></div>
      </Carousel>
    </main>
  );
}
