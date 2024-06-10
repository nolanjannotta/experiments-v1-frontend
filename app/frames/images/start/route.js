import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {contract} from "@/app/contract_server";

import {getThumbnails} from "@/app/frameConfig";
 


export async function GET(request) {

    const thumbnailEditions = [1,2,5,4]
  
    // const editionId = request.nextUrl.searchParams.get("editionId"); 
// 
    // const thumbnail = await getStartImage(editionId);

    const thumbnails = await getThumbnails(thumbnailEditions);
  return new ImageResponse(
    (
      <Card>
        <h1 style={{ margin: "0" }}>Experiments-V1</h1>
        <p style={{ width: "80%", textAlign: "center", margin: "0" }}>
          A collection of 100% onchain generative images. experimenting with onchain art
          and onchain mechanics.
        </p>
        <ul>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>p5.js</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>javascript</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>servers</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>ipfs</li>
        </ul>
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
  maxWidth: "36%"
}
