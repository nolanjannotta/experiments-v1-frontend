"use client"
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useAccount, useWriteContract} from "wagmi";
import {useWriteContracts} from 'wagmi/experimental'
import { contractBase } from "../../contract";
import { isAddress } from "viem";
import ConnectSimple from "../../../components/ConnectSimple";
import useGetCapabilities from "@/hooks/useGetCapabilities";


export default function Stats({ data, tokenId, address }) {
    const [transferData, setTransferData] = useState({ready: false, to: ""})
    const account = useAccount();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const image = {
        width: dimensions.width < dimensions.height ? "100%" : "40%",
        // border: "1px solid black",
        boxShadow: "1px 1px 5px grey",
        
      }

      // const sourceCode = data?.metadata.image.substring(26)
      
      // const html = `
      // <html>
      // <body>
      //   <code>'${atob(sourceCode)}'</code>
      
      // </body>
      
      // </html>
      
      // `
      // console.log("data:text/html;base64," + btoa(html))
      // const url = URL.createObjectURL(new Blob([sourceCode], {type: "text/plain"}))
      // console.log(url)
    
    useEffect(()=>{

        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        

    },[])

    const capabilities = useGetCapabilities(account)


    const write = useWriteContract();

    const writes = useWriteContracts();


    async function sponsorTransfer() {
      writes.writeContracts({
        contracts: [
          {
            ...contractBase,
            functionName: "safeTransferFrom",
            args: [account.address, transferData.to, tokenId],
          },
        ],
        capabilities
      })
    }
    async function transfer() {
      write.writeContract({
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

  async function destroy() {
    let tokenName = `${data?.edition.name} #${tokenId % 1000000}`
    let confirm = prompt(`You are about to permanently destroy ${tokenName}.\nThere is no coming back from this.\n\nType 'destroy' to confirm. (case sensitive)`)
    if(confirm != "destroy") {
      alert("destruction cancelled"); 
      return
    }
    if(confirm === "destroy") {
      write.writeContract({
        ...contractBase,
        functionName: "burn",
        args: [tokenId],
    })

    }
  }


  const sponsorable = account.connector?.name === "Coinbase Wallet" && capabilities?.paymasterService



  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={data?.metadata.image} style={image} alt="loading..."></img>
      <p>
        <span><Link href={`./${Number(tokenId) - 1}`}>&#8592; previous</Link></span> 
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span><Link href={`./${Number(tokenId) + 1}`}>next &#8594;</Link></span>
      </p>
      

      {/* <nav style={{ margin: 0 }}>
        <ul>
          <li>
            <Link href={`./${Number(tokenId) - 1}`}>&#8592; previous</Link>
          </li>
          <li>
            <Link href={`./${Number(tokenId) + 1}`}>next &#8594;</Link>
          </li>
        </ul>
      </nav> */}
      <br />
      <br />
      {!data.error ? (
        <article style={{ width: "100%" }}>
          <ul style={{ listStyleType: "none", padding:"0" }}>
            <li>
                <b>&#11096; name</b>{": "}
                <Link
                  style={{ textDecoration: "none"}}
                  href={`/browse/editions/${Math.floor(tokenId / 1000000)}`}
                >
                  {data?.edition.name}
                </Link>{" "}
                #{tokenId % 1000000}
             
            </li>
            <li>
            <b>&#11096; artist</b>: <Link style={{ textDecoration: "none"}} href={`/artist/${data.edition.artistAddress}`}>{data?.edition.artistName || data?.edition.artistAddress}</Link>
            </li>
            <li>
              <b>&#11096; description</b>: {data?.edition.description}
            </li>
            <li>
              <b>&#11096; token id</b>: {tokenId}
            </li>

            {data?.metadata.attributes.length > 0 && (
              <li>
                <>
                  <b>&#11096; attributes</b>:
                  <ul>
                    {data.metadata.attributes.map((attribute, i) => {
                      return (
                        <li  key={i}>
                          {attribute.trait_type}: {attribute.value}
                        </li>
                      );
                    })}
                  </ul>
                </>
              </li>
            )}

            <li>
                <b>&#11096; owner</b>:{" "}
                <Link href={`/browse/wallet/${data?.owner}`}>
                {data?.owner === account.address ? "you :)" : data?.owner}
              </Link>
            </li>

            <li>
              
                <b>&#11096; opensea</b>:{" "}
                <a
                  target="_blank"
                  href={`https://opensea.io/assets/base/${address}/${tokenId}`}
                >
                  &#8599;
                </a>
            </li>
            <li>
                <b>&#11096; source code</b>:{" "}
                {/* <a target="_blank" href={data?.metadata.image.replace("data:image/svg+xml;base64,", "data:text/plain,")}> */}
                <a target="_blank" origins href={'view-source:' + data?.metadata.image}>
                  &#8599;
                </a>
                {/* <button onClick={window.open(data?.metadata.image.replace("data:image/svg+xml;base64,", "data:text/plain;base64,"), "_blank")}>source code</button> */}
            </li>

            {data?.owner === account.address || !account.isConnected ? (
              <>
                <li>
                    <b>&#11096; transfer</b>:{" "}
                    <ConnectSimple label="connect to transfer" asAnchor={true} >
                      <>
                        <input
                          placeholder="address to"
                          onChange={handleInputChange}
                        ></input>{" "}
                        <button
                          style={button}
                          disabled={!transferData.ready}
                          onClick={sponsorable ? sponsorTransfer : transfer}
                        >
                          &#x2709;
                        </button>
                      </>
                    </ConnectSimple>
                </li>
                <li>
                    <b>&#11096; modify</b>: <Link href={`/modify/${tokenId}`}>&#9874;</Link>
                </li>
                <li>
                  <b>&#11096; destroy</b>:{" "}
                  <button style={button} onClick={destroy}>
                    &#9608;&#9608;
                  </button>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </article>
      ) : (
        <article>
          <h3>uh oh, token id #{tokenId} not found!</h3>
        </article>
      )}


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

