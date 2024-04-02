import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint,mint } from "@/app/frameConfig.js";
import sharp from "sharp";

const URL = "http://localhost:3000"


async function getResponse(request) {
    const body = await request.json();
    const { isValid } = await getFrameMessage(body, { neynarApiKey: process.env.NEXT_PUBLIC_NAYNAR_KEY, allowFramegear: true});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    const lastData = await getLastMint();

    let svg = `<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
                  <rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>
                  <text x="500" y="400" text-anchor="middle" font-size="80">minting</text>
                  <text x="500" y="490" text-anchor="middle" font-size="80">1 ${lastData.lastEdition.name}</text>
                  <text x="500" y="580" text-anchor="middle" font-size="60">to</text>
                  <text x="500" y="670" text-anchor="middle" font-size="60">*address goes here*</text>
             

                   </svg>
                  `

    const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

    const base64Img = `data:image/png;base64,${img.toString('base64')}`;

    // console.log(base64Img)

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "submit", action:"post",  target: `${URL}/frames/results`}],
            image: {src: base64Img, aspectRatio: '1:1'},
            postUrl: `${URL}/frames/results`,
            // state: {hash: "0x762db698e005647bb1ba0d87e290cdafb55bf7ad6f3b0b25eba3d2b2c48fa74e"}
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
