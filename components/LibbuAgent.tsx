"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "I need an accountability partner",
  "I am looking for a co-founder",
  "I want to grow my network",
];

export default function LibbuAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Tell me what you are building or where you feel stuck, and I’ll help you identify the kind of connection that could move you forward.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok || !data.message) {
        throw new Error(data.error || "The concierge could not respond.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.message as string },
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The concierge is unavailable right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section className="agent-section" id="concierge">
      <div className="container agent-grid">
        <div className="agent-copy">
          <p className="eyebrow">Meet your Libbu concierge</p>
          <h2>Not sure who you need in your circle?</h2>
          <p>
            Share what you are building, your current challenge or your next goal. Libbu’s
            concierge will help you clarify the kind of person who could support your next step.
          </p>
          <p className="agent-note">
            This is an early preview of the intelligence behind Libbu matching.
          </p>
        </div>

        <div className="agent-card">
          <div className="agent-header">
            <span className="agent-avatar">L</span>
            <div>
              <strong>Libbu Concierge</strong>
              <small>AI connection guide</small>
            </div>
            <span className="agent-status">Online</span>
          </div>

          <div className="agent-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`agent-message ${message.role}`} key={`${message.role}-${index}`}>
                {message.content}
              </div>
            ))}
            {isLoading && <div className="agent-message assistant typing">Thinking…</div>}
          </div>

          {messages.length === 1 && (
            <div className="agent-prompts">
              {starterPrompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => void sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form className="agent-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="agent-input">
              Message the Libbu concierge
            </label>
            <input
              id="agent-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="I’m building…"
              maxLength={800}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
              →
            </button>
          </form>

          {error && <p className="agent-error">{error}</p>}
          <p className="agent-disclaimer">Do not share confidential or sensitive information.</p>
        </div>
      </div>
    </section>
  );
}
