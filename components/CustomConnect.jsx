"use client"
import React from 'react'
// import { ConnectKitButton } from "connectkit";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CustomConnect() {
  return (
    <ConnectButton.Custom>
      {({account, openAccountModal, openConnectModal}) => {
        return (
          <>
          {!account && (
            <button onClick={openConnectModal}>
              Connect wallet
            </button>
          )}

          {account && (
            <div style={addressSection}>
              hello {account.ensName || account.address}
              <button style={button} onClick={openAccountModal}>
                 disconnect
              </button>
            </div>
            
          )}
          </>
        );
      }}
    </ConnectButton.Custom>

    // <ConnectKitButton/>
  )
}

const p = {
  padding: "none",
  margin: "none"
}

const addressSection = {
  display: 'flex',
  margin: "none",
  // padding: "none",
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0'
}

const button = {
  background: "none",
  border: "none",
  fontSize: "1rem",
  // textDecoration: "none",
  // padding: "none",
  // margin: "none"

}