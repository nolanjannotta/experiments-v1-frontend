import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";
import { signerContract } from "@/app/frameConfig";



export async function GET(request) {
    const tokenId = request.nextUrl.searchParams.get("tokenId")

    let uri = await getUri(tokenId)  

  return new ImageResponse(
    (
      <Card>
        <div
          style={{
            width:"100%",
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
            { uri ? <img width="90%" src={uri} alt="image"></img> : <p>oops, looks like an error occured.</p>}

        </div>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}