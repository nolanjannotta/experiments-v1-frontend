import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getThumbnails} from "@/app/frameConfig";


function thumbnailImage(thumbnail, index, length) {
    const width = length == 1 ? "70%" : length == 2 ? "45%" : "35%"
    // const styles = length == 1 ? {maxWidth;"85%"} : length == 2 ? "45%" : "35%"
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        //   backgroundColor: "orange",
        //   marginRight: "0px",
        //   padding: "0 0 0 0",
          maxWidth: width
        }}
        key={index}
      >
        <img style={{padding:0}} width="100%" src={thumbnail.image}></img>
        <p style={{margin: "0", fontSize:"24"}}>{thumbnail.name}</p>
      </div>
    );
}

export async function GET() {

    let thumbnails = await getThumbnails();
    // thumbnails = thumbnails.slice(0, 2)
    // console.log(thumbnails)



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
          <li
            style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}
          >
            p5.js
          </li>

          <li
            style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}
          >
            javascript
          </li>
          <li
            style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}
          >
            servers
          </li>
          <li
            style={{ padding: "0 20px 0 20px", textDecoration: "line-through" }}
          >
            ipfs
          </li>

          <li style={{ padding: "0 20px 0 20px", textDecoration: "underline" }}>
            solidity
          </li>
          <li style={{ padding: "0 20px 0 20px", textDecoration: "underline" }}>
            svg
          </li>
        </ul>
        {/* <br/>
        <br/> */}
        <div
          style={{
            width:"100%",
            marginTop: thumbnails.length == 1 ? "40px" : thumbnails.length == 2 ? "100px" : "40px",
            display: "flex",
            // flexDirection: "row",
            // gap: "0px 490px;",
            flexWrap: "wrap",
            justifyContent: "space-around",
            // backgroundColor: "blue",
            // alignContent: "flex-start",
            // alignItems: "center",
          }}
        >
          {thumbnails.map((thumbnail, index) => {
            return thumbnailImage(thumbnail, index, thumbnails.length);
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