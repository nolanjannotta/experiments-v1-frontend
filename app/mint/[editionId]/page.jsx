"use client"

import React from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import {contract } from '../../contract'
import MintButton from '../../../components/MintButton';
import {editionType} from '../../types'

async function mintPageData(editionId) {
 
  editionId = BigInt(editionId);

  // const currentEditionId = await contract.read.editionCounter();
  const edition = await contract.read.getEdition([editionId]);
  console.log(edition)
  // const lastImage = await contract.read.getDataUri([editionId* 1000000n + edition.counter]);
  const lastToken = await contract.read.tokenURI([editionId* 1000000n + edition.counter]);
  

  const mostRecentOwner = await contract.read.ownerOf([editionId* 1000000n + edition.counter]);


  let bufferObj = Buffer.from(lastToken.split("data:application/json;base64,")[1], "base64");
  let metadata = JSON.parse(bufferObj.toString("utf-8"));
  
  return {edition, metadata, mostRecentOwner};

}



function Mint({params}) {


  const {data, error, isLoading} = useQuery({
    queryKey: ["mintPageData", params.editionId],
    queryFn: () => {return mintPageData(params.editionId)},
    initialData: {edition: editionType, metadata: {}, mostRecentOwner: ""}
  
  })
  console.log(error)

  return (
    <article>
      <header>
        <h1>mint</h1>
      </header>
      <section>
        <ul>
          <li>
            currently minting: {isLoading ? "loading..." : data.edition.name}
            &nbsp; <Link href={`/browse/editions/${data?.editionId}`}>&#8599;</Link>
          </li>
          <li>
            remaining: {isLoading ? "loading..." : Number(data.edition.supply - data.edition.counter)}
          </li>
          <li>
            total: {isLoading ? "loading..." : Number(data.edition.supply)}
          </li>
          {/* <li>
            next id: {isLoading ? "loading..." : Number(data.edition.counter) + 1}
          </li> */}
          <li>
            price: {isLoading ? "loading..." : Number(data.edition.price)} eth
          </li>
        </ul>

        <MintButton isMinting={Number(data?.edition.supply - data?.edition.counter) > 0} editionId={params.editionId}/>
        <figure style={galleryFig}>
          
          <img src={data.metadata?.image} alt='image loading...' width="500"></img>
         {/* <object width="500" data={isLoading ? "" : data.metadata.image}></object>  */}
         <figcaption> last minted token: &nbsp;{isLoading ? "loading" : `"${data.metadata?.name}"`}</figcaption>
        </figure>
        

      </section>

    </article>
  )
}

export default Mint


const galleryFig = {
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  alignItems: "center",
  // gap: "1rem"
  }