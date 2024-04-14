"use client";
import React, {useState} from "react";
import { useAccount } from "wagmi";
import CustomConnect from "@/components/CustomConnect";
import { useQuery } from "@tanstack/react-query";
import { contract,contractBase } from "@/app/contract";
import { formatEther, parseEther } from "viem";
import { useWriteContract, useConfig} from 'wagmi'
// import ABI from "../../app/"


async function setPrice(editionId, price) {
  await contract.write.setPrice([1, parseEther("1.5")]);
}

async function toggleMintStatus(editionId) {}

async function setGlobalSignature(signatureId) {}

async function createEdition(name, description, artGenerator, totalSupply) {}

async function setRoyaltyInfo(editionId, receiver, basisPoints) {}

async function contractOwner() {
  const owner = await contract.read.owner();
  return owner;
}



function Admin() {
  const { data: owner } = useQuery({
    queryKey: ["contractOwner"],
    queryFn: contractOwner,
    initialData: "",
  });

  const [inputState, setInputState] = useState({})

  const {writeContract, error} = useWriteContract();
  console.log(error)
  const handleInputChange = (value, functionName, parameter) => {

    setInputState((inputState) => {return {...inputState, [functionName]: {...inputState[functionName], [parameter]: value}}})
  }

  console.log(inputState)
  const account = useAccount();

  if (!account.isConnected) {
    return (
      <article>
        <p>if you are the owner, connect your wallet</p>
        <CustomConnect />
      </article>
    );
  }

  if (account.address !== owner) {
    return (
      <article>
        <p>you are not the owner. gtfo</p>
      </article>
    );
  }

  return (
    <article>
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
        {/* <fieldset>
        <legend>mint to</legend>
        <form>
          <input type="text" placeholder="addressTo" onChange={(e)=>{handleInputChange(e.target.value, "mintTo", "address")}}></input>
          <input type="text" placeholder="editionId" onChange={(e)=>{handleInputChange(e.target.value, "mintTo", "editionId")}}></input>
          
        </form>
        <button onClick={() => writeContract({...contractBase, functionName: "mintTo", args:[inputState["mintTo"]?.address, parseEther(inputState["mintTo"]?.editionId)]})}>mint</button>
      </fieldset>
        <br/>
        <br/>
        <br/> */}
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
