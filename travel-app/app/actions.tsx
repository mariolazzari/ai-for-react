"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject, generateText, streamObject } from "ai";
import { createStreamableValue, streamUI } from "ai/rsc";
import { z } from "zod";

export async function getAnswer(prompt: string) {
  const text = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt,
  });

  return text;
}

export async function generate(input: string) {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-4-turbo"),
      system: "You generate fake data for three people",
      prompt: input,
      schema: z.object({
        people: z.array(
          z.object({
            name: z.string().describe("name of a fake person"),
            address: z.string().describe("US address format"),
            age: z.number(),
          })
        ),
      }),
    });
    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }
    stream.done();
  })();
  return { object: stream.value };
}

export async function getData(input: string) {
  "use server";
  const { object: people } = await generateObject({
    model: openai("gpt-4-turbo"),
    system: input,
    prompt: input,
    schema: z.object({
      people: z.array(
        z.object({
          name: z.string().describe("name of a fake person"),
          address: z.string().describe("US address format"),
          age: z.number(),
        })
      ),
    }),
  });
  return { people };
}

export async function streamComponent() {
  const result = await streamUI({
    model: openai("gpt-4o"),
    prompt: "Give me some advice on how to plan a trip to Telluride, Colorado",
    text: ({ content }) => <div>{content}</div>,
  });
  return result.value;
}
