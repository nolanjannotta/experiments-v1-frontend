"use client"

import React from 'react'
import {useAccount} from 'wagmi'
import {contract} from "../../constants"

import { useQuery } from '@tanstack/react-query'
import { editionData } from '@/app/editionData'
import CustomConnect from '@/components/CustomConnect'

// console.log(contractTypes)
async function exists(tokenId) {
    return await contract.read.exists([tokenId]);
}

async function isOwner(tokenId,account) {
    const owner = await contract.read.ownerOf([tokenId]);
    return owner === account.address;

}


function getEdition(tokenId) {
    const edition = contract.read.getEdition([(tokenId/1000000).toFixed(0)]);
    return edition;
}

function ModifyToken({params}) {
    const account = useAccount();

    const {data: tokenExists} = useQuery({
        queryKey: ["exists", params.tokenId],
        queryFn: () => exists(params.tokenId),
        initialData: undefined
    
    })
    const {data: isOwned} = useQuery({
        queryKey: ["owner", params.tokenId],
        queryFn: () => isOwner(params.tokenId,account),
        initialData: false
    
    })
    const {data: edition, isFetching} = useQuery({
        queryKey: ["edition", params.tokenId],
        queryFn: () => getEdition(params.tokenId),
        initialData: {name:""}
    
    })

    if(isFetching) return <article><p>loading...</p></article>

  return (
    <article> 
        <header>
            
            {tokenExists === false ? <h1> token id {params.tokenId} does not exist.</h1> : <h1>Modifying {edition.name} #{params.tokenId % 1000000}</h1>}
        </header>

        <CustomConnect/>

        {!account.isConnected && !account.isConnecting ? <p>connect to modify.</p> :!isOwned &&<p>you are not the owner.</p>}


        {!editionData[edition.name]?.modifiable ? <p>{edition.name} is not modifiable</p> : 
        

        <fieldset>
            <legend>Modify</legend>
        

            <form>

            {
                editionData[edition.name]?.inputs.map((input,index) => {return <div key={index}>
                <input type={input.type} placeholder={input.name} /> 
                {/* <p>current data:</p>
                
                <p>next data:</p> */}
                </div>})
            }
            <button disabled={!isOwned} type="submit">Modify</button>
        </form>
        </fieldset>
        }

    </article>
  )
}

export default ModifyToken