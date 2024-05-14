
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import {FRAME_URL} from "../constants.js"

const image = `${FRAME_URL}/frames/images/start?date=${Date.now()}`



export async function generateMetadata() {

    const frameMetadata = getFrameMetadata({
      buttons: [
        {label: 'MINT',  action: 'post', target: `${FRAME_URL}/frames/mint`},
        {label: 'About', action: 'post', target: `${FRAME_URL}/frames/about`},
        {label: 'Official Website', action: 'link', target: `${FRAME_URL}/`},
        
      ],
      image: {
        src: image,
        aspectRatio: '1:1' 
      },
      // postUrl: `${FRAME_URL}/frames/mint`, // double check this
      // postUrl: image,
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
    <>
      <h1>Experiments V1 mint frame</h1>

    </>
  );
}

