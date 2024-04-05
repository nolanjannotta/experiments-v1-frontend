import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";
import {kv} from "@vercel/kv"




export async function GET(request) {
    // console.log(request.nextUrl.searchParams)
    const address = request.nextUrl.searchParams.get("address")
    const tokenName = request.nextUrl.searchParams.get("tokenName")
    // console.log(request.nextUrl)

    // const uri = await getUri(lastId)


  return new ImageResponse(
    (
      <Card>
        <h1>minting 1 {tokenName}</h1>
        <p>to</p>
        <p style={{ margin: "0" }}>{address}</p>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}