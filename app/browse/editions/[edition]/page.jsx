"use client"
import Link from 'next/link'
import { useQuery } from "@tanstack/react-query";
import {ZERO_ADDRESS,artAddress} from "../../../constants"
import {contract} from "../../../contract"
import { editionData } from '../../../editionData'
import { formatEther } from 'viem'
import useScreenSize from "../../../../hooks/useScreenSize"


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
  owners:{}
};




function truncateAddress(address) {

  return `${address.slice(0,6)}...${address.slice(-4)}`
}


async function getTokens(editionId) {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  const edition = await contract.read.getEdition([editionId]);


    try {
      const response = await fetch(`https://base-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getNFTsForContract?contractAddress=${artAddress}&withMetadata=true&startToken=${(editionId * 1000000) + 1}&limit=${edition.counter || 0}`, options)
      const tokens = await response.json()

      // const ownerResponse = await fetch(`https://base-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getOwnersForContract?contractAddress=${artAddress}&withTokenBalances=false`, options)
      // const owners = await ownerResponse.json()

      // console.log(tokens)
      return {edition, tokens};
    } catch (error) {
      console.log(error)

  }
}

// async function getOwners() {
//   const options = {method: 'GET', headers: {accept: 'application/json'}};
//     try {
//       const response = await fetch(`https://base-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getOwnersForContract?contractAddress=${artAddress}&withTokenBalances=false`, options)
//       const owners = await response.json()
//       return owners;
//     } catch (error) {
//       return {}

//   }


// }



function Gallery({params}) {
  const screenSize = useScreenSize();
  console.log(screenSize)

  const description = {
    width: screenSize.width < 1400 ?  "100%" : "60%",
  
  
  }


  const {data: editionInfo, isFetching,} = useQuery({
    queryKey: ["editionInfo", params.edition],
    queryFn: () => getTokens(params.edition),
    initialData: initialData,
  });
    
    return (
      <section style={section}>
        

        <h1 style={{margin: "0", padding: "0"}}>
          <Link style={arrows} href={`/browse/editions/${params.edition > 1 ? params.edition -1 : params.edition}`}> &#8592; </Link>
          &nbsp;&nbsp;&nbsp;&nbsp; {editionInfo.edition?.name} &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={arrows} href={`/browse/editions/${params.edition < Number(editionInfo?.edition.counter)-1 ? Number(params.edition) + 1 : Number(params.edition)}`}> &#8594; </Link>
          </h1>
          <br />
        <nav>
        <ul>
          <code>
            <small>
              <li>&#x2022; edition: &quot;{params.edition}&quot;</li>
        {Object.keys(editionInfo.edition).map((key, i) => {
          if(key === "artGenerator") {
            return <li key={i}>&#x2022; {"art generator"}:{" "}<a href={`https://sepolia.basescan.org/address/${editionInfo.edition[key]}`} target="_blank">&#8599;</a></li>
            
          }
          if(key === "price") {
            return <li  key={i}>&#x2022; {key}: &quot;{formatEther(editionInfo.edition[key])} eth&quot;</li>
          }
          if (key === "royalty") {
            return <li key={i}>&#x2022; {key}: &quot;{Number(editionInfo.edition[key]) / 100}%&quot;</li>
          }
          if(key === "royaltyReceiver") {
            return <li  key={i}>&#x2022; {"royalty receiver"}: &quot;{truncateAddress(editionInfo.edition[key])}&quot;</li>
          }
          if(key === "supply") {
            return <li  key={i}>&#x2022; {"max supply"}: &quot;{Number(editionInfo.edition[key])}&quot;</li>
          }
          if(key === "counter") {
            return <li  key={i}>&#x2022; {"current supply"}: &quot;{Number(editionInfo.edition[key])}&quot;</li>
          }
          if(key === "description") {
            return <li  key={i}>&#x2022; {key}: &quot;{editionInfo.edition[key]}&quot;</li>
          }

          if(key === "mintStatus") {
            if(editionInfo.edition.counter === editionInfo.edition.supply) {
              return <li  key={i}>&#x2022; {"mint status"}: {"ended"}</li>
            }
            else {
              return <li  key={i}>&#x2022; {"public mint status"}: {editionInfo.edition[key] ? <Link style={{textDecoration: "none"}} href={`/mint/${params.edition}`}> active &#8599;</Link> : '"paused"'}</li>

            }
          }
          else {
           return <li  key={i}>&#x2022; {key}: &quot;{editionInfo.edition[key]}&quot;</li> 
          }
          
        })}
        </small>
        </code>
        </ul>
        </nav>
        <br/>
        <section style={description}>
        {editionData[editionInfo.edition?.name]?.description()}
        </section>
        <br/>
    <div style={gallery}>

      {editionInfo.tokens.nfts.map((nft, i) => {
        if(nft.raw.error === "Failed to get token uri"){
          // console.log("hello")
          return (
            <Link style={{textDecoration:"none", color: "inherit"}} href={`/token/${params.edition * 1000000 + (i + 1)}`}>
            <figure key={i} style={{width: "300px", height:"300px", display: "flex", flexDirection:"column", justifyContent:"center", textAlign: "center", border: "1px solid lightgrey"}}>
                <p>uh oh, looks like alchemy&apos;s NFT api couldn&apos;t render #{i + 1}.<br /></p>
                <p>click to open</p>

              {/* <button>retry</button> */}
            </figure>
            </Link>
          );
        }
        return (
          <Link key={i} style={{textDecoration: "none"}} href={`/token/${params.edition * 1000000 + (i+1)}`}>
          <figure style={galleryFig} >
            <img style={galleryImg} width="300px" src={nft.raw.metadata.image}></img>
            <figcaption>{nft.raw.metadata.name}
            {/* &#8599; */}
            </figcaption>
          </figure>
          </Link>
        )
      })}
 

    </div>
      {!isFetching && <Link href="/browse">back</Link>}
    </section>
  )
}

export default Gallery



const arrows = {
  textDecoration: "none",
  color: "black",
}


const gallery = {
  // display: "grid",
  // gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  // gap: "1rem",
  // justifyContent: "center",
  // alignItems: "center",
  // padding: "2rem",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "space-evenly",
  gap: "50px",
  width: "90%",
  // backgroundColor: "blue"

}

const galleryImg = {
  // width: "30%",
  // height: "auto",
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