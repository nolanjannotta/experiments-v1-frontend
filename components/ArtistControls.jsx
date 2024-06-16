"use client"

import React,{useState} from 'react'
import {formatEther, parseEther} from "viem";
import {useAccount, useWriteContract} from "wagmi"
import { contractBase } from "@/app/contract";
import SplitterABI from "@/app/PaymentSplitter.json";
import Link from 'next/link';

function ArtistControls({edition, index, editionId}) {
    const {address} = useAccount()

    const disabled = address !== edition.artist
    const {writeContract} = useWriteContract();

    const [input, setInput] = useState({
        signatureId:0,
        price:0
    })

    console.log(index)
    return (
      <section style={section}>
        <ul style={{ listStyle: "none" }}>
          <li>
            name: <Link
                  style={{ textDecoration: "none" }}
                  href={`/browse/editions/${index+1}`}
                >
                  {edition.edition.name} &#8599;
                </Link>
                &nbsp;
            <span>
              <small>
                <button onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'deleteEdition',
                    args: [index+1],
                })
            } disabled={!disabled || Number(edition.edition.counter) > 0}>
                  delete
                </button>
              </small>
            </span>
          </li>
          <li>supply: {Number(edition.edition.counter)}/{Number(edition.edition.supply)}</li>
          <li>royalty percentage: {Number(edition.edition.royalty) / 100}%</li>
          <li>
            mint status: {edition.edition.mintStatus ? "active" : "inactive"}{" "}
            <span>
              <small>
                <button onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setMintStatus',
                    args: [index+1, true],
                })

                } disabled={!disabled}>active</button>/
                <button onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setMintStatus',
                    args: [index+1, false],
                })

                } disabled={!disabled}>inactive</button>
              </small>
            </span>
          </li>
          <li>
            royalties: {formatEther(edition.releasable)} eth{" "}
            <span>
              <small>
                <button onClick={() => 
                    writeContract({ 
                    abi:SplitterABI,
                    address: edition.edition.royaltyReceiver,
                    functionName: 'release',
                    args: [address],
                })
                    
                } disabled={!disabled}>withdraw</button>
              </small>
            </span>
          </li>
          <li>
            price: {formatEther(edition.edition.price)} eth{" "}
            <span>
              <input onChange={(e) => {
                    setInput({
                        ...input,
                        price: parseEther(e.target.value)
                    })
              }}>

              </input>
              <small>
                <button disabled={!disabled} onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setPrice',
                    args: [index+1, input.signatureId],
                })}>
                set
                </button>


              </small>
            </span>
          </li>
          <li>
            signature id: {Number(edition.edition.signatureId)}{" "}
            <span>
              <input onChange={(e) => {
                    setInput({
                        ...input,
                        signatureId: e.target.value
                    })
              }}></input>
              <small>
                <button disabled={!disabled} onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setSignatureId',
                    args: [index+1, input.signatureId],
                })
            }>set</button>
              </small>
            </span>
          </li>
          <li>
            <button onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'artistMint',
                    args: [index+1],
                })
            }>mint</button>
          </li>
        </ul>
      </section>
    );
}

export default ArtistControls

const section = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    margin: "1rem"
  }