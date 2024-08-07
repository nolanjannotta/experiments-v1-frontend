// "use client"
import Link from 'next/link'
import Image from 'next/image';

import { contract } from "@/app/contract";


async function getThumbnails() {
  const lastEdition = await contract.read.EDITION_COUNTER();
  const name = await contract.read.name();
  console.log(name)
  console.log(lastEdition)
  let uris = [];
  let editions = []
  let ids = []

  
  
  for (let i = 1; i <= (lastEdition <=4 ? lastEdition : 4); i++) {
    let randomEdition = Math.floor(Math.random() * Number(lastEdition) + 1);
    let edition = await contract.read.getEdition([randomEdition]);
    while(ids.includes(randomEdition) || edition.counter === 0n) {
      randomEdition = Math.floor(Math.random() * Number(lastEdition) + 1);
      edition = await contract.read.getEdition([randomEdition]);
    }
    // editions.push(randomEdition)
    editions.push(edition)
    ids.push(randomEdition)
  }


  for(const index of editions.keys()) {
    // const editionData = await contract.read.getEdition([edition]);
    const tokenId = Math.floor(Math.random() * Number(editions[index].counter)) + 1;
    try {
      let thumbnail = await contract.read.getDataUri([ids[index] * 1000000 + tokenId]);
      uris.push(thumbnail);
    }
    catch(e) {
      // console.log(e)
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
              return (<Image width={200} style={shadow}  height={200} key={index} src={uri} alt="thumbnail"></Image>
              )
            })}
          </section>
          <br/>
          <br/>
        </header>
        <p>
          Experiments V1 is a project where I learn, explore, and{" "}
          <i>experiment</i> with 100% onchain generative art and onchain
          mechanics. This project is inspired by platforms like{" "}
          <a target="_blank" href="https://www.artblocks.io/">
            {" "}
            ArtBlocks
          </a> and others. One important difference however is that here, there will never
          be any offchain code, p5.js, javascript, ipfs, or URLs to servers. Raw SVG code is generated
          and returned 100% onchain forever. This is a &apos;platform&apos; for sharing and minting generative onchain art/ideas. It&apos;s permissioned, 
          but open to anyone! click <Link href="/create">here</Link> for more information. The goal of this project is to learn a lot, experiment 
          with onchain art and mechanics, demonstrate <i>some</i> possibilities of onchain SVGs, encourage other artists to get involved, develop my personal style, and emerge with a set of
          tools and techniques to work with SVG in solidity to create onchain
          art. Then take what I&apos;ve learned and start thinking about a v2.
        </p>
        <p>
        These &quot;experiments&quot; (also
          &quot;editions&quot;) are managed by a single ERC721{" "}
          <Link href="/contracts/main">smart contract</Link> on the{" "}
          <a target="blank" href="https://www.base.org/">
            Base
          </a>{" "}
          L2 blockchain. Each individual edition is linked to its own immutable{" "}
          <Link href="/contracts/artgenerator">Art Generator</Link> contract.
          This contract is in charge of generating the raw SVG code and any
          attributes that this experiment may or may not have.
          </p>
        <br />

        <p>
          Each token has 32 bytes of storage that is stored in the ERC721 smart
          contract. This can be number, string, bytes, etc. When it comes to
          generative art, it is usually a &quot;random&quot; number. This number
          can be derived from block data like timestamp, block hash, minters 
          address, etc. The seed can also be any arbitrary
          data that can fit into 32 bytes, and can be packed, unpacked and
          modified by the art generator contract.
        </p>

        <br />
        
        <p>
          This project is my submission to{" "}
          <a target="_blank" href="https://www.base.org/buildersummer?utm_source=dotorg&utm_campaign=onchainsummer">Base&apos;s 
          Onchain Summer Buildathon 2024</a>.  To get it started, I&apos;ve created 
          several editions that will be deployed and mintable as soon as this project is ready. I will continue to create and add 
          new editions over time to develop my personal style and to show the possibilities of onchain SVG art and hopefully inspire others to get involved.
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
      

      <br />
      <br />
      <p>
        Below are some flowcharts that show the basic moving parts for some of
        functions in this project.{" "}
      </p>

      <br/>
      <br/>

      <h3>Constructing the SVG images</h3>

      <p>
        when an SVG for a token id is being rendered by the main smart contract, it will first get the seed of the token, 
        call the art generator contract to get the raw svg code, then insert the code into a blank 1000x1000 SVG template. At the top of the blank template,
        the contract will add a {'<title>'} and {'<desc>'} element with the name and artist address of the edition.
        If the artist chooses to add a signature, that will be added to the bottom of the SVG. By default it will be placed 
        in the bottom right corner, the artist can change that by adding a <code>getSignatureTranslate()</code> function to the art generator contract (more info <Link href="/create">here</Link>).
        The code that is returned from the art generator contract can be any valid SVG elements that can inside an SVG for example:

      </p>
      <ul>
        <li>another SVG &#8594; {'<svg>...</svg>'}</li>
        <li>a group of elements &#8594; {'<g> <rect/> <circle/> ... </g>'}</li>
        <li>any other elements &#8594; {'<rect/> <circle/> ...'}</li>

      </ul>

      <div style={outline}>
        <img style={shadow} src="/svgFlowChart.png" alt="svg flow chart"></img>
      </div>



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
        <img style={shadow} src="/mintFlowChart.png" alt="minting flow chart"></img>
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
        <img style={shadow} src="/tokenURIFlowChart.png" alt="tokenURI flow chart"></img>
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
        <img style={shadow} src="/modifyFlowChart.png" alt="art generator flow chart"></img>
      </div>

      <br/>
      <br/>

      <p>
        As you can see, this project is pretty simple, but very fun! As said above, this is a place for me to 
        experiment and draft ideas, while at the same time creating a finished product that best conveys my vision and that anyone can use and enjoy. 
        This is version 1 of n versions. Brainstorming for V2 can be found <Link href="/v2">here</Link>. I encourage all 
        onchain generative art enthusiasts to reach out if you want to contribute or have ideas! 

      </p>

      </article>
    </main>
  );
}

const shadow = {
  boxShadow: "2px 2px 5px grey"
}


const outline = {
  border: "1px solid black",
  // padding: "1rem",
  margin: "1rem"
}

const thumbnails = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  gap: "2rem"

}