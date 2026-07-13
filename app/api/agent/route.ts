import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the Libbu AI Concierge for a private community helping ambitious women connect, build and grow.

Your role is to:
- Help visitors clarify what kind of support or connection they need.
- Ask no more than one useful question at a time.
- Suggest relevant connection types such as accountability partner, collaborator, mentor, customer, founder peer or specialist.
- Be warm, sophisticated, concise and encouraging.
- Never claim that a match has already been found.
- Never request sensitive personal information.
- When appropriate, invite the visitor to join the Libbu founding-member waitlist on the page.

Keep responses under 120 words unless the visitor asks for more detail.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "The Libbu concierge is not configured yet." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (message): message is ChatMessage =>
              (message.role === "user" || message.role === "assistant") &&
              typeof message.content === "string",
          )
          .slice(-12)
      : [];

    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user")?.content;

    if (!latestUserMessage?.trim()) {
      return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: SYSTEM_PROMPT,
        input: messages.map((message) => ({
          role: message.role,
          content: [{ type: "input_text", text: message.content }],
        })),
        max_output_tokens: 300,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("OpenAI API error:", response.status, details);
      return NextResponse.json(
        { error: "The concierge is unavailable right now. Please try again shortly." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{
        content?: Array<{ type?: string; text?: string }>;
      }>;
    };

    const text =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        .find((item) => item.type === "output_text")?.text;

    if (!text) {
      return NextResponse.json(
        { error: "The concierge could not create a response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Libbu agent route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
