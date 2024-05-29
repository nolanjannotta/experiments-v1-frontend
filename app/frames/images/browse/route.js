import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri,getEdition} from "@/app/frameConfig";



export async function GET(request) {
    const editionId = request.nextUrl.searchParams.get("editionId")
    const edition = await getEdition(editionId);
    const randomTokenId = editionId * 1000000 + Math.floor((Math.random() * Number(edition.counter)) + 1)

    const randomUri = await getUri(randomTokenId);

    const isEnded = edition.counter >= edition.supply;
    const isActive = !isEnded && edition.mintStatus;
    const isPaused = !isEnded && !edition.mintStatus;

  return new ImageResponse(
    
      <Card>
        <h1 style={{margin:"0"}}>{edition.name}</h1>
        <p>
          edition #{editionId}&nbsp;&nbsp;&nbsp;&nbsp;
          supply:&nbsp;&nbsp;{edition.counter +  "/" + edition.supply} &nbsp;&nbsp;&nbsp;&nbsp; 
          status: {isEnded ? "ended" : isActive ? "active" : isPaused ? "paused" : ""} &nbsp;&nbsp;&nbsp;&nbsp; 
          price: &nbsp;{Number(edition.price)} eth </p>

        <div style={imageBox}>
            {randomUri && <img width="70%" src={randomUri} alt="image"></img>}
        </div>
        <p style={description}>{edition.description}</p>
      </Card>
    ,
    {
      width: 1000,
      height: 1000,
    }
  );
}

const description = {
  display: "flex",
  justifyContent: "center",
  width: "90%",
  textAlign: "center",
}

const imageBox = {
  // width:"100%",
  // marginTop: "40px",
  display: "flex",
  justifyContent: "center"
}