"use server"

import { getFrameMetadata } from '@coinbase/onchainkit';
import { contract,publicClient } from "../../contract_server";
import Stats from "./Stats"
import sharp from "sharp";
import {FRAME_URL} from "@/app/constants.js";
import { artAddress } from '@/app/constants.js';

import Moralis from "moralis";

await Moralis.start({apiKey: process.env.NEXT_PUBLIC_MORALIS_KEY});

async function tokenData(tokenId) {
  const uri = await contract.read.tokenURI([tokenId]);
  const owner = await contract.read.ownerOf([tokenId]);
  let bufferObj = Buffer.from(
    uri.split("data:application/json;base64,")[1],
    "base64"
  );
  let metadata = JSON.parse(bufferObj.toString("utf-8"));
  // console.log(metadata)

  return {metadata, owner};

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
  const svg = await contract.read.getRawSvg([params.tokenId]);
  const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

  const base64Img = `data:image/png;base64,${img.toString('base64')}`;

  const frameMetadata = getFrameMetadata({
    buttons: [{label: 'open sea', action: 'link', target: `https://testnets.opensea.io/assets/base-sepolia/${artAddress}/${params.tokenId}`}],
    image: {
      src: base64Img,
      aspectRatio: "1:1",
    }});

  return {
  title: '',
  description: 'frame for minting on chain art experiments',
  openGraph: {
    title: 'Experiments V1',
    description: 'frame for minting on chain art experiments',
    images: [base64Img], 
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
  // console.log(transfers)

  const data = await tokenData(params.tokenId);
  return (
    <>
    <Stats data={data} tokenId={params.tokenId} address={contract.address}/>
    
    <article style={{textAlign:"center"}}>
      <hr/>
        <h4>&#x2709; transfers:</h4>
        <br/>
        <ul style={{listStyleType: "none", margin: 0, padding: 0}}>
        {transfers?.map((transfer, i) => {return <li key={i} >&#x7c;&#9618;&#9618;&#9618; &#x2709; #{transfers.length-i} &#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618; &#128337;  {new Date(transfer.block_timestamp).toLocaleString()} &#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618; &#91;{truncateAddress(transfer.from_address)}&#93; &#x279F; &#91;{truncateAddress(transfer.to_address)}&#93; &#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618; &#x2713;&#9618;&#9618;&#x7c;</li>})}
        <br/>
        <br/>
        </ul>
    </article>
    </>
  );
}

export default Token;


