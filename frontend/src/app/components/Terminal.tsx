import { useEffect, useState, type ReactNode } from "react";

const QUERY_PARTS: { text: string; cls?: "kw" | "str" | "com" }[] = [
  { text: "-- career.sql", cls: "com" },
  { text: "\n" },
  { text: "SELECT ", cls: "kw" }, { text: "role, focus, direction\n" },
  { text: "FROM ", cls: "kw" }, { text: "career\n" },
  { text: "WHERE ", cls: "kw" }, { text: "stack " },
  { text: "IN ", cls: "kw" }, { text: "(" },
  { text: "'SQL'", cls: "str" }, { text: ", " },
  { text: "'React'", cls: "str" }, { text: ", " },
  { text: "'Node'", cls: "str" }, { text: ")\n" },
  { text: "  AND ", cls: "kw" }, { text: "target " },
  { text: "= ", cls: "kw" }, { text: "'AWS Cloud'", cls: "str" }, { text: "\n" },
  { text: "ORDER BY ", cls: "kw" }, { text: "growth " },
  { text: "DESC", cls: "kw" }, { text: ";" },
];

const RESULTS = [
  { k: "role", v: "Database & Web Developer" },
  { k: "focus", v: "SQL · React · Node" },
  { k: "direction", v: "AWS Cloud →" },
];

const TOKEN_COLOR: Record<string, string> = {
  kw: "text-[#3B6FE0] dark:text-[#8FB8FF]",
  str: "text-accent",
  com: "text-muted-foreground",
};

type FlatChar = { ch: string; cls?: string };

function buildFlat(): FlatChar[] {
  const out: FlatChar[] = [];
  for (const part of QUERY_PARTS) {
    for (const ch of part.text) out.push({ ch, cls: part.cls });
  }
  return out;
}

const FLAT = buildFlat();

function ResultsBlock() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div
      className={`mt-3.5 border-t border-dashed border-border pt-3.5 transition-all duration-500 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
      }`}
    >
      {RESULTS.map((r) => (
        <div key={r.k}>
          <span className="text-muted-foreground">{r.k}: </span>
          <span className="text-primary">{r.v}</span>
        </div>
      ))}
    </div>
  );
}

export function Terminal() {
  const [count, setCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(FLAT.length);
      setShowResults(true);
      return;
    }
    if (count >= FLAT.length) {
      const t = setTimeout(() => setShowResults(true), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c + 1), 14 + Math.random() * 22);
    return () => clearTimeout(t);
  }, [count]);

  function renderTokens() {
    const nodes: ReactNode[] = [];
    let i = 0;
    while (i < count) {
      const { ch, cls } = FLAT[i];
      if (ch === "\n") {
        nodes.push(<br key={i} />);
        i++;
        continue;
      }
      let j = i;
      while (j < count && FLAT[j].ch !== "\n" && FLAT[j].cls === cls) j++;
      const text = FLAT.slice(i, j).map((f) => f.ch).join("");
      nodes.push(
        <span key={i} className={cls ? TOKEN_COLOR[cls] : undefined}>
          {text}
        </span>,
      );
      i = j;
    }
    return nodes;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-border bg-secondary px-3.5 py-2.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#EF6A5F]" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F5BF4F]" />
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#61C554]" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">career.sql</span>
      </div>

      <div className="min-h-[220px] px-5 py-5.5 font-mono text-[13.5px] leading-[1.7]">
        {renderTokens()}
        {count < FLAT.length && (
          <span className="animate-pulse inline-block h-[15px] w-[7px] align-middle bg-primary" />
        )}
        {showResults && <ResultsBlock />}
      </div>
    </div>
  );
}
