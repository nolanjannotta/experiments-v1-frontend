
import { getContract,  http,webSocket,createWalletClient,createPublicClient,getTransactionConfirmations,fromHex  } from "viem";
import { privateKeyToAccount } from 'viem/accounts'
import abi from "./ART_ABI.json";
import { baseSepolia } from "wagmi/chains";
import {FabricImage} from 'fabric/node'; // v6

import { artAddress } from "./constants";
import { contractBase } from "./contract";



const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: webSocket(`wss://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}`)
    // transport: http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}`)
  })

  const publicClient = createPublicClient({ 
    chain: baseSepolia,
    transport: http()
  })
  
//   console.log(walletClient)
  
  export const signerContract = getContract({
      address: artAddress,
      abi: abi,
      client: walletClient
  })


  export async function getEdition(editionId) {
    return await signerContract.read.getEdition([editionId])
  } 

  export async function getSvg(tokenId) {
    try {
        return await signerContract.read.getDataUri([tokenId])

    }
    catch(e) {
        return ""
    }   
  }

  export async function getEditionCounter() {
    const counter = await signerContract.read.EDITION_COUNTER();
    return Number(counter);
  
  }

  export async function getUri(tokenId) {
    const image = await signerContract.read.getDataUri([tokenId])

    const png = await FabricImage.fromURL(image);
    return png.toDataURL();
  
  }
//   
  export async function getLastMint() {
      const lastEditionId = await signerContract.read.EDITION_COUNTER();
      const lastEdition = await signerContract.read.getEdition([lastEditionId]);
    //   const lastToken = await signerContract.read.getRawSvg([(lastEditionId * 1000000n) + lastEdition.counter])
    //   const lastUri = await signerContract.read.getDataUri([(lastEditionId * 1000000n) + lastEdition.counter])
      return {lastEditionId, lastEdition}
  }

  export async function checkTxStatus(txHash) {

    try{
       const results = await publicClient.getTransactionReceipt({
        hash: txHash
     }) 

    //  console.log(fromHex(results.logs[0]?.topics[3], "number"))

     return {status: results.status, tokenId: fromHex(results.logs[0]?.topics[3], "number")}
    }catch(e) {
      console.log(e)
      return false
    }   
    
    
  }


  export async function mint(addressTo) {

    const account = privateKeyToAccount(process.env.MINTING_KEY)
    const edition = await signerContract.read.EDITION_COUNTER();
    // console.log("hello")
    const { request } = await publicClient.simulateContract({
        address: artAddress,
        abi: abi,
        account,
        functionName: 'mintTo',
        args: [edition, addressTo]
      })

    //   console.log("request", request)

    return await  walletClient.writeContract(request)
  }

  export async function getThumbnails(lastEditionId) {
    // const lastEditionId = await signerContract.read.EDITION_COUNTER();
    // const thumbnails = [];
    // for(let i=lastEditionId < 4 ? 1 : lastEditionId-3; i <= lastEditionId; i++) {
      let edition = await signerContract.read.getEdition([lastEditionId]);
      let image = await signerContract.read.getDataUri([BigInt(lastEditionId * 1000000) + edition.counter]);
      console.log(image)
      // converts SVG to PNG!!!!!!!!!!!!!!!!
      let img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();
      let base64Img = `data:image/png;base64,${img.toString('base64')}`;

      // const png = await FabricImage.fromURL(image);
      // const pngURL = png.toDataURL();


      // thumbnails.push({image: pngURL, name: edition.name});
    // }
    return {image: base64Img, name: edition.name};
  }
  