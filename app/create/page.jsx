import Link from 'next/link'

function page() {
  return (
    <article>
      <header>
        <h1>Create</h1>
      </header>

    <p>
        Releasing art through this project is permissioned but open to anyone! If you&apos;re interested in creating and sharing your own 100% onchain art through this platform, please reach out and I&apos;ll help you get started!

    </p>
    <p>
    <a target="_blank" href="https://twitter.com/jannotta_nolan">twitter</a> || <a target="_blank" href="https://warpcast.com/nolanj">warpcast</a>
    </p>

    <br/>
    <p>
        To create an edition, you&apos;ll need to provide the following information:
    </p>
    <ul>
            <li>
                name
            </li>
            <li>
                description
            </li>
            <li>
                total supply
            </li>
            <li>
                art generator contract address
            </li>
            <li>
                artist address <small>(the address must be controlled by the artist, this is used to change settings for the edition.)</small>
            </li>
        </ul>
        <p><b>note: this information cannot be changed afterwards. also, the art generator needs to be deployed and the code verified before hand. 
            This is so I can read the code and make sure it roughly aligns with the core values of Onchain-Experiments_V1™ <small>(i.e. it as actually onchain and at least some effort was involved)</small>.</b></p>
    <br/> 
    <p>
        As an artist, you&apos;ll be in control of the following things: 
    </p>
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
                to unpause and risking someone minting in front of you. Another possibility is to set the artist to a smart contract. This contract can have custom mint logic  using this special function. But, this can also bypass platform royalties.
            </li>
        </ul>

        <p>
        Obviously, this is all done onchain &#9786; these settings can be set <Link href="/artist">here</Link>. Connect your wallet and your editions will appear.

        </p>

        <h3>fees:</h3>

        <p>
            if you set a mint price for your edition, a 5-10% &apos;protocol fee&apos; is subtracted from each mint transaction. In addition, a 5-10% fee is applied to your royalty percentage. 
        <br/>
        <br/>
        for example:
        </p>
        <ul>
            
            <li>
            you set a 10% royalty on your edition
            </li>
            <li>
            platform royalty fee is 5% <small>(5% of the total 10%)</small>
            </li>
            <li>
            A token is sold for 1 eth
            </li>
            <li>
            total royalty is .1 eth
            </li>
            <li>
            artist keep .095 eth
            </li>
            <li>
            platform keeps .005 eth
            </li>

        </ul>
        <p>
            These small fees will help me continue to sponsor the gas costs for minting and other operations and continue to develop this project.

        </p>



      </article>
  )
}

export default page