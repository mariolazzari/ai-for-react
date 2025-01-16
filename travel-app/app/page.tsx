"use client";

import { useCompletion } from "ai/react";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit } =
    useCompletion();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Travel App by Vercel AI</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="What to do where..."
          onChange={handleInputChange}
        />
      </form>

      <div>{completion}</div>
    </main>
  );
}
