"use client"
import React,{useState} from 'react'
import { useAccount } from 'wagmi';
import ConnectPopUp from './ConnectPopUp';
// import {normalize} from "viem/ens"
// import { createClient, http } from 'viem'
// import { mainnet } from 'viem/chains';
import useGetEnsName from '@/hooks/useGetEnsName';

export default function ConnectSimple({children, label, asAnchor}) {

  const account = useAccount();
  const [show, setShow] = useState(false)

  // const ensName =  useGetEnsName(account.address)
  

  if(account.address && children){
    return(children)
  } 

  return (
    <>
      <ConnectPopUp show={show} setShow={setShow} account={account} />

      {!account.address && (
        <button style={button} onClick={() => setShow(true)}>
          {asAnchor ? <a>{label}</a> : label}
        </button>
      )}
      {account.address && !children && (
        <p>
          connected as{" "}
          <button style={{...button, textDecoration: "nones"}} onClick={() => setShow(true)}>


            
              {account?.address.slice(0, 6) +
                "..." +
                account?.address.slice(-4)}
            
          </button>
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