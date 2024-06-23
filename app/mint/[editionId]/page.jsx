"use client"
import React from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {contract } from '../../contract'
import PaymasterMintComponent from '../../../components/PaymasterMintComponent';
import {editionType} from '../../types'
import { formatEther } from 'viem'
import { baseSepolia } from 'viem/chains'
import CustomConnect from '../../../components/CustomConnect'
import {comingSoon} from "@/app/constants"
import { useReadContract } from 'wagmi'
import { contractBase } from '../../contract'


async function mintPageData(editionId) {
  
  editionId = BigInt(editionId);


  // const currentEditionId = await contract.read.EDITION_COUNTER();
  const edition = await contract.read.getEdition([editionId]);
  if(edition.counter === 0n) {
    return{
      image: comingSoon,
      edition,
    }
  }

  else {
    const image = await contract.read.getDataUri([editionId* 1000000n + edition.counter]);
    return {image, edition};
  }

  // // const lastImage = await contract.read.getDataUri([editionId* 1000000n + edition.counter]);
  // const lastToken = await contract.read.tokenURI([editionId* 1000000n + edition.counter]);


  // const mostRecentOwner = await contract.read.ownerOf([editionId* 1000000n + edition.counter]);


  // let bufferObj = Buffer.from(lastToken.split("data:application/json;base64,")[1], "base64");
  // let metadata = JSON.parse(bufferObj.toString("utf-8"));
  // console.log("metadata", metadata)

  // return {edition, metadata, mostRecentOwner, editionId};

}






function Mint({params}) {

  const {data:edition, isLoading, isFetching, refetch} = useReadContract({
      ...contractBase,
      functionName: "getEdition",
      args: [params.editionId],
      query: {
        placeholderData: editionType
      }
      
  })

  const {data:lastMintedUri} = useReadContract({
    ...contractBase,
    functionName: "getDataUri",
    args: [Number(params.editionId) * 1000000 + Number(edition?.counter)]

  })

  const {data: lastEdition} = useReadContract({
    ...contractBase,
    functionName: "EDITION_COUNTER",
  })





  // const {data, error, isLoading, refetch} = useQuery({
  //   queryKey: ["mintPageData"],
  //   queryFn: () => {return mintPageData(params.editionId)},
  //   initialData: {edition: editionType, image: ''}
  
  // })



  // const {data:lastEdition} = useQuery({
  //   queryKey: ["lastEdition"],
  //   queryFn: async() => {
  //       const lastEdition = await contract.read.EDITION_COUNTER();
  //       return Number(lastEdition);

  //   },
  //   initialData: 0
  
  // })

 
  // const isPaused = !data.edition.mintStatus
  const isEnded = edition.counter === edition.supply

  const minting = edition.mintStatus && !isEnded



  return (
    <article>
      <header>
        <h1>mint</h1>
      </header>
      <section>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li>
            &nbsp;&nbsp;&#11096; name: {isLoading ?  <small>loading...</small> : <Link style={{ textDecoration: "none" }} href={`/browse/editions/${params.editionId}`}>{edition.name} &#8599;</Link>}
          </li>
          <li>&nbsp;&nbsp;&#11096; artist:  {isLoading ? <small>loading...</small>  : edition.artist}</li>
          <li>
            &nbsp;&nbsp;&#11096; current supply: {isLoading ? <small>loading...</small>  : Number(edition.counter)}
          </li>
          <li>
            &nbsp;&nbsp;&#11096; max supply: {isLoading ? <small>loading...</small>  : Number(edition.supply)}
          </li>
          <li>
            &nbsp;&nbsp;&#11096; price: <span ><strike>10 eth</strike></span> &#8594; {isLoading ? <small>loading...</small>  : formatEther(edition.price)} eth
          </li>
          <li>
            &nbsp;&nbsp;&#11096; mint status:{" "}
            <span
              style={{
                color: minting
                  ? "green"
                  : !minting && !isEnded
                  ? "#ffc618"
                  : isEnded
                  ? "red"
                  : "inherit",
              }}
            >
              {isLoading
                ? "loading..."
                : edition.counter === edition.supply
                ? "ended"
                : edition.mintStatus
                ? "active"
                : "paused"}
            </span>
          </li>
        </ul>
        <CustomConnect />


        
        <PaymasterMintComponent
          isMinting={Number(edition.counter < edition.supply) && edition.mintStatus}
          editionId={params.editionId}
          price={edition.price}
          refetch={refetch}
        />

        <figure style={galleryFig}>
          <img
            src={lastMintedUri || comingSoon}
            alt="image loading..."
            width="500"
          ></img>
          <figcaption>
            {isLoading ? "loading" : `${edition?.name}`}
          </figcaption>
        </figure>
      </section>

      <div style={navigation}>

        { params.editionId > 1 && <Link  href={`/mint/${Number(params.editionId) - 1}`}>previous</Link>}

        { params.editionId < lastEdition && <Link href={`/mint/${Number(params.editionId) + 1}`}>next</Link>}
      </div>
    </article>
  );
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