import { paymasterClient } from "../paymasterClient";
import { willSponsor } from "../utils";



export async function POST(request) {

  const body = await request.json();
  console.log(body)
  const method = body.method;
  const [userOp, entrypoint, chainId] = body.params;


//   if (!willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
//     return Response.json({ error: "Not a sponsorable operation" });
//   }


  if (method === "pm_getPaymasterStubData") {
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    return Response.json({ result });
  } else if (method === "pm_getPaymasterData") {
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }
  return Response.json({ error: "Method not found" });
}