// "use client"
import Link from 'next/link'
// import Image from 'next/image'
// import styles from './page.module.css'



export default function Home() {
  return (
    <main>


      <article>
        <header>
          <h1>Welcome</h1>
          </header>
      <p>
    Experiments V1 is a project where I learn, explore, and <i>experiment</i> with 100% onchain
     generative art and onchain mechanics. These experiments are managed by a single    
     ERC721 <Link href="/contracts/main">smart contract</Link> on the <a target="blank" href="https://www.base.org/">Base</a> L2 blockchain. 
     Each individual &quot;experiment&quot; is linked to its own immutable <Link href="/contracts/artgenerator">ArtGenerator</Link> contract. 
     This contract is in charge of generating the raw SVG code and any 
     attributes that this experiment may or may not have. There will never be any
     offchain scripts or URLs to servers. Raw SVG code is generated and returned 100% onchain forever.
     The goal of this project is to push my knowledge, experiment with onchain art and mechanics,
     make interesting things, learn a lot, and emerge with a semi refined set of tools and techniques to 
     work with SVG in solidity to create onchain art. 
     </p>

    <p>
      Each token has a corresponding 32 bit seed that is stored in the ERC721 smart contract. This can be any number, string, bytes, etc. 
      When it comes to generative art, it is usually a &quot;random&quot; number. This number can be derived from block data like timestamp, block hash, etc. 
      Also the minters address can be used also. The seed can also be any arbitrary data that can fit into 32 bytes, and can be packed and unpacked 
      by the art generator contract.
    </p>

    <p>

      Each edition will be &quot;uploaded&quot;/deployed individually over time as I make them. Once a new edition is added, 
      minting for the previous one will be paused. If the supply is not reached, the owner can unpause and pause at anytime 
      as well as mint paused editions. They will have a low supply (100-300 probably), 
      start as completely free, mintable through this website as well as through a frame in warpcast. Every warpcast user who follows my <a target="_blank" href="https://warpcast.com/nolanj">account</a> gets 2 free (zero gas) mints 
      for each edition through the frame. Depending on the demand, the owner may set a reasonable price and royalty (ERC-2981) for the remaining tokens.
      
      
      </p>
      
      </article>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <p>below are some flowcharts that show the basic moving parts for some of functions in this project. </p>

      <div style={outline}>        
      <img src="/mintFlowChart.png"  alt="minting flow chart"></img>
      </div>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div style={outline}>
      <img src="/tokenURIFlowChart.png" alt="tokenURI flow chart"></img>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div style={outline}>
      <img src="/modifyFlowChart.png" alt="art generator flow chart"></img>
      </div>
      
    </main>
  )
}


const outline = {
  border: "1px solid black",
  padding: "1rem",
  margin: "1rem"
}