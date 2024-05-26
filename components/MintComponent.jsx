"use client"

import React, {useEffect, useState} from 'react'
import { useWriteContract, useTransaction,useTransactionReceipt} from 'wagmi'
import {useAccount} from 'wagmi'
import { contractBase } from '../app/contract'
import Link from 'next/link'
import {fromHex} from "viem"
import CustomConnect from './CustomConnect'







function MintComponent({isMinting, editionId, price, refetch}) {


    const [tokenId, setTokenId] = useState(0)
    const account = useAccount();
    const write = useWriteContract();
    
    async function mint() {

        write.writeContract({
            ...contractBase,
            functionName: "mint",
            args: [BigInt(editionId)],
            value: price,
            onSuccess: () => refetch(),
        })

        
    }

    const tx = useTransactionReceipt({hash: write?.data})

    function getMintedId() {
      if(!tx) return""
      try {
        setTokenId(fromHex(tx?.data?.logs[0].topics[3], "number"))
      }
      catch(e) {
        console.log(e)}

    }


    useEffect(()=> {
        if(tx.isSuccess) {
            getMintedId()
            refetch()
        }

    },[tx.isSuccess])

  return (

    <div style={container}>
        <button style={button} disabled={!account?.isConnected && !account.isConnecting || !isMinting} onClick={mint}>&#x2606;&#x1D544;&#x1D55A;&#x1D55F;&#x1D565;&#x2606;</button>
        {write.status == "idle" && <br/>}
        {write.status == "pending" && <p style={{marginTop: "0"}}>waiting for user confirmation</p>}
        {write.status == "error" && <p style={{marginTop: "0"}}>user rejected transaction</p>}

        {tx.isLoading && <p style={{marginTop: "0"}}>transaction submitted!</p>}
        {tx.isSuccess && <p style={{marginTop: "0"}}>
          success! 

          {!!tokenId && <> check it out <Link href={`/token/${tokenId}`}>here</Link> </>}
          
          </p>}

        
        
    </div>
  )
}

export default MintComponent

const container={
    display: "flex", 
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center"
}

const button = {
    background: "none",
    border: "none",
    textDecoration: "underline",
    fontSize: "30px",
    padding: "0"
    
  }