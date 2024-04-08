import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint, checkTxStatus, mint,getSvg } from "@/app/frameConfig.js";
import sharp from "sharp";
import {FRAME_URL} from "@/app/constants.js";
// const URL = "http://localhost:3000"


async function getResponse(request) {
    const body = await request.json();
    const allowFramegear = process.env.NODE_ENV !== 'production'; 

    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY, allowFramegear});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    // console.log(isValid)
    // const lastData = await getLastMint();
    const state = JSON.parse(decodeURIComponent(message.state?.serialized))
    let results = {}
    
    if(state.hash) results = await checkTxStatus(state.hash)


    const image = `${FRAME_URL}/frames/images/status?date=${Date.now()}&tokenId=${results.tokenId || 0}&status=${results.status}`
    

    return new NextResponse(
        getFrameHtmlResponse({
            buttons:  [results.status != "success" ? {label: "check status"} : {label: "home"}],
            image: {src: image, aspectRatio: '1:1'},
            postUrl: results.status != "success" ? `${FRAME_URL}/frames/status` : `${FRAME_URL}/frames`,
            state: {hash: state.hash}
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
