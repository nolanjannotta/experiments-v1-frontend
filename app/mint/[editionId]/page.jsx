"use client"

import React from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {contract } from '../../contract'
import MintComponent from '../../../components/MintComponent';
import PaymasterMintComponent from '../../../components/PaymasterMintComponent';

import {editionType} from '../../types'
import { formatEther } from 'viem'
import CustomConnect from '../../../components/CustomConnect'
// import {paymasterClient} from "../../api/paymasterClient"


async function mintPageData(editionId) {
  
  editionId = BigInt(editionId);


  // const currentEditionId = await contract.read.EDITION_COUNTER();
  const edition = await contract.read.getEdition([editionId]);
  // const lastImage = await contract.read.getDataUri([editionId* 1000000n + edition.counter]);
  const lastToken = await contract.read.tokenURI([editionId* 1000000n + edition.counter]);
  

  const mostRecentOwner = await contract.read.ownerOf([editionId* 1000000n + edition.counter]);


  let bufferObj = Buffer.from(lastToken.split("data:application/json;base64,")[1], "base64");
  let metadata = JSON.parse(bufferObj.toString("utf-8"));
  
  return {edition, metadata, mostRecentOwner, editionId};

}



function Mint({params}) {

  // console.log(paymasterClient)

  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ["mintPageData"],
    queryFn: () => {return mintPageData(params.editionId)},
    initialData: {edition: editionType, metadata: {}, mostRecentOwner: "", editionId: 0,  currentEditionId: 0}
  
  })


  const {data:lastEdition} = useQuery({
    queryKey: ["lastEdition"],
    queryFn: async() => {
        const lastEdition = await contract.read.EDITION_COUNTER();
        return Number(lastEdition);

    },
    initialData: 0
  
  })

 
  // const isPaused = !data.edition.mintStatus
  const isEnded = data.edition.counter === data.edition.supply

  const minting = data.edition.mintStatus && !isEnded


  return (
    <article>
      <header>
        <h1>mint</h1>
      </header>
      <section>
        <ul style={{listStyleType: "none", padding:"0"}}>
          <li>
          &nbsp;&nbsp;&#11096; name: {isLoading ? "loading..." : <><Link style={{textDecoration:"none"}} href={`/browse/editions/${data?.editionId}`}>{data.edition.name} &#8599;</Link></>}
        
          </li>
          <li>
          &nbsp;&nbsp;&#11096; current supply: {isLoading ? "loading..." : Number(data.edition.counter)}
          </li>
          <li>
          &nbsp;&nbsp;&#11096; max supply: {isLoading ? "loading..." : Number(data.edition.supply)}
          </li>
          <li>
          &nbsp;&nbsp;&#11096; price: {isLoading ? "loading..." : formatEther(data.edition.price)} eth
          </li>
          <li>
          &nbsp;&nbsp;&#11096; mint status: <span style={{color: minting ? "green" : !minting && !isEnded ? "#ffc618" : isEnded ? "red" : "inherit"}}>{isLoading ? "loading..." : data.edition.counter === data.edition.supply ? "ended" : data.edition.mintStatus ? "active" : "paused"}</span>
          </li>
        </ul>
        <CustomConnect />

        {/* <MintComponent isMinting={Number(data?.edition.counter < data.edition.supply) && data.edition.mintStatus} editionId={data.editionId} price={data.edition.price} refetch={refetch}/> */}

        <PaymasterMintComponent isMinting={Number(data?.edition.counter < data.edition.supply) && data.edition.mintStatus} editionId={data.editionId} price={data.edition.price} refetch={refetch}/>

        
        <figure style={galleryFig}>
          
          <img src={data.metadata?.image} alt='image loading...' width="500"></img>
         <figcaption>{isLoading ? "loading" : `"${data.metadata?.name}"`}</figcaption>
        </figure>
        

      </section>

      <div style={navigation}>
        <Link href={`/mint/${(params.editionId > 1) ? Number(params.editionId)-1 : params.editionId}`}>previous</Link>
        <Link href={`/mint/${(params.editionId < lastEdition) ? Number(params.editionId)+1 : params.editionId}`}>next</Link>
       
      </div>

    </article>
  )
}

export default Mint

const button = {
  all: "unset",
  cursor: "pointer",

}

const navigation = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  gap: "1rem"
  // background: "lightgrey",

}


const galleryFig = {
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  alignItems: "center",
  // gap: "1rem"
  }