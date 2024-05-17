import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";




export async function GET(request) {
    const status = request.nextUrl.searchParams.get("status")
    const tokenId = request.nextUrl.searchParams.get("tokenId")

    let uri;
    if(status == "success") {
        try{
          uri = await getUri(tokenId)  
        }
        catch(e){
            console.error(e)
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
            {!uri || status === "reverted" || status === "failed" && <p>loading...</p>} 
            {uri && <img width="65%" src={uri} alt="image"></img>}
            { status === "reverted" || status === "failed" && <p>oops, looks like an error occured.</p>}

        </div>
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}