"use client"
import React,{useEffect} from 'react'
import Link from 'next/link'
import ConnectSimple from '@/components/ConnectSimple'
import {useAccount} from 'wagmi'
import { useQuery,keepPreviousData } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'

function Artist() {
    const router = useRouter()
    const {address} = useAccount()

    useEffect(()=> {

        if(address) {
            router.push(`/artist/${address}`)
        }

    },[address])
  return (
    <article>
      <header>
        <h1>Artist</h1>
      </header>
    <p>your #1 place to manage the editions that you&apos;ve created.</p>
    <ConnectSimple label="connect" />



    


      </article>
  )
}

export default Artist