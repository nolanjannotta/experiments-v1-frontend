"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { contractBase,contract } from "../../contract";
// import { contractBase } from '../contract'
import { useWriteContract, useConfig} from 'wagmi'

import { useQuery } from "@tanstack/react-query";
import { editionData } from "@/app/editionData";
import ConnectSimple from "@/components/ConnectSimple";
import { decodeAbiParameters, encodeAbiParameters,toBytes} from "viem";


// console.log(contractTypes)
async function exists(tokenId) {
  return await contract.read.exists([tokenId]);
}

async function isOwner(tokenId, account) {
  const owner = await contract.read.ownerOf([tokenId]);
  return owner === account.address;
}



async function decodeSeed(tokenId, editionName) {
  const seed = await contract.read.getSeed([tokenId]);
  const unPacked = await contract.read.unPackSeed([tokenId]);
  const values = decodeAbiParameters(
    editionData[editionName]?.seed,
    unPacked
  );
  let data = {}
  values.forEach((value, index)=>{
    data[editionData[editionName].seed[index].name] = value


  })


  return data;
}

function getEdition(tokenId) {
  const edition = contract.read.getEdition([(tokenId / 1000000).toFixed(0)]);
  return edition;
}

function ModifyToken({ params }) {
  const [inputFields, setInputFields] = useState({});
  const [modifyBytes, setModifyBytes] = useState("");
//   const [isOwner, setIsOwner] = useState(false);
  const account = useAccount();

  const {writeContract} = useWriteContract();
  
  async function modify() {
    writeContract({
        ...contractBase,
        functionName: "modify",
        args: [params.tokenId, modifyBytes],
    })
    
}

  const { data: tokenExists } = useQuery({
    queryKey: ["exists", params.tokenId],
    queryFn: () => exists(params.tokenId),
    initialData: undefined,
  });
  const { data: isOwned, refetch: checkOwner } = useQuery({
    queryKey: ["owner", params.tokenId],
    queryFn: () => isOwner(params.tokenId, account),
    initialData: false,
  });
  const { data: edition, isFetching:isEditionFetching } = useQuery({
    queryKey: ["edition", params.tokenId],
    queryFn: () => getEdition(params.tokenId),
    initialData: { name: "" },
  });
  // console.log(editionData[edition.name]?.inputs)
  const { data: decodedSeed, error } = useQuery({
    queryKey: ["decodedSeed", params.tokenId],
    queryFn: () => decodeSeed(params.tokenId, edition.name),
    enabled: edition.name !== "",
    initialData: [],
  });


  useEffect(() => {
    if (account.isConnected) {
        checkOwner();
    }

  }, [account.isConnected])

  useEffect(() => {
    // if (decodedSeed.length > 0) {
        let inputData = {}
        editionData[edition.name]?.modify.forEach((value) => {
            
            inputData[value.name] = decodedSeed[value.name]
        })


      setInputFields(inputData);
    // }
  }, [decodedSeed]); 

  useEffect(()=>{
    // console.log(editionData[edition.name]?.modify.map((value)=>{return value.type}))
    // const types = editionData[edition.name]?.modify.map((value)=>{return value.type}) || []
    if(isEditionFetching) return

    const values = editionData[edition.name]?.modify.map((value)=>{return inputFields[value.name]}) || []
    const packed = encodeAbiParameters(editionData[edition.name]?.modify || [], values)
    
    setModifyBytes(packed)

  },[inputFields])

  function eventHandler(event, index) {
    const type = editionData[edition.name].modify[index].type
    const value = type === "string" ? event.target.value : Number(event.target.value);
    setInputFields(
        prev => ({
            ...prev, 
            [editionData[edition.name].modify[index].name]: value}));
  }

  if (isEditionFetching)
    return (
      <article>
        <p>loading...</p>
      </article>
    );

  return (
    <article>
      <header>
        {tokenExists === false ? (
          <h1> token id {params.tokenId} does not exist.</h1>
        ) : (
          <h1>
            modifying {edition.name} #{params.tokenId % 1000000}
          </h1>
        )}
      </header>

      <ConnectSimple label="connect to modify" asAnchor={true} />

      {account.isConnected && (!isOwned && <p>you are not the owner.</p>)}


      {!editionData[edition.name]?.modifiable ? (
        <p>*{edition.name} is not modifiable</p>
      ) : (
        <fieldset>
          <legend>Current settings:</legend>

          <form>
            {editionData[edition.name]?.modify.map((input, index) => {
                // console.log(inputFields[input.name])
              return (
                <div key={index}>
                  <label>{input?.name}</label>
                  <input
                    placeholder={input.name}
                    onChange={(event) => eventHandler(event, index)}
                    defaultValue={inputFields[input.name]}
                  />
                </div>
              );
            })}
            
          </form>
          <p><small>Once you submit the transaction, wait a few seconds and refresh the page to see the changes. </small></p>
          <button style={button}  disabled={!isOwned || !editionData[edition.name]?.modifiable} onClick={()=> modify(params.tokenId,modifyBytes)}>
          &#9874;&#x1D544;&#x1D560;&#x1D555;&#x1D55A;&#x1D557;&#x1D56A;&#9874;
            </button>
        </fieldset>
      )}
      
    </article>
  );
}

export default ModifyToken;


const button = {
  background: "none",
  border: "none",
  textDecoration: "underline",
  fontSize: "30px",
  padding: "0"
  
}