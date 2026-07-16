import { useRef, type MouseEvent } from "react";

/**
 * Attaches a subtle 3D tilt-toward-cursor effect to a card.
 * No dependency needed — just pointer math + a CSS transform.
 * Respects prefers-reduced-motion by no-opping the transform.
 */
export function useTilt<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onMouseMove(e: MouseEvent<T>) {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-2px)`;
  }

  function onMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }

  return { ref, onMouseMove, onMouseLeave };
}
