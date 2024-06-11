import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import {FRAME_URL} from "@/app/constants.js";
import {checkTxStatus} from "@/app/frameConfig.js";
import {artAddress} from "@/app/constants.js";

async function getResponse(request) {
  const body = await request.json();
//   const { isValid } = await getFrameMessage(body);

//   if (!isValid) {
//     return new NextResponse('Message not valid', { status: 500 });
//   }
    let state = {}

    if(body.untrustedData?.state){
        state = JSON.parse(decodeURIComponent(body.untrustedData.state))
    }
    else if(body?.untrustedData?.transactionId){
        state = {txHash: body?.untrustedData?.transactionId}

    }
    
    const txStatus = await checkTxStatus(state.txHash);

    let buttons = []

    if(txStatus.status === "success"){
        buttons = [
            {label: "open sea", action: "link",  target: `https://testnets.opensea.io/assets/base-sepolia/${artAddress}/${txStatus.tokenId}`}
        ]
    }
    else {
        buttons = [
            {label: "check status", target: `${FRAME_URL}/frames/tx-success`}
        ]
    }

    buttons.push({label: "Home", target: `${FRAME_URL}/frames`})

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: buttons,
      image: {
        src: `${FRAME_URL}/frames/images/success?status=${txStatus.status}&tokenId=${txStatus.tokenId}&date=${Date.now()}`,
        aspectRatio: '1:1'

      },
        state: state,
    }),
  );
}

export async function POST(request ){
  return getResponse(request);
}

export const dynamic = 'force-dynamic';