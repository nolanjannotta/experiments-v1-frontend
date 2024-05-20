"use client"
import {useState } from 'react';
import Link from 'next/link'
import { useQuery,keepPreviousData } from "@tanstack/react-query";
import {artAddress} from "../../../constants"
import {contract} from "../../../contract"
import { editionData } from '../../../editionData'
import { formatEther } from 'viem'
import useScreenSize from "../../../../hooks/useScreenSize"
import {editionType} from '../../../types'



function truncateAddress(address) {

  return `${address.slice(0,6)}...${address.slice(-4)}`
}


async function getEdition(editionId) {
  return await contract.read.getEdition([editionId]);


}


async function getThumbnails(page, totalTokens, editionId) {

  const options = {method: 'GET', headers: {accept: 'application/json'}};
  let limit = 50;
  let start = (editionId * 1000000) + ((page) * limit) + 1; 
  if(totalTokens / limit < page) {
    return {images: [], loading: false, error: false};
  }
  if((page+1) * limit > totalTokens) {  
    start = (editionId * 1000000) + (page) * limit + 1;
    limit = totalTokens -  (page)*limit;

    
  }
   
    try {
      const response = await fetch(`https://base-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getNFTsForContract?contractAddress=${artAddress}&withMetadata=true&startToken=${start}&limit=${limit}`, options)
      const tokens = await response.json()

      // console.log("page key", Number(tokens.pageKey))
      return {images: tokens.nfts, loading: false, error: false};
    } catch (e) {
      console.log(e)
      return {images: [], loading: false, error: true};

  }
}

