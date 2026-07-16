import { Terminal } from "./Terminal";
import { Stats } from "./Stats";

const NODES = [
  { label: "cluster_01", name: "Database", amber: false },
  { label: "cluster_02", name: "Web Dev", amber: false },
  { label: "cluster_03", name: "AWS Cloud", amber: true, status: "in migration" },
];

export function Hero() {
  return (
    <header className="border-b border-border py-14 md:pb-10 md:pt-18">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <div>
            <p className="mb-4.5 font-mono text-[13px] tracking-wide text-primary">
              // database &amp; web developer
            </p>
            <h1 className="mb-5 font-display text-[clamp(32px,4.2vw,52px)] font-semibold leading-[1.12]">
              Building on solid schemas.
              <br />
              Shipping to the <span className="text-accent">cloud</span>.
            </h1>
            <p className="mb-8 max-w-[46ch] text-[16.5px] text-muted-foreground">
              I design databases, build the web apps that sit on top of them, and I'm currently
              migrating that skill set toward AWS — infrastructure that scales past a single
              machine.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a
                href="#deployments"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5.5 py-3.5 text-[14.5px] font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                View deployments
              </a>
              <a
                href="#connect"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5.5 py-3.5 text-[14.5px] font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Download résumé
              </a>
            </div>
          </div>

          <Terminal />
        </div>

        {/* schema cluster strip */}
        <div className="mt-14 grid grid-cols-1 items-center gap-3.5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0">
          {NODES.map((node, i) => (
            <div key={node.label} className="contents">
              {i > 0 && (
                <div className="mx-auto h-5.5 w-px bg-gradient-to-b from-border via-primary to-border md:h-px md:w-full md:bg-gradient-to-r" />
              )}
              <div
                className={`rounded-[10px] border bg-card px-5 py-4.5 text-center ${
                  node.amber ? "border-accent shadow-[0_0_0_1px_rgba(245,166,35,0.15)]" : "border-border"
                }`}
              >
                <div className="mb-1.5 font-mono text-xs text-muted-foreground">{node.label}</div>
                <div className={`font-display text-base font-semibold ${node.amber ? "text-accent" : ""}`}>
                  {node.name}
                </div>
                {node.status && (
                  <div className="mt-2 inline-block rounded-full border border-accent px-2.5 py-0.5 font-mono text-[11px] text-accent">
                    {node.status}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Stats />
      </div>
    </header>
  );
}
