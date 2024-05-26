"use client"
import React, {useState} from 'react'
// import { ConnectKitButton } from "connectkit";
import {useConnectModal,useAccountModal} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi'
import {useCapabilities} from 'wagmi/experimental'
import ConnectPopUp from './ConnectPopUp';

export default function CustomConnect() {

  const account = useAccount();
  const [show, setShow] = useState(false)


  const {data:capabilities} = useCapabilities({
    account: account.address,
  });

  const paymasterSupported = capabilities && capabilities[account.chainId].paymasterService.supported
  console.log(!paymasterSupported)
 



  return (
    <>
    <ConnectPopUp show={show} setShow={setShow} account={account} />
    <div style={container}>
      {!account.address && (
        <button style={button} onClick={() => setShow(true)} type="button">
          connect wallet to mint
        </button>
      )}
      {account.address && (
        <div style={addressContainer}>
          <div>
            {/* {account?.address.slice(0, 6) + "..." + account?.address.slice(-4)} */}
            connected as
            <button style={button} onClick={() => setShow(true)} type="button">
             {account?.address.slice(0, 6) + "..." + account?.address.slice(-4)}
            </button>
          </div>
          {!paymasterSupported ? <p style={{marginTop:"0", fontSize:"small"}}>*pro tip: connect with a <a target="_blank" href="https://www.coinbase.com/wallet/smart-wallet">coinbase smart wallet</a> to pay <b style={{fontSize:"large"}}>&#x1D56B;&#x1D556;&#x1D563;&#x1D560;</b> gas fees!</p> : <p style={{marginTop:"0", fontSize:"small"}}>smart wallet detected, enjoy your free transactions &#x2661;</p>}
        </div>
      )}
    </div>
    </>
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