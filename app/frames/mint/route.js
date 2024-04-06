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

    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEXT_PUBLIC_NAYNAR_KEY, allowFramegear});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    const lastData = await getLastMint();
    let currentAllowance = await kv.get(message.interactor.fid);
        console.log(currentAllowance)
    !currentAllowance ? currentAllowance = {} : currentAllowance;
    if(currentAllowance[lastData?.lastEdition.name] == null) {
        let name = lastData?.lastEdition.name;
        const newAllowance = {...currentAllowance, [name]: 2};
        await kv.set(message.interactor.fid, newAllowance);
    }




    const image = `${FRAME_URL}/frames/images/mint?date=${Date.now()}&editionName=${lastData.lastEdition.name}&supply=${lastData.lastEdition.supply.toString()}&remaining=${(lastData.lastEdition.supply - lastData.lastEdition.counter).toString()}&lastId=${((lastData.lastEditionId * 1000000n) + lastData.lastEdition.counter).toString()}&allowance=${currentAllowance[lastData.lastEdition.name] == null ? 2 : currentAllowance[lastData.lastEdition.name]}`
    process.env.NODE_ENV !== 'production' ? message.interactor.verified_addresses.eth_addresses = ["0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", "0xcddb54bbAC783c2aE9860A8e494556c0b61e4Eee"] : message.interactor.verified_addresses.eth_addresses
    
    let buttons = [];
    if(currentAllowance[lastData.lastEdition.name] == null || currentAllowance[lastData.lastEdition.name] > 0) {
        buttons = message.interactor.verified_addresses.eth_addresses.map((address) => {return {label: `${address.slice(0,6)}...${address.slice(-4)}`, action: "post", target: `${FRAME_URL}/frames/submit?address=${address}`}})
    }
    else {
        buttons = [{label: "mint on the website!", action: "link", target: `${FRAME_URL}/mint`}]
    }


    return new NextResponse(
        getFrameHtmlResponse({
            buttons: buttons,
            image: {src: image, aspectRatio: '1:1'},
            postUrl: `${FRAME_URL}/frames/submit`,
            state: {tokenName: lastData.lastEdition.name}
            
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";

// export const GET = POST;
