import { useState } from "react";
import { Section, Reveal } from "./Shared";

// ── mock "database" ──────────────────────────────────────────────────────────

const TABLE = [
  { project: "Client Booking App", stack: "React", status: "deployed", year: 2025 },
  { project: "Inventory Tracker", stack: "MySQL", status: "in progress", year: 2026 },
  { project: "Personal Blog", stack: "SQLite", status: "deployed", year: 2024 },
  { project: "AWS Cost Dashboard", stack: "EC2", status: "planned", year: 2026 },
  { project: "Order Pipeline", stack: "PostgreSQL", status: "deployed", year: 2025 },
  { project: "S3 Media Uploader", stack: "S3", status: "planned", year: 2026 },
];

type Row = (typeof TABLE)[number];
type Column = keyof Row;

const COLUMNS: Column[] = ["project", "stack", "status", "year"];

const EXAMPLES = [
  "SELECT * FROM projects;",
  "SELECT project, status FROM projects WHERE status = 'deployed';",
  "SELECT * FROM projects WHERE stack = 'S3' OR stack = 'EC2';",
  "SELECT * FROM projects ORDER BY year DESC;",
];

// ── tiny query engine ────────────────────────────────────────────────────────
// Supports: SELECT <cols|*> FROM projects [WHERE col = 'val' [AND|OR col = 'val']...] [ORDER BY col [ASC|DESC]]

function runQuery(query: string): { rows: Row[]; cols: Column[] } | { error: string } {
  const trimmed = query.trim().replace(/;$/, "");
  const match = trimmed.match(
    /^select\s+(.+?)\s+from\s+projects(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(\w+)(?:\s+(asc|desc))?)?$/i,
  );
  if (!match) {
    return { error: "Couldn't parse that. Try: SELECT * FROM projects WHERE status = 'deployed';" };
  }
  const [, colsRaw, whereRaw, orderCol, orderDir] = match;

  let cols: Column[];
  if (colsRaw.trim() === "*") {
    cols = COLUMNS;
  } else {
    const requested = colsRaw.split(",").map((c) => c.trim().toLowerCase());
    const invalid = requested.find((c) => !COLUMNS.includes(c as Column));
    if (invalid) return { error: `Unknown column "${invalid}". Valid columns: ${COLUMNS.join(", ")}` };
    cols = requested as Column[];
  }

  let rows = [...TABLE];

  if (whereRaw) {
    const orParts = whereRaw.split(/\s+or\s+/i);
    rows = rows.filter((row) =>
      orParts.some((orPart) => {
        const andParts = orPart.split(/\s+and\s+/i);
        return andParts.every((cond) => {
          const condMatch = cond.trim().match(/^(\w+)\s*=\s*'([^']*)'$/);
          if (!condMatch) return false;
          const [, col, val] = condMatch;
          if (!COLUMNS.includes(col as Column)) return false;
          return String(row[col as Column]).toLowerCase() === val.toLowerCase();
        });
      }),
    );
  }

  if (orderCol) {
    if (!COLUMNS.includes(orderCol as Column)) {
      return { error: `Unknown ORDER BY column "${orderCol}"` };
    }
    const dir = orderDir?.toLowerCase() === "desc" ? -1 : 1;
    rows.sort((a, b) => {
      const av = a[orderCol as Column];
      const bv = b[orderCol as Column];
      return av < bv ? -1 * dir : av > bv ? 1 * dir : 0;
    });
  }

  return { rows, cols };
}

export function Playground() {
  const [query, setQuery] = useState(EXAMPLES[0]);
  const [result, setResult] = useState(() => runQuery(EXAMPLES[0]));

  function execute(q: string) {
    setQuery(q);
    setResult(runQuery(q));
  }

  return (
    <Section id="playground" idx="04" title="playground" hint="try a query">
      <Reveal>
        <p className="mb-5 max-w-[62ch] text-sm text-muted-foreground">
          A tiny query engine running against a mock <code className="text-foreground">projects</code>{" "}
          table, right here in the browser. Edit the query below and run it.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => execute(ex)}
              className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-[11.5px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {ex.length > 42 ? ex.slice(0, 39) + "…" : ex}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-secondary px-3.5 py-2.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#EF6A5F]" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#F5BF4F]" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#61C554]" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">query</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              execute(query);
            }}
            className="flex flex-col gap-3 p-4"
          >
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              spellCheck={false}
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-secondary px-3.5 py-3 font-mono text-[13.5px] text-foreground outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 font-mono text-[13px] font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              Run query →
            </button>
          </form>

          <div className="border-t border-dashed border-border px-4 pb-5 pt-4 font-mono text-[13px]">
            {"error" in result ? (
              <p className="text-accent">{result.error}</p>
            ) : result.rows.length === 0 ? (
              <p className="text-muted-foreground">0 rows returned.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left">
                  <thead>
                    <tr>
                      {result.cols.map((c) => (
                        <th key={c} className="border-b border-border pb-2 pr-4 text-primary">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={i}>
                        {result.cols.map((c) => (
                          <td key={c} className="border-b border-border/50 py-2 pr-4 text-foreground">
                            {String(row[c])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-2 text-muted-foreground">{result.rows.length} row(s) returned.</p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
