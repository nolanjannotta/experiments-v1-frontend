"use client"
import { useState } from 'react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'


function Modify() {
  const [input, setInput] = useState('')
  const router = useRouter()


  return (
    <article>
      <header>
        <h1>modify</h1>
      </header>
      <p>search for a token you own to modify.</p>

      <fieldset>
            <form>
                <input type="text" name="editionSearch" onChange={ (event)=>{setInput(event.target.value)}} placeholder="token id"/>
                
                <button>
                  <Link href={`/modify/${input}`}> Modify</Link>
                  </button>
            </form>

        </fieldset>
    </article>
    
  )
}

export default Modify