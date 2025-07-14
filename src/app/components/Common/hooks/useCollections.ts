import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/app/providers";
import { getCollections } from "../../../../../graphql/queries/getCollections";
import { getOrders } from "../../../../../graphql/queries/getOrders";
import { useAccount } from "wagmi";

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
console.log(data)
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
    
      handleNFTs();
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
