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
        creater/artist/platform. For this project though, this depends entirely
        on whether theres any interest whatsoever from collectors. If there is,
        I will personally buy a printer and get this whole thing started.
      </p>

      <figure>
        <figcaption>Goals:</figcaption>
        <ul>
          <li>Highest quality reasonably possible. (Epson P700 or P900)</li>
          <li>
            All printing, packaging and shipping will be done by hand by me.
          </li>
          <li>All packaging should be 100% recycleable.</li>
          <li>Ideally shipped anywhere in the world.</li>
          <li>
            The revenue from the prints will be split between the artist, the
            owner of the piece being printed, and the printer. Percentages TBD.{" "}
          </li>
          <li>Prints will be priced in Eth. </li>
          <li>
            All payments, royalties etc and as much business logic as possible
            will take place on chain. Things like shipping addresses will need
            to be handled elsewhere, possibly Coinbase Commerce or Slice?
          </li>
          <li>
            Will include the SVG code printed on the back or on a seperate peice
            of paper.{" "}
          </li>
          <li>
            May include some sort of watermark or some kind of cryptographic
            signed message for authenticity.
          </li>
          <li>Will most likely not include an NFC chip.</li>
          <li>
            Another idea is generative stationary. Using the same art generator
            contracts and a random seed, print 1/1 generative stationary or post
            cards. Sold in packs of 10 with envelopes and a{" "}
            <i>global forever stamp for each card.</i> Easily send physical 1/1
            art to people you like!
          </li>
        </ul>
      </figure>
    </article>
  );
}

export default Prints