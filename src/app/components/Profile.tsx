import { Section, Reveal } from "./Shared";

const FIELDS = [
  { k: "name", v: "Ayo Akindele" },
  { k: "study", v: "MSc Information Systems — University of Portsmouth" },
  { k: "focus", v: "Database management, web development, cloud (AWS in progress)" },
  { k: "based", v: "Portsmouth, UK" },
];

export function Profile() {
  return (
    <Section id="profile" idx="00" title="profile" hint="1 row">
      <Reveal>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[220px_1fr] md:gap-12">
          <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-border bg-[repeating-linear-gradient(45deg,var(--card),var(--card)_10px,var(--secondary)_10px,var(--secondary)_20px)] p-3 text-center font-mono text-xs text-muted-foreground">
            photo
            <br />
            placeholder
            <br />
            400×400
          </div>
          <div>
            <div className="mb-5.5 grid gap-4">
              {FIELDS.map(({ k, v }) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-3.5 text-[14.5px]">
                  <div className="font-mono text-[13px] text-muted-foreground">{k}</div>
                  <div>{v}</div>
                </div>
              ))}
            </div>
            <p className="max-w-[60ch] text-[14.5px] leading-[1.7] text-foreground">
              [Replace with your own bio: 3–4 sentences on how you got into database and web
              development, what you enjoy building, and why you're heading toward AWS
              certification. Keep it plain and specific — mention a real project or moment if you
              can.]
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
