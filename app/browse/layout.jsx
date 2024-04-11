"use client"
import Link from "next/link";
import OtherConnectButton from "../../components/OtherConnectButton";

export default function EditionLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link href="/browse/search">search</Link></li>
            <li><Link href="/browse/">all editions</Link></li>
            <li><Link href="/browse/all">all mints</Link></li>
            <li><OtherConnectButton /></li>

          </ul>
        </nav>
      </header>

      {children}
    </>
  );
}
