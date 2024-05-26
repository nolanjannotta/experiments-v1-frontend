"use client";

import React, { useState } from "react";
import Link from "next/link";
function Search() {
  const [input, setInput] = useState("");

  return (
    <article>
      <fieldset>
        <form>
          <input
            type="text"
            name="editionSearch"
            onChange={(e) => setInput(e.target.value)}
            placeholder="token id"
          />
          <Link href={`/token/${input}`}>
            {" "}
            <button>search</button>
          </Link>
        </form>
      </fieldset>
    </article>
  );
}

export default Search;
