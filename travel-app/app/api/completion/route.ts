import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const res = await streamText({
    model: openai("gpt-3.5-turbo"),
    // messages,
    prompt: "Cose da vedere a riva del garda",
  });

  return res.toTextStreamResponse();
}
