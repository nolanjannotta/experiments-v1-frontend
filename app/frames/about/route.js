import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import {FRAME_URL} from "@/app/constants.js";


async function getResponse(request) {
    const body = await request.json();
    // console.log(request)

    const allowFramegear = process.env.NODE_ENV !== 'production'; 

    const {message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY, allowFramegear});


    let buttons = [
        [
        {label: "Home", target: `${FRAME_URL}/frames`},
        {label: "Next", target: `${FRAME_URL}/frames/about`}
        ],
        [
        {label: "Back", target: `${FRAME_URL}/frames/about`},
        {label: "Next", target: `${FRAME_URL}/frames/about`}
        ],
        [
        {label: "Back", target: `${FRAME_URL}/frames/about`},
        {label: "Home", target: `${FRAME_URL}/frames`},
        {label: "Sounds cool, mint me one!", target: `${FRAME_URL}/frames/mint`}
        ]
    
    ]
    
    const state = message.state?.serialized ? JSON.parse(decodeURIComponent(message.state?.serialized)) : {index:0}


    // if index is 0 and state exists, then the state is already set
    if(state.index === 0 && message.state.serialized){
        console.log("already has state")
        message.button === 2 && (state.index = 1)
    }

    else if(state.index === 1){
        message.button === 1 && (state.index = 0)
        message.button === 2 && (state.index = 2)

    }
    else if(state.index === 2){
        message.button === 1 && (state.index = 1)
        message.button === 2 && (state.index = 3)
    }


    const image = `${FRAME_URL}/frames/images/about?pageIndex=${parseInt(state.index)}`

    return new NextResponse(
        getFrameHtmlResponse({
            buttons: buttons[parseInt(state.index)],
            image: {src: image, aspectRatio: '1:1'},
            // postUrl: `${FRAME_URL}/frames`,
            state: state
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";