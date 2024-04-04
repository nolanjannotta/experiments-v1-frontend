import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getThumbnails} from "@/app/frameConfig";


function thumbnailImage(thumbnail, index, length) {
    const width = length == 1 ? "80%" : "60%"
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
            // justifyContent: "center",
          alignItems: "center",
        //   backgroundColor: "blue",
        //   boxSizing: "border-box",
        //   margin: 0
        }}
        key={index}
      >
        <img width={width} src={thumbnail.image}></img>
        <p style={{margin: "0"}}>{thumbnail.name}</p>
      </div>
    );
}

export async function GET() {

    let thumbnails = await getThumbnails();
    thumbnails = thumbnails.slice(0, 1)
    console.log(thumbnails)



  return new ImageResponse(
    (
      <Card>
        <h1 style={{margin: "0"}}>Experiments-V1</h1>
        {/* <br/> */}
        <p style={{width: "70%", textAlign: "center"}}>A collection of 100% onchain images. experimenting with onchain art and onchain mechanics.</p>
        <ul>
            <li style={{padding: "0 20px 0 20px",textDecoration: "line-through"}}>
                p5.js
            </li>

            <li style={{padding: "0 20px 0 20px", textDecoration: "line-through"}}>
                javascript
            </li>
            <li style={{padding: "0 20px 0 20px",textDecoration: "line-through"}}>
                servers
            </li>
            <li style={{padding: "0 20px 0 20px",textDecoration: "line-through"}}>
                ipfs
            </li>

            <li style={{padding: "0 20px 0 20px", textDecoration:"underline"}}>
                solidity 
            </li>
            <li style={{padding: "0 20px 0 20px", textDecoration:"underline"}}>
                svg
            </li>
        </ul>
        {/* <br/>
        <br/> */}
        <div style={{ marginTop:"40px", display: "flex", backgroundColor: "blue", alignContent:"flex-start"}}> 
            {thumbnails.map((thumbnail, index) => {
                return thumbnailImage(thumbnail, index, thumbnails.length)
            })}

        </div>
        
      </Card>
    ),
    {
        width: 1000,
        height: 1000,
    },
  );
}