"use client"

import React from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {contract } from '../../contract'
import MintButton from '../../../components/MintButton';
import {editionType} from '../../types'
import { formatEther } from 'viem'

async function mintPageData(editionId) {
  
  editionId = BigInt(editionId);

  const currentEditionId = await contract.read.editionCounter();
  const edition = await contract.read.getEdition([editionId]);
  // const lastImage = await contract.read.getDataUri([editionId* 1000000n + edition.counter]);
  const lastToken = await contract.read.tokenURI([editionId* 1000000n + edition.counter]);
  

  const mostRecentOwner = await contract.read.ownerOf([editionId* 1000000n + edition.counter]);


  let bufferObj = Buffer.from(lastToken.split("data:application/json;base64,")[1], "base64");
  let metadata = JSON.parse(bufferObj.toString("utf-8"));
  
  return {edition, metadata, mostRecentOwner, editionId, currentEditionId};

}



function Mint({params}) {


  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ["mintPageData"],
    queryFn: () => {return mintPageData(params.editionId)},
    initialData: {edition: editionType, metadata: {}, mostRecentOwner: "", editionId: 0,  currentEditionId: 0}
  
  })
  // console.log(data)

  return (
    <article>
      <header>
        <h1>mint</h1>
      </header>
      <section>
        <ul>
          <li>
            name: {isLoading ? "loading..." : <><Link style={{textDecoration:"none"}} href={`/browse/editions/${data?.editionId}`}>{data.edition.name} &#8599;</Link></>}
        
          </li>
          <li>
            current supply: {isLoading ? "loading..." : Number(data.edition.counter)}
          </li>
          <li>
            max supply: {isLoading ? "loading..." : Number(data.edition.supply)}
          </li>
          <li>
            price: {isLoading ? "loading..." : formatEther(data.edition.price)} eth
          </li>
          <li>
            mint status: {isLoading ? "loading..." : data.edition.counter === data.edition.supply ? "ended" : data.edition.mintStatus ? "active" : "paused"}
          </li>
        </ul>

        <MintButton isMinting={Number(data?.edition.supply - data?.edition.counter) > 0} editionId={data.editionId} callback={()=> console.log("hello")}/>
        <figure style={galleryFig}>
          
          <img src={data.metadata?.image} alt='image loading...' width="500"></img>
         <figcaption>{isLoading ? "loading" : `"${data.metadata?.name}"`}</figcaption>
        </figure>
        

      </section>

      <div style={navigation}>
        <Link href={`/mint/${(params.editionId > 1) ? Number(params.editionId)-1 : params.editionId}`}>previous</Link>
        <Link href={`/mint/${(params.editionId < data.currentEditionId) ? Number(params.editionId)+1 : params.editionId}`}>next</Link>
       
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