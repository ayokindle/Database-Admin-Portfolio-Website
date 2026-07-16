import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { num: "00", label: "profile", href: "#profile" },
  { num: "01", label: "services", href: "#services" },
  { num: "02", label: "deployments", href: "#deployments" },
  { num: "03", label: "log", href: "#log" },
  { num: "04", label: "playground", href: "#playground" },
  { num: "05", label: "connect", href: "#connect" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-8">
        <div className="font-mono text-[15px] font-semibold">
          ayo<span className="text-primary">://</span>dev
        </div>

        <ul className="hidden gap-7 md:flex">
          {NAV.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                className="border-b border-transparent pb-1.5 pt-1.5 font-mono text-[13px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <span className="mr-1.5 text-primary">{n.num}</span>
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden md:flex" />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex items-center justify-center rounded-md border border-border p-2 text-foreground md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-border bg-card transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-96 border-b" : "max-h-0"
        }`}
      >
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            onClick={() => setOpen(false)}
            className="block border-b border-border px-8 py-3.5 font-mono text-[13px] text-muted-foreground"
          >
            <span className="mr-2 text-primary">{n.num}</span>
            {n.label}
          </a>
        ))}
        <div className="flex items-center justify-between px-8 py-3.5">
          <span className="font-mono text-[13px] text-muted-foreground">theme</span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
