import { NextResponse } from "next/server";
import {redirect} from "next/navigation"
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import {FRAME_URL,allowFramegear} from "@/app/constants.js";
import {getEditionCounter} from "../frameConfig";


export async function GET(request) {
    const lastEdition = await getEditionCounter();
    return redirect(`${FRAME_URL}/frames/${lastEdition}`)
}



export const dynamic = "force-dynamic";
