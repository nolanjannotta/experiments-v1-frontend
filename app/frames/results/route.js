import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint, checkTxStatus, mint, getEditionCounter } from "@/app/frameConfig.js";
import sharp from "sharp";
import {kv} from '@vercel/kv'
import {FRAME_URL} from "@/app/constants.js";
// const URL = "http://localhost:3000"


async function getResponse(request) {
    const body = await request.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEXT_PUBLIC_NAYNAR_KEY, allowFramegear: true});
    const currentAllowance = await kv.get(`${body.mockFrameData.interactor.fid}`);
    const editionCounter = await getEditionCounter();
    console.log(currentAllowance);
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    // console.log(isValid)
    // const lastData = await getLastMint();
    let tx;
    
    
    if(currentAllowance != null && currentAllowance[editionCounter] < 2) {
        let allowance = Number(currentAllowance[editionCounter]);
        const newState = {...currentAllowance, [editionCounter]: allowance+1};
        await kv.set(`${body.mockFrameData.interactor.fid}`, newState);
        // tx = await mint("0x8f088eca0009ad61fb94a6d7e9a5d7a087c08564");
        // console.log("tx",tx)  
    }

    
    // let state = JSON.parse(body.untrustedData.state)
    let results; // =  await checkTxStatus(state.hash)

    // const results = await checkTxStatus(state.hash)

    // console.log(JSON.parse(body.untrustedData.state))

    let svg = `<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
                  <rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>
                  
                    <text x="500" y="400" text-anchor="middle" font-size="80">tx submitted...</text>
                    <text x="500" y="550" text-anchor="middle" font-size="30">check status after several seconds</text>

                    <text x="500" y="700" text-anchor="middle" font-size="80">${results?.status == "success" ? "success!" : ""}</text>
                   </svg>
                  `

    const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

    const base64Img = `data:image/png;base64,${img.toString('base64')}`;

    // console.log(base64Img)

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "check status"}],
            image: {src: base64Img, aspectRatio: '1:1'},
            postUrl: `${FRAME_URL}/frames/status`,
            state: {hash: tx}
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
