"use client";
import React, {useState} from "react";
import { useAccount } from "wagmi";
import CustomConnect from "@/components/CustomConnect";
import { useQuery } from "@tanstack/react-query";
import { contract,contractBase,publicClient } from "@/app/contract";
import { formatEther, parseEther } from "viem";
import { useWriteContract, useConfig} from 'wagmi'
// import ABI from "../../app/"



async function getAdminData() {
  const owner = await contract.read.OWNER();
  const minter = await contract.read.MINTER_ADDRESS();
  const contractBalance = await publicClient.getBalance({address: contract.address});
  return {owner, minter,contractBalance};
}





function Admin() {
  const { data: adminData, error: adminError } = useQuery({
    queryKey: ["adminData"],
    queryFn: getAdminData,
    initialData: {},
  });


  const [inputState, setInputState] = useState({})

  const {writeContract, error} = useWriteContract();
  const handleInputChange = (value, functionName, parameter) => {

    setInputState((inputState) => {return {...inputState, [functionName]: {...inputState[functionName], [parameter]: value}}})
  }

  const account = useAccount();

  if (!account.isConnected) {
    return (
      <article>
        <p>if you are the owner, connect your wallet</p>
        <CustomConnect />
      </article>
    );
  }

  if (account.address !== adminData.owner) {
    return (
      <article>
        <p>owner: {adminData.owner}</p>
        <p>minter: {adminData.minter}</p>
        <p>you are not the owner. gtfo</p>
      </article>
    );
  }

  return (
    <article>
      <p>owner: {adminData.owner}</p>
      <p>minter: {adminData.minter}</p>
      <p>balance: {formatEther(adminData.contractBalance)} eth</p>

      <fieldset>
        <legend>withdraw</legend>
        <button onClick={() => writeContract({...contractBase, functionName: "withdraw"})}>withdraw</button>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>set minter address</legend>
        <form>
          <input type="text" placeholder="address" onChange={(e)=>{handleInputChange(e.target.value, "setMinterAddress", "address")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "setMinterAddress", args:[inputState["setMinterAddress"]?.address]})}>set minter</button>
      </fieldset>
      <br/>
        <br/>
        <br/> 
      <fieldset>
        <legend>set new owner</legend>
        <form>
          <input type="text" placeholder="address" onChange={(e)=>{handleInputChange(e.target.value, "setNewOwner", "address")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "setOwner", args:[inputState["setNewOwner"]?.address]})}>set owner</button>
      </fieldset>
      <br/>
        <br/>
        <br/>
       
      <fieldset>
        <legend>set price for an edition</legend>
        <form>
          <input type="text" placeholder="edition Id" onChange={(e)=>{handleInputChange(e.target.value, "setPrice", "editionId")}}></input>
          <input type="text" placeholder="price in eth" onChange={(e)=>{handleInputChange(e.target.value, "setPrice", "price")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "setPrice", args:[inputState["setPrice"]?.editionId, parseEther(inputState["setPrice"]?.price)]})}>set price</button>
      </fieldset>
        <br/>
        <br/>
        <br/>

      <fieldset>
        <legend>toggle mint status</legend>
        <form>
          <input type="text" placeholder="edition Id" onChange={(e)=>{handleInputChange(e.target.value, "toggleMintStatus", "editionId")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "setMintStatus", args:[inputState["toggleMintStatus"]?.editionId, true]})}>on</button>
        <button onClick={() => writeContract({...contractBase, functionName: "setMintStatus", args:[inputState["toggleMintStatus"]?.editionId, false]})}>off</button>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>set global signature</legend>
        <form>
          <input type="text" placeholder="Signature ID" onChange={(e)=>{handleInputChange(e.target.value, "setGlobalSignature", "signatureId")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "setGlobalSignatureId", args:[inputState["setGlobalSignature"]?.signatureId]})}>set global signature</button>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>create new edition</legend>
        <form>
          <input type="text" placeholder="name" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "name")}}></input>
          <input type="text" placeholder="desciption" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "description")}}></input>
          <input type="text" placeholder="art generator address" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "artGeneratorAddress")}}></input>
          <input type="text" placeholder="total supply" onChange={(e)=>{handleInputChange(e.target.value, "createNewEdition", "totalSupply")}}></input>
          
        </form>
        <button>create edition</button>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>set royalty info</legend>
        <form>
          <input type="text" placeholder="edition ID" onChange={(e)=>{handleInputChange(e.target.value, "setRoyaltyInfo", "editionId")}}></input>
          <input type="text" placeholder="receiver" onChange={(e)=>{handleInputChange(e.target.value, "setRoyaltyInfo", "receiver")}}></input>
          <input type="text" placeholder="basis points" onChange={(e)=>{handleInputChange(e.target.value, "setRoyaltyInfo", "basisPoint")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "setRoyaltyInfo", args:[inputState["setRoyaltyInfo"]?.editionId,inputState["setRoyaltyInfo"]?.receiver, inputState["setRoyaltyInfo"]?.basisPoint]})}>set royalty info</button>
      </fieldset>
    </article>
  );
}

export default Admin;
