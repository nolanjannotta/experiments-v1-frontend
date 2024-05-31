import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import {FRAME_URL} from "@/app/constants.js";


async function getResponse(request, params) {
    const body = await request.json();
    const editionCounter = request.nextUrl.searchParams.get("editionCounter") || null;

    const image = `${FRAME_URL}/frames/images/browse?editionId=${params.editionId}&date=${Date.now()}`


    // const state = body.untrustedData.state?.serialized &&  JSON.parse(decodeURIComponent(body.untrustedData.state?.serialized))


    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {label: "previous",  target: `${FRAME_URL}/frames/browse/${Number(params.editionId)-1}`},
                {label: "mint", target: `${FRAME_URL}/frames/mint/${Number(params.editionId)}`},
                {label: "next",  target: `${FRAME_URL}/frames/browse/${Number(params.editionId)+1}`},
                {label: "Home", target: `${FRAME_URL}/frames`}
            ],

            image: {src: image, aspectRatio: '1:1'},
            state: "adfadfdffdf"
        })
    );

}

export async function POST(request, {params}) {
  return getResponse(request, params);
}



export const dynamic = "force-dynamic";
