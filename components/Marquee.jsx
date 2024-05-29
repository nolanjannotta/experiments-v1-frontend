"use client"

import { publicClient } from "../app/contract";
import {artAddress, ZERO_ADDRESS} from "../app/constants";
import { parseAbiItem, fromHex } from 'viem'
import { useQuery } from '@tanstack/react-query'


function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

let blockCount = 1000n

async function getLogs() {

    
    const blockNumber = await publicClient.getBlockNumber();

    const logs = await publicClient.getLogs({  
        address: artAddress,
        event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
        fromBlock: blockNumber - blockCount,
        toBlock: blockNumber

      })

      return logs
    }



export default function Marquee() {

    // const client = config.getClient();

    // let blockCount = 1000n
    // const blockNumber = await publicClient.getBlockNumber();

    // const logs = await publicClient.getLogs({  
    //     address: artAddress,
    //     event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
    //     fromBlock: blockNumber - blockCount,
    //     toBlock: blockNumber

    //   })

    //   console.log("current", blockNumber)
    //   console.log(logs)


      const {data: logs, error, isLoading, refetch} = useQuery({
        queryKey: ["logs"],
        queryFn: getLogs,
        initialData: []
      
      })
      


    return(
        <marquee style={marquee} >
            <div style={marqueContainer}>
            &#x2736;&#x2736;&#x2736; {logs.length} events in the last {Number(blockCount)} blocks &#x2736;&#x2736;&#x2736; &nbsp;&nbsp;&nbsp;&nbsp;
            {logs.map((log, index) => {
                
                return(
                    <div key={index}>
                        &#x27EC;<b>{log.args[0] === ZERO_ADDRESS ? "mint" : "transfer"}</b> &nbsp;
                        from: {truncateAddress(log.args[0])}&nbsp;&#x27F6;
                        to: {truncateAddress(log.args[1])}&nbsp;
                        token id:  {fromHex(log.topics[3], "number")}&#x27ED;&nbsp;&#x21D4;&nbsp;

                         {/* &nbsp;&#x2736;&nbsp; */}
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