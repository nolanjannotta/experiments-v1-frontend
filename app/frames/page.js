
import { getFrameMetadata } from '@coinbase/onchainkit';
import {getEdition,getLastMint, getThumbnails} from "../frameConfig.js"
import sharp from "sharp";

const URL = "http://localhost:3000"


// const lastData = await getLastMint();

// const edition = await getEdition(1)

let thumbnails = await getThumbnails();

// thumbnails = thumbnails.slice(0,4)

const placements = []
if(thumbnails.length == 1) {
  placements.push({x: 160, y: 275, width: 680, height: 680, nameX: 500, nameY: 980})
}
else if(thumbnails.length == 2) {
  placements.push({x: 50, y: 425, width: 425, height: 425, nameX: 262.5, nameY: 885})
  placements.push({x: 525, y: 425, width: 425, height: 425, nameX: 737.5, nameY: 885})
}
else if(thumbnails.length == 3) {
  placements.push({x: 130, y: 275, width: 305, height: 305, nameX: 282.5, nameY: 610})
  placements.push({x: 565, y: 275, width: 305, height: 305, nameX: 717.5, nameY: 610})
  placements.push({x: 347.5, y: 640, width: 305, height: 305, nameX: 500, nameY: 980})

}
else {
  placements.push({x: 130, y: 275, width: 305, height: 305, nameX: 282.5, nameY: 610})
  placements.push({x: 565, y: 275, width: 305, height: 305, nameX: 717.5, nameY: 610})
  placements.push({x: 130, y: 640, width: 305, height: 305, nameX: 282.5, nameY: 980})
  placements.push({x: 565, y: 640, width: 305, height: 305, nameX: 717.5, nameY: 980})
}

{/* <line x1="0" x2="1000" y1="637" y2="637" stroke="black" stroke-width="3"></line>
<line x1="500" x2="500" y1="0" y2="1000" stroke="black" stroke-width="3"></line>
 */}


let svg = `<svg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
                  <rect stroke='black' stroke-width='3' width='1000' height='1000' fill='white'></rect>

                  <text x="500" y="100" text-anchor="middle" font-size="80">Experiments V1</text>
                  <text x="500" y="150" text-anchor="middle" font-size="30">A collection of 100% onchain images.</text>
                  <text x="500" y="185" text-anchor="middle" font-size="30">experimenting with onchain art and onchain mechanics.</text>
                  

                  <text x="125" y="220" text-anchor="middle" text-decoration="line-through" font-size="30">p5.js</text>
                  <text x="275" y="220" text-anchor="middle" text-decoration="line-through" font-size="30">javascript</text>
                  <text x="425" y="220" text-anchor="middle" text-decoration="line-through" font-size="30">servers</text>
                  <text x="575" y="220" text-anchor="middle" text-decoration="line-through" font-size="30">ipfs</text>
                  <text x="725" y="220" text-anchor="middle"  font-size="30">solidity ✓</text>
                  <text x="875" y="220" text-anchor="middle"  font-size="30">SVG ✓</text>

                  ${placements.map((placement, index) => {return `<text x="${placement.nameX}" y="${placement.nameY}" text-anchor="middle" font-size="30"> ${thumbnails[index].name}</text>`})}
                  ${thumbnails.map((thumbnail, index) => {return `<image x="${placements[index].x}" y="${placements[index].y}" width="${placements[index].width}" height="${placements[index].height}" href="${thumbnail.image}"> </image>`})}

                  
         
                  </svg>
                  `

                  // <image x="133" y="300" width="300" height="300" href="${thumbnails[thumbnails.length-3]}"></image>
                  // <image x="566" y="300" width="300" height="300" href="${thumbnails[thumbnails.length-2]}"></image>

                  // <image x="133" y="300" width="300" height="300" href="${thumbnails[thumbnails.length-1]}"></image>
                  // <image x="566" y="300" width="300" height="300" href="${thumbnails[thumbnails.length]}"></image>
                  
                  // ${thumbnails.map((thumbnail, index) => {return `<image x="${25 + (index * 350)}" y="${300 + (index * 200)}" width="300" height="300" href="${thumbnail}"> </image>`})}

const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

const base64Img = `data:image/png;base64,${img.toString('base64')}`;




const frameMetadata = getFrameMetadata({
  buttons: [
    // {label: 'previous edition'},
    // {label: 'next edition'}, 
    {label: 'MINT',  action: 'post'},
    {label: 'Official Website', action: 'link', target: `${URL}/`},
    
  ],
  image: {
    src: base64Img,
    aspectRatio: '1:1'
  },
  postUrl: `${URL}/frames/mint`,
});

export const metadata = {
  title: 'Experiments V1',
  description: 'frame for minting on chain art experiments',
  openGraph: {
    title: 'Experiments V1',
    description: 'frame for minting on chain art experiments',
    images: [base64Img], 
  },
  other: {
    ...frameMetadata,
  },
};



export default async function Frames() {





  return (
    <>
      <h1>Experiments V1 mint frame</h1>

    </>
  );
}