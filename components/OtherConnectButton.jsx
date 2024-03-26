import React from 'react'
import Link from 'next/link'
import { ConnectKitButton } from "connectkit";

export default function OtherConnectButton({children}) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <>
          {!isConnected ? (
            <button style={button} onClick={show}>
            <a>connect to view your collection</a>
            </button>
          ) : <Link href={`/browse/wallet/${address}`}>my collection</Link>}
          </>
        );
      }}
    </ConnectKitButton.Custom>

  )
}


const button = {
  background: "none",
  border: "none",
  textDecoration: "underline",

}