"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useAccount} from "wagmi";


export default function Stats({ data, tokenId, address, connectedAddress }) {
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

  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <header>
        
      </header>
    
      {/* <div style={imageContainer} > */}
      <img src={data?.metadata.image} style={image} alt="loading..."></img>
      {/* </div> */}
      <article style={{width:"100%"}}>
        
        <ul>
          <li>
            <p>name: &quot;{data?.metadata.name}&quot;</p>
          </li>
          <li>
            <p> description: &quot;{data?.metadata.description}&quot;</p>
          </li>
          <li>
            <p>token id: {tokenId}</p>
          </li>

          <li>
            <p>
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
            </p>
          </li>

          <li>
            <p>
              owner:{" "}
              {data?.owner === account.address ? "you :)" : data?.owner}
            </p>
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

          <li>
            <p>
              modify: <Link href={`/modify/${tokenId}`}>&#9874;</Link>
            </p>
          </li>
        </ul>
      </article>
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


// const button = {
//     background: "none",
//     border: "none",
//     fontSize: "1rem",
//     textDecoration: "underline"
//     // padding: "none",
//     // margin: "none"
  
//   }
  
//   const imageContainer = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     // height: "70vh",
//     // backgroundColor: "lightgrey",
//   }

