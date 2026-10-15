import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Pause, Play } from "lucide-react";
import {
  ReducedMotionContext,
  useReducedMotion,
} from "../../hooks/useReducedMotion";
type Mode = "auto" | "full" | "reduced";
export default function MotionPreference({
  children,
}: {
  children: ReactNode;
}) {
  const systemReduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const saved = localStorage.getItem("orbit-motion");
      return saved === "full" || saved === "reduced" ? saved : "auto";
    } catch {
      return "auto";
    }
  });
  const reduced = mode === "auto" ? systemReduced : mode === "reduced";
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reduced]);
  function toggle() {
    const next = reduced ? "full" : "reduced";
    setMode(next);
    try {
      localStorage.setItem("orbit-motion", next);
    } catch {
      /* Preferência funciona também sem armazenamento. */
    }
  }
  return (
    <ReducedMotionContext.Provider value={reduced}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        {children}
        <aside
          className={`motion-control ${reduced ? "motion-off" : ""}`}
          aria-label="Preferência de animação"
        >
          <span>
            {reduced
              ? mode === "auto"
                ? "Seu dispositivo pede menos movimento"
                : "Movimento reduzido"
              : "WebGL + scroll interativo"}
          </span>
          <button
            onClick={toggle}
            aria-pressed={!reduced}
            aria-label={reduced ? "Ativar animações" : "Reduzir animações"}
          >
            {reduced ? <Play size={14} /> : <Pause size={14} />}{" "}
            {reduced ? "Ativar animações" : "Reduzir movimento"}
          </button>
        </aside>
      </MotionConfig>
    </ReducedMotionContext.Provider>
  );
}
