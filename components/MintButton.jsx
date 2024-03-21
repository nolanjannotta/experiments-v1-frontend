"use client"

import React from 'react'
import { useWriteContract, useConfig,useSimulateContract  } from 'wagmi'
import {useAccount} from 'wagmi'
import { contractBase } from '../app/constants'

import CustomConnect from './CustomConnect'

import { ConnectKitButton } from "connectkit";






function MintButton({isMinting}) {



    const account = useAccount();
    // console.log(account)
    const config = useConfig();
    // console.log(config.getClient())
    const {writeContract} = useWriteContract();
    // const data = useWriteContract();


    function mint() {
        writeContract({
            ...contractBase,
            functionName: "mint"
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