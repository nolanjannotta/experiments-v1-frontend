import Link from "next/link";

export const editionData = {
  "signatures": {
    description: () => {
      return (
        <p>
          Can be used to &apos;sign&apos; an edition. artists can set a signature id for their edition. as long as the artist owns that signature, it will be placed <small>(usually)</small> in the bottom right corner of each token in the edition. see <Link href="/token/2000003">here</Link> or <Link href="/token/4000002">here</Link> for examples.
        </p>
      );
    },
    type: "art",
    modifiable: false,
    seed:[],
    modify:[]
  },
  "panels": {
    description: () => {
      return (
        <>
          <ol>
            <li>
              Start with a blank 1000x1000 rectangle, 
            </li>
            <li>
                slice the rectangle either horizontally or vertically somewhere on the rectangle giving you 2 rectangles.
            </li>
            <li>
              slice one of the resulting rectangles perpendicular to the first
              slice giving you 3 rectangles.
            </li>
            <li>
              decide if any of the rectangles are either
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
    type: "art",
    modifiable: false,
    seed:[],
    modify:[]
  },
  "tree sketch": {
    description: () => {
      return (
        <>
        <p>
          An attempt to create a &apos;hand drawn&apos; or &apos;pencil sketch&apos; effect with SVG
          using paths and curves. As an exercise I decided to create the classic
          recursive tree. This uses basically the same algorithm as my previous
          Recursive Trees project on ethereum Mainnet. More info can be found on
          this{" "}
          <a
            href="https://medium.com/@anjannotta/recursive-trees-a-revolutionary-new-digital-collectable-on-ethereum-4dfd9bf0aeb2"
            target="_blank"
          >
            medium
          </a>{" "}
          article and can be minted on the main recursive trees{" "}
          <a href="https://www.recursivetrees.xyz/" target="_blank">
            website
          </a>
          . (all proceeds go to charity)
        </p>

        <p>
         	<b>&#9733; note, this particular edition uses lots of gas to render the image. 
          This usually causes Alchemy&apos;s api to fail which is why most or all of the thumbnails below don&apos;t show up. 
          You can always click on the image which loads it directly from the blockchain.</b>
           </p>
        </>
      );
    },
    type: "art",
    modifiable: false,
    seed:[],
    modify: []
  },
  "Clock": {
    description: () => {
      return (
        <>
          <p>
            Fully functional and accurate clock. When the image is rendered
            onchain, the initial hand positions are calculated using the timestamp
            from the blockchain. Then, using SVG animation, the hands are
            rotated 360 degrees once every minute and hour. By default, each clock is set to Pacific Standard Time (Los
            Angeles). This token is <b>*modifiable*</b>, meaning that owners are able
            to change the timezone, the text, and background art of the clock.{" "}
          </p>
          <p>To modify, you need to change or supply 3 inputs:</p>
          <ol>
            <li>
              a number between 0 and 23 to set the timezone. The blockchain
              timestamp is in UTC, so for example PDT (Pacific) is 7 hours <i>behind</i> UTC, so
              the offset would be 17 (24-7). London is 1 hour <i>ahead</i> UTC, so the
              offset would be 1.
            </li>
            <li>
              a token ID to use as the background. This token ID must be owned
              by the owner of the clock.
            </li>
            <li>
              a text to display below the clock. This text can be up to 23
              characters long. It could be the timezone location, a name, or
              anything else.
            </li>
          </ol>
          <p>
            note: the thumbnails below are fetched from <a target="blank" href="https://www.alchemy.com/nft-api">alchemy&apos;s api</a> and may not be
            up to date. Metadata refreshing is not available on Base yet. Click on any clock to open it up and see accurate image.
          </p>
        </>
      );
    },
    type: "experiment",
    modifiable: true,
    seedSections: [0, 1, 5, 9, 32],
    seedTypes: ["number", "number", "number", "string"],

    seed: [
        {name: "timeZoneOffset", type: "uint8" },
        {name: "selfId", type: "uint32"},
        {name: "backgroundId", type: "uint32" },
        {name: "location", type: "string" },
      ],
    modify: [
        {name: "timeZoneOffset", type: "uint8" },
        {name: "backgroundId", type: "uint32" },
        {name: "location", type: "string" },
    ]
  },
  "Black and White": {
    description: () => {
      return (
        <>
        
        <p>
          A very simple experiment. It can be pointed to a token ID (from this project) and returns
          a black and white version of the image. Thats literally it. In hindsight, &quot;grayscale&quot; would have been a better name.
        </p>

        <p>&#9734; <b>note:</b> The owner must own the token ID that it points to. if not, nothing will be shown. These images are blank by default.&#9734;</p>
        </>
      );
    },
    type: "experiment",
    modifiable: true,
    seed: [{ name: "selfId", type: "uint32" },{ name: "targetId", type: "uint32" }],
    modify: [{ name: "targetId", type: "uint32" }]
  },
  "Where do you draw the line?": {
    description: () => {
      return (
        <>
          <ol>
            <li>
              first, draw a line either vertically or
              horizontally somewhere near the middle of the square.
            </li>
            <li>
              draw 2 more lines near both ends of the first line, perpendicular
              in either direction.
            </li>
            <li>
              do this for each new line until the lines get close to
              the edge OR its &quot;iterations&quot; are reached. iterations is either 1 or
              2 and is determined by the seed. This keeps it from getting out of control.
            </li>
          </ol>
        </>
      );
    },
    type: "art",
    modifiable: false,
    inputs:[]
  },

  "not squiggles": {
    description: () => {
      return (
        <p>
          These are, in fact, <i>not</i> squiggles. As the title suggests, this is an experiment. I
          wanted to see whether something as legendary as the Chromie Squiggle can be made completely onchain using
          only solidity and SVG. As it turns out, you can get pretty close. All
          credit goes to Artblocks and Snowfro. These are obviously not meant to be IDENTICAL to the originals. Most of the key traits are
          implemented, some are not.

        </p>
      );
    },
    type: "experiment",
    modifiable: false,
    seed:[],
    modify:[]
  },

  "Scribbles": {
    description: () => {
      return (
        <>
          <p>
            A &quot;derivative&quot; project. An homage to the Chromie Squiggle. An
            onchain experiment.{" "}
          </p>

          <p>As always, each scribble is generated onchain using only solidity and SVG.</p>
        </>
      );
    },
    type: "experiment",
    modifiable: false,
    seed:[],
    modify:[]
  },
};
