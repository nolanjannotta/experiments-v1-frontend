import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";
import {kv} from "@vercel/kv"




export async function GET(request) {
    // console.log(request.nextUrl.searchParams)
    const lastId = request.nextUrl.searchParams.get("lastId")
    const name = request.nextUrl.searchParams.get("editionName")
    const supply = request.nextUrl.searchParams.get("supply")
    const remaining = request.nextUrl.searchParams.get("remaining")

    const uri = await getUri(lastId)


  return new ImageResponse(
    (
      <Card>
        <p style={{ margin: "0" }}>currently minting</p>
        <h1 style={{ margin: "0" }}>{name}</h1>
        <div style={{display: "flex"}}>supply: {supply} ||  remaining: {remaining}</div>

        <div
          style={{
            width:"100%",
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
            <img width="65%" src={uri}></img>

        </div>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}