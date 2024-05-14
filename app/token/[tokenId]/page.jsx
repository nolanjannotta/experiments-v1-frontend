"use server"

import { getFrameMetadata } from '@coinbase/onchainkit';
import { contract,publicClient } from "../../contract_server";
import Stats from "./Stats"
import sharp from "sharp";
// import {FRAME_URL} from "@/app/constants.js";
import { artAddress } from '@/app/constants.js';
// import useTruncateAddress from "../../../hooks/useTruncateAddress"
import {baseScanUrl} from "@/app/constants.js"
import Moralis from "moralis";
import { base } from 'viem/chains';
import { FRAME_URL } from '@/app/constants.js';
await Moralis.start({apiKey: process.env.NEXT_PUBLIC_MORALIS_KEY});



async function tokenData(tokenId) {
  try{
    const uri = await contract.read.tokenURI([tokenId]);
  const owner = await contract.read.ownerOf([tokenId]);
  const editionName = await contract.read.getEdition([Math.floor(tokenId/1000000)]);

  let bufferObj = Buffer.from(
    uri.split("data:application/json;base64,")[1],
    "base64"
  );
  let metadata = JSON.parse(bufferObj.toString("utf-8"));
  return {metadata, owner, error: false, editionName: editionName.name};
  }
  catch(e) {
    return {metadata: {}, owner: "", error: true}

  }

  
  // console.log(metadata)

  

}

// console.log(publicClient.chain.id)

async function getTokenTransfers(tokenId) {

  try {

  
    const response = await Moralis.EvmApi.nft.getNFTTransfers({
      "chain": publicClient.chain.id,
      "format": "decimal",
      "order": "DESC",
      "address": artAddress,
      "tokenId": tokenId
    });
    // console.log(response.raw.result)
    return response.raw.result;
  } catch (e) {
    return {}
    // console.error(e);
  }

}





export async function generateMetadata({ params }) {

  const imageUrl = `${FRAME_URL}/frames/images/token?tokenId=${params.tokenId}&date=${Date.now()}`
  
  const frameMetadata = getFrameMetadata({
    buttons: [{label: 'open sea', action: 'link', target: `https://testnets.opensea.io/assets/base-sepolia/${artAddress}/${params.tokenId}`}],
    image: {
      src: imageUrl,
      aspectRatio: "1:1",
    }});

  return {
  title: '',
  description: 'frame for minting on chain art experiments',
  openGraph: {
    title: 'Experiments V1',
    description: 'frame for minting on chain art experiments',
    images: [imageUrl], 
  },
  other: {
    ...frameMetadata,
  },
};


}



function truncateAddress(address) {

  return `${address.slice(0,6)}...${address.slice(-4)}`
}


async function Token({ params }) {

  const transfers = await getTokenTransfers(params?.tokenId)

  const data = await tokenData(params.tokenId);

  // if(data.error) {
  //   return  <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  //     <h3>uh oh, token id #{params.tokenId} not found!</h3>

  //   </section>
  // }
  return (
    <>
    <Stats data={data} tokenId={params.tokenId} address={contract.address}/>

    <article style={{textAlign:"center"}}>
      <hr/>
        <h4>&#x2709; transfers:</h4>
        <br/>
        <ul style={{listStyleType: "none", margin: 0, padding: 0}}>
        {transfers?.map((transfer, i) => {return <li key={i} >&#x7c; &nbsp;&nbsp; &#x2709; #{transfers.length-i} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#128337;  {new Date(transfer.block_timestamp).toLocaleString()} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#91;{truncateAddress(transfer.from_address)}&#93; &#x279F; &#91;{truncateAddress(transfer.to_address)}&#93; &nbsp;&nbsp;&nbsp;&nbsp; <a style={{textDecoration:"none"}} target="_blank" href={`${baseScanUrl}/tx/${transfer.transaction_hash}`} >tx&#8599;</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x7c;</li>})}
        <hr/>
        </ul>
    </article>
    </>
  );
}

export default Token;


