"use server";
import Link from "next/link";
// import { contract } from "../contract";
import { contract, contractBase, publicClient } from "@/app/contract";
import {comingSoon} from "@/app/constants"


async function getEditions() {
  const lastEdition = await contract.read.EDITION_COUNTER();
  let allEditions = [];
  for (let i = 1; i <= Number(lastEdition); i++) {
    try{
        let edition = await contract.read.getEdition([i]);
        // let edition = await publicClient.readContract({
        //   ...contractBase,
        //   functionName: "getEdition",
        //   args: [i]
        // })
        // console.log(edition)
        if(edition.counter > 0) {
          let thumbnail = await contract.read.getDataUri([i * 1000000 + 1]);
          allEditions.push({ edition, thumbnail });
 
        }
        else {
            allEditions.push({ edition, thumbnail: comingSoon });
        }

        
    }
    catch(e){
        return{allEditions: [], error: true, errorMessage: e}
    }
  }
  return {allEditions, error: false};
}

export default async function Browse() {
  const {allEditions, error, errorMessage} = await getEditions();



  return (
    <section style={section}>
      <h1 style={{ margin: 0 }}>{!allEditions && "loading"} editions</h1>
      <br/>
      <br/>
      {error && errorMessage && 
      <>
        <p>{errorMessage.metaMessages[0]}</p>
        <p>{errorMessage.shortMessage}</p>
      </>}

      <div style={gallery}>
        {!error && allEditions.map((data, index) => {
          let ended = data.edition.counter >= data.edition.supply;
          let isMinting = !ended && data.edition.mintStatus;
          let paused = !ended && !data.edition.mintStatus;
          return (
              <figure key={index} style={galleryFig}>
              <Link  href={`/browse/editions/${index + 1}`}>
                <img width="300" src={data.thumbnail}></img>
                
                </Link>
                <figcaption>{data.edition.name}&nbsp;&nbsp; <Link href={`/mint/${index+1}`} style={{textDecoration: "none", color: ended ? "red" : isMinting ?  "green" : paused ? "#ffc618" : "inherit" }}>&#9679;</Link> &nbsp;<small>{Number(data.edition.counter)}/{Number(data.edition.supply)}</small></figcaption>
              </figure>
            
          );
        })}
      </div>
    </section>
  );
}

const gallery = {
  width: "70%",
  display: "flex",
  flexFlow: "wrap",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: "150px",
};

const galleryFig = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};

const section = {
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
