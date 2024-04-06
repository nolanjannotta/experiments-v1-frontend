import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint, checkTxStatus, mint, getEditionCounter } from "@/app/frameConfig.js";
import sharp from "sharp";
import {kv} from '@vercel/kv'
import {FRAME_URL} from "@/app/constants.js";
// const URL = "http://localhost:3000"


async function getResponse(request) {
    const body = await request.json();
    const allowFramegear = process.env.NODE_ENV !== 'production'; 

    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY, allowFramegear});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    const userAllowances = await kv.get(`${message.interactor.fid}`);
    // const lastMintTimestamp = await kv.get("lastMintTimestamp");
    const state = JSON.parse(decodeURIComponent(message.state?.serialized))
    const minterAddress = state.minterAddress
    const tokenName = state.tokenName
    const submittedAt = state.submittedAt
    // const editionCounter = await getEditionCounter();
    // console.log(currentAllowance);

   
    // console.log(isValid)
    // const lastData = await getLastMint();
    let tx;
    // console.log(currentAllowance)
    
    let allowance = Number(userAllowances[tokenName]);
    let lastSubmitted = Number(userAllowances.lastSubmitted) || 0;
    // console.log("interval", Date.now() - timestamp)
    if(allowance > 0 &&  submittedAt - lastSubmitted > 10){
        const newState = {...userAllowances, [tokenName]: allowance-1, lastSubmitted: submittedAt};
        await kv.set(message.interactor.fid, newState);
        try {
            tx = await mint(minterAddress);
        } catch (error) {
            console.error(error)
        }
        
    }

    const image = `${FRAME_URL}/frames/images/results?date=${Date.now()}` //&address=${minterAddress}&tokenName=${tokenName}`

    
    // let state = JSON.parse(body.untrustedData.state)
    // let results; // =  await checkTxStatus(state.hash)

    // const results = await checkTxStatus(state.hash)

    // console.log(JSON.parse(body.untrustedData.state))

    // let svg = `<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
    //               <rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>
                  
    //                 <text x="500" y="400" text-anchor="middle" font-size="80">tx submitted...</text>
    //                 <text x="500" y="550" text-anchor="middle" font-size="30">check status after several seconds</text>

    //                 <text x="500" y="700" text-anchor="middle" font-size="80">${results?.status == "success" ? "success!" : ""}</text>
    //                </svg>
    //               `

    // const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

    // const base64Img = `data:image/png;base64,${img.toString('base64')}`;

    // console.log(base64Img)

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
