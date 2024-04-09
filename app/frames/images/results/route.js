import { ImageResponse } from "next/og";
import Card from "@/components/Card";


export async function GET(request) {

  return new ImageResponse(
    (
      <Card>
        <h1>transaction submitted!</h1>
        <p>refresh in a few seconds to check status</p>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}