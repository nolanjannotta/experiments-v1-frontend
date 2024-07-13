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
                Create more and better tools for artists to deploy and mint their 100% onchain art works. 
            </li>
            <li>
              add more sophisticated minting options. 
              <ul>
                <li>
                  unlimited supply for a certain time period.
                </li>
                <li>
                  whitelist or allowlist
                </li>
                <li>
                  controlled minting over time. For example, minting 1 per day, 1 per hour, etc.
                </li>
                <li>
                  combine any of the above options.
                </li>
              </ul>
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
                    <li>
                      captures the 𝓋𝒾𝒷𝑒 of crypto and web3
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
              Some people might want to consolidate their art collections on mainnet.
              They should be able to modify, sell and transfer on either chain, and can bridge back and forth 
              at any time. The exact bridge mechanism is still TBD.
            </li>
            <li>
              build our own secondary marketplace that honors EIP 2981 royalties and automatically sends them to the correct payment splitter contract for each edition during the 
              transaction. Sponsored transactions, zero percent platform fees <small>(aside from the platform fee on royalties set by the artist)</small>.
            </li>
            <li>
              create an entirely new onchain SVG rendering system. for example having a single ultra efficient rendering 
              contract that returns the actual SVG code <small>(written in yul or huff?)</small>. The art generator contracts will instead generate 
              a set of parameters or a compressed SVG string that is passed to the rendering contract. To go even further, there could be 
              a higher level SVG specific language, framework or GUI that compiles down to solidity code that then creates the compressed svg strings, 
              and an online editor for artists to use to create their own art generator contracts. Basically anything to make it easier for artists to write creative code. how cool would that be?

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
