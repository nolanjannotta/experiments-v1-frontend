import {useCapabilities} from "wagmi/experimental";
import {useMemo} from "react";



export default function useGetCapabilities(account) {

    const { data: availableCapabilities } = useCapabilities({
        account: account.address,
      });

      const capabilities = useMemo(() => {
        if (!availableCapabilities || !account.chainId) return;
        const capabilitiesForChain = availableCapabilities[account.chainId];
        if (
          capabilitiesForChain["paymasterService"] &&
          capabilitiesForChain["paymasterService"].supported
        ) {
          return {
            paymasterService: {url:`${document.location.origin}/api/paymaster`}
          };
        }
      }, [availableCapabilities]);


    return capabilities
}