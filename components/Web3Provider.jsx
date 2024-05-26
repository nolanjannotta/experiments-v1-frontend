"use client"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultConfig,RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import {base,baseSepolia} from 'wagmi/chains';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { coinbaseWallet, injected, walletConnect, metaMask } from 'wagmi/connectors';



// export const config = getDefaultConfig({
//   appName: 'Experiments V1',
//   projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
//   chains: [baseSepolia], 
//   transport: http(process.env.NEXT_COINBASE_BASE_SEPOLIA_NODE),
//   ssr: true,
// });
export const config = createConfig({
  appName: 'Experiments V1',
  ssr: true,
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(process.env.NEXT_COINBASE_BASE_SEPOLIA_NODE)
  },
  connectors: [
    coinbaseWallet({
      appName: 'Experiments V1',
      // connectionPreference: 'embedded',
      preference: 'smartWalletOnly'
    }),
    metaMask({name: 'MetaMask'}),

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
        {/* <RainbowKitProvider></RainbowKitProvider> */}
        {children}
        <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </WagmiProvider>
  );
};