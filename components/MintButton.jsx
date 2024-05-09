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
        <CustomConnect/>
        <button disabled={!account?.isConnected && !account.isConnecting || !isMinting} onClick={mint}>Mint</button>
        {/* {account.isConnected && <button onClick={mint}>Mint</button>} */}
        
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