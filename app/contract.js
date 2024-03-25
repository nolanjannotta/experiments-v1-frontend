"use client"
import { getContract, createPublicClient, http, } from "viem";
import { baseSepolia, mainnet } from "wagmi/chains";

import abi from "./ART_ABI.json";
import { artAddress } from "./constants";
import { config } from "./components/Web3Provider";



export const publicClient = createPublicClient({ 
    chain: baseSepolia,
    transport: http()
  })

   
export const contractBase = {
    address: artAddress,
    abi: abi,
  };
  
export const contract = getContract({
    ...contractBase,
    client: config.getClient(),
  });

