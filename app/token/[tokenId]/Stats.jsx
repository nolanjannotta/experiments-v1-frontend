"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useAccount, useWriteContract} from "wagmi";
import { contractBase } from "../../contract";
import { isAddress } from "viem";
import ConnectSimple from "../../../components/ConnectSimple";


export default function Stats({ data, tokenId, address, connectedAddress }) {
    const [transferData, setTransferData] = useState({ready: false, to: ""})
    // console.log(data);
    const account = useAccount();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const image = {
        width: dimensions.width < dimensions.height ? "100%" : "40%",
        
      }

    
    useEffect(()=>{
        console.log("height", window.innerHeight);
        console.log("width", window.innerWidth);
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        

    },[])

    const {writeContract} = useWriteContract();

    async function transfer() {
      writeContract({
          ...contractBase,
          functionName: "safeTransferFrom",
          args: [account.address, transferData.to, tokenId],
      })
      
  }

  function handleInputChange(e) {
    const state = {
      to: e.target.value,
      ready: isAddress(e.target.value),

    }
    setTransferData(state)
  }


  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={data?.metadata.image} style={image} alt="loading..."></img>
      <br/>
      <br/>
      {!data.error ? 
      <article style={{width:"100%"}}>
        
        <ul>
          <li>
            <p>name: &quot; <Link style={{textDecoration:"none", color: "inherit"}}href={`/browse/editions/${Math.floor(tokenId / 1000000)}`}>{data?.editionName}</Link> #{tokenId % 1000000}&quot;</p>
          </li>
          <li>
            <p> description: &quot;{data?.metadata.description}&quot;</p>
          </li>
          <li>
            <p>token id: {tokenId}</p>
          </li>

          {data.metadata.attributes.length > 0  &&
          <li>
            <>
              attributes:
              <ul>
                {data.metadata.attributes.map((attribute, i) => {
                  return (
                    <li key={i}>
                      {attribute.trait_type}: &quot;{attribute.value}&quot;
                    </li>
                  );
                })}
              </ul>
            </>
          </li>
          }   

          <li>
            <>
              owner:{" "}
              {data?.owner === account.address ? "you :)" : data?.owner}
            </>
          </li>

          <li>
            <p>
              opensea:{" "}
              <a
                target="_blank"
                href={`https://testnets.opensea.io/assets/base-sepolia/${address}/${tokenId}`}
              >
                &#8599;
              </a>
            </p>
          </li>
          <li>
            <p>
              source code:{" "}
              <a target="_blank" href={`${data?.metadata.image}`}>
                &#8599;
              </a>
            </p>
          </li>

          
          
          {data?.owner === account.address || !account.isConnected ? 
          <>
          <li>
            <p>
              
              transfer: <ConnectSimple>
                      
                       <><input placeholder="address to" onChange={handleInputChange}></input> <button style={button} disabled={!transferData.ready} onClick={() => transfer()}>&#x2709;</button></>
                       
                      </ConnectSimple>
            </p>
          </li>
          <li>
          <p>
            modify: <Link href={`/modify/${tokenId}`}>&#9874;</Link>
          </p>
        </li>
        </>
          :
          <></>
        } 
        </ul>
      </article> : <article>
        <h3>uh oh, token id #{tokenId} not found!</h3>
      </article> }

      <nav style={{margin:0}}>
          <ul>
            <li>
              <Link href={`./${Number(tokenId) - 1}`}>
                &#8592; previous
              </Link>
            </li>
            <li>
              <Link href={`./${Number(tokenId) + 1}`}>next &#8594;</Link>
            </li>
          </ul>
        </nav>
    </section>
  );
}


const button = {
    background: "none",
    border: "none",
    fontSize: "1rem",
    // textDecoration: "underline"
    // padding: "none",
    // margin: "none"
  
  }
  
//   const imageContainer = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     // height: "70vh",
//     // backgroundColor: "lightgrey",
//   }

