import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import {FRAME_URL} from "@/app/constants.js";
import {getEditionCounter} from "../../../frameConfig.js";


async function getResponse(request, params) {
    const body = await request.json();
    const editionCounter = request.nextUrl.searchParams.get("editionCounter");

    const image = `${FRAME_URL}/frames/images/browse?editionId=${params.editionId}&date=${Date.now()}`


    // const state = body.untrustedData.state?.serialized &&  JSON.parse(decodeURIComponent(body.untrustedData.state?.serialized))
    const buttons = [
         {label: "previous",  target: `${FRAME_URL}/frames/browse/${Number(params.editionId)-1}?editionCounter=${editionCounter}`},
        {label: "mint", target: `${FRAME_URL}/frames/mint/${Number(params.editionId)}`},
        {label: "Home", target: `${FRAME_URL}/frames`},
        {label: "next",  target: `${FRAME_URL}/frames/browse/${Number(params.editionId)+1}?editionCounter=${editionCounter}`},

    ]

    Number(params.editionId) === 1 && buttons.shift()
    Number(params.editionId) === Number(editionCounter) && buttons.pop()


    return new NextResponse(
        getFrameHtmlResponse({
            buttons: buttons,

            image: {src: image, aspectRatio: '1:1'},
        })
    );

}

export async function POST(request, {params}) {
  return getResponse(request, params);
}


export const dynamic = "force-dynamic";
