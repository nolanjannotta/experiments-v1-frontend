import React from 'react'
import {artAddress} from '../../address.js'

function MainContract() {
  return (
    <article>
        <nav><h1>Main Contract</h1></nav>
        <p>
            The main contract is the contract that is used to mint and manage the tokens. It is ERC721 compliant via the ultra
            efficient <a href="https://github.com/Vectorized/solady/blob/main/src/tokens/ERC721.sol" target='_blank'>Solady</a> implementation. 
            The code for the main contract can be found <a href={`https://sepolia.basescan.org/address/${artAddress}`} target="_blank">here</a>.
        </p>
        {/* <p>
            this contract is also enumerable, meaning it includes <pre><code>function tokensOfOwner(address owner)</code></pre> which returns an array of token IDs owned by an address.
        </p> */}
    </article>
  )
}

export default MainContract