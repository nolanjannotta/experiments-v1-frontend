"use client"

import React, {useEffect, useState} from 'react'
import { useWriteContract,useAccount, useTransactionReceipt} from 'wagmi'
import { useCapabilities } from "wagmi/experimental";
import { contractBase } from '../app/contract'
import Link from 'next/link'
import {fromHex} from "viem"
import PaymasterMintComponent from './PaymasterMintComponent'






function MintComponent({isMinting, editionId, price, refetch}) {


    const [tokenId, setTokenId] = useState(0)
    const account = useAccount();
    const write = useWriteContract();

    // const {data:capabilities} = useCapabilities({
    //   account: account.address,
    // });
  
    // const paymasterSupported = capabilities && capabilities[account.chainId].paymasterService.supported


    // if(paymasterSupported) {
    //     return <PaymasterMintComponent isMinting={isMinting} editionId={editionId} price={price} refetch={refetch}/>
    // }
   
    
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
        // if you mint from a contract that emits the tokenId as the first topic
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