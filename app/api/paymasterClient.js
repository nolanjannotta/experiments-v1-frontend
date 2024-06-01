import { createClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";


// const paymasterService = process.env.NEXT_COINBASE_BASE_SEPOLIA_NODE;

export const paymasterClient = createClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_COINBASE_BASE_SEPOLIA_NODE),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));