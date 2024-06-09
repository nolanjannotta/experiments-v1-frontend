import { ImageResponse } from "next/og";
import Card from "@/components/Card";




const pageContent = [
    `Experiments V1 is a project where I learn, explore, and experiment with 100% onchain 
    generative art and onchain mechanics. This is inspired by projects like ArtBlocks. There will never 
    be any offchain scripts, javascript, ipfs, or URLs to servers. Raw SVG code is generated 
    and returned 100% onchain forever.
    These experiments are managed by a single ERC721 smart contract on the Base L2 blockchain. 
    Each individual "experiment" (also "edition") is linked to its own stateless immutable ArtGenerator 
    contract. These contracts are in charge of generating the raw SVG code and any attributes that 
    the experiment may or may not have. The goal of this 
    project is to expand my knowledge, experiment with onchain art and mechanics, develop my personal style,
    learn a lot, and emerge with a semi refined set of tools and techniques to work with 
    SVG in solidity to create onchain art. Then, take what I've learned and start thinking about v2. 
    The goal of v2, aside from overall improvements, is to open it up to other artists to deploy and 
    share their own onchain art and create an ecosystem of on chain that is all interactive and fun.`,

    `Each token has 32 bits of storage that is stored in the main ERC721 smart contract. This can be 
    number, string, bytes, etc. When it comes to generative art, it is usually a "random" number. 
    This number can be derived from block data like timestamp, block hash, minters address, etc.
    The seed can also be any arbitrary data that can fit into 32 bytes. It can be packed, 
    unpacked and modified by the art generator contract. Modifying allows a token owner to change 
    the seed to give different results. Each ArtGenerator contract can modify the seed in its own 
    way, although not all editions are modifiable.`,

    `My original long term vision for this project is for each edition to be "uploaded"/deployed individually over time as I make them. Once a new 
    edition is added, minting for the previous one will be paused. If the supply for a paused 
    edition is not reached, the owner can unpause and pause at anytime. They will have a low 
    supply (100-300 probably, 500 max), start as completely free, 
    mintable through this website as well as through a frame in warpcast. Depending on the demand, the owner may set a reasonable price 
    and royalty for the remaining tokens and new editions. At the time of deploying the project, I have
    a handful of editions already made and will be releasing them probably once a week.`,
    

    `However, this project is my submission to Base's Onchain Summer Buildathon. Because of this, I will doing 
    things a little differently. To start, all of my finished editions that I have ready by the deadline will be deployed and 
    added to the project at the same time. The supplies will be way higher to be more inclusive (2,000 - 4,000 per edition...TBD). 
    All editions will be mintable at the same time. They will still be completely free or extremely cheap. `
]



export async function GET(request) {
    const index = request.nextUrl.searchParams.get("pageIndex")
    // const tokenId = request.nextUrl.searchParams.get("tokenId")


const style = {
    width:"90%",
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  }

  return new ImageResponse(
    (
      <Card>

        <h1>About:</h1>
        <div style={style}>
           {pageContent[index]}
        </div>
        <br/>
        <br/>
        <br/>
        <p>{parseInt(index)+1}/3</p>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}