
import { getContract, http,webSocket,createWalletClient } from "viem";
import abi from "./ART_ABI.json";
import { baseSepolia } from "wagmi/chains";

import { artAddress } from "./constants";


const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: webSocket(`wss://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}`)
  })
  
  
  
  export const signerContract = getContract({
      address: artAddress,
      abi: abi,
      client: walletClient
  })


  export async function getEdition(editionId) {
    return await signerContract.read.getEdition([editionId])
  } 
  
  export async function getLastMint() {
      const lastEditionId = await signerContract.read.editionCounter();
      const lastEdition = await signerContract.read.getEdition([lastEditionId]);
      const lastToken = await signerContract.read.getRawSvg([4000002])
      return {lastEdition, lastToken}
  }

  export async function getThumbnails() {
    const lastEditionId = await signerContract.read.editionCounter();
    const thumbnails = [];
    for(let i=lastEditionId < 4n ? 1n : lastEditionId-3n; i <= lastEditionId; i++) {
      let edition = await signerContract.read.getEdition([i]);
      console.log(edition.name);
      let image = await signerContract.read.getDataUri([(i* 1000000n) + 1n]);
      thumbnails.push({image, name: edition.name});
    }
    return thumbnails;
  }
  