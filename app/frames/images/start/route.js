import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getStartImage} from "@/app/frameConfig";
import {contract} from "@/app/contract_server";
import {FabricImage} from 'fabric/node'; // v6

async function getThumbnails(contract, editionIds) {
  let thumbnails = [];
  for(const editionId of editionIds) {
    let edition = await contract.read.getEdition([editionId]);

      let image = await contract.read.getDataUri([BigInt(editionId * 1000000) + 1n]);
      
      const png = await FabricImage.fromURL(image);
      const pngURL = png.toDataURL();

      thumbnails.push({image: pngURL, name: edition.name})

  }

  return thumbnails
}


export async function GET(request) {

    const thumbnailEditions = [1,2,5,4]
  
    // const editionId = request.nextUrl.searchParams.get("editionId"); 
// 
    // const thumbnail = await getStartImage(editionId);

    const thumbnails = await getThumbnails(contract, thumbnailEditions);
    // console.log(thumbnails)

  return new ImageResponse(
    (
      <Card>
        <h1 style={{ margin: "0" }}>Experiments-V1</h1>
        {/* <br/> */}
        {/* <p style={{ width: "70%", textAlign: "center" }}>
          A collection of 100% onchain images. experimenting with onchain art
          and onchain mechanics.
        </p>
        <ul>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>p5.js</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>javascript</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>servers</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>ipfs</li>
        </ul> */}
        <div style={imageSection}>
          { thumbnails.map((thumbnail, index) => { 
            return(
          <div key={index} style={imageContainer}>
        
            <img style={{padding:0}} width="100%" src={thumbnail.image}></img>
            <p style={{margin: "0", fontSize:"24"}}>{thumbnail.name}</p>
          </div>)
      })}


      </div>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}


const imageSection = {
  width:"100%",
  marginTop: "10px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around"

}

const imageContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "40%"
}