function Gallery({params}) {
  const screenSize = useScreenSize();

  const [page, setPage] = useState(0);


  // console.log(allThumbnails)



  const {data: editionInfo, isFetching: editionFething, error} = useQuery({
    queryKey: ["editionInfo", params.edition],
    queryFn: () => getEdition(params.edition),
    initialData: editionType,
  });

  const {data: thumbnails} = useQuery({
    queryKey: ["thumbnails", params.edition, page],
    queryFn: () => getThumbnails(page, Number(editionInfo.counter), params.edition),
    initialData: {images: [], loading: true, error: false},
    enabled: editionInfo.counter > 0,
    placeholderData: keepPreviousData

  });

  if(!editionFething && error) {
    return <section style={section}>
      <h1 style={{margin: "0", padding: "0"}}>
          <Link style={arrows} href={`/browse/editions/${params.edition > 1 ? params.edition -1 : params.edition}`}> &#8592; </Link>
          &nbsp;&nbsp;&nbsp;&nbsp; {isFetching ? "loading" : "uh oh, edition #" + params.edition + "not found!"} &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={arrows} href={`/browse/editions/${Number(params.edition) + 1}`}> &#8594; </Link>
          </h1>
    </section>
  }
    
    return (
      <section style={section}>
        

        <h1 style={{margin: "0", padding: "0"}}>
          <Link style={arrows} href={`/browse/editions/${params.edition > 1 ? params.edition -1 : params.edition}`}> &#8592; </Link>
          &nbsp;&nbsp;&nbsp;&nbsp; {editionFething ? "loading" : editionInfo.name} &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={arrows} href={`/browse/editions/${Number(params.edition) + 1}`}> &#8594; </Link>
          </h1>
          <br />
        <nav>
        <ul>
          <code>
            <small>
              <li>&#x2022; edition #: &quot;{params.edition}&quot;</li>
        {Object.keys(editionInfo).map((key, i) => {
          if(key === "artGenerator") {
            return <li key={i}>&#x2022; {"art generator"}:{" "}<a href={`https://sepolia.basescan.org/address/${editionInfo[key]}`} target="_blank">&#8599;</a></li>
            
          }
          if(key === "price") {
            return <li  key={i}>&#x2022; {key}: &quot;{formatEther(editionInfo[key])} eth&quot;</li>
          }
          if (key === "royalty") {
            return <li key={i}>&#x2022; {key}: &quot;{Number(editionInfo[key]) / 100}%&quot;</li>
          }
          if(key === "royaltyReceiver") {
            return <li  key={i}>&#x2022; {"royalty receiver"}: &quot;{truncateAddress(editionInfo[key])}&quot;</li>
          }
          if(key === "supply") {
            return <li  key={i}>&#x2022; {"max supply"}: &quot;{Number(editionInfo[key])}&quot;</li>
          }
          if(key === "counter") {
            return <li  key={i}>&#x2022; {"current supply"}: &quot;{Number(editionInfo[key])}&quot;</li>
          }
          if(key === "description") {
            return <li  key={i}>&#x2022; {key}: &quot;{editionInfo[key]}&quot;</li>
          }

          if(key === "mintStatus") {
            if(editionInfo.counter === editionInfo.supply) {
              return <li  key={i}>&#x2022; {"mint status"}: {"ended"}</li>
            }
            else {
              return <li  key={i}>&#x2022; {"public mint status"}: {editionInfo[key] ? <Link style={{textDecoration: "none"}} href={`/mint/${params.edition}`}> active &#8599;</Link> : '"paused"'}</li>

            }
          }
          else {
           return <li  key={i}>&#x2022; {key}: &quot;{editionInfo[key]}&quot;</li> 
          }
          
        })}
        </small>
        </code>
        </ul>
        </nav>
        <br/>
        <section style={{width: screenSize.width < 1400 ?  "100%" : "60%"}}>
        {editionData[editionInfo.name]?.description()}

        </section>
        <br/>
    <div style={gallery}>

      {thumbnails?.error || !thumbnails.images && <p>uh oh, something went wrong fetching tokens, please try again.</p>}
      {thumbnails?.loading && <p>loading previews...</p>}
      {thumbnails.images?.map((nft, i) => {
        if(nft.raw.error === "Failed to get token uri"){
          
          return (
            <Link key={i} style={{textDecoration:"none", color: "inherit"}} href={`/token/${params.edition * 1000000 + ((page*50) + i + 1)}`}>
            <figure  style={{width: "300px", height:"300px", display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", border: "1px solid lightgrey"}}>
              <div style={{width:"70%"}}>
                <p>uh oh, looks like alchemy&apos;s NFT api couldn&apos;t render this image<br /></p>
                <p>click to open</p>
                </div>
                <figcaption>{editionInfo.name} #{(page*50) + i + 1}</figcaption>
            </figure>
            </Link>
          );
        }
        return (
          <Link key={i} style={{textDecoration: "none"}} href={`/token/${params.edition * 1000000 + ((page*50) + i + 1)}`}>

          <figure style={galleryFig} >
            <img style={galleryImg} width="300px" alt={"error loading this image"} src={nft.raw.metadata.image}></img>
            <figcaption>{nft.raw.metadata.name}
            </figcaption>
          </figure>
          </Link>

        )
      })}
 

    </div>
    <br/>
    <br/>
    <br/>
      <div style={{display: "flex",justifyContent:"center"}}>
      {page !== 0 && <button style={button} onClick={() => setPage((prev) => Math.max(prev-1, 0))}>&#8592;</button>}
        &nbsp;&nbsp;
      <p style={{margin:"0", fontSize:"small", display:"flex", alignItems:"center"}}>{page+1}/{(Math.ceil(Number(editionInfo?.counter)/50))}</p>
      &nbsp;&nbsp;
      {page+1 < (Math.ceil(Number(editionInfo?.counter)/50)) && <button style={button} onClick={() => setPage(prev => prev+1)}>&#8594;</button>}
      </div>
    
    <br/>
    <br/>
    <br/>
      {!editionFething && <Link href="/browse">back</Link>}
    </section>
  )
}

export default Gallery




const button = {
  background: "none",
  border: "none",
  margin: "0",
  // fontSize: "large",
}


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