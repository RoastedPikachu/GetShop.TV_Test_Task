"use client";
import React, { useEffect } from "react";

import TheQRBanner from "@/widgets/shared/banners/TheQRBanner";
import ThePhoneFormBanner from "@/widgets/shared/banners/ThePhoneFormBanner";

export default function Home() {
  let youtubeVideo;

  function handleVisibilityChange() {
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
  }

  useEffect(() => {
    youtubeVideo = document.getElementById("YoutubeVideo");

    document.addEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <main className="relative w-[1280px] h-[720px]">
      {/* Отсюда брал параметры для проигрывателя: https://developers.google.com/youtube/player_parameters?hl=ru */}

      <div className="relative w-full h-full">
        {/*  <img*/}
        {/*    src="/static/PhoneBannerBackgroundImage.png"*/}
        {/*    alt=""*/}
        {/*    className="absolute w-full h-full z-10"*/}
        {/*  />*/}

        {/*  <ThePhoneFormBanner />*/}

        {/*  <button className="absolute flex justify-center items-center top-[20px] right-[20px] w-[85px] h-[50px] bg-[#ffffff] border-[#000000] border-2 z-20">*/}
        {/*    <img*/}
        {/*      src="/static/XMarkIcon.svg"*/}
        {/*      alt="Закрыть баннер с вводом телефона"*/}
        {/*    />*/}
        {/*  </button>*/}

        {/*  <div className="absolute bottom-[40px] right-[40px] flex justify-between items-center w-[320px] h-[110px] z-20">*/}
        {/*    <p className="w-[60%] text-[#ffffff] text-[1rem] text-right font-['Roboto'] font-medium leading-[19px]">*/}
        {/*      СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ*/}
        {/*    </p>*/}

        {/*    <img*/}
        {/*      src="/static/QRCode.png"*/}
        {/*      alt="QR-код для получения дополнительной информации"*/}
        {/*      className="w-[110px] h-[110px]"*/}
        {/*    />*/}
        {/*  </div>*/}

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
    </main>
  );
}
