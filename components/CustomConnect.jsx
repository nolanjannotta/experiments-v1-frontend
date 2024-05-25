"use client"
import React from 'react'
// import { ConnectKitButton } from "connectkit";
import {useConnectModal,useAccountModal} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi'
import useTruncateAddress from "../hooks/useTruncateAddress";
import {useCapabilities} from 'wagmi/experimental'

export default function CustomConnect() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const account = useAccount();
  const truncatedAddress = useTruncateAddress(account?.address);

  const {data:capabilities} = useCapabilities({
    account: account.address,
  });

  const paymasterSupported = capabilities && capabilities[account.chainId].paymasterService.supported
  console.log(!paymasterSupported)
 



  return (
    <div style={container}>
      {openConnectModal && (
        <button style={button} onClick={openConnectModal} type="button">
          connect wallet
        </button>
      )}
      {openAccountModal && (
        <div style={addressContainer}>
          <div>
            {truncatedAddress}
            <button style={button} onClick={openAccountModal} type="button">
              disconnect
            </button>
          </div>
          {!paymasterSupported ? <p style={{marginTop:"0"}}>*pro tip: connect with a coinbase smart wallet to pay <b>zero</b> gas fees!</p> : <p style={{marginTop:"0"}}>smart wallet detected, enjoy your free transactions &#x2661;</p>}
        </div>
      )}
    </div>
  );

  // return (
  //   <div style={addressSection}>
  //   <ConnectButton.Custom>
  //     {({account, openAccountModal, openConnectModal}) => {
  //       return (
  //         <>
  //         {!account && (
  //           <button onClick={openConnectModal}>
  //             Connect wallet
  //           </button>
  //         )}

  //         {account && (
            
  //             hello {account.ensName || account.address}
  //             <button style={button} onClick={openAccountModal}>
  //                disconnect
  //             </button>
            
            
  //         )}
  //         </>
  //       );
  //     }}
  //   </ConnectButton.Custom>
  //   </div>

  // )
}

const p = {
  padding: "none",
  margin: "none"
}

const container = {
  display: 'flex',
  margin: "none",
  padding: "none",
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0'
}

const addressContainer ={
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0'

}

const button = {
  background: "none",
  border: "none",
  textDecoration: "underline",
  
}