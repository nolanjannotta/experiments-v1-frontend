"use client"
import Link from 'next/link'
import {useState} from 'react'
import {useAccount} from 'wagmi'
import OtherConnectButton from '../components/OtherConnectButton'




export default function Browse({searchParams}) {
  const account = useAccount()
  const [input, setInput] = useState('')

    return(
        <article>
           
           <header>
          <h1>browse</h1>
          <nav>
          <ul>
            <li><Link href="/browse/editions">all editions</Link></li>
            <li><Link href="/browse/all">all mints</Link></li>
            {/* <li><Link href={`/browse/wallet/${account.address}`}>my collection</Link></li> */}
            <li><OtherConnectButton/></li>
            
        </ul>
        </nav>
          </header> 

          <fieldset>
            {/* <legend>Modify</legend> */}
            <form>
                <input type="text" name="editionSearch" onChange={(e)=>setInput(e.target.value)} placeholder="token id"/>
                
                <Link href={`./browse/token/${input}`}><button>search</button></Link>
            </form>

        </fieldset>

        

        {/* {searchParams.display === "search" && <Search />} */}

         



        </article>
        
    )
}


const button = {
    background: "none",
    border: "none",
    textDecoration: "underline",

  }
  
