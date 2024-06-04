

import {Source_Code_Pro } from 'next/font/google'
import Link from 'next/link'
import { Web3Provider } from '../components/Web3Provider'
import {artAddress} from "./constants"
import "./global.css"
// import "./test.css"
import { baseScanUrl } from './constants'
import ConnectSimple from '../components/ConnectSimple'
import Marquee from '@/components/Marquee'
import { coolShape } from './coolShapes'
import Title from '../components/Title'
import "./title.css"

export const metadata = {
  title: 'Experiments V1',
  description: 'art experiments',
}

const sourceCode = Source_Code_Pro({ subsets: ['latin'], weight: ["500", "700"]})

export const revalidate = 30



export default function RootLayout({ children }) {
  const title = {}
  const favicon = (Date.now() % 2) + 1
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" type="image/png" sizes="32x32" href={`/favicons/${favicon}.png`}/>
      </head>

      <body className={sourceCode.className}>
      
      <header>
      <div style={title}>
        <br/>
        <h1 className="title">Onchain-Experiments_V1™</h1>
        </div>
        <nav>
          <ul>
          {/* <li>&#10041;</li> */}
          <li>{coolShape()}</li>
        <li><Link href="/">home</Link></li>
        {/* <li>&#11096;</li> */}
        <li>{coolShape()}</li>
        <li><Link href="/browse">browse</Link></li>
        {/* <li>&#11096;</li> */}
        <li>{coolShape()}</li>
        <li><Link href="/modify">modify</Link></li>
        {/* <li>&#11096;</li> */}
        <li>{coolShape()}</li>
        <li className="mint"><Link href="/mint">mint</Link></li>
        {/* <li>&#11096;</li> */}
        <li>{coolShape()}</li>
        <li><Link href="/prints">prints</Link></li>
        {/* <li>&#11096;</li> */}
        <li>{coolShape()}</li>
        <li><Link href="/v2">v2</Link></li>
        {/* <li>&#11096;</li> */}
        <li>{coolShape()}</li>
        <li><Link href="/owners">owners</Link></li>
        {/* <li>&#10041;</li> */}
        <li>{coolShape()}</li>
        </ul>
        </nav>
        </header>
        <hr/>
      <Web3Provider>
        {/* <Marquee /> */}
        <div style={connectedAddress}>
          <ConnectSimple  label="connect" />
          
          </div>
        {children}
        </Web3Provider>

      <footer>
        <nav>
          <ul>
           
            <li><a target="_blank" href={`https://testnets.opensea.io/assets/base-sepolia/${artAddress}`}>open sea</a></li>
            <li>&#x26AC;</li>

            <li><a target="_blank" href={`${baseScanUrl}address/${artAddress}`}>basescan</a></li>
            <li>&#x26AC;</li>

            <li style={{color: "#d7d7d7"}}>made with &#9760; by <a style={{color: "inherit"}} href="https://personal-site-neon-ten.vercel.app/index.html" target="_blank">nolan</a></li>
            <li>&#x26AC;</li>

            <li style={{color: "#d7d7d7"}}>est. 2024</li>
            
          </ul>
        </nav>
      </footer>
        </body>
    </html>
  )
}
 

const footer = {
  position: "absolute",
  bottom: "0",
  width: "100%"
}


const connectedAddress = {
  position: "absolute",
  // right: 5",
  top: "5px",
  right: "20px",
  zIndex: "1001"


}


