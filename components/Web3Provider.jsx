"use client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WagmiProvider, createConfig, http } from 'wagmi';
import {base} from 'wagmi/chains';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { coinbaseWallet, walletConnect, metaMask } from 'wagmi/connectors';
import { currentChain } from '@/app/constants';

export const config = createConfig({
  appName: 'Experiments V1',
  ssr: true,
  chains: [currentChain],
  transports: {
    [currentChain.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL)
  },
  
  connectors: [
    coinbaseWallet({
      appName: 'Experiments V1',
      // connectionPreference: 'embedded',
      preference: 'smartWalletOnly'
    }),
    metaMask({
      dappMetadata: {name: 'Experiments V1', url: 'https://experimentsv1.vercel.app/'},

      extensionOnly: true
    
    }),
    // injected(),

    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
    }),
  ],
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {

  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </WagmiProvider>
  );
};