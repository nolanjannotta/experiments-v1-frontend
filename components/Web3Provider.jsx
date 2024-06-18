"use client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WagmiProvider, createConfig, http } from 'wagmi';
import {base,baseSepolia} from 'wagmi/chains';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { coinbaseWallet, injected, walletConnect, metaMask } from 'wagmi/connectors';


export const config = createConfig({
  appName: 'Experiments V1',
  ssr: true,
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL}`)
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