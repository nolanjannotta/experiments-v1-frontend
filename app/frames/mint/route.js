import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit";
import { getLastMint } from "@/app/frameConfig.js";
import sharp from "sharp";

const URL = "http://localhost:3000"

async function getResponse(request) {
    const body = await request.json();
    // const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    // console.log(body)
    const lastData = await getLastMint();

    const img = await sharp(Buffer.from(lastData.lastToken)).resize(1200).toFormat("png").toBuffer();

    const base64Img = `data:image/png;base64,${img.toString('base64')}`;

    // console.log(base64Img)

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "back"}],
            image: {src: base64Img, aspectRatio: '1:1'},
            postUrl: `${URL}/frames/results`,
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
