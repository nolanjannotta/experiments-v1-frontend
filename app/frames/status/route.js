import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint, checkTxStatus, mint,getSvg } from "@/app/frameConfig.js";
import sharp from "sharp";

const URL = "http://localhost:3000"


async function getResponse(request) {
    const body = await request.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEXT_PUBLIC_NAYNAR_KEY, allowFramegear: true});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }
    // console.log(isValid)
    // const lastData = await getLastMint();
    let state = JSON.parse(body.untrustedData.state)
    const results = await checkTxStatus(state.hash)
    // console.log(results)
    
    const image = results.status == "success" ? await getSvg(results.tokenId) : ""
    // const results = await checkTxStatus(state.hash)
    //   console.log(image)
    // console.log(JSON.parse(body.untrustedData.state))
    // ${image ? `<image x="200" y="300" width="600" height="600" href="${image}"></image>` : ""}
      let svg = "<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'><rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>";
      let buttons =[]
      if(image) {
        buttons = [{label: "check status"}, {label: "view", action: "link", target: `${URL}/browse/token/${results.tokenId}`}]

        svg = `${svg}<text x="500" y="150" text-anchor="middle" font-size="80">success!!</text> <image x="200" y="300" width="600" height="600" href="${image}"></image></svg>`
         
        


      }
      else {
        buttons = [{label: "check status"}]
        svg = `${svg}<text x="500" y="400" text-anchor="middle" font-size="80">tx submitted...</text>
                    <text x="500" y="550" text-anchor="middle" font-size="30">check status after several seconds</text>

                    <text x="500" y="700" text-anchor="middle" font-size="80">pending</text>
                   </svg>
                  `
      }
    

    const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

    const base64Img = `data:image/png;base64,${img.toString('base64')}`;

    // console.log(base64Img)

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: buttons,
            image: {src: base64Img, aspectRatio: '1:1'},
            postUrl: `${URL}/frames/status`,
            state: {hash: state.hash}
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
