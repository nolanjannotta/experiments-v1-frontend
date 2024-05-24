"use client"

import React from 'react'
import { useWriteContract, useConfig} from 'wagmi'
import {useAccount} from 'wagmi'
import { contractBase } from '../app/contract'

import CustomConnect from './CustomConnect'







function MintButton({isMinting, editionId, price}) {



    const account = useAccount();
    const write = useWriteContract();
    
    async function mint() {

        const results = write.writeContract({
            ...contractBase,
            functionName: "mint",
            args: [BigInt(editionId)],
            value: price,
            onSuccess: (results) => {console.log(results)},
        })

        console.log(results)
    }



  return (

    <div style={style}>
        <br/>

        <button style={button} disabled={!account?.isConnected && !account.isConnecting || !isMinting} onClick={mint}>&#x2606;&#x1D544;&#x1D55A;&#x1D55F;&#x1D565;&#x2606;</button>
        
    </div>
  )
}

export default MintButton

const style={
    display: "flex", 
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center"
}

const button = {
    background: "none",
    border: "none",
    textDecoration: "underline",
    fontSize: "30px"
    
  }