// "use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
// import { contract } from "../contract";
import { contract } from "../contract_server";


async function getEditions() {
  const lastEdition = await contract.read.EDITION_COUNTER();
  let allEditions = [];
  for (let i = 1; i <= Number(lastEdition); i++) {
    try{
        let edition = await contract.read.getEdition([i]);
        let thumbnail = await contract.read.getDataUri([i * 1000000 + 1]);
        allEditions.push({ edition, thumbnail });
    }
    catch(e){
        console.log(e.metaMessages[0], e.shortMessage)
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
      {error && errorMessage && 
      <>
      <p>{errorMessage.metaMessages[0]}</p>
      <p>{errorMessage.shortMessage}</p>
      </>}

      <div style={gallery}>
        {!error && allEditions.map((data, index) => {
          return (
            <Link key={index} href={`/browse/editions/${index + 1}`}>
              <figure style={galleryFig}>
                <img width="300" src={data.thumbnail}></img>
                <figcaption>{data.edition.name}</figcaption>
              </figure>
            </Link>
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
