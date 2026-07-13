"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const stages = [
  "Exploring an idea",
  "Building a side hustle",
  "Launching a business",
  "Growing an existing business",
  "Looking for collaborators",
];

const timeoutAfter = (milliseconds) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), milliseconds)
  );

export default function WaitlistForm() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [memberName, setMemberName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      full_name: String(form.get("full_name") || "").trim(),
      email: String(form.get("email") || "").trim().toLowerCase(),
      city: String(form.get("city") || "").trim(),
      stage: String(form.get("stage") || "").trim(),
      building: String(form.get("building") || "").trim(),
      challenge: String(form.get("challenge") || "").trim(),
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setStatus("error");
      setMessage("The waitlist is being prepared. Please check back shortly.");
      return;
    }

    try {
      const supabase = createClient(url, key);
      const result = await Promise.race([
        supabase.from("waitlist").insert(payload),
        timeoutAfter(12000),
      ]);

      if (result.error) {
        setStatus("error");
        setMessage(
          result.error.code === "23505"
            ? "You are already on the Libbu waitlist."
            : "Something went wrong. Please try again."
        );
        return;
      }

      setMemberName(payload.full_name.split(" ")[0] || payload.full_name);
      formElement.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(
        error?.message === "Request timed out"
          ? "This is taking longer than expected. Please try again."
          : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="waitlist-form thank-you-card" role="status" aria-live="polite">
        <div className="thank-you-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">Welcome to Libbu</p>
        <h3>Thank you, {memberName}.</h3>
        <p>
          You’re officially on the founding-member waitlist. We’ll be in touch with early
          access, founder opportunities and the next steps for joining the Libbu community.
        </p>
        <a className="primary-button" href="#top">Back to the top</a>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full name
          <input name="full_name" type="text" placeholder="Your name" required />
        </label>
        <label>
          Email address
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          City
          <input name="city" type="text" placeholder="London" required />
        </label>
        <label>
          Where are you right now?
          <select name="stage" defaultValue="" required>
            <option value="" disabled>Select your stage</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        What are you building?
        <textarea name="building" rows={3} placeholder="Tell us about your idea, business or goal" required />
      </label>
      <label>
        What is your biggest challenge right now?
        <textarea name="challenge" rows={3} placeholder="Connections, confidence, customers, skills..." required />
      </label>
      <button className="primary-button form-button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining..." : "Join the Libbu waitlist"}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
      <p className="privacy-note">No spam. Just early access, founder opportunities and Libbu updates.</p>
    </form>
  );
}
