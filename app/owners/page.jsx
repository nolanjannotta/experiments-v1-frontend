
// import {contract} from "../contract"
import {artAddress} from "../constants"
import Link from 'next/link'
import useTruncateAddress from "../../hooks/useTruncateAddress"
import { contract,publicClient } from "../contract_server";


async function getOwners() {
  const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
        const response = await fetch(`https://base-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_BASE_SEPOLIA}/getOwnersForContract?contractAddress=${artAddress}&withTokenBalances=true`, options)
        const owners = await response.json()
        // const ensTest = await publicClient.getEnsName("0x887e4cCaE8717e05C39aCfC2210293ac8DD9f2a2")
        // const promises = owners?.owners.map(async (element) =>  publicClient.getEnsName(element.ownerAddress) );
        // const ensNames = await Promise.all(promises);
        const ordered = owners.owners.sort((a, b) => {
            return b.tokenBalances.length - a.tokenBalances.length;
          });

      return ordered;
    } catch (error) {
      return {}

  }


}

function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`

}



export default async function Owners() {
    

    const owners = await getOwners();

    console.log(owners)
  return (
    <article>
      <h2>Owners</h2>
      <ul>

        {owners.map((owner, index) => {
          return (
            <li key={index}>
                &#9618;&#9618;&#9618;
                <Link href={`/browse/wallet/${owner.ownerAddress}`}>{truncateAddress(owner.ownerAddress)}</Link>
              &#9618;&#9618;&#9618;&#9618;&#9618;&#9618;
              balance: {owner.tokenBalances.length} &nbsp;
              &#9618;&#9618;&#9618;&#9618;&#9618;&#9618; 
        
            </li>
          )
        })}
      </ul>
    </article>
  );
}