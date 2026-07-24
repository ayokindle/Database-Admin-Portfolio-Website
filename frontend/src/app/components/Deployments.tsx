import { ArrowUpRight } from "lucide-react";
import { Section, Reveal, Chip } from "./Shared";
import { useTilt } from "./useTilt";

const DEPLOYS = [
  {
    title: "Project name",
    status: "deployed",
    live: true,
    chips: ["React", "Node", "PostgreSQL"],
    desc: "One or two sentences: the problem this project solves, and your role in the database and/or web layer.",
    links: [
      { label: "Live site", href: "#" },
      { label: "Source", href: "#" },
    ],
  },
  {
    title: "Project name",
    status: "in progress",
    live: false,
    chips: ["MySQL", "Express", "AWS S3"],
    desc: "Describe the data model or schema decisions you made, plus what part of AWS you're using or learning here.",
    links: [
      { label: "Repo", href: "#" },
      { label: "Case study", href: "#" },
    ],
  },
  {
    title: "Project name",
    status: "deployed",
    live: true,
    chips: ["HTML/CSS", "JavaScript", "SQLite"],
    desc: "Short description. Swap in real project details, screenshots, and links as you build them out.",
    links: [
      { label: "Live site", href: "#" },
      { label: "Source", href: "#" },
    ],
  },
  {
    title: "Project name",
    status: "planned",
    live: false,
    chips: ["EC2", "RDS", "IAM"],
    desc: "A good slot for your first AWS-hosted project once you start building toward certification.",
    links: [{ label: "Repo", href: "#" }],
  },
];

function DeployCard({ d }: { d: (typeof DEPLOYS)[number] }) {
  const tilt = useTilt<HTMLDivElement>(5);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="flex flex-col gap-3.5 rounded-xl border border-border bg-card p-6 transition-transform duration-150 ease-out will-change-transform"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg">{d.title}</h3>
        <span
          className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${
            d.live ? "border-primary text-primary" : "border-accent text-accent"
          }`}
        >
          {d.status}
        </span>
      </div>
      <ul className="flex flex-wrap gap-2 p-0">
        {d.chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </ul>
      <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
      <div className="mt-auto flex gap-4 font-mono text-[12.5px]">
        {d.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="inline-flex items-center gap-1 border-b border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {l.label}
            <ArrowUpRight size={12} />
          </a>
        ))}
      </div>
    </div>
  );
}

export function Deployments() {
  return (
    <Section id="deployments" idx="02" title="deployments" hint="4 rows">
      <Reveal>
        <div className="grid grid-cols-1 gap-5.5 md:grid-cols-2">
          {DEPLOYS.map((d, i) => (
            <DeployCard key={i} d={d} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
