import React from 'react'
import Link from 'next/link'


function Contracts() {
  return (
    <article>
        <nav>

        
        <ul>
            <li>
              <Link href="/contracts/artgenerator"> art generators</Link>  
            </li>
            <li>
               <Link href="/contracts/main">main contract</Link> 
            </li>
        </ul>
        </nav>
        
        


    </article>
  )
}

export default Contracts