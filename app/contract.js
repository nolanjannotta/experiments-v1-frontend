import { getContract, createPublicClient, http,createWalletClient } from "viem";
import { baseSepolia, mainnet } from "wagmi/chains";

import abi from "./ART_ABI.json";
import { artAddress } from "./constants";
// import { config } from "../components/Web3Provider";


// console.log(process.env.COINBASE_BASE_SEPOLIA_PAYMASTER)

export const publicClient = createPublicClient({ 
    chain: baseSepolia,
    transport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL}`)
  })

   
export const contractBase = {
    address: artAddress,
    abi: abi,
  };
  
  
export const contract = getContract({
    ...contractBase,
    client: publicClient,
  });




