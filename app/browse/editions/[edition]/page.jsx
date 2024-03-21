"use client"
import Link from 'next/link'

// import {getAllFromEdition} from "../../../actions";
import { useQuery } from "@tanstack/react-query";
import {contract, ZERO_ADDRESS,artAddress} from "../../../constants"
import { editionData } from '../../../editionData'
// import {artAddress} from "../../../address"
import { isAddress } from 'viem';



function addressShrinker(address) {
  return `${address.slice(0,6)}...${address.slice(-4)}`
}

async function getTokens(editionId) {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  const edition = await contract.read.getEdition([editionId]);


    try {
      const response = await fetch(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getNFTsForContract?contractAddress=${artAddress}&withMetadata=true&startToken=${(editionId * 1000000) + 1}&limit=${edition.counter || 0}`, options)
      const tokens = await response.json()

      return {edition, tokens};
    } catch (error) {


  }
}

async function loadSingleToken(tokenId) {
  const options = {method: 'GET', headers: {accept: 'application/json'}};

  try {
    const response = await fetch(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getNFTsForContract?contractAddress=${artAddress}&withMetadata=true&startToken=${(editionId * 1000000) + 1}&limit=${edition.counter || 0}`, options)
    const tokens = await response.json()

    return {edition, tokens};
  } catch (error) {


}
}




function Gallery({params}) {

    // const data = await getAllFromEdition(params.edition) 

    // console.log(getAddress(0))

    
    // const {data, error, isLoading, isFetching} = useQuery({
    //   queryKey: ["edition", params.edition],
    //   queryFn: () => getAllFromEdition(params.edition),
    //   initialData: {metadatas: [], name: ""}
    // })

    const initialData = {
      edition: {
        artGenerator: ZERO_ADDRESS,
        counter: 0n,
        description: "",
        name: "",
        price: 0n,
        royaltyReceiver: ZERO_ADDRESS,
        supply: 0n,
      },
      tokens: { 
        nfts: [], 
        nextToken: "" 
      },
    };

    const {data: editionInfo, error, isLoading, isFetching} = useQuery({
      queryKey: ["editionInfo", params.edition],
      queryFn: () => getTokens(params.edition),
      initialData: initialData
    })
    
    

    return (
      <section style={section}>

        <h1>{editionInfo.edition?.name}</h1>
        <nav>
        <ul>
          <code>
            <small>
              <li>&#x2022;edition: "{params.edition}"</li>
        {Object.keys(editionInfo.edition).map((key, i) => {
          let value
          if(key === "artGenerator") {
            return <li key={i}>&#x2022;{key}:{" "}<a href={`https://sepolia.basescan.org/address/${editionInfo.edition[key]}`} target="_blank">&#8599;</a></li>
            
          }
          else if(typeof editionInfo.edition[key] === "bigint") {
            value = Number(editionInfo.edition[key])
            // return <li  key={i}>&#x2022;{key}: "{value}"</li>
          }
          else if(isAddress(editionInfo.edition[key])) {
            value = addressShrinker(editionInfo.edition[key])
          }
          else {
            value = editionInfo.edition[key]
          }
          return <li  key={i}>&#x2022;{key}: "{value}"</li>
        })}
        <li>&#x2022;minting status: "active" <Link href="/mint">&#8599;</Link> </li>
        </small>
        </code>
        </ul>
        </nav>
        <section style={description}>
        {editionData[editionInfo.edition?.name]?.description()}
        </section>
    <div style={gallery}>

      {editionInfo.tokens.nfts.map((nft, i) => {
        if(nft.error === "Failed to get token uri"){
          // console.log("hello")
          return (
            <div style={{width: "300px", height:"300px", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                <p>uh oh, looks like alchemy's NFT api couldn't render #{i + 1}.<br /></p>
              <Link href={`/browse/token/${params.edition * 1000000 + (i + 1)}`}>click here to load from blockchain</Link>

              <button>retry</button>
            </div>
          );
        }
        return (
          <figure style={galleryFig} key={i}>
            <img style={galleryImg} width="300" src={nft.metadata.image}></img>
            <figcaption>{nft.metadata.name}  &nbsp; &nbsp;
            <Link href={`/browse/token/${params.edition * 1000000 + (i+1)}`}>&#8599;</Link>
            </figcaption>
          </figure>
        )
      })}
 

    </div>
      {!isFetching && <Link href="/browse/editions">back</Link>}
    </section>
  )
}

export default Gallery

const description = {
width: "70%",


}


const gallery = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  width: "70%",

}
const galleryImg = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
}

const galleryFig = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem"
}

const section = {
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}