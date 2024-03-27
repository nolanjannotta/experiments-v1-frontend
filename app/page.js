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
     ERC721 <Link href="/contracts/main">smart contract</Link> on <a target="blank" href="https://www.base.org/">Base</a> L2 blockchain. 
     Each individual &quot;experiment&quot; is linked to its own immutable <Link href="/contracts/artgenerator">ArtGenerator</Link> contract. 
     This contract is in charge of generating the raw SVG code and any 
     attributes that this experiment may or may not have. There will never be any
     offchain scripts or URLs to servers. Raw SVG code is generated and returned 100% onchain forever.
     The goal of this project is to push my knowledge, experiment on with onchain art and mechanics,
     make interesting images,  learn a lot, and emerge with a semi refined set of tools and techniques to 
     work with SVG in solidity to create onchain art. 
     </p>

    <p>
      Each token Id has one 32 bit seed that is stored in the smart contract. Normally, this is just a 
      random number when it comes to generative art. In this case, the seed can also be used to store multiple 
      pieces of data. 
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