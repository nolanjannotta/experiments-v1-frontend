import { useEffect, useState } from 'react';

export default function useGetTransactionStatus({sponsoredResults, nonSponsoredResults, refetch}) {
    const [tokenId, setTokenId] = useState(null)
    const [txStatus, setTxStatus] = useState(null)



    useEffect(() => {
        if(sponsoredResults?.status === "CONFIRMED") {
            // refetch()
            setTokenId(fromHex(sponsoredStatus.receipts[0].logs[1].topics[3], "number"))
        }

        if(nonSponsoredResults.isSuccess){
            // refetch()
            setTokenId(fromHex(tx.data.logs[0].topics[3], "number"))
        }

    },[sponsoredResults,nonSponsoredResults])



    return {txStatus, tokenId}


}