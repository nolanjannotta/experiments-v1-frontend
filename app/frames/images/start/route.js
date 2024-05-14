import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getThumbnails} from "@/app/frameConfig";




// function thumbnailImage(thumbnail) {
//     // const width = length == 1 ? "70%" : length == 2 ? "45%" : "35%"
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           maxWidth: "70%"
//         }}
//       >
//         <img style={{padding:0}} width="100%" src={thumbnail.image}></img>
//         <p style={{margin: "0", fontSize:"24"}}>{thumbnail.name}</p>
//       </div>
//     );
// }

export async function GET(request) {

    const lastEdition = request.nextUrl.searchParams.get("lastEdition") 

    const thumbnail = await getThumbnails(lastEdition);



  return new ImageResponse(
    (
      <Card>
        <h1 style={{ margin: "0" }}>Experiments-V1</h1>
        {/* <br/> */}
        <p style={{ width: "70%", textAlign: "center" }}>
          A collection of 100% onchain images. experimenting with onchain art
          and onchain mechanics.
        </p>
        <ul>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>p5.js</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>javascript</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>servers</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}>ipfs</li>
          {/* <li style={{ padding: "0 20px 0 20px", textDecoration: "underline" }}>solidity</li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "underline" }}>svg</li> */}
        </ul>
        <div
          style={{
            width:"100%",
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          { thumbnail.image && 
          <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "70%"
        }}
      >
        
        <img style={{padding:0}} width="100%" src={thumbnail.image}></img>
        <p style={{margin: "0", fontSize:"24"}}>{thumbnail.name}</p>
      </div>
      }
      </div>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}