"use client"

import React, {useEffect} from 'react'
import { useWriteContract, useTransaction,useTransactionReceipt} from 'wagmi'
import {useAccount} from 'wagmi'
import { contractBase } from '../app/contract'
import Link from 'next/link'
import {fromHex} from "viem"
import CustomConnect from './CustomConnect'







function MintComponent({isMinting, editionId, price, refetch}) {



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
    // console.log(tx && fromHex(tx.data?.logs[0]?.topics[3], "number"))
    console.log(tx)


    useEffect(()=> {
        if(tx.isSuccess) {
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
        {tx.isSuccess && <p style={{marginTop: "0"}}>success! check it out <Link href={`/token/${fromHex(tx.data?.logs[0].topics[3], "number")}`}>here</Link></p>}

        
        
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