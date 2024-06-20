"use client"
import React, {useEffect} from 'react'
import {useRouter} from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import { contract } from '@/app/contract'

function MintPage() {
    const router = useRouter();
    const {data:currentEdition, error, isLoading} = useQuery({
        queryKey: ["lastEdition"],
        queryFn: async() => {
            const currentEditionId = await contract.read.EDITION_COUNTER();
            return Number(currentEditionId);

        },
        initialData: 0
      
      })
    
    
    useEffect(()=> {
        if(currentEdition !== 0) {
            router.push(`/mint/${currentEdition}`)
        }
    
    },[currentEdition])

  return (
    <article>hang tight... redirecting to latest edition.</article>
  )
}

export default MintPage