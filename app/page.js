// "use client"
import Link from 'next/link'
import Image from 'next/image';

import { contract } from "@/app/contract";


async function getThumbnails() {
  const lastEdition = await contract.read.EDITION_COUNTER();
  console.log(lastEdition)
  let uris = [];
  let editions = []

  
  
  for (let i = 1; i <= (lastEdition <=4 ? lastEdition : 4); i++) {
    let randomEdition = Math.floor(Math.random() * Number(lastEdition) + 1);
    while(editions.includes(randomEdition)) {
      randomEdition = Math.floor(Math.random() * Number(lastEdition) + 1);
    }
    editions.push(randomEdition)
  }

  for(const edition of editions) {
    const editionData = await contract.read.getEdition([edition]);
    const tokenId = Math.floor(Math.random() * Number(editionData.counter)) + 1;
    try {
      let thumbnail = await contract.read.getDataUri([edition * 1000000 + tokenId]);
      uris.push(thumbnail);
    }
    catch(e) {
      console.log(e)
    }
  }
  return uris;

}


export default async function Home() {
  const uris = await getThumbnails();

  return (
    <main>
      <article>
        <header>
          <h1>Welcome</h1>
          <br/>
          <br/>
          <section style={thumbnails}>
            {uris.map((uri, index) => {
              return (
                <Image width={200} height={200} key={index} src={uri} alt="thumbnail"></Image>
              )
            })}
          </section>
          <br/>
          <br/>
        </header>
        <p>
          Experiments V1 is a project where I learn, explore, and{" "}
          <i>experiment</i> with 100% onchain generative art and onchain
          mechanics. This project is inspired by things like{" "}
          <a target="_blank" href="https://www.artblocks.io/">
            {" "}
            ArtBlocks
          </a> and others. One important different however is that here, there will never
          be any offchain code, p5.js, javascript, ipfs, or URLs to servers. Raw SVG code is generated
          and returned 100% onchain forever. These experiments are managed by a single ERC721{" "}
          <Link href="/contracts/main">smart contract</Link> on the{" "}
          <a target="blank" href="https://www.base.org/">
            Base
          </a>{" "}
          L2 blockchain. Each individual &quot;experiment&quot; (also
          &quot;edition&quot;) is linked to its own immutable{" "}
          <Link href="/contracts/artgenerator">ArtGenerator</Link> contract.
          This contract is in charge of generating the raw SVG code and any
          attributes that this experiment may or may not have. The goal of this project is to learn a lot, experiment 
          with onchain art and mechanics, demonstrate some possibilities of onchain SVGs, develop my personal style, and emerge with a set of
          tools and techniques to work with SVG in solidity to create onchain
          art. Then take what I&apos;ve learned and start thinking about a v2.
        </p>
        <br />

        <p>
          Each token has 32 bits of storage that is stored in the ERC721 smart
          contract. This can be number, string, bytes, etc. When it comes to
          generative art, it is usually a &quot;random&quot; number. This number
          can be derived from block data like timestamp, block hash, minters 
          address, etc. The seed can also be any arbitrary
          data that can fit into 32 bytes, and can be packed, unpacked and
          modified by the art generator contract.
        </p>

        <br />

        <p>
          My original long term vision for this project is for each edition to be &quot;uploaded&quot;/deployed individually over
          time as I make them. Once a new edition is added, minting for the
          previous one will be paused. If the supply for a paused edition is not reached, the owner
          can unpause and pause at anytime as well as mint paused editions. They
          will have a low supply (100-300 probably, 500 max), start as completely free,
          mintable through this website as well as through a frame in warpcast.
          Depending on the demand, the owner may set a reasonable price and
          royalty for the remaining tokens and new editions.
        </p>
        <p>
          However, this project is my submission to{" "}
          <a target="_blank" href="https://www.base.org/buildersummer?utm_source=dotorg&utm_campaign=onchainsummer">Base&apos;s Onchain Summer Buildathon</a>. 
          {" "} Because of this, I will doing things a little differently. To start, all of my finished editions that I have ready by the deadline will be deployed and 
          added to the project at the same time. The supplies will be way higher to be more inclusive (2,000 - 4,000 per edition...TBD). 
          All editions will be mintable at the same time. They will still be completely free or extremely cheap. 
        
          </p>
        <br />

        <p>
        One thing worth noting is that, since everything is onchain, you&apos;re faced with a couple limitations. 
        For example contract size, gas limit, computing power, lack of standard SVG solidity libraries (for now...), etc.
        I actually like this &quot;feature&quot;. For me, it pushes me to be more creative will less options. It also 
        helps keep me from overthinking.
    
        </p>
        <br/>
        <p>
          The token IDs work like this: &nbsp;
          <code>(editionId x 1,000,000) + editionCounter</code>
          <br />
          For example: tokenId #1000001 is the first token of edition 1,
          #4000056 is the 56th token of edition 4, etc.
        </p>
      </article>

      <br />
      <br />
      <p>
        Below are some flowcharts that show the basic moving parts for some of
        functions in this project.{" "}
      </p>
      <br />
      <br />
      <h3>Minting:</h3>


      <p>
       Minting is very straight forward. When a user mints, a few basic checks are done to make sure the edition exists 
       and the max supply is not reached. If they all pass, the contract will call the art generator contract to create the seed, store it, 
        then mint the token to the user. Each Art Generator can create the seed in any way they want. 
        it might be a &quot;random&quot; number from block data. It could store specific data, or be blank.
      </p>


      <div style={outline}>
        <img src="/mintFlowChart.png" alt="minting flow chart"></img>
      </div>

      <br/>


      <br />
      <br />
      <br />
      <br />

      <h3>Token URI</h3>
      <p>
        When you call <code>tokenURI(id)</code>, the contract will look up the edition data, get the art generator address and token seed, then call <code>getRawSvgAndAttributes(seed)</code> with 
        the seed. The Art Generator contract will generator the raw svg code and any attributes that the edition may have. It then returns the svg and attributes to the main contract.
        the main contract then base64 encodes the svg, creates a json string with the name, description, attributes, etc. Then encodes all of that together and returns it as a base64 data uri.
      </p>

      <div style={outline}>
        <img src="/tokenURIFlowChart.png" alt="tokenURI flow chart"></img>
      </div>
      <br />

      <br />
      <br />
      <br />

      <h3>Modifying:</h3>
      <p>
        Modifying allows an owner of a token to modify the seed of the token and
        store the new value in the contract. Each edition can modify the seed in
        different ways. If an edition does not allow modifying, it will revert.
        To modify, a user calls{" "}
        <code>modify(uint tokenId, bytes calldata data).</code>
        <code> `data`</code> is an array of bytes that is{" "}
        <code>abi.encoded</code> off chain. The data that is encoded depends on
        which edition is being modified. <code>`tokenId`</code>
        is the id of the token being modified, must be owned by the caller.
      </p>
      <br />
      <ol>
        <li>
          A user calls <code>modify</code> on the main contract with the token
          id and the encoded data.
        </li>
        <li>The contract verifies that the token is owned by the caller.</li>
        <li>
          The token ID is divided by 1,000,000 to get the edition ID, then the
          contract will look up the edition, get the art generator address, and
          attempt to call <code>modify</code> on the art generator contract
          passing the same data.
        </li>


        <li>
          The art generator either revert, or will try to decode the data into
          the correct types and modify the seed.


          <ul>
            <li>
              this is where everything happens, the artist/creator can do
              whatever they want here.
            </li>

            <li>
              The contract at this point has 3 things:
              <ul>
                <li>the token id</li>
                <li>
                  the main contract address <code>(msg.sender)</code>
                </li>
                <li>the input data from the user</li>
              </ul>
              </li>
              <li>
                some examples could be:
                <ul>
                  <li>
                    it could ignore all that data and instead use `random` block
                    data to create a new seed.
                  </li>
                  <li>pack together all the user input to create a new seed</li>
                  <li>
                    call the main contract, get the current seed of the token,
                    increment a counter and revert if reached a certain point, check if the owner also owns other
                    editions/ids, etc.
                  </li>
                </ul>
              
               
            </li>
          </ul>


        </li>
        <li>
          the art generator then returns a new bytes32 seed which is stored by the main contract.
          </li>
      </ol>

      <div style={outline}>
        <img src="/modifyFlowChart.png" alt="art generator flow chart"></img>
      </div>

      <br/>
      <br/>

      <p>
        As you can see, this project is pretty simple, but very fun! As said above, this is a place for me to 
        experiment and draft ideas, while at the same time creating a finished product that best conveys my vision and that anyone can use and enjoy. 
        This is version 1 of n versions. Brainstorming for V2 can be found <Link href="/v2">here</Link>. I encourage all 
        onchain generative art enthusiasts to reach out if you want to contribute or have ideas! 

      </p>
    </main>
  );
}


const outline = {
  border: "1px solid black",
  padding: "1rem",
  margin: "1rem"
}

const thumbnails = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  gap: "2rem"

}