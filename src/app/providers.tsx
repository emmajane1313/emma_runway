"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { createContext, SetStateAction, useState } from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { chains } from "@lens-chain/sdk/viem";
import { Collection, Drop } from "./components/Common/types/common.types";

export const config = createConfig(
  getDefaultConfig({
    appName: "Runway",
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    appUrl: "https://emmajanemackinnonlee-runway.com",
    appIcon: "https://emmajanemackinnonlee-runway.com/favicon.ico",
    chains: [chains.mainnet],
    transports: {
      [chains.mainnet.id]: http("https://rpc.lens.xyz"),
    },
    ssr: true,
  })
);

const queryClient = new QueryClient();

export const ModalContext = createContext<
  | {
      success: boolean;
      setSuccess: (e: SetStateAction<boolean>) => void;
      error: boolean;
      setError: (e: SetStateAction<boolean>) => void;
      drops: Drop[];
      setDrops: (e: SetStateAction<Drop[]>) => void;
      orders: Collection[];
      setOrders: (e: SetStateAction<Collection[]>) => void;
    }
  | undefined
>(undefined);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [orders, setOrders] = useState<Collection[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <ModalContext.Provider
            value={{
              orders,
              setOrders,
              error,
              setError,
              success,
              setSuccess,
              drops,
              setDrops,
            }}
          >
            {children}
          </ModalContext.Provider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
