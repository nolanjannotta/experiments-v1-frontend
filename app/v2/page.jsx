import React from "react";

function V2() {
  return (
    <article>
      <header>
        <h1>Onchain-Experiments_V2</h1>
      </header>
      {/* <section> */}
        <p>
          Version 2 of this project does not <b><i>currently</i></b> exist and is not <b><i>yet</i></b> being built.
          This page will act as a place to brainstorm features and ideas for the
          next version of this project. Although V2 depends a lot on whether V1 gains any traction.
        </p>
        <p>If YOU have an idea, reach out! lets build the coolest possible 100% onchain art platform. &#8594; <a target="_blank" href="https://twitter.com/jannotta_nolan">twitter</a> || <a target="_blank" href="https://warpcast.com/nolanj">warpcast</a></p>
        <figure>
          <figcaption>Objectives</figcaption> 
          <ul>
            <li>
                increase robustness and flexibility... whatever that means.
            </li>
            <li>
                add more fun interoperability features. For example, different editions borrowing features 
                from each other or interacting in some way. Artist B gets permission from Artist A to incorporate some feature from Artist A&apos;s edition into Artist B&apos;s edition, by using Artist A&apos;s original art generator contract. Basically onchain collaborations. Similar to the `Signatures` concept in V1. 
            </li>

            <li>
                Create a platform and tools for other artists to deploy and mint their 100% onchain art works. 
            </li>
            <li>
                continue offering prints as key part of the project. Split revenue between collector, artist, and printer. Not limited to just prints on paper, could include other physical objects. TBD.

            </li>
            <li>
                <i>consider</i> possibly implementing ERC-6551: Non-fungible Token Bound Accounts. This might be useful for certain features.
                <figure>
                <figcaption>pro</figcaption>
                <ul>
                   <li>
                    cool new modern feature.
                    </li> 
                    
                    </ul>
                <figcaption>con</figcaption>
                <ul>
                    <li>
                        more complexity, higher chance of bugs.
                    </li>
                    <li>
                        users could accidentally sell or transfer a token containing other tokens and lose all of them without realizing.
                    </li>
                    <li>
                        not really necessary IMO.  
                    </li>
                    <li>
                       may cost more gas, and/or may require additional transactions for approvals and such. Although this is solved by smart wallets and bundling.
                    </li>
                </ul>
                    </figure>
            </li>
            <li>
              create a 2 way bridge between Base and L1 Mainnet. Users will be able to store their tokens on mainnet as a 
              kind of &quot;cold storage.&quot; {" "}
              {/* (since L2s are technically centralized and have actually gone offline for a 
              period of time in the past. unless im wrong about that. I&apos;m not saying Base has done this, but just L2s in general). */}
              Some people might want to consolidate their art collections on mainnet.
              They should be able to modify, sell and transfer on either chain, and can bridge back and forth 
              at any time. The exact bridge mechanism is still TBD.
            </li>
            <li>
              build our own secondary marketplace that honors eip 2981 royalties and sends them to the correct payment splitter contract for each edition automatically during the transaction. 
            </li>
            <li>
              create an entirely new onchain SVG rendering system. for example having a single ultra efficient rendering 
              contract that returns the actual SVG code (written in yul or huff??). The art generator contracts will instead generate 
              a set of parameters or a compressed SVG string that is passed to the rendering contract. To go even further, there could be 
              a higher level SVG specific language, framework or GUI that compiles down to solidity code that then creates the compressed svg strings, 
              and an online editor for artists to use to create their own art generator contracts. how cool would that be?

            </li>
            <li>
              a <span>&#x1D4B8;&#x2134;&#x2134;&#x1D4C1;</span>  new name.
            </li>
            <li>
                increase vibes by at least 10x.
            </li>

            

          </ul>
        </figure>
      {/* </section> */}
    </article>
  );
}

export default V2;
