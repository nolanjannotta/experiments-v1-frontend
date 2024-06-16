import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <article>
      <header>
        <h1>Create</h1>
      </header>

    <p>
        Releasing art through this project is permissioned but open to anyone! If you're interested in creating and sharing your own 100% onchain art through this platform, please reach out and I&apos;ll help you get started!

    </p>
    <p>
    <a target="_blank" href="https://twitter.com/jannotta_nolan">twitter</a> || <a target="_blank" href="https://warpcast.com/nolanj">warpcast</a>
    </p>
    <br/>
    <p>
        as an artist, you'll be in control of the following things: 
        <ul>
            <li>
                setting the mint status of your edition <small>(active/inactive)</small>. All editions start as inactive by default. Can be toggled back and forth at any time.
            </li>
            <li>
                If zero tokens in your edition have been minted, you can delete it. However, the edition id assigned to that edition cant be reused.
            </li>
            <li>
                setting and changing the price of your edition.
            </li>
            <li> 
                setting the royalty percentage for your edition.
            </li>
            <li>
                setting the signature id for you edition <small>(optional)</small>. This uses edition #1 of this project <small>(&apos;signatures&apos;)</small> to &apos;sign&apos; each token in your edition. 
                The signature id must be owned by the artist&apos;s address. The signature will appear in the bottom right corner of each token in your edition.
            </li>
            <li>
                artists are also able to mint their own editions through a special function. This bypasses the msg.value check and mint status check. This could be handy if
                you pause your edition near the end of the supply, but you want to mint and send token to a friend for example without needing 
                to unpause and risking someone minting in front of you.  
            </li>
        </ul>

        Obviously, this is all done onchain &#9786; these settings can be set <Link href="/artist">here</Link>. Connect your wallet and your editions will appear.
    </p>



      </article>
  )
}

export default page