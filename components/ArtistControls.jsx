"use client"

import React,{useState} from 'react'
import {formatEther, parseEther, isAddressEqual } from "viem";
import {useAccount, useWriteContract} from "wagmi"
import { contractBase } from "@/app/contract";
import SplitterABI from "@/app/PaymentSplitter.json";
import Link from 'next/link';

function ArtistControls({edition, index, editionId}) {
    const {address} = useAccount()


    const disabled = !address || !edition.edition.artistAddress || !isAddressEqual(address, edition.edition.artistAddress)

    console.log(edition)
    const {writeContract} = useWriteContract();

    const [input, setInput] = useState({
        signatureId:0,
        price:0,
        royalty: 0
    })


    return (
      <section style={section}>
        <ul style={{ listStyle: "none" }}>
          <li>
            name: <Link
                  style={{ textDecoration: "none" }}
                  href={`/browse/editions/${editionId}`}
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
                    args: [editionId],
                })
            } disabled={disabled || Number(edition.edition.counter) > 0}>
                  delete
                </button>
              </small>
            </span>
          </li>
          <li>
            artist name: {edition.edition. artistName}
          </li>
          <li>
            edition id: #{editionId}
          </li>
          <li>supply: {Number(edition.edition.counter)}/{Number(edition.edition.supply)}</li>
          <li>royalty percentage: {Number(edition.edition.royalty) / 100}% {" "}

          <span>
          <input onChange={(e) => {
                    setInput({
                        ...input,
                        royalty: e.target.value
                    })
              }}>

              </input>
          </span> 
          <small>
                <button onClick={() =>  writeContract({ 
                    ...contractBase,
                    functionName: 'setRoyaltyInfo',
                    args: [editionId, input.royalty],
                })
                }> set</button>
          </small>
          {" "}<span style={{fontSize: "x-small"}}>(artist split: {Number(edition.artistSplit)} || platform split: {Number(edition.platformSplit)})</span>
          
          
          </li>
          <li>
            mint status: {edition.edition.mintStatus ? "active" : "inactive"}{" "}
            <span>
              <small>
                <button onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setMintStatus',
                    args: [editionId, true],
                })

                } disabled={disabled}>active</button>/
                <button onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setMintStatus',
                    args: [editionId, false],
                })

                } disabled={disabled}>inactive</button>
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
                    
                } disabled={disabled}>withdraw</button>
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
                <button disabled={disabled} onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setPrice',
                    args: [editionId, input.signatureId],
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
                <button disabled={disabled} onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'setSignatureId',
                    args: [editionId, input.signatureId],
                })
            }>set</button>
              </small>
            </span>
          </li>
          <li>
            <button disabled={disabled} onClick={() => 
                    writeContract({ 
                    ...contractBase,
                    functionName: 'artistMint',
                    args: [editionId],
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