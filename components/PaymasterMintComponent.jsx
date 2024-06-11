"use client"

import React, {useEffect, useState, useMemo} from 'react'
import {} from 'wagmi'

import { useCapabilities, useWriteContracts, useCallsStatus } from "wagmi/experimental";
import {useAccount,useTransactionReceipt,useWriteContract, useSwitchChain, useChainId  } from 'wagmi'
import { contractBase } from '../app/contract'
import Link from 'next/link'
import {fromHex} from "viem"
import {baseSepolia} from "viem/chains"
import useGetCapabilities from '@/hooks/useGetCapabilities';
import { parseTransaction } from 'viem'
import { ZERO_ADDRESS } from '@/app/constants'




function PaymasterMintComponent({isMinting, editionId, price, refetch}) {

    const [tokenId, setTokenId] = useState(0)
    const account = useAccount();

    const {switchChain} = useSwitchChain()

    const writes = useWriteContracts();
    const write = useWriteContract();

    // to check the non sponsored transaction status
    const tx = useTransactionReceipt({hash: write?.data})

    // to check sponsored transaction status
    const { data: sponsoredStatus } = useCallsStatus({
        id:  writes?.data,
        query: {
          refetchInterval: (data) => {
            return data.state.data?.status === "PENDING" ? 1000 : false}
        },
      });

        console.log("sponsoredStatus", sponsoredStatus)

    useEffect(() => {
        if(sponsoredStatus?.status === "CONFIRMED") {
            refetch()
            setTokenId(fromHex(sponsoredStatus.receipts[0].logs[1].topics[3], "number"))
        }

        if(tx.isSuccess){
            refetch()
            setTokenId(fromHex(tx.data.logs[0].topics[3], "number"))
        }

    },[tx,sponsoredStatus])

      const capabilities = useGetCapabilities(account)
    
    async function sponsorMint() {
        writes.writeContracts({
            capabilities,
            contracts:  [
                {
                    ...contractBase,
                    functionName: "mint",
                    args: [BigInt(editionId)]
                }
            ],
            
        })


        
    }

    async function mint() { 

        write.writeContract({
            ...contractBase,
            functionName: "mint",
            args: [BigInt(editionId)],
            value: price,
        })
    }

    const buttonDisabled  = !account?.isConnected && !account.isConnecting || !isMinting

    console.log(account)

    // const tx = useTransactionReceipt({hash: write?.data})

    if(account.address && account.chainId !== baseSepolia.id && !buttonDisabled){

        return (
            <div style={container}>
                <button style={button} onClick={()=> switchChain({chainId: baseSepolia.id})}><small>switch chains</small></button>
            </div>
        )
    }


  return (

    <div style={container}>
        <button style={button} disabled={buttonDisabled} onClick={capabilities?.paymasterService && account.connector.name === "Coinbase Wallet" ? sponsorMint : mint}>&#x2606;&#x1D544;&#x1D55A;&#x1D55F;&#x1D565;&#x2606;</button>
        {/* {(write.status == "idle" || writes.status == "idle") && <br/>} */}
        {(write.status == "pending" || writes.status == "pending") && <p style={{marginTop: "0"}}>waiting for user confirmation</p>}
        {(write.status === "error" || writes.status === "error") && <p style={{marginTop: "0"}}>user rejected transaction</p>}

        {(tx.isLoading || sponsoredStatus?.status === "PENDING") && <p style={{marginTop: "0"}}>transaction submitted!</p>}

        {(tx.isSuccess || sponsoredStatus?.status === "CONFIRMED") && !(write.status == "pending" || writes.status == "pending") && <p style={{marginTop: "0"}}>success! {!!tokenId && <> check it out <Link href={`/token/${tokenId}`}>here</Link> </>}</p>}

                  {/* {!!tokenId && <> check it out <Link href={`/token/${tokenId}`}>here</Link> </>} */}

        
    </div>
  )
}

export default PaymasterMintComponent

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