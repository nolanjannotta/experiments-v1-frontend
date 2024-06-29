import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri} from "@/app/frameConfig";
import {kv} from "@vercel/kv"




export async function GET(request) {
    const editionId = request.nextUrl.searchParams.get("editionId")
    // console.log(editionId)
    // const name      = request.nextUrl.searchParams.get("editionName")
    // const supply    = request.nextUrl.searchParams.get("supply")
    // const remaining = request.nextUrl.searchParams.get("remaining")
    // const allowance = request.nextUrl.searchParams.get("allowance")
    // const following = request.nextUrl.searchParams.get("following")
    // const active    = request.nextUrl.searchParams.get("active")
    // const hasVerifiedAddresses = request.nextUrl.searchParams.get("hasVerifiedAddresses")
    console.log(editionId)
    const uri = await getUri(Number(editionId) * 1000000 + 1)



    // const isMintable = remaining != "0" && active === "true"
    // const isPaused = active === "false" && remaining != "0"
    // const hasAllowance = isMintable && following === "true"
 
  return new ImageResponse(
    (
      <Card>
        {/* {isMintable && <p style={{ margin: "0" }}>currently minting</p>}
        <h1 style={{ margin: "0" }}>{name}</h1>
        <p style={{ margin: "0 0 10px 0" }}>supply: {supply} ||  remaining: {remaining}</p>

        {following === "true" && isMintable && <p style={{ margin: "0" }}> you have {allowance} free mint{allowance == 1 ? "" : "s"} for this edition{allowance != 0 ? "! :)" : " :("}</p>}

        {following === "false" && isMintable && <p style={{textAlign: "center", width:"80%" }}>follow @nolanj to get your free mints (no gas!) or visit the website to mint!</p>}

        {isPaused && <p style={{ margin: "0", textAlign: "center",width:"60%"  }}>this edition is currently paused. Please visit the website to view active editions!</p>}

        {remaining === "0" && <p style={{textAlign: "center", width:"60%" }}>this edition is sold out! Please visit the website to view other editions!</p>} */}

        <div
          style={{
            width:"100%",
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
            <img width="600px" height="600px"  src={uri}></img>

        </div>
          {/* {following === "true" ? <p style={{margin: "20px 0 0 0"}}> {allowance > 0 ? (JSON.parse(hasVerifiedAddresses) ? "select which address of yours to mint to." : "looks like you dont have any addresses verified on farcaster.") : `your free warpcast mints for ${name} are used up :(`} </p> : ""}
          {allowance == 0 ? <p style={{margin: 0}}>but fear not, you can still mint on the website</p> : ""} */}
      </Card>
    ),
    {
      width: 1000,
      height: 1000,
    }
  );
}