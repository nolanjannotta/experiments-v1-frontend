import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";
import {kv} from "@vercel/kv"




export async function GET(request) {
    // console.log(request.nextUrl.searchParams)
    const status = request.nextUrl.searchParams.get("status")
    const tokenId = request.nextUrl.searchParams.get("tokenId")
    console.log(status,tokenId)

    let uri;
    let alt = "image";
    if(status == "success") {
        try{
          uri = await getUri(tokenId)  
        }
        catch(e){
          alt = "error fetching image"
        }
        
    }


  return new ImageResponse(
    (
      <Card>
        <h1>{status != "success" ? "transaction submitted!" : "success!"}</h1>
        {status != "success" ? <p>refresh in a few seconds to check status</p> : ""}
        <div
          style={{
            width:"100%",
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
            { uri ? <img width="65%" src={uri} alt={alt}></img> : <p>oops, looks like an error occured.</p>}

        </div>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}