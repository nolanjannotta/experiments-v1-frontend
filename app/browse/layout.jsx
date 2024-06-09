"use client"
import {useEffect, useState} from 'react'

import Link from "next/link";
import ConnectSimple from "../../components/ConnectSimple";
import { useAccount } from "wagmi";
import { coolShapes } from '../coolShapes'


export default function EditionLayout({ children }) {
  const [shapes, setShapes] = useState([])

  useEffect(() => {
    setShapes(coolShapes(5))

  },[])
  const {address} = useAccount();
  return (
    <>
      <header style={{textAlign: "center"}}>
        <nav>
          <ul>
            {/* <li>&#10041;</li> */}
            <li>{shapes[0]}</li>
            <li><Link href="/browse/search">search</Link></li>
            {/* <li>&#11096;</li> */}
            <li>{shapes[1]}</li>
            <li><Link href="/browse/">all editions</Link></li>
            {/* <li>&#11096;</li> */}
            <li>{shapes[2]}</li>
            <li><Link href="/browse/all">all mints</Link></li>
            {/* <li>&#11096;</li> */}
            <li>{shapes[3]}</li>
            <li>
              <ConnectSimple label="connect to view your collection" asAnchor={true}>
                  <Link href={`/browse/wallet/${address}`}>my collection</Link>
              </ConnectSimple>
            </li>
            <li>{shapes[4]}</li>

          </ul>
        </nav>
      </header>

      {children}
    </>
  );
}
