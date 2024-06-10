import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, parseEther } from 'viem';
import { baseSepolia } from 'viem/chains';
import abi from '@/app/ART_ABI.json';
import { artAddress } from '@/app/constants';

async function getResponse(request, params){
  const body = await request.json();
  // Remember to replace 'NEYNAR_ONCHAIN_KIT' with your own Neynar API key
  // const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  // if (!isValid) {
  //   return new NextResponse('Message not valid', { status: 500 });
  // }

  const data = encodeFunctionData({
    abi: abi,
    functionName: 'mint',
    args: [params.editionId],
  });

  const txData = {
    chainId: `eip155:${baseSepolia.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      data,
      to: artAddress,
      // value: parseEther('0.00004').toString(), // 0.00004 ETH
    },
  };
  // console.log(txData);
  return NextResponse.json(txData);
}

export async function POST(request, {params}) {
  return getResponse(request, params);
}

export const dynamic = 'force-dynamic';