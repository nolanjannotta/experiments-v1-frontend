"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {contract} from "../../contract"


async function getArtGenerators() {
    // returns list of objects with name and address of art generators
    const lastEdition = await contract.read.EDITION_COUNTER();
    let artGenerators = [];
    for (let i = 1; i <=lastEdition; i++) {
        let edition = await contract.read.getEdition([i]);
        artGenerators.push({name: edition.name, address: edition.artGenerator});
    }
    return artGenerators;

}

function ArtGenerators() {
    const {data: artGenerators, error, isLoading} = useQuery({
        queryKey: ["artGenerators"],
        queryFn: getArtGenerators,
        initialData: [{name: "loading conracts...", address: ""}]
    })


    return (
    <article>
        <h3>Art Generators</h3>
        <p>
            Art generators are simple smart contracts that are responsible for generating raw SVG code and attributes for each edition/experiment. 
            They are also used to create the initial seed for each token ID, as well as to modify the seed of a token ID. 
            The raw SVG code is generated and returned 100% onchain.
        </p>
        <p>
            all art generator contracts must implement the following interface:
        </p>

        <pre>
            
        <code>
        {/* <small> */}
        interface IArtGenerator &#123; <br/>


        &nbsp;&nbsp;&nbsp;&nbsp;function getRawSvg(bytes32 seed) external view returns(string memory);<br/><br/>

        &nbsp;&nbsp;&nbsp;&nbsp;function getRawSvgAndAttributes(bytes32 seed) external view returns(string memory, string memory);<br/><br/>

        &nbsp;&nbsp;&nbsp;&nbsp;function modify(uint tokenId, bytes memory data) external view returns (bytes32);<br/><br/>

        &nbsp;&nbsp;&nbsp;&nbsp;function unPackSeed(bytes calldata seed) external pure returns(bytes memory);<br/><br/>

        &nbsp;&nbsp;&nbsp;&nbsp;function createSeed(uint tokenId, address minter) external view returns(bytes32);<br/><br/>

        &nbsp;&nbsp;&nbsp;&nbsp;function dimensions(bytes32 seed) external pure returns(uint,uint);<br/><br/>
            &#123;<br/>
        {/* </small> */}

        </code>
        </pre>

        <p>The SVG string that is returned looks roughly like this: </p>

        <code>
            {`
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" height="1000" width="1000">
                ...more svg code
            </svg>'
            
            
            `}
        </code>

        <p>The attributes string looks like this:</p>
        <code>
        {`'{"trait_type": "background", "value": "red"}, {"trait_type": "eyes", "value": "blue"}'`}


        </code>
        <figure>
            <figcaption>Current Art Generators<small> (takes you to basescan)</small></figcaption>
     
        <ul>
            {artGenerators.map((generator, index) => {
                if(generator.address == "") return <p key={index}>loading...</p>
                return <li key={index}><a href={`https://sepolia.basescan.org/address/${generator.address}#code`} target="_blank">{generator.name} &#8599;</a></li>
            })}
        </ul>
        </figure>

        
        </article>
  )
}

export default ArtGenerators