"use client"
import {useState, useEffect } from 'react';
import Link from 'next/link'
import { useQuery,keepPreviousData } from "@tanstack/react-query";
import {artAddress} from "../../../constants"
import {contract} from "../../../contract"
import { editionData } from '../../../editionData'
import { formatEther } from 'viem'
import useScreenSize from "../../../../hooks/useScreenSize"
import {editionType} from '../../../types'
import "@/app/pizazz.css";


function truncateAddress(address) {

  return `${address.slice(0,6)}...${address.slice(-4)}`
}


async function getEdition(editionId) {
  return await contract.read.getEdition([editionId]);


}

const perPage = 50;


async function getThumbnails(page, totalTokens, editionId) {
  
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  let limit = perPage;
  let start = (editionId * 1000000) + ((page) * limit) + 1; 
  if(totalTokens / limit < page) {
    return {images: [], loading: false, error: false};
  }
  if((page+1) * limit > totalTokens) {  
    start = (editionId * 1000000) + (page) * limit + 1;
    limit = totalTokens -  (page)*limit;

    
  }
   
    try {
      // console.log(process.env.NEXT_PUBLIC_BASE_MAINNET_URL)
      const response = await fetch(`${process.env.NEXT_PUBLIC_ALCHEMY_URL}/getNFTsForContract?contractAddress=${artAddress}&withMetadata=true&startToken=${start}&limit=${limit}`, options)
      const tokens = await response.json()
      console.log(tokens)
      return {images: tokens.nfts, loading: false, error: false};
    } catch (e) {
      console.log(e)
      return {images: [], loading: false, error: true};

  }
}

function Gallery({params, searchParams}) {
  const screenSize = useScreenSize();

  const [page, setPage] = useState(0);


  useEffect(() => {
    if(searchParams.page) {
      setPage(Number(searchParams.page))
    }
    else {
      setPage(1);
    }

  }, [searchParams.page])


  const {data: editionInfo, isFetching: editionFetching, error} = useQuery({
    queryKey: ["editionInfo", params.edition],
    queryFn: () => getEdition(params.edition),
    initialData: editionType,
  });

  const {data: thumbnails} = useQuery({
    queryKey: ["thumbnails", params.edition, page-1],
    queryFn: () => getThumbnails(page-1, Number(editionInfo.counter), params.edition),
    initialData: {images: [], loading: true, error: false},
    enabled: editionInfo.counter > 0,
    placeholderData: keepPreviousData

  });

  if(!editionFetching && error) {
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
        

        
        <section style={{display:"flex", alignItems:"center"}}>
        <Link style={arrows} href={`/browse/editions/${params.edition > 1 ? params.edition -1 : params.edition}`}><h1> &#8592;</h1></Link>

          <h1 style={{textAlign:"center"}}>&nbsp; {editionFetching ? "loading" : editionInfo.name} &nbsp;</h1>
          <Link style={arrows} href={`/browse/editions/${Number(params.edition) + 1}`}><h1>&#8594;</h1></Link>

        </section>

          <br />
        <nav>
        <ul>
            <small>
              <li>&#x2022; <b>edition: </b>#{params.edition}</li>
              <li>&#x2022; <b>type: </b>{editionData[editionInfo.name]?.type}</li>
              <li>&#x2022; <b>name: </b>{editionInfo.name}</li>
              <li>&#x2022; <b>description: </b>{editionInfo.description} </li>
              <li>&#x2022; <b>max supply: </b>{Number(editionInfo.supply)} </li>
              <li>&#x2022; <b>current supply: </b>{Number(editionInfo.counter)} </li>
              <li>&#x2022; <b>art generator: </b><a style={{textDecoration:"none"}} href={`https://basescan.org/address/${editionInfo.artGenerator}`} target="_blank">{truncateAddress(editionInfo?.artGenerator)} &#8599;</a></li>
              <li>&#x2022; <b>price: </b>{formatEther(editionInfo.price)} eth </li>
              <li>&#x2022; <b>royalty: </b>{Number(editionInfo.royalty) / 100}% </li>
              <li>&#x2022; <b>artist: </b><Link style={{textDecoration:"none"}} href={`/artist/${editionInfo.artistAddress}`}>{editionInfo.artistName || truncateAddress(editionInfo?.artistAddress)}</Link></li>
              <li>&#x2022; <b> public mint status: </b>{editionInfo.mintStatus ? <Link style={{textDecoration: "none"}} href={`/mint/${params.edition}`}> active &#8599;</Link> : "paused"}</li>

        </small>
        </ul>
        </nav>
        <br/>

          <section style={{width: screenSize.width < 1400 ?  "100%" : "60%"}}>
          {editionData[editionInfo.name]?.description()}
          </section>

        
        <br/>
    <div style={gallery}>

      {thumbnails?.error || !thumbnails.images && <p>uh oh, something went wrong fetching tokens, please try again.</p>}
      {thumbnails?.loading && params.edition.counter > 0 && <p>loading previews...</p>}
      {thumbnails.images?.map((nft, i) => {
        if(nft.raw?.error === "Failed to get token uri"){
          
          return (
            <Link key={i} style={{textDecoration:"none", color: "inherit"}} href={`/token/${params.edition * 1000000 + ((page*perPage) + i + 1)}`}>
            <figure className='shadow' style={{width: "300px", height:"300px", display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", border: "1px solid lightgrey"}}>
              <div style={{width:"70%"}}>
                <p>uh oh, looks like alchemy&apos;s api couldn&apos;t render this image<br /></p>
                <p>click to open</p>
                </div>
                <figcaption>{editionInfo.name} #{(page*perPage) + i + 1}</figcaption>
            </figure>
            </Link>
          );
        }
        return (
          <Link key={i} style={{textDecoration: "none"}} href={`/token/${params.edition * 1000000 + ((page*perPage) + i + 1)}`}>

          <figure style={galleryFig} >
            <img className="shadow" width="300px" alt={"error loading this image"} src={nft.raw.metadata.image}></img>
            <figcaption>{nft.name}
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
      {/* {page !== 0 && <button style={button} onClick={() => setPage((prev) => Math.max(prev-1, 0))}>&#8592;</button>} */}
      
      {page > 1 && <Link style={button} href={`/browse/editions/${params.edition}?page=${page - 1}`}>&#8592;</Link>}
        &nbsp;&nbsp;
      <p style={{margin:"0", fontSize:"small", display:"flex", alignItems:"center"}}>{page}/{(Math.ceil(Number(editionInfo?.counter)/perPage))}</p>
      &nbsp;&nbsp;
      {/* {page+1 < (Math.ceil(Number(editionInfo?.counter)/perPage)) &&  */}
      
      {page < Number(editionInfo?.counter)/perPage && <Link style={button} href={`/browse/editions/${params.edition}?page=${page + 1}`}>&#8594;</Link>}
      </div>
    
    <br/>
    <br/>
    <br/>
      {!editionFetching && <Link href="/browse">back</Link>}
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
  // objectFit: "cover",
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