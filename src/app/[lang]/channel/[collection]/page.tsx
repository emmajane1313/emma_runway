import CollectionEntry from "@/app/components/Collection/modules/CollectionEntry";
import { getDictionary } from "../../dictionaries";
import { tParams } from "../../layout";
import { INFURA_GATEWAY, LOCALES } from "@/app/lib/constantes";
import { Metadata } from "next";
import { getCollection } from "../../../../../graphql/queries/getCollection";
import ModalsEntry from "@/app/components/Modals/modules/ModalsEntry";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{
    collection: string;
  }>;
}): Promise<Metadata> => {
  const { collection } = await params;
  let data = await getCollection(
    decodeURIComponent(collection)?.replaceAll("-", " ")
  );

  const coll = data?.data?.collectionCreateds?.[0];

  if (!coll?.metadata && coll?.uri) {
    const json = await fetch(
      `${INFURA_GATEWAY}/ipfs/${coll?.uri?.split("ipfs://")?.[1]}`
    );
    coll.metadata = await json.json();
  }

  return {
    title: coll?.metadata?.title,
    description: coll?.metadata?.description,
    alternates: {
      canonical: `https://emmajanemackinnonlee-runway.com/channel/${collection}/`,
      languages: LOCALES.reduce((acc, item) => {
        acc[
          item
        ] = `https://emmajanemackinnonlee-runway.com/${item}/channel/${collection}/`;
        return acc;
      }, {} as { [key: string]: string }),
    },
    openGraph: {
      images: `${INFURA_GATEWAY}/ipfs/${
        coll?.metadata?.cover?.split("ipfs://")?.[1]
      }`,
    },
  };
};

export default async function Channel({
  params,
}: {
  params: Promise<{
    lang: string;
    collection: string;
  }>;
}) {
  const { lang, collection } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  let data = await getCollection(
    decodeURIComponent(collection)?.replaceAll("-", " ")
  );

  const coll = data?.data?.collectionCreateds?.[0];

  if (!coll?.metadata && coll?.uri) {
    const json = await fetch(
      `${INFURA_GATEWAY}/ipfs/${coll?.uri?.split("ipfs://")?.[1]}`
    );
    coll.metadata = await json.json();
  }

  return (
    <>
      <CollectionEntry collection={coll} dict={dict} lang={lang} />;
      <ModalsEntry dict={dict} lang={lang} />
    </>
  );
}
