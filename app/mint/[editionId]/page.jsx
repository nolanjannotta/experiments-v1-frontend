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


async function mintPageData(editionId) {
  
  editionId = BigInt(editionId);


  // const currentEditionId = await contract.read.EDITION_COUNTER();
  const edition = await contract.read.getEdition([editionId]);
  if(edition.counter === 0n) {
    return{
      image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIGhlaWdodD0iMTAwMCIgd2lkdGg9IjEwMDAiPiA8cmVjdCBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI1IiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIj48L3JlY3Q+IDx0ZXh0IHg9IjUwMCIgeT0iNTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjUwIj4gQ09NSU5HIFNPT04uLi4gPC90ZXh0PiA8L3N2Zz4=",
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





  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ["mintPageData"],
    queryFn: () => {return mintPageData(params.editionId)},
    initialData: {edition: editionType, image: ''}
  
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
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li>
            &nbsp;&nbsp;&#11096; name:{" "}
            {isLoading ? (
              "loading..."
            ) : (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/browse/editions/${params.editionId}`}
                >
                  {data.edition.name} &#8599;
                </Link>
              </>
            )}
          </li>
          <li>
            &nbsp;&nbsp;&#11096; current supply:{" "}
            {isLoading ? "loading..." : Number(data.edition.counter)}
          </li>
          <li>
            &nbsp;&nbsp;&#11096; max supply:{" "}
            {isLoading ? "loading..." : Number(data.edition.supply)}
          </li>
          <li>
            &nbsp;&nbsp;&#11096; price:{" "}
            {isLoading ? "loading..." : formatEther(data.edition.price)} eth
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
                : data.edition.counter === data.edition.supply
                ? "ended"
                : data.edition.mintStatus
                ? "active"
                : "paused"}
            </span>
          </li>
        </ul>
        <CustomConnect />


        
        <PaymasterMintComponent
          isMinting={Number(data?.edition.counter < data.edition.supply) && data.edition.mintStatus}
          editionId={params.editionId}
          price={data.edition.price}
          refetch={refetch}
        />

        <figure style={galleryFig}>
          <img
            src={data.image}
            alt="image loading..."
            width="500"
          ></img>
          <figcaption>
            {isLoading ? "loading" : `${data.edition?.name}`}
          </figcaption>
        </figure>
      </section>

      <div style={navigation}>
        <Link
          href={`/mint/${
            params.editionId > 1
              ? Number(params.editionId) - 1
              : params.editionId
          }`}
        >
          previous
        </Link>
        <Link
          href={`/mint/${
            params.editionId < lastEdition
              ? Number(params.editionId) + 1
              : params.editionId
          }`}
        >
          next
        </Link>
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