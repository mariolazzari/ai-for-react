import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const maxDuration = 30;

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const res = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  return res.toTextStreamResponse();
}
