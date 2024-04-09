import { ImageResponse } from "next/og";
import Card from "@/components/Card";




export async function GET(request) {
    const address = request.nextUrl.searchParams.get("address")
    const tokenName = request.nextUrl.searchParams.get("tokenName")


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