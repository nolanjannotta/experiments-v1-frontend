import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import {FRAME_URL} from "@/app/constants.js";

async function getResponse(request) {
  const body = await request.json();
//   const { isValid } = await getFrameMessage(body);

//   if (!isValid) {
//     return new NextResponse('Message not valid', { status: 500 });
//   }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Tx: ${body?.untrustedData?.transactionId || '--'}`,
        },
      ],
      image: {
        src: `${FRAME_URL}/frames/images/mint?date=${Date.now()}&editionId=${1}`

      },
    }),
  );
}

export async function POST(request ){
  return getResponse(request);
}

export const dynamic = 'force-dynamic';