import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowDown, MoveUpRight } from "lucide-react";
import SceneViewport from "../components/three/SceneViewport";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { SceneState } from "../animations/tokens";
gsap.registerPlugin(ScrollTrigger);
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const state = useRef<SceneState>({ progress: 0, pointerX: 0, pointerY: 0 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const context = gsap.context(() => {
      if (reduced) return;
      gsap.from(".hero-enter", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "all",
      });
      const match = gsap.matchMedia();
      match.add("(min-width: 900px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=500",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              state.current.progress = self.progress;
            },
          },
        });
        timeline
          .to(
            ".hero-heading",
            { y: -65, scale: 0.94, opacity: 0.15, ease: "none" },
            0,
          )
          .to(
            ".hero-subtitle, .hero-actions",
            { y: -30, opacity: 0, ease: "none" },
            0,
          )
          .to(".hero-bottom", { opacity: 0, ease: "none" }, 0);
        return () => {
          state.current.progress = 0;
        };
      });
      return () => match.revert();
    }, root);
    return () => context.revert();
  }, [reduced]);
  return (
    <section
      ref={root}
      id="inicio"
      className="hero"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        state.current.pointerX = ((e.clientX - r.left) / r.width - 0.5) * 2;
        state.current.pointerY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
      onPointerLeave={() => {
        state.current.pointerX = 0;
        state.current.pointerY = 0;
      }}
    >
      <SceneViewport state={state} reduced={reduced} />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <span className="eyebrow hero-enter">
          <span className="status-dot" /> SOFTWARE HOUSE / IDEIAS EM MOVIMENTO
        </span>
        <h1 className="hero-heading hero-enter">
          Construímos o<br />
          <span>futuro digital</span>
          <br />
          da sua empresa<span className="title-dot">.</span>
        </h1>
        <p className="hero-subtitle hero-enter">
          Sites, sistemas, automação e inteligência artificial
          <br className="desktop-break" /> para transformar ideias em soluções
          reais.
        </p>
        <div className="hero-actions hero-enter">
          <a href="#contato" className="button primary">
            Começar um projeto <ArrowUpRight size={17} />
          </a>
          <a href="#servicos" className="button secondary">
            Explorar soluções <ArrowDown size={16} />
          </a>
        </div>
        <span className="hero-note hero-enter">
          ESTRATÉGIA. DESIGN. ENGENHARIA.
        </span>
      </div>
      <span className="scene-label label-left">
        ORIGINAL 3D OBJECTS <MoveUpRight size={13} />
      </span>
      <span className="scene-label label-right">
        CRIATIVIDADE EM TODAS AS DIMENSÕES
      </span>
      <div className="hero-bottom">
        <span>
          MENOS LIMITES.
          <br />
          <b>MAIS POSSIBILIDADES.</b>
        </span>
        <a href="#servicos">
          Role para explorar{" "}
          <span className="scroll-cue">
            <ArrowDown size={13} />
          </span>
        </a>
        <span>
          FEITO PARA A WEB.
          <br />
          <b>PENSADO PARA PESSOAS.</b>
        </span>
      </div>
    </section>
  );
}
