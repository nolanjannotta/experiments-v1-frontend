import { NextResponse } from "next/server";
import {getFrameHtmlResponse,getFrameMessage} from "@coinbase/onchainkit/frame";
import { getLastMint } from "@/app/frameConfig.js";
import {kv } from "@vercel/kv"
import {FRAME_URL,nolanjFID} from "@/app/constants.js"
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const neynar = new NeynarAPIClient(process.env.NEYNAR_KEY);

const doesUserFollowNolan = async (fid) => {
    if(fid == nolanjFID) return true;

    let cursor = "";
    let users = [];
    do {
      const result = await neynar.fetchUserFollowing(fid, {
        limit: 150,
        cursor,
      });
      users = users.concat(result.result.users);
      cursor = result.result.next.cursor;

    } while (cursor !== "" && cursor !== null);
  
    if(users.includes(nolanjFID)) {
        return true;
    }
    return false;
  };


async function getResponse(request) {
    const editionId = request.nextUrl.searchParams.get("editionId");
    const body = await request.json();
    const allowFramegear = process.env.NODE_ENV !== 'production'; 

    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY, allowFramegear});
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
      }

    const userFollowsNolan = await doesUserFollowNolan(message.interactor.fid);
    await kv.hset(message.interactor.fid, {isFollower: userFollowsNolan}); 

    const lastData = await getLastMint(editionId);
    const currentAllowance = await kv.hget(message.interactor.fid, lastData?.lastEdition.name);

    if(currentAllowance == null) {
        await kv.hset(message.interactor.fid, {[lastData?.lastEdition.name]: 2});
    }



    const image = `${FRAME_URL}/frames/images/mint?date=${Date.now()}&editionName=${lastData.lastEdition.name}&supply=${lastData.lastEdition.supply.toString()}&remaining=${(lastData.lastEdition.supply - lastData.lastEdition.counter).toString()}&lastId=${((lastData.editionId * 1000000n) + lastData.lastEdition.counter).toString()}&allowance=${currentAllowance == null ? 2 : currentAllowance}&following=${userFollowsNolan}&hasVerifiedAddresses=${message.interactor.verified_addresses.eth_addresses ? "true" : "false"}&active=${lastData.lastEdition.mintStatus ? "true" : "false"}`
    // process.env.NODE_ENV !== 'production' ? message.interactor.verified_addresses.eth_addresses = ["0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", "0xcddb54bbAC783c2aE9860A8e494556c0b61e4Eee"] : message.interactor.verified_addresses.eth_addresses
    
    let buttons = [];
    if(currentAllowance == null || currentAllowance > 0) {
        if(!message.interactor.verified_addresses.eth_addresses) {
            buttons = [{label: "mint on the website!", action: "link", target: `${FRAME_URL}/mint`}]
        }
        else {
            buttons = message.interactor.verified_addresses.eth_addresses.map((address) => {return {label: `${address.slice(0,6)}...${address.slice(-4)}`, action: "post", target: `${FRAME_URL}/frames/submit?address=${address}&editionId=${lastData.editionId}`}})
        }
    }
    else {
        buttons = [{label: "mint on the website!", action: "link", target: `${FRAME_URL}/mint`}]
    }


    return new NextResponse(
        getFrameHtmlResponse({
            buttons: userFollowsNolan ? buttons : [{label: "home", target: `${FRAME_URL}/frames/${lastData.editionId}`}],
            image: {src: image, aspectRatio: '1:1'},
            // postUrl: userFollowsNolan && `${FRAME_URL}/frames/submit?editionId=${lastData.editionId}`,
            state: {tokenName: lastData.lastEdition.name}
            
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";

// export const GET = POST;
