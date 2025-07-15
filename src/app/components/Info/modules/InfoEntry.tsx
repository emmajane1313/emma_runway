"use client";

import { FunctionComponent, useContext } from "react";
import Image from "next/image";
import { ModalContext } from "@/app/providers";
import { useRouter } from "next/navigation";
import { PiArrowBendDoubleUpLeftLight } from "react-icons/pi";

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
      <div className="absolute top-4 left-4 w-full h-fit flex items-start justify-start z-10">
        <PiArrowBendDoubleUpLeftLight
          color="white"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>
      <div className="relative w-full h-screen flex flex-col gap-3 items-center justify-center px-3 py-4 text-xl overflow-y-auto">
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
        <div className="relative w-fit h-fit flex flex-row gap-2 flex-wrap">
          {[
            {
              nombre: "DIGITALAX",
              enlace: "https://emmajanemackinnonlee-digitalax.com/",
            },
            {
              nombre: "F3Manifesto",
              enlace: "https://emmajanemackinnonlee-f3manifesto.com/",
            },
            {
              nombre: "Forum",
              enlace: "https://emmajanemackinnon.com/",
            },
          ].map((el, i) => (
            <div
              className="relative w-fit h-fit flex cursor-pointer underline underline-offset-3 font-vibes text-sm hover:opacity-80"
              key={i}
              onClick={() => window.open(el?.enlace)}
            >
              {el?.nombre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoEntry;
