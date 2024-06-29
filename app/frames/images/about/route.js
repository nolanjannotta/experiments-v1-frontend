import { ImageResponse } from "next/og";
import Card from "@/components/Card";

const pageContent = [
  `
    Experiments V1 is a project where I learn, explore, and
    experiment with 100% onchain generative art and onchain mechanics.
    This project is inspired by platforms like ArtBlocks and others. One
    important difference however is that here, there will never be any offchain
    code, p5.js, javascript, ipfs, or URLs to servers. Raw SVG code is generated
    and returned 100% onchain forever. This is a 'platform' for sharing and
    minting generative onchain art/ideas. It's permissioned, but open to anyone!
    click here for more information. The goal of this project is to learn a lot,
    experiment with onchain art and mechanics, demonstrate some
    possibilities of onchain SVGs, encourage other artists to get involved,
    develop my personal style, and emerge with a set of tools and techniques to
    work with SVG in solidity to create onchain art. Then take what I've learned
    and start thinking about a v2.
  `,

  `
    These 'experiments' (also 'editions') are managed by a single ERC721 smart
    contract on the BaseL2 blockchain. Each individual edition is linked to its
    own immutable Art Generator contract. This contract is in charge of
    generating the raw SVG code and any attributes that this experiment may or
    may not have.
  `,

  `
    Each token has 32 bits of storage that is stored in the ERC721 smart
    contract. This can be number, string, bytes, etc. When it comes to
    generative art, it is usually a 'random' number. This number can be derived
    from block data like timestamp, block hash, minters address, etc. The seed
    can also be any arbitrary data that can fit into 32 bytes, and can be
    packed, unpacked and modified by the art generator contract.
  `,

  `
    This project is my submission to Base's Onchain Summer Buildathon 2024. To
    get it started, I've created several editions that will be deployed and
    mintable as soon as this project is ready. I will continue to create and add
    new editions over time to develop my personal style and to show the
    possibilities of onchain SVG art and hopefully inspire others to get
    involved.
  `,
];

export async function GET(request) {
  const index = request.nextUrl.searchParams.get("pageIndex");
  // const tokenId = request.nextUrl.searchParams.get("tokenId")

  const style = {
    width: "90%",
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  };

  return new ImageResponse(
    (
      <Card>
        <h1>About:</h1>
        <div style={style}>{pageContent[index]}</div>
        <br />
        <br />
        <br />
        <p>{parseInt(index) + 1}/3</p>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}
