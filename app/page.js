// "use client"
import Link from 'next/link'
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
     ERC721 <Link href="/contracts/main">smart contract</Link> on <a target="blank" href="https://www.base.org/">Base</a> L2 blockchain. Each individual "experiment" is linked to its own  
    immutable <Link href="/contracts/artgenerator">ArtGenerator</Link> contract. This contract is in charge of generating the raw SVG code and any 
     attributes that this experiment may or may not have. There will never be any
     offchain scripts or URLs to servers. Raw SVG code is generated and returned 100% onchain forever.
     The goal of this project is to push my knowledge, experiment on with onchain art and mechanics,make interesting images,  learn a lot, and emerge with a 
     semi refined set of tools and techniques to work with SVG in solidity to create onchain art. 
     </p>
      
      </article>

     

      
    </main>
  )
}

