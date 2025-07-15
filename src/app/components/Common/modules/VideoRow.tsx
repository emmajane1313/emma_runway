import { FunctionComponent } from "react";
import { VideoRowProps } from "../types/common.types";
import { useRouter } from "next/navigation";
import { INFURA_GATEWAY_INTERNAL } from "@/app/lib/constantes";

const VideoRow: FunctionComponent<VideoRowProps> = ({ drop }) => {
  const router = useRouter();
  return (
    <div className="mb-8">
      <h2 className="text-white text-base sm:text-2xl uppercase font-glit mb-4 px-6">
        {drop?.metadata?.title}
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-6 pb-4 w-max">
          {drop?.collections?.map((video, i) => (
            <div key={i} className="relative w-fit h-fit flex">
              <div className="flex relative h-fit w-60 sm:w-80 cursor-pointer flex-col">
                <div className="relative w-full h-fit flex bg-[#E725C6] hover:scale-95 rounded-lg">
                  <video
                    draggable={false}
                    poster={`${INFURA_GATEWAY_INTERNAL}${
                      video?.metadata?.cover?.split("ipfs://")?.[1]
                    }`}
                    className={`relative flex w-full h-40 sm:h-48 object-cover rounded-lg transition-transform hover:mix-blend-color-dodge duration-300`}
                    onClick={() =>
                      router.push(
                        "/channel/" +
                          video?.metadata?.title
                            ?.toLowerCase()
                            ?.replaceAll(" ", "-")
                            ?.replaceAll(",", "_")
                            ?.replaceAll("/", "—")
                      )
                    }
                    muted
                    autoPlay
                    loop
                    style={{
                      objectPosition: "top center",
                    }}
                  >
                    <source
                      src={`${INFURA_GATEWAY_INTERNAL}${
                        video?.metadata?.video?.split("ipfs://")?.[1]
                      }`}
                    />
                  </video>
                  {video?.hasCollected && (
                    <div className="absolute z-50 bottom-2 right-4 text-violet-400">
                      ☆
                    </div>
                  )}
                </div>
                <div className="text-white text-xxs font-dog mt-2 line-clamp-2">
                  {video?.metadata?.title}
                </div>

                <div className="text-gray-400 text-xs mt-1 font-vibes line-clamp-1">
                  {video?.metadata?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoRow;
