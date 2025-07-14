"use client";

import { FunctionComponent, useContext } from "react";
import Image from "next/image";
import { ModalContext } from "@/app/providers";
import { useRouter } from "next/navigation";

const InfoEntry: FunctionComponent<{ dict: any; lang: string }> = ({
  dict,
  lang,
}) => {
  const contexto = useContext(ModalContext);
  const router = useRouter();
  return (
    <div className="w-full flex h-screen relative text-white items-center justify-center">
      <video
        draggable={false}
        className="absolute opacity-10 bg-black top-0 w-full h-full left-0 flex object-cover"
        muted
        autoPlay
        loop
        poster="/images/emmajanemackinnonlee_portrait.png"
      >
        <source src="/videos/emmajanemackinnonlee_portrait.mp4" />
      </video>

      <div className="relative w-full h-fit flex flex-col gap-3 items-center justify-center px-3 py-4 text-xl">
        <div
          className="relative w-fit h-fit flex font-love"
          dir={lang == "ar" ? "rtl" : "ltr"}
        >
          {dict?.holi} {":)"}
        </div>
        <div className="relative w-fit h-fit flex">
          <video
            draggable={false}
            className="relative w-96 h-60 left-0 flex object-contain"
            muted
            autoPlay
            loop
            poster="/images/emmajanemackinnonlee_portrait.png"
          >
            <source src="/videos/emmajanemackinnonlee.mp4" />
          </video>
        </div>
        <div
          className="relative sm:w-1/2 text-center w-fit h-fit flex font-vibes"
          dir={lang == "ar" ? "rtl" : "ltr"}
        >
          {dict?.info}
        </div>
      </div>
    </div>
  );
};

export default InfoEntry;
