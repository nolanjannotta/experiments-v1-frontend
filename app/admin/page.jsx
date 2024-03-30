"use client";
import React from "react";
import { useAccount } from "wagmi";
import CustomConnect from "@/components/CustomConnect";
import { useQuery } from "@tanstack/react-query";
import { contract } from "@/app/contract";
import { formatEther } from "viem";

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
          <input type="number" placeholder="edition Id"></input>
          <input type="text" placeholder="price in eth"></input>
          <button>set price</button>
        </form>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>toggle mint status</legend>
        <form>
          <input type="number" placeholder="edition Id"></input>
          <button>toggle mint status</button>
        </form>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>set global signature</legend>
        <form>
          <input type="number" placeholder="Signature ID"></input>
          <button>set global signature</button>
        </form>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>create new edition</legend>
        <form>
          <input type="number" placeholder="name"></input>
          <input type="number" placeholder="desciption"></input>
          <input type="number" placeholder="art generator address"></input>
          <input type="number" placeholder="total supply"></input>
          <button>create edition</button>
        </form>
      </fieldset>
        <br/>
        <br/>
        <br/>
      <fieldset>
        <legend>set royalty info</legend>
        <form>
          <input type="number" placeholder="edition ID"></input>
          <input type="text" placeholder="receiver"></input>
          <input type="number" placeholder="basis points"></input>
          <button>set royalty info</button>
        </form>
      </fieldset>
    </article>
  );
}

export default Admin;
