"use server"

import { getFrameMetadata } from '@coinbase/onchainkit';
import { contract } from "../../../contract_server";
import Stats from "./Stats"
import sharp from "sharp";
import {FRAME_URL} from "@/app/constants.js";
import { artAddress } from '@/app/constants.js';

const URL = "http://localhost:3000"

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





export async function generateMetadata({ params }) {
  const svg = await contract.read.getRawSvg([params.tokenId]);
  const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

  const base64Img = `data:image/png;base64,${img.toString('base64')}`;
  const buttons = [{label: 'website', action: 'link', target: `${FRAME_URL}/browse/token/${params.tokenId}`},
                  {label: 'open sea', action: 'link', target: `https://testnets.opensea.io/assets/base-sepolia/${artAddress}/${params.tokenId}`}]

  const frameMetadata = getFrameMetadata({
    buttons: buttons,
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





async function Token({ params }) {

  const data = await tokenData(params.tokenId);
  return (
    <Stats data={data} tokenId={params.tokenId} address={contract.address}/>
  );
}

export default Token;


