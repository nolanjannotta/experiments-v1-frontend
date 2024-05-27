import { useEnsName, createConfig } from "wagmi";
import { http } from 'viem'
import { mainnet } from 'viem/chains';

export default function useGetEnsName(address) {

    const ensConfig = createConfig({
        chains: [mainnet], 
        transports: {[mainnet.id]: http()}
      })
    
    
      const {data: ensName} = useEnsName({
          address: address, 
          config: ensConfig,
          chainId: 1
      })
    


      

    return ensName;
}