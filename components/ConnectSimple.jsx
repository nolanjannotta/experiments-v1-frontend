"use client"
import React from 'react'
import {useConnectModal} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function ConnectSimple({children, label, asAnchor}) {
  const account = useAccount();

  const { openConnectModal } = useConnectModal();
  console.log(account)

  if(account.address && children){
    return(children)
  } 


  return(
    <>
      {!account.address && <button style={button} onClick={openConnectModal}>{asAnchor ? <a>{label}</a> : label }</button>}
      {account.address && !children && <p>connected as: {account?.address.slice(0, 6) + "..." + account?.address.slice(-4)}</p>}

    </>
  )

}


const button = {
  background: "none",
  border: "none",
  textDecoration: "underline",
  padding: "0",
  margin: "0",


}