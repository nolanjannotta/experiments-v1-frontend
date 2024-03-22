"use client"

import React from 'react'
import { useWriteContract, useConfig} from 'wagmi'
import {useAccount} from 'wagmi'
import { contractBase } from '../app/contract'

import CustomConnect from './CustomConnect'

import { ConnectKitButton } from "connectkit";






function MintButton({isMinting, editionId}) {



    const account = useAccount();
    // console.log(account)
    const config = useConfig();
    // console.log(config.getClient())
    const {writeContract} = useWriteContract();
    // const data = useWriteContract();


    function mint() {
        writeContract({
            ...contractBase,
            functionName: "mint",
            args: [BigInt(editionId)],
        })
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