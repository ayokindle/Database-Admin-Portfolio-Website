import { Section, Reveal } from "./Shared";

const LOG = [
  {
    when: "2025 — present",
    title: "MSc Information Systems",
    where: "University of Portsmouth",
    desc: "Note relevant modules, projects, or coursework tied to databases, systems design, or cloud computing.",
  },
  {
    when: "[dates]",
    title: "[Role title]",
    where: "[Company]",
    desc: "What you built or managed — lean on database and web-facing work specifically.",
  },
  {
    when: "[dates]",
    title: "[Role title]",
    where: "[Company]",
    desc: "Keep each entry to one or two lines — the log format works best when it stays scannable.",
  },
];

export function Log() {
  return (
    <Section id="log" idx="03" title="log" hint="chronological">
      <Reveal>
        <div className="ml-1.5 border-l border-border">
          {LOG.map((entry, i) => (
            <div key={i} className="relative py-0 pb-8 pl-7">
              <div className="absolute left-[-6px] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
              <div className="mb-1.5 font-mono text-[12.5px] text-primary">{entry.when}</div>
              <h3 className="mb-1 font-display text-[17px]">{entry.title}</h3>
              <div className="mb-2 text-[13.5px] text-muted-foreground">{entry.where}</div>
              <p className="max-w-[62ch] text-[14.5px] leading-[1.7] text-foreground">{entry.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
