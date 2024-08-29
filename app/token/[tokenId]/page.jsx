"use server";

import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { contract, publicClient } from "@/app/contract";
import Stats from "./Stats";
import Link from "next/link";
// import sharp from "sharp";
// import {FRAME_URL} from "@/app/constants.js";
import { artAddress } from "@/app/constants.js";
import { baseScanUrl } from "@/app/constants.js";
import Moralis from "moralis";
// import { base } from "viem/chains";
import { FRAME_URL } from "@/app/constants.js";
await Moralis.start({ apiKey: process.env.MORALIS_KEY });

async function tokenData(tokenId) {
  try {
    const uri = await contract.read.tokenURI([tokenId]);
    const owner = await contract.read.ownerOf([tokenId]);
    const edition = await contract.read.getEdition([
      Math.floor(tokenId / 1000000),
    ]);

    let bufferObj = Buffer.from(
      uri.split("data:application/json;base64,")[1],
      "base64"
    );
    let metadata = JSON.parse(bufferObj.toString("utf-8"));
    return { metadata, owner, error: false, edition: edition };
  } catch (e) {
    return { metadata: {}, owner: "", error: true };
  }

}


async function getTokenTransfers(tokenId) {
  try {
    const response = await Moralis.EvmApi.nft.getNFTTransfers({
      chain: publicClient.chain.id,
      format: "decimal",
      order: "DESC",
      address: artAddress,
      tokenId: tokenId,
    });
    return response.raw.result;
  } catch (e) {
    return {};
    // console.error(e);
  }
}

export async function generateMetadata({ params }) {
  const imageUrl = `${FRAME_URL}/frames/images/token?tokenId=${
    params.tokenId
  }&date=${Date.now()}`;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: "open sea",
        action: "link",
        target: `https://opensea.io/assets/base/${artAddress}/${params.tokenId}`,
      },
    ],
    image: {
      src: imageUrl,
      aspectRatio: "1:1",
    },
  });

  return {
    title: "",
    description: "frame for minting on chain art experiments",
    openGraph: {
      title: "Experiments V1",
      description: "frame for minting on chain art experiments",
      images: [imageUrl],
    },
    other: {
      ...frameMetadata,
    },
  };
}

function truncateAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

async function Token({ params }) {
  const transfers = await getTokenTransfers(params?.tokenId);
  console.log(typeof transfers);
  const data = await tokenData(params?.tokenId);

  // if(data.error) {
  //   return  <section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  //     <h3>uh oh, token id #{params.tokenId} not found!</h3>

  //   </section>
  // }
  return (
    <>

      <Stats data={data} tokenId={params.tokenId} address={contract.address} />

      <article style={{ textAlign: "center" }}>
        <hr />
        <h4>&#x2709; transfers:</h4>
        
        <br />
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
          {transfers && transfers?.map((transfer, i) => {
            let hours = new Date(transfer.block_timestamp).toLocaleTimeString();
            return (
              <li key={i}>
                &#x7c; &nbsp;&nbsp; &#x2709; #{i+1}{" "}
                &nbsp;&#x7C;&nbsp; &#128337;{" "}
                {new Date(transfer.block_timestamp).toLocaleString()}{" "}
                {hours[1] == ":" && <>&nbsp;</>}
                &nbsp;&#x7C;&nbsp;
                &#91;{truncateAddress(transfer.from_address)}&#93; &#x279F;
                &#91;{truncateAddress(transfer.to_address)}&#93;
                &nbsp;&#x7C;&nbsp;{" "}
                <a
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  href={`${baseScanUrl}/tx/${transfer.transaction_hash}`}
                >
                  tx&#8599;
                </a>
                &nbsp;&#x7C;
              </li>
            );
          })}
          <hr />
        </ul>
      </article>
    </>
  );
}

export default Token;
