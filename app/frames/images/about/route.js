import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";


const pageContent = [
    `Experiments V1 is a project where I learn, explore, and experiment with 100% onchain 
    generative art and onchain mechanics. This project is inspired by projects like ArtBlocks. 
    These experiments are managed by a single ERC721 smart contract on the Base L2 blockchain. 
    Each individual "experiment" (also, "edition") is linked to its own immutable ArtGenerator 
    contract. This contract is in charge of generating the raw SVG code and any attributes that 
    this experiment may or may not have. There will never be any offchain scripts or URLs to 
    servers. Raw SVG code is generated and returned 100% onchain forever. The goal of this 
    project is to push my knowledge, experiment with onchain art and mechanics, make interesting 
    things, learn a lot, and emerge with a semi refined set of tools and techniques to work with 
    SVG in solidity to create onchain art. Then take what I've learned and start thinking about a v2. 
    One goal of v2 is to open it up other artists to deploy and share their own on chain art and 
    create an ecosystem of on chain that is all interactive and fun.`,

    `Each token has 32 bits of storage that is stored in the ERC721 smart contract. This can be 
    number, string, bytes, etc. When it comes to generative art, it is usually a "random" number. 
    This number can be derived from block data like timestamp, block hash, etc. The minters address 
    can also be used. The seed can also be any arbitrary data that can fit into 32 bytes, and can 
    be packed, unpacked and modified by the art generator contract.`,

    `Each edition will be "uploaded"/deployed individually over time as I make them. Once a new 
    edition is added, minting for the previous one will be paused. If the supply for a paused 
    edition is not reached, the owner can unpause and pause at anytime as well as mint paused 
    editions. They will have a low supply (100-300 probably, 500 max), start as completely free, 
    mintable through this website as well as through a frame in warpcast. In an effort to grow 
    my audience, every warpcast user who follows my account gets 2 free (zero gas!) mints for 
    each edition through the frame. Depending on the demand, the owner may set a reasonable price 
    and royalty (ERC-2981) for the remaining tokens and new editions (I gotta eat!).`
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
        {/* <h1>{status != "success" ? "transaction submitted!" : "success!"}</h1> */}
        {/* {status != "success" ? <p>refresh in a few seconds to check status</p> : ""} */}
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