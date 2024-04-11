"use client"
import Link from 'next/link'
import {useState} from 'react'
import {useAccount} from 'wagmi'
import OtherConnectButton from '../../components/OtherConnectButton'
import {useQuery} from "@tanstack/react-query";
import {contract} from "../contract"

async function getEditions() {
  const lastEdition = await contract.read.editionCounter();
 console.log("get editions ran")
  let allEditions = [];
  for(let i = 1; i <= Number(lastEdition); i++) {
    let edition = await contract.read.getEdition([i]);
    let thumbnail = await contract.read.getDataUri([(i* 1000000) + 1]);
    allEditions.push({edition, thumbnail});
  }
  return allEditions;
  
}



export default function Browse({searchParams}) {
  const account = useAccount()
  const [input, setInput] = useState('')

  const {data, error, isFetching, refetch} = useQuery({
    queryKey: ["editions"],
    queryFn: getEditions,
    initialData: []
      })

    return(

      <>
             <article>
           
                 {/* <header>
                <nav>
                <ul>
                  <li><Link href="/browse/">all editions</Link></li>
                  <li><Link href="/browse/all">all mints</Link></li>
                  <li><OtherConnectButton/></li>
                 
              </ul>
              </nav>
                </header>  */}
     
     

     
              </article>
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
  </>
        
    )
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