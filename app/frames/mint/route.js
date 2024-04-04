import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint } from "@/app/frameConfig.js";
import sharp from "sharp";
import {kv} from "@vercel/kv"
import {FRAME_URL} from "@/app/constants.js"
// const URL = "http://localhost:3000"




async function getResponse(request) {
    // const obj = {name: "nolan", age: 28, location: "california"}

    // await kv.set("username #1", obj);
    // const test = await kv.get("username #1");
    let allowance = {canMint: false, message: "" };

    // console.log(test);

    const body = await request.json();
    console.log(body.mockFrameData.interactor.fid)
    const { isValid } = await getFrameMessage(body, { neynarApiKey: process.env.NEXT_PUBLIC_NAYNAR_KEY, allowFramegear: true});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }

 

    // console.log(currentAllowance)
    const lastData = await getLastMint();

    const image = `${FRAME_URL}/frames/images/mint?date=${Date.now()}&editionName=${lastData.lastEdition.name}&supply=${lastData.lastEdition.supply.toString()}&remaining=${(lastData.lastEdition.supply - lastData.lastEdition.counter).toString()}&lastId=${((lastData.lastEditionId * 1000000n) + lastData.lastEdition.counter).toString()}`
    // console.log(lastData.lastEdition)

    const currentAllowance = await kv.get(`${body.mockFrameData.interactor.fid}`);
    
    // console.log(currentAllowance, currentAllowance[lastData?.lastEditionId])
    
    if(currentAllowance == null || currentAllowance[lastData?.lastEditionId] == null) {
        let name = lastData?.lastEdition.name;
        let id = lastData?.lastEditionId;
        const newAllowance = {...currentAllowance, [id]: 0};
        await kv.set(`${body.mockFrameData.interactor.fid}`, newAllowance);
        allowance.message = `you have 2 free warpcast mints for ${name}`
        allowance.canMint = true;
    }
    else {
        allowance.message = `you have ${2 - currentAllowance} free warpcast mints`
        allowance.canMint = currentAllowance < 2 ? true : false;
    }

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [{label: "a"},{label: "b"},{label: "c"},{label: "d"}],
            image: {src: image, aspectRatio: '1:1'},
            postUrl: `${FRAME_URL}/frames/submit`,
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";

// export const GET = POST;
