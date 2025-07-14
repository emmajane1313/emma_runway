import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/app/providers";
import { getCollections } from "../../../../../graphql/queries/getCollections";
import { getOrders } from "../../../../../graphql/queries/getOrders";
import { useAccount } from "wagmi";
import { TOKENS } from "@/app/lib/constantes";

const useCollections = () => {
  const context = useContext(ModalContext);
  const { address } = useAccount();
  const [cargando, setCargando] = useState<boolean>(false);
  const [moreCargando, setMoreCargando] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<{
    more: boolean;
    skip: number;
  }>({
    more: true,
    skip: 0,
  });

  const handleNFTs = async () => {
    setCargando(true);
    try {
      const data = await getCollections(0);
      const orders = await getOrders(address!);

      context?.setOrders(orders?.data?.orderCreateds);

      context?.setDrops(
        data?.data?.drops?.map((item: any) => ({
          uri: item?.uri,
          metadata: item?.metadata,
          collections: item?.collections?.map((col: any) => ({
            ...item?.col,
            hasCollected: orders?.data?.orderCreateds
              ?.map((it: any) => it?.collection?.collectionId)
              ?.includes(col?.collectionId),
            metadata: {
              ...col.metadata,
              config: JSON.parse(col?.metadata?.config),
            },
          })),
        }))
      );
      setHasMore({
        more: data?.data?.drops?.length >= 20 ? true : false,
        skip: data?.data?.drops?.length >= 20 ? 20 : 0,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setCargando(false);
  };

  const handleMoreNFTs = async () => {
    if (!hasMore.more) return;
    setMoreCargando(true);
    try {
      const data = await getCollections(hasMore.skip);

      context?.setDrops((prev) => [
        ...prev,
        ...data?.data?.drops?.map((item: any) => ({
          uri: item?.uri,
          metadata: item?.metadata,
          collections: item?.collections?.map((col: any) => ({
            ...item?.col,
            hasCollected: context?.orders
              ?.map((it: any) => it?.collection?.collectionId)
              ?.includes(col?.collectionId),
            metadata: {
              ...col.metadata,
              config: JSON.parse(col?.metadata?.config),
            },
          })),
        })),
      ]);
      setHasMore({
        more: data?.data?.drops?.length >= 20 ? true : false,
        skip: data?.data?.drops?.length >= 20 ? hasMore.skip + 20 : 0,
      });
    } catch (err: any) {
      console.error(err.message);
    }
    setMoreCargando(false);
  };

  useEffect(() => {
    if (Number(context?.drops?.length) < 1) {
      context?.setDrops([
        {
          dropMetadata: {
            title: "Ephemera",
            cover: "ipfs://QmSagYMLEFGUMhd8Tf6eV8iEAL7ws1jKbTAjfWD8d92STr",
          },
          dropUri: "",
          collections: [
            {
              hasCollected: true,
              tokensSold: 0,
              dropMetadata: {
                title: "Ephemera",
                cover: "ipfs://QmSagYMLEFGUMhd8Tf6eV8iEAL7ws1jKbTAjfWD8d92STr",
              },
              dropUri: "",
              uri: "",
              edition: "5",
              collectionId: "1",
              prices: [
                "100000000000000000000",
                "33636057850000000",
                "2150000000000000000",
              ],
              acceptedTokens: TOKENS.map((tok) => tok?.contract),
              metadata: {
                title: "Utcai Couture",
                description: "Divat kiált a betonon.",
                config: {
                  model: "wan2.1-i2v-14b-480p-Q4_K_M.gguf",
                  prompt:
                    "Three girls wearing high fashion streetwear walk fast along the pavement, slightly bumping into each other as the camera keeps pace in front of them, like a shaky hand held iphone.",
                  workflow: "Wan2.1 - IMG TO VIDEO",
                  hardware:
                    "4090, 24gb vram, i9-13900kf cpu, 128gb ddr5 ram @ 5200 mt/s, windows 11",
                },
                cover: "ipfs://QmRtrF2ANmTG1ufrT3K47hjHFABUsLMQ41uwzgLLohRqv8",
                video: "ipfs://QmRAmpe5STKvN2GpnEPnVcny19GKoiGxby5VXDzSWF9MvP",
              },
            },
          ],
        },
      ]);
      // handleNFTs();
    }
  }, []);

  return {
    cargando,
    handleMoreNFTs,
    hasMore,
    moreCargando,
  };
};

export default useCollections;
