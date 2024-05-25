"use client";
import React from "react";
import { contract } from "../../../contract";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { editionData } from "@/app/editionData";

async function getAllForAddress(address) {
  return contract.read.tokensOfOwner([address]);
}
async function getAllEditions() {
  const lastEdition = await contract.read.EDITION_COUNTER();
  let allEditions = [];
  for (let i = 1; i <= Number(lastEdition); i++) {
    let edition = await contract.read.getEdition([i]);
    allEditions.push(edition.name);
  }
  return allEditions;
}

async function getBalance(address) {
  const balance = await contract.read.balanceOf([address]);
  return balance;
}

function Address({ params }) {

 


  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(params.address),
    initialData: 0,
  });

  const { data: tokens, error:tokensOfOwnerError } = useQuery({
    queryKey: ["tokens"],
    queryFn: () => getAllForAddress(params.address),
    initialData: [],
  });

  console.log(tokensOfOwnerError)

  const { data: editionNames, error } = useQuery({
    queryKey: ["editionNames"],
    queryFn: getAllEditions,
    initialData: [],
  });


  return (
    <article>
      <header>
        <h1>address</h1>
      </header>

      <ul>
        <li>address: {params.address}</li>
        <li>balance: {Number(balance)}</li>
        <li>
          ids:
          <ul style={{ height: "500px", overflowY: "scroll" }}>
            {tokens.map((id, index) => {
              console.log(editionData[editionNames[Number(id / 1000000n) - 1]])
              return (
                <li key={index}>
                  <Link href={`/browse/editions/${Number(id / 1000000n)}`}>
                    {editionNames[Number(id / 1000000n) - 1]}
                  </Link>
                  &nbsp;
                  <Link href={`/token/${Number(id)}`}>
                    #{Number(id % 1000000n)}
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {editionData[editionNames[Number(id / 1000000n) - 1]]?.modifiable && <Link href={`/modify/${Number(id)}`}>modify &#9874;</Link>}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </article>
  );
}

export default Address;
