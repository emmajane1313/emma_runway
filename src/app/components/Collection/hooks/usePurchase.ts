import { RUNWAY_MARKET } from "@/app/lib/constantes";
import { ModalContext } from "@/app/providers";
import { chains } from "@lens-chain/sdk/viem";
import { useContext, useEffect, useState } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { Collection } from "../../Common/types/common.types";
import RunwayMarketAbi from "./../../../../../abis/RunwayMarket.json";

const usePurchase = (
  address: `0x${string}` | undefined,
  collection: Collection
) => {
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const context = useContext(ModalContext);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [buyDetails, setBuyDetails] = useState<{
    currency: string;
    amount: number;
  }>({
    currency: "0x",
    amount: 1,
  });

  const handlePurchase = async () => {
    if (
      !address ||
      buyDetails?.amount < 1 ||
      buyDetails?.currency?.trim() == "" ||
      buyDetails?.currency?.trim() == "0x"
    )
      return;
    setPurchaseLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: RUNWAY_MARKET,
        abi: RunwayMarketAbi,
        functionName: "buy",
        chain: chains.mainnet,
        args: [
          buyDetails.currency,
          Number(collection?.collectionId),
          buyDetails.amount,
        ],
        account: address,
      });
      const res = await clientWallet.writeContract(request);

      await publicClient.waitForTransactionReceipt({ hash: res });

      context?.setSuccess(true);
    } catch (err: any) {
      context?.setError(true);
      console.error(err.message);
    }
    setPurchaseLoading(false);
  };

  useEffect(() => {
    setBuyDetails({
      currency: collection?.acceptedTokens?.[0],
      amount: 1,
    });
  }, []);

  return {
    handlePurchase,
    purchaseLoading,
    buyDetails,
    setBuyDetails,
  };
};

export default usePurchase;
