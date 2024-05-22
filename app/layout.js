

// import { Inter,Urbanist,Trispace } from 'next/font/google'
import Link from 'next/link'
import { Web3Provider } from '../components/Web3Provider'
import {artAddress} from "./constants"
import "./global.css"
// import "./test.css"
import { baseScanUrl } from './constants'

export const metadata = {
  title: 'Experiments V1',
  description: 'art experiments',
}

export const revalidate = 30


// console.log(artAddress)

export default function RootLayout({ children }) {
  const favicon = (Date.now() % 2) + 1
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" type="image/png" sizes="32x32" href={`/favicons/${favicon}.png`}/>
      
      </head>

      <body>
      <header>
      <h1>Experiments V1</h1>
        <nav>
          <ul>
        <li><Link href="/">home</Link></li>
        <li>&#x26AC;</li>
        <li><Link href="/browse">browse</Link></li>
        <li>&#x26AC;</li>
        <li><Link href="/modify">modify</Link></li>
        <li>&#x26AC;</li>
        <li><Link href="/mint">mint</Link></li>
        <li>&#x26AC;</li>
        <li><Link href="/prints">prints</Link></li>
        <li>&#x26AC;</li>
        <li><Link href="/v2">v2</Link></li>
        <li>&#x26AC;</li>
        <li><Link href="/owners">owners</Link></li>
        </ul>
        </nav>
        </header>
        <hr/>
      <Web3Provider>{children}</Web3Provider>

      <footer>
        <nav>
          <ul>
           
            <li><a target="_blank" href={`https://testnets.opensea.io/assets/base-sepolia/${artAddress}`}>open sea</a></li>
            <li>&#x26AC;</li>

            <li><a target="_blank" href={`${baseScanUrl}address/${artAddress}`}>basescan</a></li>
            <li>&#x26AC;</li>

            <li style={{color: "#d7d7d7"}}>made with &#9760; by nolan</li>
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
