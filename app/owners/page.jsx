// import {contract} from "../contract"
import {artAddress} from "../constants"
import Link from 'next/link'
import { ZERO_ADDRESS } from "../constants";
import { getEnsName,createConfig } from '@wagmi/core'
import { http } from 'viem'
import {mainnet} from "viem/chains"


  const ensConfig = createConfig({
    chains: [mainnet], 
    transports: {[mainnet.id]: http(process.env.ENS_RPC_URL)},
    ssr: true
  })

async function getEns(address) {

  const ensName = await getEnsName(ensConfig, {
    address: address,
    chainId: 1
  })
  // console.log(ensName)
  return ensName
} 


async function getOwners() {

  
  const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ALCHEMY_URL}/getOwnersForContract?contractAddress=${artAddress}&withTokenBalances=true`, options)

        const owners = await response.json()
        const ordered = owners.owners.sort((a, b) => {
            return b.tokenBalances.length - a.tokenBalances.length;
          });

        
        for(const owner of ordered) {
          const ensName = await getEns(owner.ownerAddress)
          owner.ens = ensName
          // console.log(ensName)
        }
        // console.log(ordered)
        return ordered;
      // return ordered.map((ens) => {ens && console.log("ens", ens)});
    } catch (error) {
      console.log(error)
      return []

  }


}

function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`

}



export default async function Owners() {
  // const {address} = useAccount();
    // const ensTest = await getEns("0x910B48C25aFC5b2a998458B62d467D482ECA74AF");
    // console.log(ensTest)
    const owners = await getOwners();

  return (
    <article>
      <h2 style={{margin: 0}}>Owners &nbsp;</h2>
      <small>{owners.length} unique owners</small>
      <br/>
      <br/>
      <br/>
      <ul>

        {owners.map((owner, index) => {
          if(owner.ownerAddress === ZERO_ADDRESS) return null
          // const ens = a
          // console.log(ens)
          return (
            <li key={index}>
                &nbsp;&nbsp;&nbsp;
                <Link href={`/browse/wallet/${owner.ownerAddress}`}>{owner.ens ? owner.ens : truncateAddress(owner.ownerAddress)}</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              balance: {owner.tokenBalances.length} &nbsp;
            <hr/>
            </li>
          )
        })}
      </ul>
    </article>
  );
}