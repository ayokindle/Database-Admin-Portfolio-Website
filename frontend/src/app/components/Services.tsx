import { Section, Reveal, Chip } from "./Shared";
import { useTilt } from "./useTilt";

const SERVICES = [
  {
    tag: "database",
    amber: false,
    title: "Database Management",
    chips: ["SQL", "MySQL", "PostgreSQL", "Schema design", "Normalization", "Query optimization"],
  },
  {
    tag: "web",
    amber: false,
    title: "Web Development",
    chips: ["HTML/CSS", "JavaScript", "React", "Node.js", "REST APIs"],
  },
  {
    tag: "cloud",
    amber: true,
    title: "AWS (in progress)",
    chips: ["EC2", "S3", "RDS", "IAM", "Lambda"],
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  const tilt = useTilt<HTMLDivElement>(6);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="rounded-xl border border-border bg-card px-6 py-6.5 transition-transform duration-150 ease-out will-change-transform"
    >
      <span
        className={`mb-4 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[11.5px] ${
          s.amber ? "border-accent text-accent" : "border-primary text-primary"
        }`}
      >
        {s.tag}
      </span>
      <h3 className="mb-3.5 font-display text-[19px]">{s.title}</h3>
      <ul className="flex flex-wrap gap-2 p-0">
        {s.chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </ul>
    </div>
  );
}

export function Services() {
  return (
    <Section id="services" idx="01" title="services" hint="3 rows">
      <Reveal>
        <div className="grid grid-cols-1 gap-5.5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.tag} s={s} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
