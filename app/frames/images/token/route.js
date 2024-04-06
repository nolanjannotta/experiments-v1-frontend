import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";
import {kv} from "@vercel/kv"




export async function GET(request) {
    // console.log(request.nextUrl.searchParams)
    // const address = request.nextUrl.searchParams.get("address")
    // const tokenName = request.nextUrl.searchParams.get("tokenName")
    // console.log(request.nextUrl)

    const uri = request.nextUrl.searchParams.get("uri")

    // const uri = await getUri(lastId)


  return new ImageResponse(
    (
        <div
        style={{
          width:"100%",
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
          <img width="100%" src={uri}></img>

      </div>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}