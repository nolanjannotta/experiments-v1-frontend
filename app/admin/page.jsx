"use client";
import React, {useState} from "react";
import { useAccount, useWriteContract,useReadContracts , useReadContract, useBalance } from "wagmi";
import ConnectSimple from "@/components/ConnectSimple";
import { useQuery } from "@tanstack/react-query";
import { contract,contractBase,publicClient } from "@/app/contract";
import { formatEther, parseEther } from "viem";
import splitterABI from "@/app/PaymentSplitter.json"

// async function getTotalPlatformRoyalties() {
//   const editionCounter = await contract.read.EDITION_COUNTER();
//   for(let i = 1; i <= Number(editionCounter); i++) {

//   }
// }


async function getAdminData() {
  const owner = await contract.read.OWNER();
  const minter = await contract.read.MINTER_ADDRESS();
  const globalSignature = await contract.read.GLOBAL_SIGNATURE_ID();
  const contractBalance = await publicClient.getBalance({address: contract.address});
  return {owner, minter,contractBalance,globalSignature};
}





function Admin() {
  // const { data: adminData, error: adminError } = useQuery({
  //   queryKey: ["adminData"],
  //   queryFn: getAdminData,
  //   initialData: {},
  // });



  //   const operations = []
  //   for(let i = 1; i <= Number(readContracts?.data[2].result); i++) {
  //     operations.push({
  //       ...contractBase,
  //       functionName: "getEdition",
  //       args: [i]
  //     })
  //   }

  // const totalRoyalties = useReadContracts({
  //   contracts: operations
  // })




  // console.log("royalties", totalRoyalties)

  const [inputState, setInputState] = useState({})

  const {writeContract, error} = useWriteContract();
  const handleInputChange = (value, functionName, parameter) => {

    setInputState((inputState) => {return {...inputState, [functionName]: {...inputState[functionName], [parameter]: value}}})
  }

  const account = useAccount();

  const balance = useBalance({
    address: contractBase.address
  });
  
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

  console.log("balance", balance)

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
  

  if (!account.isConnected) {
    return (
      <article>
        <p>if you are the owner, connect your wallet</p>
        <ConnectSimple label="connect" asAnchor={true}/>
      </article>
    );
  }

  if (account.address !== readContracts?.data[0]?.result) {
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
        <input placeholder="edition id"></input>
        <button onClick={() => writeContract({...contractBase, functionName: "releasePlatformRoyalty"})}>withdraw</button>
      </fieldset>
        <br/>
        <br/>
      <fieldset>
        <legend>set new owner</legend>
        <p>owner: {readContracts?.data[0]?.result}</p>
        <form>
          <input type="text" placeholder="address" onChange={(e)=>{handleInputChange(e.target.value, "setNewOwner", "address")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "setOwner", args:[inputState["setNewOwner"]?.address]})}>set owner</button>
      </fieldset>
        <br/>
        <br/>
      <fieldset>
        <legend>create new edition</legend>
        <form>
          <input type="text" placeholder="name" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "name")}}></input>
          <input type="text" placeholder="description" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "description")}}></input>
          <input type="text" placeholder="art generator address" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "artGeneratorAddress")}}></input>
          <input type="text" placeholder="total supply" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "totalSupply")}}></input>
          
        </form>
        <button>create edition</button>
      </fieldset>
  
    </article>
  );
}

export default Admin;
