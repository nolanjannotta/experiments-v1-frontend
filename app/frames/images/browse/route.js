import { ImageResponse } from "next/og";
import Card from "@/components/Card";
import {getUri,getEdition} from "@/app/frameConfig";
// import {XMLParser, XMLBuilder} from 'fast-xml-parser';

// import {Source_Code_Pro } from 'next/font/google'


// const sourceCode = Source_Code_Pro({ subsets: ['latin'], weight: ["500", "700"]})

// console.log("Source_Code_Pro", sourceCode)

// export const runtime = "edge"
  // const parser = new XMLParser();


export async function GET(request) {
    const editionId = request.nextUrl.searchParams.get("editionId")
    const edition = await getEdition(editionId);
    const randomTokenId = editionId * 1000000 + Math.floor((Math.random() * Number(edition.counter)) + 1)

    const randomUri = await getUri(randomTokenId);
    // console.log(randomUri)
    // let jObj = parser.parse(randomUri);
    

    // const builder = new XMLBuilder();
    // const xmlContent = builder.build(jObj);
    // console.log(xmlContent)

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
            {/* {randomUri && <object width="70%" data={randomUri} alt="image"></object>} */}

        </div>
        <p style={description}>{edition.description}</p>
        {edition.name === "rectangular clock" && <p style={note}>note: the roman numeral hour markers and location text currently do not render in a frame. please visit the website for best results.</p>}
        
      </Card>
    ,
    {
      width: 1000,
      height: 1000,

      // fonts: {
      //   name: "Noto Sans",
      //   style: "normal",

      // },
      // debug: true
    }
  );
}

const note = {
  fontSize: "15px",
  display: "flex",
  justifyContent: "center",
  width: "90%",
  textAlign: "center",
  marginTop: "0",
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