import { publicClient } from "../app/contract_server";
import {artAddress, ZERO_ADDRESS} from "../app/constants";
import { parseAbiItem } from 'viem'

function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }



export default async function Marquee() {

    // const client = config.getClient();

    let blockCount = 50n
    const blockNumber = await publicClient.getBlockNumber();

    const logs = await publicClient.getLogs({  
        address: artAddress,
        event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
        fromBlock: blockNumber - blockCount,
        toBlock: blockNumber

      })

      console.log("current", blockNumber)
      console.log(logs)


    return(
        <marquee style={marquee} >
            <div style={marqueContainer}>
               *** {logs.length} transfers in the last {Number(blockCount)} blocks *** &nbsp;&nbsp;&nbsp;&nbsp;
            {logs.map((log, index) => {
                
                return(
                    <div key={index}>
                        &#x27EC;<b>{log.args[0] === ZERO_ADDRESS ? "mint" : "transfer"}</b> &nbsp;
                        from: {truncateAddress(log.args[0])}&nbsp;&#x27F6;
                        to: {truncateAddress(log.args[1])}&#x27ED; &nbsp;&#x2736;&nbsp;
                    </div>
                )
            })} 
            </div>
            
        </marquee>
    )
}

const marquee = {
    position: "absolute",
    top: "5px",
    // display: "flex",
  
  }

  const marqueContainer = {
    display: "flex",
  }