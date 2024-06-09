
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import {FRAME_URL} from "../constants.js"

// export const runtime = 'edge'

export async function generateMetadata({params}) {
    const image = `${FRAME_URL}/frames/images/start?date=${Date.now()}`


    const frameMetadata = getFrameMetadata({
      buttons: [
        // {label: 'MINT', target: `${FRAME_URL}/frames/mint?editionId=${params.editionId}`},
        {label: 'Browse and Mint', target: `${FRAME_URL}/frames/browse`}, // make /frames/browse redirect to latest edition so /frames/browse/5
        {label: 'About', target: `${FRAME_URL}/frames/about?pageIndex=0`},
        {label: 'Website', action: 'link', target: `${FRAME_URL}/`},
        
      ],
      image: {
        src: image,
        aspectRatio: '1:1'
      },

    });

    return {
      title: 'Experiments V1',
      description: 'frame for minting on chain art experiments',
      openGraph: {
        title: 'Experiments V1',
        description: 'frame for minting on chain art experiments',
        images: [image], 
      },
      other: {
        ...frameMetadata,
      },
    }

}

export default async function Frames() {

  return (
    <article>
      <h1>Experiments V1 mint frame</h1>

    </article>
  );
}

export const dynamic = "force-dynamic";
