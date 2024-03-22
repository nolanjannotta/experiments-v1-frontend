// "use client"
import { getContract } from "viem";
import abi from "./ART_ABI.json";
import { artAddress } from "./constants";
import { config } from "../components/Web3Provider";

export const contractBase = {
    address: artAddress,
    abi: abi,
  };
  
export const contract = getContract({
    ...contractBase,
    client: config.getClient(),
  });

