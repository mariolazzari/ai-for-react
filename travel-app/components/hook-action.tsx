"use client";

import { generate, getAnswer } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";

function HookAction() {
  const [message, setMessage] = useState("");
  const [generation, setGeneration] = useState("");

  const onAskClick = async () => {
    const message = await getAnswer("Where is Riva del Garda?");
    setMessage(message.text);
  };

  const onGenerateClick = async () => {
    const { output } = await generate(
      "What is the deepest lake in the US? Make your answer very wordy."
    );

    for await (const delta of readStreamableValue(output)) {
      setGeneration(currentGeneration => `${currentGeneration}${delta}`);
    }
  };

  return (
    <>
      <h2>Hook Action</h2>
      <button onClick={onAskClick}>Ask</button>
      <p>{message}</p>

      <button onClick={onGenerateClick}>Generate</button>
      <p>{generation}</p>
    </>
  );
}

export default HookAction;
