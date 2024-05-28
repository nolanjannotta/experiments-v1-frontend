import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import {FRAME_URL} from "@/app/constants.js";


async function getResponse(request) {
  const editionId = request.nextUrl.searchParams.get("editionId");
    const body = await request.json();
    // const allowFramegear = process.env.NODE_ENV !== 'production'; 

    // const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY, allowFramegear});
    // if (!isValid) {
    //     return new NextResponse('Message not valid', { status: 500 });
    //   }

    const image = `${FRAME_URL}/frames/images/browse/${editionId}`



    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "previous",  target: `${FRAME_URL}/frames/browse/${Number(editionId)-1}`},{label: "mint", target=`${FRAME_URL}/frames/mint`},{label: "next",  target: `${FRAME_URL}/frames/browse/${Number(editionId)+1}`}],
            image: {src: image, aspectRatio: '1:1'},
            postUrl: `${FRAME_URL}/frames/results`,
            // state: {minterAddress: address, tokenName: tokenName, submittedAt: Date.now()/1000}
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
