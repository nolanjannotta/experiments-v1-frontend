
// import {contract} from "../contract"
import {artAddress} from "../constants"
import Link from 'next/link'
import useTruncateAddress from "../../hooks/useTruncateAddress"
import { contract,publicClient } from "../contract_server";


async function getOwners() {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  // console.log(artAddress)
    try {
        const response = await fetch(`https://base-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getOwnersForContract?contractAddress=${artAddress}&withTokenBalances=true`, options)

        const owners = await response.json()
        // console.log(owners)
        const ordered = owners.owners.sort((a, b) => {
            return b.tokenBalances.length - a.tokenBalances.length;
          });

      return ordered;
    } catch (error) {
      // console.log(error)
      return []

  }


}

function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`

}



export default async function Owners() {

    const owners = await getOwners();

  return (
    <article>
      <h2>Owners</h2>
      <ul>

        {owners.map((owner, index) => {
          return (
            <li key={index}>
                &nbsp;&nbsp;&nbsp;
                <Link href={`/browse/wallet/${owner.ownerAddress}`}>{truncateAddress(owner.ownerAddress)}</Link>
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