export const editionData = {
  signatures: {
    description: () => {
      return (
        <p>
          Simple, minimal, cool. The inaugural edition of this whole
          experiment thing.
        </p>
      );
    },
    modifiable: false,
    inputs:[]
  },
  "panels 2.0": {
    description: () => {
      return (
        <>
          <p>Based on very simple set of rules:</p>
          <ol>
            <li>
              using the seed, deterministically slice a square either
              horizontally or vertically creating two rectangles.
            </li>
            <li>
              slice one of the resulting rectangles perpendicular to the first
              slice giving you 3 rectangles.
            </li>
            <li>
              deterministically decide if any of the rectangles are either
              colored or collapsed.
            </li>
            <li>
              Lastly, recursively apply the same rules to the resulting
              rectangles that are not colored or collapsed until the rectangles
              reach a certain size and then stop.
            </li>
          </ol>
        </>
      );
    },
    modifiable: false,
    inputs:[]
  },
  "tree sketch": {
    description: () => {
      return (
        <p>
          An attempt to create a 'hand drawn' or 'pencil sketch' effect with SVG
          using paths and curves. As an exercise I decided to create the classic
          recursive tree. This uses a very similar algorithm used in my previous
          Recursive Trees project on ethereum Mainnet. More info can be found on
          this{" "}
          <a
            href="https://medium.com/@anjannotta/recursive-trees-a-revolutionary-new-digital-collectable-on-ethereum-4dfd9bf0aeb2"
            target="_blank"
          >
            medium
          </a>{" "}
          article or on the main recursive trees{" "}
          <a href="https://www.recursivetrees.xyz/" target="_blank">
            website
          </a>
          .
        </p>
      );
    },
    modifiable: false,
    inputs:[]
  },
  "rectangular clock": {
    description: () => {
      return (
        <>
          <p>
            Fully functional and accurate clock. When the image is rendered
            onchain, the initial hand angles are calculated using the timestamp
            from the blockchain. Then, using SVG animation, the hands are
            rotated 360 degrees at the correct speeds for the minute and hour
            hands. By default, each clock is set to Pacific Standard Time (Los
            Angeles). This token is modifiable. This means that owners are able
            to change the timezone, the text, and background of the clock.{" "}
          </p>
          <p>To modify, you need to supply 3 inputs:</p>
          <ol>
            <li>
              a number between 1 and 24 to set the timezone. The blockchain
              timestamp is in UTC, so for example PDT is 7 hours behind UTC, so
              the offset would be 17 (24-7). EDT is 4 hours behind UTC, so the
              offset would be 20 (24-4).
            </li>
            <li>
              a token ID to use as the background. This token ID must be owned
              by the owner of the clock.
            </li>
            <li>
              a text to display below the clock. This text can be up to 22
              characters long. It could be the timezone location, a name, or
              anything else.
            </li>
          </ol>
          <p>
            note: the thumbnail is fetched from alchemy's NFT api and may not be
            accurate. Click the arrow next to the name to see the accurate time.
          </p>
        </>
      );
    },
    modifiable: true,
    inputs: [
        { name: "timeZoneOffset", type: "number" },
        { name: "background", type: "number" },
        { name: "location", type: "text" },
      ],
  },
  "Black and white": {
    description: () => {
      return (
        <p>
          A very simple experiment. It can be pointed to a token ID and returns
          a black and white version of the image. The owner must own the token
          ID that it points to. These images will be blank by default.
        </p>
      );
    },
    modifiable: true,
    inputs: [{ name: "target", type: "number" }]
  },
  "Where do you draw the line?": {
    description: () => {
      return (
        <>
          <p>Based on a simple set of rules:</p>
          <ol>
            <li>
              using the seed, deterministically draw a line either vertically or
              horizontally somewhere near the middle of the square.
            </li>
            <li>
              draw 2 more lines near both ends of the first line, perpendicular
              in either direction.
            </li>
            <li>
              recursively do this for each new line until the lines get close to
              the edge OR is "iterations" is reached. iterations is either 1 or
              2 and is determined by the seed. This keeps it from drawing too
              many lines.
            </li>
          </ol>
        </>
      );
    },
    modifiable: false,
    inputs:[]
  },

  "not squiggles": {
    description: () => {
      return (
        <p>
          These are not squiggles. This is an homage to the real squiggle. I
          wanted to see whether a squiggle can be made completely onchain using
          only solidity and SVG. As it turns out, you can get pretty close. All
          credit goes to Artblocks and Snowfro. I will never personally make any
          money from this experiment. Royalties will start at zero and can be
          turned on and sent to Snowfro.
        </p>
      );
    },
    modifiable: false,
    inputs:[]
  },
};
