"use client";
import React from "react";
import { useQuery} from "@tanstack/react-query";
import { contract } from "../../../contract";
import {useAccount } from "wagmi";
import Link from "next/link";


async function tokenData(tokenId) {
    const uri = await contract.read.tokenURI([tokenId]);
    const owner = await contract.read.ownerOf([tokenId]);
    let bufferObj = Buffer.from(
      uri.split("data:application/json;base64,")[1],
      "base64"
    );
    let metadata = JSON.parse(bufferObj.toString("utf-8"));
    console.log(metadata)

    return {metadata, owner};

}

function Token({ params }) {
  const account = useAccount();
  
  const { data, error, refetch } = useQuery({
    queryKey: ["token", params.tokenId],
    queryFn: () => tokenData(params.tokenId),
    initialData: {metadata: {name:"", description:"", attributes:[], image:""}, owner: ""}
  });

  console.log(error)

  // console.log(typeof Number(params.tokenId))

  return (
      
      <section style={{display:"flex", flexDirection:"column", alignItems: "center" }}>
      <header>
      
        <nav>
            <ul>
              <li>
              <Link href={`./${Number(params.tokenId) - 1}`}>&#8592; previous</Link>
                </li>
              <li>
                <Link href={`./${Number(params.tokenId) + 1}`}>next &#8594;</Link>
              </li>
            </ul>
            
          </nav>
        </header>

        <img src={data?.metadata.image} alt="loading..." width="35%"></img>
        <nav>
          <ul>
            <li>
              <code>&#x2022; name: "{data?.metadata.name}"</code>
            </li>
            <li>
              <code>&#x2022; description: "{data?.metadata.description}"</code>
            </li>
            <li>
              {data.metadata.attributes?.length > 0 && 
              <code>&#x2022;  attributes: &#91;{data.metadata.attributes.map((attribute) => {return ` ${attribute.trait_type}: "${attribute.value}"`}).toString()}&#93;</code>
                }
            </li>

            <li>
              <code>
              &#x2022; token id: {params.tokenId} 
              </code>
              
              </li>

              <li>
              <code>
              &#x2022; owner: {data?.owner === account.address ? "you :)" : data?.owner}
              </code>
              
              </li>

              <li>
              <code>
              &#x2022; opensea: <a target="_blank" href={`https://testnets.opensea.io/assets/base-sepolia/${contract.address}/${params.tokenId}`}>&#8599;</a>
              </code>
              
              </li>
              <li>
              <code>
              &#x2022; source code: <a target="_blank" href={`${data?.metadata.image}`}>&#8599;</a>
              </code>
              
              </li>
              <li>
              <code>
               
              &#x2022; reload: <button style={button} onClick={refetch}> <a>&#8634;</a></button>
              
              </code>
              
              </li>
              <li>
              <code>
              &#x2022; modify: <Link href={`/modify/${params.tokenId}`} >&#9874;</Link>
              </code>
              
              </li>

          </ul>
        </nav>
      </section>
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
