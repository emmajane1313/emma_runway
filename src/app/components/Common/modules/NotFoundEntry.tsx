"use client";

import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

const NotFoundEntry: FunctionComponent<{ dict: any; lang: string }> = ({
  dict,
  lang,
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex h-screen relative items-center justify-center">
      <video
        draggable={false}
        className="absolute top-0 w-full h-full left-0 flex object-cover"
        muted
        autoPlay
        loop
        poster="/images/glittergirl.png"
      >
        <source src="/videos/glittergirl.mp4" />
      </video>
      <div className="relative w-full flex text-xs h-full bg-black/70 items-center justify-center">
        <div
          className={`relative w-fit text-white h-fit flex cursor-pointer ${
            lang == "ar" ? "font-vibes" : "font-shine"
          }`}
          dir={lang == "ar" ? "rtl" : "ltr"}
          onClick={() => router.push("/")}
        >
          {dict?.nothing}
        </div>
      </div>
    </div>
  );
};

export default NotFoundEntry;
