"use client"
import React, {useState} from 'react'
import {useAccount, useConnect, useDisconnect} from 'wagmi'
import {useCapabilities} from 'wagmi/experimental'
import ConnectPopUp from './ConnectPopUp';

export default function CustomConnect() {

  const account = useAccount();
  const [show, setShow] = useState(false)
  const {connect, connectors } = useConnect();
  const {disconnect} = useDisconnect();



  const {data:capabilities} = useCapabilities({
    account: account.address,
  });

  const paymasterSupported = capabilities && capabilities[account.chainId].paymasterService.supported
 

  function openSmartWallet() {
    const results = disconnect()
    
      connect({connector: connectors.filter((connector)=> connector.name === "Coinbase Wallet")[0]})

  }



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
          {!paymasterSupported 
          ? 
          <span style={{fontSize:"small"}}><b style={{fontSize:"large"}}>&#x2736; tip</b>: connect with a <button style={button} onClick={openSmartWallet}>coinbase smart wallet</button> to pay <b style={{fontSize:"x-large"}}>&#x1D56B;&#x1D556;&#x1D563;&#x1D560;</b> gas fees!</span> 
          : 
          <span style={{fontSize:"small"}}>&#x2736;smart wallet detected, enjoy your free transactions &#x2661;</span>}
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

const message = {
  marginTop:"0", 
  // fontSize:"small",
  textAlign:"center"
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