import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import SceneViewport from "../components/three/SceneViewport";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { SceneState } from "../animations/tokens";
gsap.registerPlugin(ScrollTrigger);
const chapters = [
  {
    title: "Da primeira tela.",
    text: "Uma interface é o ponto de encontro entre a sua ideia e as pessoas.",
    color: "#ad8aff",
  },
  {
    title: "Ao sistema completo.",
    text: "Informações e ferramentas conectadas para dar clareza à operação.",
    color: "#8eacff",
  },
  {
    title: "Tudo se conecta.",
    text: "Processos ganham continuidade. O trabalho deixa de depender de tarefas repetitivas.",
    color: "#56dbb5",
  },
  {
    title: "Novas possibilidades.",
    text: "Inteligência aplicada para transformar informação em experiências úteis.",
    color: "#ed8dc5",
  },
];
export default function ScrollExperience() {
  const root = useRef<HTMLElement>(null);
  const state = useRef<SceneState>({ progress: 0, pointerX: 0, pointerY: 0 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      state.current.progress = 0;
      return;
    }
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-chapter");
      const bars = gsap.utils.toArray<HTMLElement>(".story-step i");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 85px",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(state.current, { progress: 1, duration: 4, ease: "none" }, 0);
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { opacity: 0, y: 35 });
          timeline.to(
            panel,
            { opacity: 1, y: 0, duration: 0.25, ease: "none" },
            i,
          );
        }
        if (i < 3)
          timeline.to(
            panel,
            { opacity: 0, y: -30, duration: 0.25, ease: "none" },
            i + 0.75,
          );
        timeline.fromTo(
          bars[i],
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "none" },
          i,
        );
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section
      id="experiencia"
      ref={root}
      className={`scroll-story ${reduced ? "story-reduced" : ""}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const r = event.currentTarget.getBoundingClientRect();
        state.current.pointerX = ((event.clientX - r.left) / r.width) * 2 - 1;
        state.current.pointerY =
          ((event.clientY % window.innerHeight) / window.innerHeight) * 2 - 1;
      }}
    >
      <div className="story-sticky">
        <div className="story-top">
          <span className="eyebrow">EXPLORE OUTRA DIMENSÃO DO SEU NEGÓCIO</span>
          <span className="story-scroll-hint">
            {reduced ? "Visão geral" : "A CENA RESPONDE À SUA ROLAGEM"}{" "}
            <ArrowDown size={13} />
          </span>
        </div>
        <div className="story-layout">
          <div className="story-visual">
            <SceneViewport variant="story" state={state} reduced={reduced} />
            <span className="story-visual-note">
              GEOMETRIA ORIGINAL · WEBGL EM TEMPO REAL
            </span>
          </div>
          <div className="story-chapters">
            {chapters.map((chapter, i) => (
              <article key={chapter.title} className="story-chapter">
                <span className="eyebrow" style={{ color: chapter.color }}>
                  0{i + 1} /{" "}
                  {["WEB", "SISTEMAS", "AUTOMAÇÃO", "INTELIGÊNCIA"][i]}
                </span>
                <h2>{chapter.title}</h2>
                <p>{chapter.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="story-steps" aria-hidden="true">
          {chapters.map((chapter, i) => (
            <div className="story-step" key={chapter.title}>
              <span>
                0{i + 1} {["Web", "Sistemas", "Automação", "IA"][i]}
              </span>
              <div>
                <i style={{ background: chapter.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
