"use client";

import { FunctionComponent, useContext } from "react";
import VideoRow from "./VideoRow";
import Image from "next/image";
import useIdioma from "../hooks/useIdioma";
import useCollections from "../hooks/useCollections";
import { ModalContext } from "@/app/providers";
import { useRouter } from "next/navigation";

const Entry: FunctionComponent<{ dict: any; lang: string }> = ({
  dict,
  lang,
}) => {
  const contexto = useContext(ModalContext);
  const { changeLanguage } = useIdioma();
  const { cargando, handleMoreNFTs, hasMore, moreCargando } = useCollections();
  const router = useRouter();
  return (
    <div className="w-full flex h-screen relative">
      <video
        draggable={false}
        className="absolute opacity-20 bg-black top-0 w-full h-full left-0 flex object-cover"
        muted
        autoPlay
        loop
        poster="/images/glittergirl.png"
      >
        <source src="/videos/glittergirl.mp4" />
      </video>
      <div className="relative w-full h-screen flex flex-col">
        <div className="font-shine uppercase text-white text-sm sm:text-xl relative w-full h-fit items-center justify-center sm:justify-between flex flex-col sm:flex-row gap-3 p-2 z-10">
          <div
            className={`relatitve w-fit h-fit flex items-center justify-center flex-row gap-2 ${
              lang == "ar" && "font-vibes text-xl sm:text-3xl"
            }`}
          >
            <div className="relative w-fit h-fit flex text-center">
              {dict?.runway}
            </div>
            <div className="relative w-fit h-fit flex">
              <div
                className={`relative w-4 h-4 rotate-180 flex cursor-pointer`}
                onClick={() => changeLanguage()}
              >
                <Image
                  src={"/images/arr.png"}
                  alt="arrow"
                  objectFit="contain"
                  draggable={false}
                  layout="fill"
                />
              </div>
            </div>
          </div>
          <h1
            className="cursor-pointer flex w-fit h-fit hover:text-violet-400 text-center"
            onClick={() => router.push("/info/")}
          >
            Emma-Jane MacKinnon-Lee
          </h1>
        </div>
        <div className="relative h-full w-full flex flex-col py-8 overflow-y-auto">
          {cargando || Number(contexto?.drops?.length) < 1
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="mb-8">
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-4 px-6 pb-4 w-max">
                      {Array.from({ length: 10 })?.map((_, i) => (
                        <div key={i} className="relative w-fit h-fit flex">
                          <div className="flex relative h-fit w-60 sm:w-80 flex-col">
                            <video
                              muted
                              autoPlay
                              loop
                              poster="/images/glittergirl.png"
                              draggable={false}
                              className="relative animate-pulse flex w-full h-40 sm:h-48 object-cover rounded-lg transition-transform mix-blend-color-dodge duration-300 hover:scale-95"
                            >
                              <source src="/videos/glittergirl.mp4" />
                            </video>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : contexto?.drops?.map((coll, index) => (
                <VideoRow key={index} drop={coll} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Entry;
