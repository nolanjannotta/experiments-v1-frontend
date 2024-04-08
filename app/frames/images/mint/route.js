import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";
import {kv} from "@vercel/kv"




export async function GET(request) {
    // console.log(request.nextUrl.searchParams)
    const lastId    = request.nextUrl.searchParams.get("lastId")
    const name      = request.nextUrl.searchParams.get("editionName")
    const supply    = request.nextUrl.searchParams.get("supply")
    const remaining = request.nextUrl.searchParams.get("remaining")
    const allowance = request.nextUrl.searchParams.get("allowance")
    const following = request.nextUrl.searchParams.get("following")
    const uri = await getUri(lastId)


  return new ImageResponse(
    (
      <Card>
        <p style={{ margin: "0" }}>currently minting</p>
        <h1 style={{ margin: "0" }}>{name}</h1>
        <p style={{ margin: "0" }}>supply: {supply} ||  remaining: {remaining}</p>
        {following ? <p style={{ margin: "0" }}> you have {allowance} free mint{allowance == 1 ? "" : "s"} for this edition{allowance != 0 ? "! :)" : " :("}</p>
                    : <p style={{ margin: "0" }}>follow @nolanj to get your free mints!</p>    
    }
        

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
          <p style={{margin: "20px 0 0 0"}}> {allowance > 0 ? "select which address of yours to mint to." : "your free warpcast mints are used up :("} </p>
          {allowance == 0 ? <p style={{margin: 0}}>but fear not, you can still mint on the website</p> : ""}
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}