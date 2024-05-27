"use client"
import React, {useState, useRef, useEffect} from "react"
import { useDisconnect, useConnect, useAccount } from "wagmi"



export default function ConnectPopUp({ show, setShow, account}) {
    const menuRef = useRef(null)
    const {disconnect, status:disconnectStatus} = useDisconnect()
    const {connect, connectors, status:connectStatus } = useConnect();
    // const account = useAccount();
    // const address = account.address


    function handleClose(event) {
        if(menuRef.current && !menuRef.current.contains(event.target)){
            setShow(false)
        }
    }



    if(!show){
        return null
    }



    return(

        <div style={container} onClick={handleClose}>
            
                <div style={menu} ref={menuRef}>
                {!account.isConnected && 
                <ul style={{listStyle:"none", padding: "0"}}>
                    {connectors.map((connector, index) => {
                        if(connector.type === "injected")
                            return
                        return <li style={listItem} key={index} ><button style={button} onClick={() => connect({connector})}>{connector.name}</button></li>
                    })}
                </ul>}
                {account.isConnected && 
                <>
                <p>{account.address.slice(0, 9) + "..." +account.address.slice(-7)} 

                    { account.connector.name == "Coinbase Wallet" && <span style={{cursor: "pointer"}}><small>&nbsp;<a target="_blank" href="https://homebase.coinbase.com/">open</a></small></span> }
                    <span style={{cursor: "pointer"}} onClick={() => {navigator.clipboard.writeText(account.address)}}><small>&nbsp;copy</small></span>
                    
                    
                    </p>
                <p style={{padding:"0"}}></p> 


                <button style={button} onClick={disconnect}>disconnect</button>
                </>}

            </div>

            
        </div>
    )
}

const listItem = {
    // backgroundColor: "blue"
}

const container = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", /* Semi-transparent background */
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "100"
}

const menu = {
    backgroundColor: "white", /* White background for the menu */
    padding: "20px", /* Padding inside the menu */
    borderRadius: "10px", /* Rounded corners */
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)", /* Subtle shadow */
    maxWidth: "400px", /* Maximum width */
    width: "100%", /* Full width up to the max-width */
    textAlign: "center",
}

const button = {
    background: "none",
    border: "none",
    textDecoration: "underline",
    padding: "0",
    margin: "0",
}