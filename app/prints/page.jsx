import React from 'react'

function Prints() {
  return (
    <article>
      <header>
        <h1>prints</h1>
      </header>

      <p>
        A major goal of this project is to normalize offering high quality
        archival grade prints for onchain art directly from the
        creator/artist/platform. I&apos;m a believer that all digital art should 
        have a physical counterpart that does not rely on the internet or electricity 
        to be displayed and enjoyed.  Having the prints come directly from the 
        creator/artist/platform is also important to me as that maintains the provenance of the art in my opinion.
        </p>
        <p>
        As of now for this project though, this depends entirely
        on whether theres any interest whatsoever from collectors. If there is,
        I will personally invest in a printer and get this whole thing started.
      </p>

      <figure>
        <figcaption>Goals:</figcaption>
        <ul>
          <li>Highest quality reasonably possible. <small>(Epson P700 or P900)</small></li>
          <li>
            All printing, packaging and shipping will be done by hand by me.
          </li>
          <li>All packaging should be 100% recyclable.</li>
          <li>Ideally shipped anywhere in the world.</li>
          <li>
            The revenue from the prints will be split between the artist, the
            owner of the piece being printed, and the platform/printer. Percentages TBD.
          </li>
          <li>Prints will be priced in Eth. </li>
          <li>
            All payments, royalties etc and as much business logic as possible
            will take place on chain. Things like shipping addresses will need
            to be handled elsewhere, possibly Coinbase Commerce or Slice?
          </li>
          <li>
            Will include the SVG code printed on the back or on a separate piece
            of paper.
          </li>
          <li>
            May include some sort of watermark or some kind of cryptographic
            signed message for authenticity.
          </li>
          <li>
            Another idea is to go beyond just the minted tokens. Since the original code for the art 
            will be onchain forever, you can use that <i>exact</i> program <small>(&#9734;provenance&#9734;)</small> along with random seeds to create brand new outputs. 
            One example is 1 of 1 generative stationary or post cards. Sold in packs. Send 1 of 1 physical 
            art to people you like! One downside of this though, is that you&apos;re arguably increasing the
            supply of the generative art, although you aren&apos;t increasing the supply of the onchain tokens.
          </li>
        </ul>
      </figure>
    </article>
  );
}

export default Prints