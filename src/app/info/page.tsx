import { getDictionary } from "@/app/[lang]/dictionaries";
import { INFURA_GATEWAY, LOCALES } from "@/app/lib/constantes";
import { Metadata } from "next";
import InfoEntry from "../components/Info/modules/InfoEntry";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Info - Emma-Jane MacKinnon-Lee",
    alternates: {
      canonical: `https://emmajanemackinnonlee-runway.com/info/`,
      languages: LOCALES.reduce((acc, item) => {
        acc[item] = `https://emmajanemackinnonlee-runway.com/${item}/info/`;
        return acc;
      }, {} as { [key: string]: string }),
    },
    openGraph: {
      images: `https://emmajanemackinnonlee-runway.com/images/emmajanemackinnonlee.png`,
    },
  };
};

export default async function Info() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");

  return <InfoEntry dict={dict} lang={"en"} />;
}
