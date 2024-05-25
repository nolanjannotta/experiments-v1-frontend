"use client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import {
  base,
  baseSepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


export const config = getDefaultConfig({
  appName: 'Experiments V1',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains: [baseSepolia], 
  transport: http(process.env.NEXT_COINBASE_BASE_SEPOLIA_NODE),
  ssr: true,
});

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