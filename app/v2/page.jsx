import React from "react";

function V2() {
  return (
    <article>
      <header>
        <h1>onchain experiments v2</h1>
      </header>
      {/* <section> */}
        <p>
          Version 2 of this project does not <b><i>currently</i></b> exist and is not <b><i>yet</i></b> being built.
          This page will act as a place to brainstorm features and ideas for the
          next version of this project. 
        </p>
        <p>If YOU have an idea, reach out! lets build the coolest possible thing. &#8594; <a>twitter</a> || <a>warpcast</a></p>
        <figure>
          <figcaption>Objectives</figcaption> 
          <ul>
            <li>
                increase robustness and flexibility.
            </li>

            <li>
                Create a platform for other artists to mint their 100% onchain art works. 
            </li>
            <li>
                continue offering prints as key part of the project. Split revenue between collector, artist, and printer.

            </li>
            <li>
                <i>Possibly</i> implement ERC-6551: Non-fungible Token Bound Accounts. For example for things that consume other things, (like black and white or rectangular clock),
                the tokens that they point to could be owned by the token itself.
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
                       cost more gas, and/or may require additional transactions for approvals and such.
                    </li>
                </ul>
                    </figure>
            </li>
            <li>
              create a 2 way bridge between Base chain and Mainnet. Users will be able to store their tokens on mainnet as a "cold storage," (since L2s are technically centralized and have actually gone offline for a period of time in the past). They'll be able to modify, sell and transfer on either chain, and can bridge back and forth 
              at any time. This feature will ideally be implemented in V1 as well. The exact bridge mechanism is still TBD.
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
