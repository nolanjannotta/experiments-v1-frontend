"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { contract } from "../contract";

async function getEditions() {
  const lastEdition = await contract.read.EDITION_COUNTER();
  let allEditions = [];
  for (let i = 1; i <= Number(lastEdition); i++) {
    let edition = await contract.read.getEdition([i]);
    let thumbnail = await contract.read.getDataUri([i * 1000000 + 1]);
    allEditions.push({ edition, thumbnail });
  }
  return allEditions;
}

export default function Browse() {
  const { data, isFetching } = useQuery({
    queryKey: ["editions"],
    queryFn: getEditions,
    initialData: [],
  });

  return (
    <section style={section}>
      <h1 style={{ margin: 0 }}>{isFetching && "loading"} editions</h1>

      <div style={gallery}>
        {data.map((data, index) => {
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
