"use client"

import React from 'react'
import { useWriteContract, useConfig} from 'wagmi'
import {useAccount} from 'wagmi'
import { contractBase } from '../contract'

import CustomConnect from './CustomConnect'

import { ConnectKitButton } from "connectkit";






function MintButton({isMinting, editionId, callback}) {



    const account = useAccount();
    // console.log(account)
    // const config = useConfig();
    // const client = config.getClient();
    // console.log(config.getClient())
    const write = useWriteContract();
    // const data = useWriteContract();
    console.log(write)
    
    async function mint() {

        const results = write.writeContract({
            ...contractBase,
            functionName: "mint",
            args: [BigInt(editionId)],
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