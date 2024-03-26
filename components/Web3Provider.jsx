"use client"

import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConnectKitProvider, getDefaultConfig } from "connectkit";



export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [baseSepolia],
    transports: {
      // RPC URL for each chain
      [baseSepolia.id]: http(
        `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}`,
      ),
    },

    
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,

    // Required App Info
    appName: "onchain experiments",

    // Optional App Info
    appDescription: "onchain experiments",
    appUrl: "onchain experiments", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </WagmiProvider>
  );
};