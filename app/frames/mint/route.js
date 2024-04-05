import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint } from "@/app/frameConfig.js";
import sharp from "sharp";
import {kv} from "@vercel/kv"
import {FRAME_URL} from "@/app/constants.js"
// const URL = "http://localhost:3000"




async function getResponse(request) {
    const body = await request.json();
    const allowFramegear = process.env.NODE_ENV !== 'production'; 

    const { isValid } = await getFrameMessage(body, { neynarApiKey: process.env.NEXT_PUBLIC_NAYNAR_KEY, allowFramegear});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
      console.log(body)
    const lastData = await getLastMint();
    const currentAllowance = await kv.get("0");
        
    if(currentAllowance == null || currentAllowance[lastData?.lastEdition.name] == null) {
        let name = lastData?.lastEdition.name;
        const newAllowance = {...currentAllowance, [name]: 2};
        await kv.set(`${body.mockFrameData.interactor.fid}`, newAllowance);
    }




    const image = `${FRAME_URL}/frames/images/mint?date=${Date.now()}&editionName=${lastData.lastEdition.name}&supply=${lastData.lastEdition.supply.toString()}&remaining=${(lastData.lastEdition.supply - lastData.lastEdition.counter).toString()}&lastId=${((lastData.lastEditionId * 1000000n) + lastData.lastEdition.counter).toString()}&allowance=${currentAllowance[lastData.lastEdition.name] || 2}`


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
