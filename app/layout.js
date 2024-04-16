

import { Inter,Urbanist,Trispace } from 'next/font/google'
import Link from 'next/link'
import { Web3Provider } from '../components/Web3Provider'
import {artAddress} from "./constants"
import "./global.css"
import { baseScanUrl } from './constants'

export const metadata = {
  title: 'Experiments V1',
  description: 'art experiments',
}

const inter = Inter({ subsets: ['latin'] })
const trispace = Trispace({ subsets: ['latin'] })



// console.log(artAddress)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
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

            <li><a target="_blank" href={`${baseScanUrl}address/${artAddress}`}>basescan</a></li>
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
