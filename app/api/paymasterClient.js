import { createClient, http } from "viem";
import { baseSepolia,base } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";



const paymasterService = process.env.COINBASE_BASE_MAINNET_PAYMASTER;

export const paymasterClient = createClient({
  chain: base,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677(ENTRYPOINT_ADDRESS_V06));
