"use client"

// import { WagmiProvider, createConfig, http } from "wagmi";
// import { baseSepolia, mainnet } from "wagmi/chains";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, http, createConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  baseSepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";




// export const config = createConfig(
//   getDefaultConfig({
//     // Your dApps chains
//     chains: [baseSepolia],
//     transports: {
//       // RPC URL for each chain
//       [baseSepolia.id]: http(
//         `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}`,
//       ),
//     },

    
//     // Required API Keys
//     walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,

//     // Required App Info
//     appName: "onchain experiments",

//     // Optional App Info
//     appDescription: "onchain experiments",
//     appUrl: "onchain experiments", // your app's url
//     appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   }),
// );

// const config = createConfig({
//   appName: 'Experiments V1',
//   projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
//   chains: [baseSepolia],
//   transports: {
//     [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}`),
//   },
//   ssr: true, // If your dApp uses server side rendering (SSR)
// })

export const config = getDefaultConfig({
  appName: 'Experiments V1',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains: [baseSepolia], 
  transport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}`),
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// console.log(otherConfig)
// console.log(config)
const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <ConnectKitProvider>{children}</ConnectKitProvider> */}
        <RainbowKitProvider>{children}</RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </WagmiProvider>
  );
};