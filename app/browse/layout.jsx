"use client"
import Link from "next/link";
import OtherConnectButton from "../../components/OtherConnectButton";

export default function EditionLayout({ children }) {
  return (
    <>
      <header style={{textAlign: "center"}}>
        <nav>
          <ul>
            <li><Link href="/browse/search">search</Link></li>
            <li>&#x26AC;</li>
            <li><Link href="/browse/">all editions</Link></li>
            <li>&#x26AC;</li>
            <li><Link href="/browse/all">all mints</Link></li>
            <li>&#x26AC;</li>
            <li><OtherConnectButton /></li>

          </ul>
        </nav>
      </header>

      {children}
    </>
  );
}
