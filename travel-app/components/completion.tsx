"use client";

import { useCompletion } from "ai/react";

function Completion() {
  const { completion, input, handleInputChange, handleSubmit } =
    useCompletion();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="What to do where..."
          onChange={handleInputChange}
        />
      </form>

      <div>{completion}</div>
    </>
  );
}

export default Completion;
