"use client";

import { useState } from "react";
import { generate } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";

function StreamClient() {
  const [generation, setGeneration] = useState("");

  const onClick = async () => {
    const { object } = await generate(
      "people who have very superhero-like names"
    );

    for await (const partialObject of readStreamableValue(object)) {
      if (partialObject) {
        setGeneration(JSON.stringify(partialObject.people, null, 2));
      }
    }
  };

  return (
    <>
      <button onClick={onClick}>View People!</button>
      <pre>{generation}</pre>
    </>
  );
}

export default StreamClient;
