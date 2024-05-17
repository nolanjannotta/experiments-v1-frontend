import { ImageResponse } from "next/og";
import Card from "@/components/Card";


export async function GET(request) {
  const status = request.nextUrl.searchParams.get("error")


  return new ImageResponse(
    (
      <Card>
        {status === "false" && <h1>transaction submitted!</h1>}
        {status === "false" && <p>refresh in a few seconds to check status</p>}
        {status === "true" && <h1>hmmm, some error occured. feel free to reach out to @nolanj</h1>}
        
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}