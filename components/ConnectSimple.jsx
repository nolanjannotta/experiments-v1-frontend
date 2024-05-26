"use client"
import React from 'react'
import {useConnectModal, useAccountModal} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function ConnectSimple({children, label, asAnchor}) {
  const account = useAccount();

  const { openConnectModal } = useConnectModal();
  const {openAccountModal} = useAccountModal();

  console.log(account)

  if(account.address && children){
    return(children)
  } 


  return (
    <>
      {!account.address && (
        <button style={button} onClick={openConnectModal}>
          {asAnchor ? <a>{label}</a> : label}
        </button>
      )}
      {account.address && !children && (
        <p>
          connected as{" "}
          <button style={{...button, textDecoration: "nones"}} onClick={openAccountModal}>
            
              {account?.address.slice(0, 6) +
                "..." +
                account?.address.slice(-4)}
            
          </button>&nbsp;&nbsp;
        </p>
      )}
    </>
  );

}


const button = {
  background: "none",
  border: "none",
  textDecoration: "underline",
  padding: "0",
  margin: "0",


}