"use client";
import React, {useState, useEffect} from "react";
import { useAccount, useWriteContract,useReadContracts , useReadContract, useBalance } from "wagmi";
import ConnectSimple from "@/components/ConnectSimple";
import { useQuery } from "@tanstack/react-query";
import { contract,contractBase,publicClient } from "@/app/contract";
import { currentChain } from "@/app/constants";
import { formatEther, parseEther } from "viem";
import splitterABI from "@/app/PaymentSplitter.json"

// async function getTotalPlatformRoyalties() {
//   const editionCounter = await contract.read.EDITION_COUNTER();
//   for(let i = 1; i <= Number(editionCounter); i++) {

//   }
// }


async function getAdminData() {
  const owner = await contract.read.OWNER();
  const contractBalance = await publicClient.getBalance({address: contract.address});
  return {owner, minter,contractBalance,globalSignature};
}





function Admin() {


  const [inputState, setInputState] = useState({})

  const {writeContract, error} = useWriteContract();


  const handleInputChange = (value, functionName, parameter) => {

    setInputState((inputState) => {return {...inputState, [functionName]: {...inputState[functionName], [parameter]: value}}})
  }

  const account = useAccount();
  
  const ownerBalance = useBalance({
    address: account.address 
  })

  const balance = useBalance({
    address: contract.address
  });

  console.log("ownerBalance", ownerBalance)
  
  const readContracts = useReadContracts({
      contracts: [
        {
          ...contractBase,
          functionName: "OWNER"
        },
        {
        ...contractBase,
        functionName: "EDITION_COUNTER"
        }
      ]
  })

  useEffect(() => {

  }, [inputState["releasePlatformRoyalties"]])
  

console.log("readContracts", readContracts)


  // const royalties = useReadContract({
  //   contracts: [


  //   ]
  // })




  // changeOwner
  // setPlatformFee
  // setPlatformRoyalty
  // releasePlatformRoyalty
  // createNewEdition
  // withdraw

  if(readContracts.isLoading) {
    return (
      <article>
        <p>loading...</p>
      </article>
    )
  }

  if(currentChain.id !== 8453 && currentChain.id !== 84532){
    console.log(currentChain.id)
    return (
      <article>
        <p>you are on the wrong network</p>
        <p>owner: {readContracts?.data[0]?.result}</p>
      </article>
    )
  }
  

  if (!account.isConnected) {
    return (
      <article>
        <p>if you are the owner, connect your wallet</p>
        <ConnectSimple label="connect" asAnchor={true}/>
      </article>
    );
  }

  if (readContracts.data && account.address !== readContracts?.data[0]?.result) {
    return (
      <article>
        <p>owner: {readContracts?.data[0]?.result}</p>
        <p>you are not the owner.</p>
      </article>
    );
  }

  return (
    <article>

      <fieldset>
        <legend>withdraw</legend>
        <p>balance: {formatEther(balance.data.value)} eth</p>
        <button onClick={() => writeContract({...contractBase, functionName: "withdraw"})}>withdraw</button>
      </fieldset>
      <br/>
      <br/>
      <fieldset>
        <legend>release Royalty</legend>
        <input onChange={(e) => handleInputChange(e.target.value, "releasePlatformRoyalty", "edition")} placeholder="edition id"></input>
        <button onClick={() => writeContract({...contractBase, functionName: "releasePlatformRoyalty", args:[inputState["releasePlatformRoyalty"]?.edition]})}>withdraw</button>
      </fieldset>
        <br/>
        <br/>
      <fieldset>
        <legend>set new owner</legend>
        <p>owner: {readContracts?.data[0]?.result}</p>
        <form>
          <input type="text" placeholder="address" onChange={(e)=>{handleInputChange(e.target.value, "changeOwner", "address")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "changeOwner", args:[inputState["changeOwner"]?.address]})}>set owner</button>
      </fieldset>
        <br/>
        <br/>
      <fieldset>
        {/* string memory name, string memory description, uint supply, address artGenerator, address artistAddress, string memory artistName */}
        <legend>create new edition</legend>
        <form>
          <input type="text" placeholder="name" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "name")}}></input>
          <input type="text" placeholder="description" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "description")}}></input>
          <input type="text" placeholder="total supply" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "supply")}}></input>
          <input type="text" placeholder="art generator address" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "artGenerator")}}></input>
          <input type="text" placeholder="artist address" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "artistAddress")}}></input>
          <input type="text" placeholder="artist name" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "artistName")}}></input>
          
          
        </form>
        <button onClick={() => writeContract(
          {...contractBase, 
          functionName: "createNewEdition", 
          args:[
            inputState["createNewEdition"]?.name,
            inputState["createNewEdition"]?.description,
            inputState["createNewEdition"]?.supply,
            inputState["createNewEdition"]?.artGenerator,
            inputState["createNewEdition"]?.artistAddress,
            inputState["createNewEdition"]?.artistName
          ]})}>create edition</button>
      </fieldset>
  
    </article>
  );
}

export default Admin;
