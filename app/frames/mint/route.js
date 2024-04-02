import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint } from "@/app/frameConfig.js";
import sharp from "sharp";

const URL = "http://localhost:3000"


async function getResponse(request) {
    const body = await request.json();
    const { isValid } = await getFrameMessage(body, { neynarApiKey: process.env.NEXT_PUBLIC_NAYNAR_KEY, allowFramegear: true});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    const lastData = await getLastMint();
    // console.log(lastData.lastEdition)

    let svg = `<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
                  <rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>
                  <text x="500" y="85" text-anchor="middle" font-size="30">Currently minting</text>
                    <text x="500" y="160" text-anchor="middle" font-size="60"> ${lastData.lastEdition.name}</text>

                    <text x="400" y="220" text-anchor="middle" font-size="25">supply: ${Number(lastData.lastEdition.supply)}</text>
                    <text x="600" y="220" text-anchor="middle" font-size="25">next id: ${Number(lastData.lastEdition.counter) + 1}</text>


                   <image x="200" y="300" width="600" height="600" href="${lastData.lastUri}"></image>

                   </svg>
                  `

    const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

    const base64Img = `data:image/png;base64,${img.toString('base64')}`;

    // console.log(base64Img)

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "a"},{label: "b"},{label: "c"},{label: "d"}],
            image: {src: base64Img, aspectRatio: '1:1'},
            postUrl: `${URL}/frames/submit`,
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
