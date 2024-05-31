import { NextResponse } from "next/server";
import {redirect,permanentRedirect } from "next/navigation"
import {FRAME_URL} from "@/app/constants.js";

import {getEditionCounter} from "../../frameConfig.js";

export async function POST(request) {

    const counter = await getEditionCounter();

    return permanentRedirect(`${FRAME_URL}/frames/browse/${Number(counter)}?editionCounter=${counter}`)

}



export const dynamic = "force-dynamic";


