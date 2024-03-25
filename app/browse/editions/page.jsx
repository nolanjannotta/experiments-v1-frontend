"use client"
import React from 'react'
import Link from 'next/link'

import {useQuery} from "@tanstack/react-query";
import {contract} from "../../contract"

async function getEditions() {
  const lastEdition = await contract.read.editionCounter();
 
  let allEditions = [];
  for(let i = 1; i <= Number(lastEdition); i++) {
    let edition = await contract.read.getEdition([i]);
    let thumbnail = await contract.read.getDataUri([(i* 1000000) + 1]);
    allEditions.push({edition, thumbnail});
  }
  return allEditions;
  
}


function Editions() {

  const {data, error, isFetching, refetch} = useQuery({
    queryKey: ["editions"],
    queryFn: getEditions,
    initialData: []
      })
      console.log(error)

  return (
    <section style={section}>
      <div style={{display:"flex", alignItems:"center"}}>

        <h1>{isFetching && "loading"} editions</h1>

      </div>
  
  <div style={gallery}>

    {data.map((data, index) => {
      return (
        <Link key={index} href={`/browse/editions/${index+1}`}>
            <figure style={galleryFig}>
              <img  style={galleryImg} width="300" src={data.thumbnail}></img>
              <figcaption>{data.edition.name}</figcaption>
            </figure>
            </Link>
      )
    })}



  </div>

  </section>
)
}

export default Editions

const button = {
  background: "none",
  border: "none",
  fontSize: "1rem"
}


const gallery = {
width: "80%",
display: "flex",
flexFlow: "wrap",
justifyContent: "space-evenly",
alignItems: "center"

}
const galleryImg = {

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
alignItems: "center",
// backgroundColor: "red"
}