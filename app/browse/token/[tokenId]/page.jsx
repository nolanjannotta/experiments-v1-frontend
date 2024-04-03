"use server"

// import React from "react";
import { getFrameMetadata } from '@coinbase/onchainkit';

// import { useQuery} from "@tanstack/react-query";
import { contract } from "../../../contract_server";
import Stats from "./Stats"
// import {useAccount } from "wagmi";
import Link from "next/link";
import sharp from "sharp";

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
  // let svg = await contract.read.getDataUri([params.tokenId]);
  // svg = `<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'> 
  // <rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>

  // <image x="200" y="300" width="600" height="600" href="${svg}"> </image>        
  // </svg>
  // `

  
  const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

  const base64Img = `data:image/png;base64,${img.toString('base64')}`;
console.log(svg)

  const frameMetadata = getFrameMetadata({
    image: {
      src: base64Img,
      aspectRatio: "1:1",
    },
    postUrl: `${URL}/frames/mint`,
  });

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
  // const account = useAccount();
  "use server"

  const data = await tokenData(params.tokenId);


  
  // const { data, error, refetch } = useQuery({
  //   queryKey: ["token", params.tokenId],
  //   queryFn: () => tokenData(params.tokenId),
  //   initialData: {metadata: {name:"", description:"", attributes:[], image:""}, owner: ""}
  // });

  // console.log(error)

  // console.log(typeof Number(params.tokenId))

  return (
    <Stats data={data} tokenId={params.tokenId} address={contract.address}/>

      
      // <section style={{display:"flex", flexDirection:"column", alignItems: "center" }}>
      // <header>
      
      //   <nav>
      //       <ul>
      //         <li>
      //         <Link href={`./${Number(params.tokenId) - 1}`}>&#8592; previous</Link>
      //           </li>
      //         <li>
      //           <Link href={`./${Number(params.tokenId) + 1}`}>next &#8594;</Link>
      //         </li>
      //       </ul>
            
      //     </nav>
      //   </header>

      //   {/* <div style={imageContainer} > */}
      //   <img src={data?.metadata.image} alt="loading..."></img>
      //   {/* </div> */}
      //   <article>
      //   {/* <nav> */}
      //     <ul>
      //       <li>
      //         <code>name: &quot;{data?.metadata.name}&quot;</code>
      //       </li>
      //       <li>
      //         <code> description: &quot;{data?.metadata.description}&quot;</code>
      //       </li>
      //       <li>
      //         <code>
      //         token id: {params.tokenId} 
      //         </code>
              
      //         </li>

      //       {/* <li>
      //         {data.metadata.attributes?.length > 0 && 
      //         <code>attributes: &#91;{data.metadata.attributes.map((attribute) => {return ` ${attribute.trait_type}: "${attribute.value}"`}).toString()}&#93;</code>
      //           }
      //       </li> */}

      //       <li>
      //       <code>attributes:
      //         <ul>
      //         {data.metadata.attributes.map((attribute, i) => {
      //             return (<li key={i}>{attribute.trait_type}: &quot;{attribute.value}&quot;</li>)
                
      //           })}
      //           </ul>
      //           </code>
      //       </li>

            



      //         <li>
      //         <code>
      //          owner: {/*{data?.owner === account.address ? "you :)" : data?.owner} */}
      //         </code>
              
      //         </li>

      //         <li>
      //         <code>
      //         opensea: <a target="_blank" href={`https://testnets.opensea.io/assets/base-sepolia/${contract.address}/${params.tokenId}`}>&#8599;</a>
      //         </code>
              
      //         </li>
      //         <li>
      //         <code>
      //         source code: <a target="_blank" href={`${data?.metadata.image}`}>&#8599;</a>
      //         </code>
              
      //         </li>
      //         <li>
      //         <code>
               
      //         reload: <button style={button} action={tokenData(params.tokenId)}> <a>&#8634;</a></button>
              
      //         </code>
              
      //         </li>
      //         <li>
      //         <code>
      //         modify: <Link href={`/modify/${params.tokenId}`} >&#9874;</Link>
      //         </code>
              
      //         </li>

      //     </ul>
      //   {/* </nav> */}
      //   </article>
      // </section>
  );
}

export default Token;

const button = {
  background: "none",
  border: "none",
  fontSize: "1rem",
  textDecoration: "underline"
  // padding: "none",
  // margin: "none"

}

const imageContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  // height: "70vh",
  // backgroundColor: "lightgrey",
}
