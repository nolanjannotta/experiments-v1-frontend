import React from 'react'
import { ConnectKitButton } from "connectkit";

export default function CustomConnect() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <>
          {!isConnected && (
            <button onClick={show}>
              Connect wallet
            </button>
          )}

          {isConnected && (
            <div style={addressSection}>
              hello {address}
              <button style={button} onClick={show}>
                 disconnect
              </button>
            </div>
            
          )}
          </>
        );
      }}
    </ConnectKitButton.Custom>

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