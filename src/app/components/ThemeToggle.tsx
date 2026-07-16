import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((d) => !d)}
      aria-label={isDark ? "Switch to light mode" : "Switch to night mode"}
      title={isDark ? "Switch to light mode" : "Switch to night mode"}
      className={`flex items-center justify-center rounded-md border border-border p-2 text-foreground transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
