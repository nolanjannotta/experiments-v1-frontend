"use client"
import Link from "next/link";
import ConnectSimple from "../../components/ConnectSimple";
import { useAccount } from "wagmi";
import { coolShape } from '../coolShapes'


export default function EditionLayout({ children }) {
  const {address} = useAccount();
  return (
    <>
      <header style={{textAlign: "center"}}>
        <nav>
          <ul>
            {/* <li>&#10041;</li> */}
            {/* <li>{coolShape()}</li> */}
            <li><Link href="/browse/search">search</Link></li>
            {/* <li>&#11096;</li> */}
            {/* <li>{coolShape()}</li> */}
            <li><Link href="/browse/">all editions</Link></li>
            {/* <li>&#11096;</li> */}
            {/* <li>{coolShape()}</li> */}
            <li><Link href="/browse/all">all mints</Link></li>
            {/* <li>&#11096;</li> */}
            {/* <li>{coolShape()}</li> */}
            <li>
              <ConnectSimple label="connect to view your collection" asAnchor={true}>
                  <Link href={`/browse/wallet/${address}`}>my collection</Link>
              </ConnectSimple>
            </li>
            <li>&#10041;</li>

          </ul>
        </nav>
      </header>

      {children}
    </>
  );
}
