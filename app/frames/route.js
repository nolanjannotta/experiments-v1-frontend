import { NextResponse } from "next/server";

import { getFrameMetadata, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import {FRAME_URL} from "../constants.js"
import {getEditionCounter} from "../frameConfig.js"



// export const metadata = {
//       title: 'Experiments V1',
//       description: 'frame for minting on chain art experiments',
//       openGraph: {
//         title: 'Experiments V1',
//         description: 'frame for minting on chain art experiments',
//       },
// }

async function getResponse(request) {
    let edition = request.nextUrl.searchParams.get("editionId") || null;
    console.log(edition)

    if(!edition) {
        edition = await getEditionCounter();
    }

    const image = `${FRAME_URL}/frames/images/start?date=${Date.now()}${edition ?  ("&lastEdition=" + edition) : ""}`
    

    return new NextResponse(
        getFrameHtmlResponse({
            ogDescription: 'frame for minting on chain art',
            ogTitle: 'Experiments V1 frame',
            buttons: [
                {label: 'MINT',  target: `${FRAME_URL}/frames/mint`},
                {label: 'About', target: `${FRAME_URL}/frames/about`},
                {label: 'Official Website', action: 'link', target: `${FRAME_URL}/`},
                
              ],
            image: {src: image, aspectRatio: '1:1'},
            state: {editionId: edition}

            
        })
    );

}

export async function GET(request) {
  return getResponse(request);
}


export const dynamic = "force-dynamic";

