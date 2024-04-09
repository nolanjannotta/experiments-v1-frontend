"use client"
import React from "react";
import Link from "next/link";
import {useAccount} from "wagmi";


export default function Stats({ data, tokenId, address }) {
    const account = useAccount();


  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <header>
        <nav>
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
      </header>

      {/* <div style={imageContainer} > */}
      <img src={data?.metadata.image} style={image} alt="loading..."></img>
      {/* </div> */}
      <article>
        <ul>
          <li>
            <code>name: &quot;{data?.metadata.name}&quot;</code>
          </li>
          <li>
            <code> description: &quot;{data?.metadata.description}&quot;</code>
          </li>
          <li>
            <code>token id: {tokenId}</code>
          </li>

          {/* <li>
              {data.metadata.attributes?.length > 0 && 
              <code>attributes: &#91;{data.metadata.attributes.map((attribute) => {return ` ${attribute.trait_type}: "${attribute.value}"`}).toString()}&#93;</code>
                }
            </li> */}

          <li>
            <code>
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
            </code>
          </li>

          <li>
            <code>
              owner:{" "}
              {data?.owner === account.address ? "you :)" : data?.owner}
            </code>
          </li>

          <li>
            <code>
              opensea:{" "}
              <a
                target="_blank"
                href={`https://testnets.opensea.io/assets/base-sepolia/${address}/${tokenId}`}
              >
                &#8599;
              </a>
            </code>
          </li>
          <li>
            <code>
              source code:{" "}
              <a target="_blank" href={`${data?.metadata.image}`}>
                &#8599;
              </a>
            </code>
          </li>
          {/* <li>
            <code>
              reload:{" "}
              <button style={button} action={()=> reload(tokenId)}>
                {" "}
                <a>&#8634;</a>
              </button>
            </code>
          </li> */}
          <li>
            <code>
              modify: <Link href={`/modify/${tokenId}`}>&#9874;</Link>
            </code>
          </li>
        </ul>
      </article>
    </section>
  );
}


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

  const image = {
    width: "40%"
    
  }