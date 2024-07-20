import { getContract, createPublicClient, http,createWalletClient } from "viem";
import { baseSepolia, mainnet, base } from "wagmi/chains";

import abi from "./ART_ABI.json";
import { artAddress,currentChain } from "./constants";
// import { config } from "../components/Web3Provider";

// console.log(process.env.COINBASE_BASE_SEPOLIA_PAYMASTER)

export const publicClient = createPublicClient({ 
    chain: currentChain,
    transport: http(`${process.env.NEXT_PUBLIC_BASE_RPC_URL}`)
  })

   
export const contractBase = {
    address: artAddress,
    abi: abi,
  };
  
  
export const contract = getContract({
    ...contractBase,
    client: publicClient,
  });




