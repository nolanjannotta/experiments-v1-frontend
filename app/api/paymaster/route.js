import { paymasterClient } from "../paymasterClient";
import { willSponsor } from "../utils";



export async function POST(request) {
  const body = await request.json();
  const method = body.method;
  const [userOp, entrypoint, chainId] = body.params;

    console.log(paymasterClient)
    console.log("method", method)
    console.log("userOp", userOp)
    console.log("entrypoint", entrypoint)
    console.log("chainId", chainId)

  if (!await willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
    return Response.json({ error: "Not a sponsorable operation" });
    console.log("Not a sponsorable operation")
  }
  console.log("is a sponsorable operation")


  if (method === "pm_getPaymasterStubData") {
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    console.log("pm_getPaymasterStubData results", result)
    return Response.json({ result });

  } else if (method === "pm_getPaymasterData") {
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    console.log("pm_getPaymasterData results", result)
    return Response.json({ result });
  }
  return Response.json({ error: "Method not found" });
}