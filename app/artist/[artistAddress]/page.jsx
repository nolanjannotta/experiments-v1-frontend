import React from 'react'
import Link from 'next/link'
import { getContract, formatEther} from "viem";
import ArtistControls from '@/components/ArtistControls';
import {contract, publicClient} from '@/app/contract'
import splitterABI from '@/app/PaymentSplitter.json'

export const revalidate = 30


async function getArtistEditions(artistAddress) {
  // console.log(contract)
  const lastEdition = await contract.read.EDITION_COUNTER();
  let artistEditions = [];
  for (let i = 1; i <= Number(lastEdition); i++) {
    let edition = await contract.read.getEdition([i]);
    if(edition.artist === artistAddress) {
      
      const paymentSplitter = getContract({
        abi: splitterABI,
        address: edition.royaltyReceiver,
        client: publicClient
      })
      const releasable = await paymentSplitter.read.releasable([artistAddress]);
      artistEditions.push({edition, releasable, editionId: i});
    }
  }
  return artistEditions;
}

async function ArtistAddress({params}) {

  const artistEditions = await getArtistEditions(params.artistAddress);
  console.log(artistEditions)

  if(artistEditions.length === 0) {
    return(
      <article>
      <h4>no editions found for this address :(</h4>
      </article>
    )
  }
  return (
    <article>
      <header>
        <h4>Artist: <small>{params.artistAddress}</small></h4>
      </header>
      <p>your #1 place to manage the editions that you&apos;ve created.</p>
      <br/>

      { artistEditions.map((edition, index) => {
        return <ArtistControls key={index} edition={edition} index={index} editionId={edition.editionId}/>
      })
        
      }



      </article>
  )
}

export default ArtistAddress


