import React from 'react'
import Link from 'next/link'
// import { ConnectKitButton } from "connectkit";
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function OtherConnectButton({children}) {
  return (
    <ConnectButton.Custom>
      {({account, openConnectModal}) => {
        return (
          <>
          {!account ? (
            <button style={button} onClick={openConnectModal}>
            <a>connect to view your collection</a>
            </button>
          ) : <Link href={`/browse/wallet/${account.address}`}>my collection</Link>}
          </>
        );
      }}
    </ConnectButton.Custom>

  )
}


const button = {
  background: "none",
  border: "none",
  textDecoration: "underline",

}