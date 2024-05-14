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
  let svg, img, base64Img;
  try{
    // svg = await contract.read.getRawSvg([params.tokenId]);
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" height="1000" width="1000"> <rect width="1000" height="1000" fill="#ffffff" /> <g transform="translate(0 -50)"> <rect x="135.5" y="75" width="729" height="850" fill="white" stroke="black" stroke-width="20" /> <rect x="270" y="215" width="460" height="570" fill="none" stroke="black" /> <g letter-spacing="-2" text-anchor="middle" font-weight="bold"> <text x="210" y="200" font-size="100px" transform="skewX(30)"> XI </text> <text x="500" y="200" font-size="100px"> XII </text> <text x="788" y="200" font-size="100px" transform="skewX(-30)"> &#8544; </text> <text x="210" y="200" font-size="100px" transform="skewX(-30) rotate(180 500 500)"> VII </text> <text x="500" y="200" font-size="100px" transform="rotate(180 500 500)"> VI </text> <text x="788" y="200" font-size="100px" transform="skewX(30) rotate(180 500 500)"> V </text> <text x="785" y="255" font-size="100px" transform="skewY(-30) rotate(90 500 500) "> II </text> <text x="500" y="255" font-size="100px" transform="rotate(90 500 500)"> III </text> <text x="210" y="255" font-size="100px" transform=" skewY(30) rotate(90 500 500) "> IIII </text> <text x="790" y="255" font-size="100px" transform="skewY(30) rotate(-90 500 500)"> X </text> <text x="500" y="255" font-size="100px" transform="rotate(-90 500 500)"> IX </text> <text x="195" y="255" font-size="100px" transform="skewY(-30) rotate(-90 500 500)"> VIII </text> </g> <g transform="translate(275,275) scale(.45)"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" height="1000" width="1000"><rect width="1000" height="1000" fill="#ffffff"/><polygon fill="none" stroke="black" points="35,40 968,39 970,959 41,974 "/><polygon fill="none" stroke="black" points="61,62 152,59 152,873 72,873 "/><polygon fill="none" stroke="black" points="94,98 127,98 124,266 91,269 "/><polygon fill="none" stroke="black" points="102,329 124,325 123,854 96,854 "/><polygon fill="none" stroke="black" points="223,70 929,67 927,882 215,880 "/><polygon fill="none" stroke="black" points="248,101 252,102 264,850 251,852 "/><polygon fill="none" stroke="black" points="323,99 909,102 910,384 314,379 "/><polygon fill="none" stroke="black" points="341,173 871,168 870,348 347,351 "/><polygon fill="none" stroke="black" points="370,192 658,192 659,304 367,299 "/><polygon fill="none" stroke="black" points="403,249 560,248 557,275 394,277 "/><polygon fill="none" stroke="black" points="614,253 638,248 634,282 614,272 "/><polygon fill="none" stroke="black" points="718,195 850,194 853,304 717,295 "/><polygon fill="none" stroke="black" points="743,233 813,236 817,281 733,278 "/><polygon fill="none" stroke="black" points="320,444 907,436 898,850 314,843 "/><polygon fill="none" stroke="black" points="712,464 870,468 874,817 705,813 "/><polygon fill="none" stroke="black" points="728,499 846,490 844,788 727,791 "/><polygon stroke="black" fill="rgba(104, 46, 245, .6)" points="755,523 789,525 795,544 757,548 "/><polygon fill="none" stroke="black" points="754,597 799,596 795,759 750,761 "/><polygon fill="none" stroke="black" points="351,464 656,473 653,624 347,622 "/><polygon fill="none" stroke="black" points="470,498 617,501 629,597 460,602 "/><polygon fill="none" stroke="black" points="492,523 595,524 600,580 493,573 "/><polygon stroke="black" fill="rgba(64, 82, 86, .6)" points="369,521 417,522 415,596 372,597 "/><polygon fill="none" stroke="black" points="345,680 643,681 648,824 350,813 "/><polygon fill="none" stroke="black" points="376,707 628,712 626,767 377,763 "/><path stroke="rgb(30, 30, 30)" fill="none" stroke-width="10" stroke-linecap="round" transform="translate(868 893)scale(.1)" d="M50 444S288 624, 222 487S328 485, 380 420S566 581, 387 400S570 486, 950 524"/></svg> </g> <polygon points="497,500 485,195 500,180 515,195 503,500" fill="black" transform="rotate(323 500 500) "> <animateTransform attributeName="transform" type="rotate" dur="3600s" repeatCount="indefinite" from="323 500 500" to="683 500 500" /> </polygon> <polygon points="496,500 480,295 500,275 520,295 504,500" fill="black" transform="rotate(296 500 500) "> <animateTransform attributeName="transform" type="rotate" dur="43200s" repeatCount="indefinite" from="296 500 500" to="656 500 500" /> </polygon> <circle r="15" fill="black" cx="500" cy="500" /> </g> <text x="500" y="980" text-anchor="middle" font-size="60px" font-weight="bold"> helloooooo frame </text> </svg>`
    img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();
    base64Img = `data:image/png;base64,${img.toString('base64')}`;
  
  } catch(e) {
    base64Img = ""

  }
  
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


