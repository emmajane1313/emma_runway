"use client";

import { FunctionComponent } from "react";
import Image from "next/image";
import { Collection } from "../../Common/types/common.types";
import usePurchase from "../hooks/usePurchase";
import { useAccount } from "wagmi";
import { INFURA_GATEWAY_INTERNAL, TOKENS } from "@/app/lib/constantes";
import { AiOutlineLoading } from "react-icons/ai";

const CollectionEntry: FunctionComponent<{
  dict: any;
  lang: string;
  collection: Collection;
}> = ({ dict, lang, collection }) => {
  const { address } = useAccount();
  const { handlePurchase, purchaseLoading, buyDetails, setBuyDetails } =
    usePurchase(address, collection);
  return (
    <div className="w-full flex h-screen relative text-white bg-[#E725C6]">
      <video
        muted
        autoPlay
        loop
        poster={`${INFURA_GATEWAY_INTERNAL}${
          collection?.metadata?.cover?.split("ipfs://")?.[1]
        }`}
        draggable={false}
        className="absolute flex w-full h-full object-cover opacity-30"
      >
        <source
          src={`${INFURA_GATEWAY_INTERNAL}${
            collection?.metadata?.video?.split("ipfs://")?.[1]
          }`}
        />
      </video>
        <div className="absolute top-0 left-0 w-full flex h-full bg-black/90"></div>
      <div className="relative w-full h-screen flex flex-col gap-5 items-center justify-start py-8 px-2 overflow-y-auto">
        <div
          className={`relative w-fit h-fit flex font-shine text-base sm:text-xl text-center ${
            !collection && "animate-pulse"
          }`}
        >
          {!collection ? "☆☆☆☆☆" : collection?.metadata?.title}
        </div>
        <div
          className={`relative w-fit h-fit flex ${
            !collection && "animate-pulse"
          }`}
        >
          <video
            muted
            autoPlay
            loop
            poster={`${INFURA_GATEWAY_INTERNAL}${
              collection?.metadata?.cover?.split("ipfs://")?.[1]
            }`}
            draggable={false}
            className="relative hover:mix-blend-color-dodge flex w-full h-[35rem] object-contain"
          >
            <source
              src={`${INFURA_GATEWAY_INTERNAL}${
                collection?.metadata?.video?.split("ipfs://")?.[1]
              }`}
            />
          </video>
        </div>
        <div className="relative w-full sm:w-1/2 py-3 h-fit flex items-center justify-center flex-col gap-4 font-love">
          <div className="py-4 flex w-fit h-fit text-sm">
            {collection?.metadata?.description}
          </div>

          <div className="relative w-fit h-fit flex flex-row gap-2 items-center justify-center">
            <div
              dir={lang == "ar" ? "rtl" : "ltr"}
              className={`relative w-fit h-fit flex ${
                lang == "ar" && "font-vibes"
              }`}
            >
              {dict?.edition}
            </div>
            <div className="relative w-fit h-fit flex">
              {Number(collection?.tokensSold)} / {Number(collection?.edition)}
            </div>
          </div>
          <div className="relative w-fit h-fit flex items-center justify-center">
            <input
              className="relative border border-violet-400 w-16 h-8 p-1 text-sm text-violet-100 focus:outline-none rounded-sm mix-blend-color-dodge"
              placeholder={"1"}
              type="number"
              disabled={purchaseLoading}
              min={1}
              value={buyDetails?.amount}
              onChange={(e) =>
                !purchaseLoading &&
                Number(e.target.value) <=
                  Number(collection?.edition) -
                    Number(collection?.tokensSold) &&
                setBuyDetails((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="relative w-fit h-fit flex flex-wrap flex-row gap-2 items-center justify-center">
            {TOKENS.map((tok, indice) => {
              return (
                <div
                  key={indice}
                  className={`relative w-fit h-fit flex cursor-pointer ${
                    buyDetails?.currency?.toLowerCase() ==
                      tok?.contract?.toLowerCase() &&
                    "border border-violet-400 rounded-full"
                  }`}
                  onClick={() =>
                    !purchaseLoading &&
                    setBuyDetails((prev) => ({
                      ...prev,
                      currency: tok?.contract,
                    }))
                  }
                >
                  <div className="relative flex w-6 h-6 mix-blend-color-dodge">
                    <Image
                      alt={tok?.symbol}
                      draggable={false}
                      src={`${INFURA_GATEWAY_INTERNAL}${tok?.image}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative w-fit h-fit flex text-base">
            {`${(
              Number(
                collection?.prices?.[
                  collection?.acceptedTokens?.findIndex(
                    (cur) =>
                      cur?.toLowerCase() == buyDetails?.currency?.toLowerCase()
                  )
                ]
              ) /
              10 ** 18
            )?.toFixed(3)} ${
              TOKENS?.find(
                (tok) =>
                  tok?.contract?.toLowerCase() ==
                  buyDetails?.currency?.toLowerCase()
              )?.symbol
            }`}
          </div>
          <div className="relative w-fit h-fit flex">
            <div
              className={`relative w-32 mix-blend-color-dodge border-2 border-violet-400 h-10 rounded-sm flex items-center justify-center  text-violet-100 text-center  ${
                !purchaseLoading && "cursor-pointer hover:opacity-70"
              }`}
              onClick={() => !purchaseLoading && address && handlePurchase()}
            >
              {purchaseLoading ? (
                <AiOutlineLoading
                  className="animate-spin"
                  color="#E725C6"
                  size={15}
                />
              ) : (
                dict?.collect
              )}
            </div>
          </div>

          <div
            className={`relative h-fit flex flex-col gap-4 w-full sm:w-1/2 pt-6 ${
              lang == "ar" ? "font-vibes text-xs" : "font-dog text-xxs"
            }`}
          >
            <div className="relative w-fit h-fit flex flex-col gap-1">
              <div
                className="relative w-fit h-fit flex"
                dir={lang == "ar" ? "rtl" : "ltr"}
              >
                {dict?.model}:
              </div>
              <div className="relative w-fit h-fit flex">
                {collection?.metadata?.config?.model}
              </div>
            </div>
            <div className="relative w-fit h-fit flex flex-col gap-1">
              <div
                className="relative w-fit h-fit flex"
                dir={lang == "ar" ? "rtl" : "ltr"}
              >
                {dict?.hardware}:
              </div>
              <div className="relative w-fit h-fit flex">
                {collection?.metadata?.config?.hardware}
              </div>
            </div>
            <div className="relative w-fit h-fit flex flex-col gap-1">
              <div
                className="relative w-fit h-fit flex"
                dir={lang == "ar" ? "rtl" : "ltr"}
              >
                {dict?.workflow}:
              </div>
              <div className="relative w-fit h-fit flex">
                {collection?.metadata?.config?.workflow}
              </div>
            </div>
            {collection?.metadata?.config?.prompt && (
              <div className="relative w-fit h-fit flex flex-col gap-1">
                <div
                  className="relative w-fit h-fit flex"
                  dir={lang == "ar" ? "rtl" : "ltr"}
                >
                  {dict?.prompt}:
                </div>
                <div className="relative w-fit h-fit flex">
                  {collection?.metadata?.config?.prompt}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionEntry;
