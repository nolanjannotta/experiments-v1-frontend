import {redirect,permanentRedirect } from "next/navigation"
import {FRAME_URL} from "@/app/constants.js";
import {getEditionCounter} from "../frameConfig";


export async function GET(request) {
    const lastEdition = await getEditionCounter();
    return permanentRedirect(`${FRAME_URL}/frames/${lastEdition}`)
}



export const dynamic = "force-dynamic";
