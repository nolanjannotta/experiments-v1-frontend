import { getContract } from "viem";
import abi from "./ART_ABI.json";
// import { artAddress } from "./address";
import { config } from "../components/Web3Provider";

export const artAddress = "0x0e5Ca08841F7856fb117d54f2BaB1AD0ef139819";

export const contractBase = {
  address: artAddress,
  abi: abi,
};

export const contract = getContract({
  ...contractBase,
  client: config.getClient(),
});

export const ZERO_ADDRESS= "0x0000000000000000000000000000000000000000"

