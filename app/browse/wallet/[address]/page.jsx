// "use client";
import React from "react";
import { contract } from "../../../contract_server";
import Link from "next/link";
import { editionData } from "@/app/editionData";
import {ZERO_ADDRESS} from "@/app/constants";

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

async function page({ params }) {


  if(params.address === ZERO_ADDRESS) {
    return(
      <article>
      <h4>these tokens are destroyed... we dont talk about these.</h4>
      </article>
    )
  }


  const balance = await getBalance(params.address)

  const tokens = await getAllForAddress(params.address)
  const editionNames = await getAllEditions();

  

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
            {tokens?.map((id, index) => {
              return (
                <li key={index}>
                
                  <Link href={`/token/${Number(id)}`}>
                  {editionNames[Number(id / 1000000n) - 1]}  #{Number(id % 1000000n)}
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

export default page;
