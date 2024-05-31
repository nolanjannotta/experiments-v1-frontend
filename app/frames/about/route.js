import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import {FRAME_URL,allowFramegear} from "@/app/constants.js";
import {getEditionCounter} from "@/app/frameConfig.js";



async function getResponse(request) {
    const pageIndex = parseInt(request.nextUrl.searchParams.get("pageIndex"));


    let buttons = [
        {label: pageIndex == 0 ? "Home" : "Previous", target: `${FRAME_URL}/frames/${pageIndex == 0 ? "" : `about?pageIndex=${pageIndex-1}`}`},
        {label: pageIndex == 2 ? "Home" : "Next", target: `${FRAME_URL}/frames/${pageIndex == 2 ? "" : `about?pageIndex=${pageIndex+1}`}`}
    ] 
    

    const image = `${FRAME_URL}/frames/images/about?pageIndex=${pageIndex}`
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: buttons,
            image: {src: image, aspectRatio: '1:1'},

        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
