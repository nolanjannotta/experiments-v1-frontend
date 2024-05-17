import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { mint } from "@/app/frameConfig.js";
import {kv} from '@vercel/kv'
import {FRAME_URL} from "@/app/constants.js";


async function getResponse(request) {
    const editionId = request.nextUrl.searchParams.get("editionId");
    const body = await request.json();
    const allowFramegear = process.env.NODE_ENV !== 'production'; 

    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY, allowFramegear});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }

    const state = JSON.parse(decodeURIComponent(message.state?.serialized))
    const minterAddress = state.minterAddress
    const tokenName = state.tokenName
    const submittedAt = state.submittedAt


    // console.log(message)
    const userAllowance = await kv.hget(message.interactor.fid, tokenName);
    const lastSubmitted = await kv.hget(message.interactor.fid, "lastSubmitted") || 0;

    let tx;
    if(userAllowance > 0 &&  submittedAt - lastSubmitted > 10){
        await kv.hset(message.interactor.fid, {[tokenName]: userAllowance-1, lastSubmitted: submittedAt});
        try {
            tx = await mint(editionId,minterAddress);
        } catch (error) {
            console.error(error)
        }
        
    }

    const image = `${FRAME_URL}/frames/images/results?date=${Date.now()}&error=${error ? "true" : "false"}` //&address=${minterAddress}&tokenName=${tokenName}`


    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "check status"}],
            image: {src: image, aspectRatio: '1:1'},
            postUrl: `${FRAME_URL}/frames/status`,
            state: {hash: tx}
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
