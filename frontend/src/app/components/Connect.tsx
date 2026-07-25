import { useState } from "react";
import { Section, Reveal } from "./Shared";

const CONN = [
  { k: "HOST", v: "you@example.com", href: "mailto:you@example.com" },
  { k: "PORT", v: "linkedin.com/in/your-handle", href: "#" },
  { k: "DB", v: "github.com/your-handle", href: "#" },
  { k: "SSL", v: "available for freelance / full-time", href: null },
];

const ENDPOINT = import.meta.env.PROD
  ? "https://database-admin-portfolio-website.onrender.com/api/contact"
  : "/api/contact";

const inputClasses =
  "w-full rounded-lg border border-border bg-secondary px-3.5 py-3 font-sans text-sm text-foreground outline-none transition-colors focus:border-primary";

type Status = "idle" | "submitting" | "success" | "error";

export function Connect() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="connect" idx="05" title="connect" hint="open connection" bordered={false}>
      <Reveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6.5 font-mono text-sm">
            {CONN.map(({ k, v, href }) => (
              <div key={k} className="mb-3">
                <span className="text-muted-foreground">{k} </span>
                {href ? (
                  <a href={href} className="text-primary hover:underline">
                    {v}
                  </a>
                ) : (
                  <span className="text-primary">{v}</span>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3.5">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted-foreground">
                name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-muted-foreground">
                email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted-foreground">
                message
              </label>
              <textarea
                id="message"
                required
                placeholder="What are you looking to build?"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`${inputClasses} min-h-[100px] resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5.5 py-3.5 text-[14.5px] font-semibold text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>

            <div aria-live="polite" className="font-mono text-xs">
              {status === "success" && (
                <p className="text-primary">Sent — thanks, I'll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-accent">Something went wrong — try again in a moment.</p>
              )}
            </div>
          </form>
        </div>
      </Reveal>
    </Section>
  );
}
