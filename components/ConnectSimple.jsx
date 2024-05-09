import React from 'react'
import Link from 'next/link'
// import { ConnectKitButton } from "connectkit";
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function ConnectSimple({children}) {
  return (
    <ConnectButton.Custom>
      {({account, openConnectModal}) => {
        return (
          <>
          {!account ? (
            <button style={button} onClick={openConnectModal}>
            <a>connect to transfer</a>
            </button>
          ) : children
          }
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