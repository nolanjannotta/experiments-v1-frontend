

// import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Web3Provider } from './components/Web3Provider'
import {artAddress} from "./constants"
import "./global.css"

export const metadata = {
  title: 'Experiments V1',
  description: 'art experiments',
}

// console.log(artAddress)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      {/* <link rel="stylesheet" href="https://unpkg.com/awsm.css/dist/awsm.min.css"/> */}
      {/* <link rel="stylesheet" type="text/css" href="https://unpkg.com/chimeracss/build/chimera.css"/> */}
      {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" /> */}
      {/* <link rel="stylesheet" href="https://unpkg.com/mvp.css"/>  */}
      </head>

      <body>
      <header>
      <h1>Experiments V1</h1>
        <nav>
          <ul>
        <li><Link href="/">home</Link></li>
        <li><Link href="/browse">browse</Link></li>
        <li><Link href="/modify">modify</Link></li>
        <li><Link href="/mint">mint</Link></li>
        <li><Link href="/prints">prints</Link></li>
        <li><Link href="/v2">v2</Link></li>
        </ul>
        </nav>
        </header>
      <Web3Provider>{children}</Web3Provider>

      <footer>
        <nav>
          <ul>
           
            <li><a target="_blank" href={`https://testnets.opensea.io/assets/base-sepolia/${artAddress}`}>open sea</a></li>

            <li><a target="_blank" href={`https://sepolia.basescan.org/address/${artAddress}`}>etherscan</a></li>
            <li style={{color: "#d7d7d7"}}>made with &#9760; by nolan</li>
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
