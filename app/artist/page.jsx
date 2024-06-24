"use client"
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import ConnectSimple from '@/components/ConnectSimple'
import {useAccount} from 'wagmi'
import { isAddress } from 'viem'
import { useQuery,keepPreviousData } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'

function Artist() {
    const router = useRouter()
    const {address} = useAccount()

    const [search, setSearch] = useState("")

    console.log(search)

    // useEffect(()=> {

    //     if(address) {
    //         router.push(`/artist/${address}`)
    //     }

    // },[address])
  return (
    <article>
      <header>
        <h1>Artist</h1>
      </header>
    <p>your #1 place to manage the editions that you&apos;ve created.</p>
    <ConnectSimple label="connect to view your editions">
        <Link href={`./artist/${address}`}>my editions ({address})</Link>
    </ConnectSimple>
    <br/>
    <br/>
    <input onChange={(e)=> {setSearch(e.target.value)}} placeholder="artist address"></input>
    &nbsp;
    &nbsp;

    <Link href={`./artist/${search}`} style={{pointerEvents: isAddress(search) ? "auto" : "none"}}>search</Link>

    {/* <Link href={`./artist/${address}`}>my editions</Link> */}



    


      </article>
  )
}

export default Artist


 const button = {
  background: "inherit",
  border: "none",
  
 } 