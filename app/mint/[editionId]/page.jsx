"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {contract } from '../../contract'
import PaymasterMintComponent from '../../../components/PaymasterMintComponent';
import {editionType} from '../../types'
import { formatEther } from 'viem'
import { baseSepolia,base } from 'viem/chains'
import CustomConnect from '../../../components/CustomConnect'
import {comingSoon,currentChain} from "@/app/constants"
import { useReadContract } from 'wagmi'
import { contractBase } from '../../contract'





function Mint({params}) {

  const {data:edition, isLoading, isFetching, refetch, error} = useReadContract({
      ...contractBase,
      functionName: "getEdition",
      args: [params.editionId],
      query: {
        placeholderData: editionType
      },
      chainId: currentChain.id
      
  })

  console.log("error", error)

  const {data:lastMintedUri} = useReadContract({
    ...contractBase,
    functionName: "getDataUri",
    args: [Number(params.editionId) * 1000000 + Number(edition?.counter)],
    chainId: currentChain.id


  })

  const {data: lastEdition} = useReadContract({
    ...contractBase,
    functionName: "EDITION_COUNTER",
    chainId: currentChain.id
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
  // const isEnded = edition?.counter === edition?.supply

  // const minting = edition?.mintStatus && !isEnded


  // edition?.mintStatus && !(edition?.counter === edition?.supply)



  return (
    <article>
      <header>
        <h1>mint</h1>
      </header>
      <section>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li>
            &nbsp;&nbsp;&#11096; name: {isFetching ?  <small>loading...</small> : <Link style={{ textDecoration: "none" }} href={`/browse/editions/${params.editionId}`}>{edition?.name} &#8599;</Link>}
          </li>
          <li>&nbsp;&nbsp;&#11096; artist:  {isFetching ? <small>loading...</small>  : edition?.artist}</li>
          <li>
            &nbsp;&nbsp;&#11096; current supply: {isFetching ? <small>loading...</small>  : Number(edition?.counter)}
          </li>
          <li>
            &nbsp;&nbsp;&#11096; max supply: {isFetching ? <small>loading...</small>  : Number(edition?.supply)}
          </li>
          <li>
            &nbsp;&nbsp;&#11096; price: <span ><strike>10 eth</strike></span> &#8594; {isFetching ? <small>loading...</small>  : formatEther(edition.price)} eth <small style={{fontSize: "x-small"}}>100% off!</small>
          </li>
          <li>
            &nbsp;&nbsp;&#11096; mint status:{" "}
            <span
              style={{
                color: edition?.mintStatus && !(edition?.counter === edition?.supply)
                  ? "green"
                  : !( edition?.mintStatus && !(edition?.counter === edition?.supply)) && !(edition?.counter === edition?.supply)
                  ? "#ffc618"
                  : edition?.counter === edition?.supply
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