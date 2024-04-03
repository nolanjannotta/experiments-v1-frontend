import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint } from "@/app/frameConfig.js";
import sharp from "sharp";
import {kv} from "@vercel/kv"

const URL = "http://localhost:3000"


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


    let svg = `<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
                  <rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>
                  <text x="500" y="85" text-anchor="middle" font-size="30">Currently minting</text>
                    <text x="500" y="160" text-anchor="middle" font-size="60"> ${lastData.lastEdition.name}</text>

                    <text x="400" y="220" text-anchor="middle" font-size="25">supply: ${Number(lastData.lastEdition.supply)}</text>
                    <text x="600" y="220" text-anchor="middle" font-size="25">next id: ${Number(lastData.lastEdition.counter) + 1}</text>

                    <text x="500" y="250" text-anchor="middle" font-size="25">${allowance.message}</text>

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
