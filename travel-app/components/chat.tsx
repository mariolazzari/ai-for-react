"use client";

import { useChat } from "ai/react";

function Completion() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <>
      {isLoading && <h2>Loading...</h2>}

      <div>
        {messages.map(m => (
          <div key={m.id}>
            {m.role === "user" ? "User:" : "AI:"}
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="What to do where..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </>
  );
}

export default Completion;
