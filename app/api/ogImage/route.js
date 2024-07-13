import { ImageResponse } from "next/og";
import Card from "@/components/Card";

import {getThumbnails, getUri} from "@/app/frameConfig";
 


export async function GET(request) {

    const thumbnailEditions = [1,2,3,4]
    
    // const editionId = request.nextUrl.searchParams.get("editionId"); 
// 
    // const thumbnail = await getStartImage(editionId);

    const thumbnails = await getThumbnails(thumbnailEditions);
    // const test = await getUri(1000006)
    // console.log("test", test)
  return new ImageResponse(
    (
      <Card>
        <h1 style={{ margin: "0" }}>Onchain-Experiments_V1</h1>
        <p style={{ width: "80%", textAlign: "center", margin: "0" }}>
          A platform for 100% onchain generative images. experimenting with onchain art
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
            
                <img style={{padding:0}} width="280px" height="280px" src={thumbnail.image}></img>
                <p style={{margin: "0", fontSize:"24"}}>{thumbnail.name}</p>
              </div>)
      })}


      </div>
      </Card>
    ),
    {
      width: 1600,
      height: 900,
    }
  );
}


const imageSection = {
  width:"100%",
  height: "50%",
  marginTop: "10px",
  display: "flex",
  // flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  // backgroundColor: "red"

}

const imageContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "5%",
  // justifyContent: "center",
  width: "25%",
  height: "100%",
  // backgroundColor: "blue"

}
