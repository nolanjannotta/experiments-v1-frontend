import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import {FRAME_URL} from "@/app/constants.js";


async function getResponse(request) {
  const editionId = request.nextUrl.searchParams.get("editionId");
    const body = await request.json();
    const allowFramegear = process.env.NODE_ENV !== 'production'; 

    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY, allowFramegear});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    const address = request.nextUrl.searchParams.get("address")
    const tokenName = JSON.parse(decodeURIComponent(message.state?.serialized)).tokenName

    const image = `${FRAME_URL}/frames/images/submit?date=${Date.now()}&address=${address}&tokenName=${tokenName}`



    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "submit", action:"post",  target: `${FRAME_URL}/frames/results?editionId=${editionId}`}],
            image: {src: image, aspectRatio: '1:1'},
            postUrl: `${FRAME_URL}/frames/results`,
            state: {minterAddress: address, tokenName: tokenName, submittedAt: Date.now()/1000}
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
