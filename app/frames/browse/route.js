import { NextResponse } from "next/server";
import {redirect,permanentRedirect } from "next/navigation"
import {FRAME_URL} from "@/app/constants.js";

import {contract} from "../../contract_server.js"


export async function POST(request) {

    const counter = await contract.read.EDITION_COUNTER();

    console.log("hello", counter)
    return permanentRedirect(`${FRAME_URL}/frames/browse/${Number(counter)}`)

}



export const dynamic = "force-dynamic";


