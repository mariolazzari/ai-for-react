"use server";

import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function getAnswer(prompt: string) {
  const text = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt,
  });

  return text;
}

export async function generate(input: string) {
  const stream = createStreamableValue("");
  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();
  return { output: stream.value };
}
