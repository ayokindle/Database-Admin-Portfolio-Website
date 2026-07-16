import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades + slides a section's content in once it scrolls into view.
 * Uses Tailwind's transition utilities driven by state, so there's
 * no inline style object to keep in sync with the design tokens.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** A schema-style tag, used for skill/stack chips throughout the site. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="list-none rounded-md border border-border bg-secondary px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
      {children}
    </li>
  );
}

/**
 * Shared section shell: numbered "table" header (00, 01, 02...) plus
 * the max-width/padding wrapper every section uses.
 */
export function Section({
  id,
  idx,
  title,
  hint,
  children,
  bordered = true,
}: {
  id: string;
  idx: string;
  title: string;
  hint: string;
  children: ReactNode;
  bordered?: boolean;
}) {
  return (
    <section id={id} className={`py-16 md:py-22 ${bordered ? "border-b border-border" : ""}`}>
      <div className="mx-auto max-w-[1180px] px-8">
        <Reveal className="mb-11 flex items-baseline gap-3.5">
          <span className="font-mono text-sm text-primary">{idx}</span>
          <h2 className="font-display text-[clamp(24px,3vw,32px)]">{title}</h2>
          <span className="ml-auto font-mono text-xs text-muted-foreground">{hint}</span>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
