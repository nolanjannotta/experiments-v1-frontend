
import { getContract,  http,webSocket,createWalletClient,createPublicClient,getTransactionConfirmations,fromHex, createClient  } from "viem";
import { privateKeyToAccount } from 'viem/accounts'
import abi from "./ART_ABI.json";
import { baseSepolia } from "wagmi/chains";
import {FabricImage} from 'fabric/node'; // v6
import sharp from 'sharp';
import { artAddress } from "./constants";
import { contract } from "./contract_server";
// import { Resvg } from "@resvg/resvg-js";

// export const runtime = "edge"

const walletClient = createWalletClient({
    chain: baseSepolia,
    // transport: http(process.env.COINBASE_BASE_SEPOLIA_PAYMASTER)
    
    transport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL}`)
  })
  
  export const signerContract = getContract({
      address: artAddress,
      abi: abi,
      client: walletClient
  })


  export async function getEdition(editionId) {
    return await signerContract.read.getEdition([editionId])
  } 


  export async function getEditionCounter() {
    const counter = await signerContract.read.EDITION_COUNTER();
    return Number(counter);
  
  }

  export async function getUri(tokenId) {
    // HANDLE NOT EXISTING TOKENS
    const image = await contract.read.getDataUri([tokenId])
    return image
    // const png = await FabricImage.fromURL(image);
    // return png.toDataURL();
  }

  export async function getLastMint(editionId) {
      !editionId && (editionId = await signerContract.read.EDITION_COUNTER())
      // const lastEditionId = await signerContract.read.EDITION_COUNTER();
      const lastEdition = await signerContract.read.getEdition([editionId]);
    //   const lastToken = await signerContract.read.getRawSvg([(lastEditionId * 1000000n) + lastEdition.counter])
    //   const lastUri = await signerContract.read.getDataUri([(lastEditionId * 1000000n) + lastEdition.counter])
      return {editionId: BigInt(editionId), lastEdition}
  }

  export async function checkTxStatus(txHash) {

    try{
       const results = await publicClient.getTransactionReceipt({
        hash: txHash
     }) 


     return {status: results.status, tokenId: fromHex(results.logs[0]?.topics[3], "number")}
    }catch(e) {
      return {states: "failed", tokenId: null}
    }   
    
    
  }


  export async function mint(editionId, addressTo) {

    const account = privateKeyToAccount(process.env.MINTING_KEY)
    // const edition = await signerContract.read.EDITION_COUNTER();
    const { request } = await walletClient.simulateContract({
        address: artAddress,
        abi: abi,
        account,
        functionName: 'mintTo',
        args: [editionId, addressTo]
      })

    return await  walletClient.writeContract(request)
  }


  export async function getThumbnails(editionIds) {
    let thumbnails = [];
    for(const editionId of editionIds) {
      let edition = await contract.read.getEdition([editionId]);

        const png = await getUri(editionId * 1000000 + 1);
  
        thumbnails.push({image: png, name: edition.name})
  
    }
  
    return thumbnails
  }


