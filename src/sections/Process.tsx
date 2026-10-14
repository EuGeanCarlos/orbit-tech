import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
gsap.registerPlugin(ScrollTrigger);
const steps = [
  ["Descoberta", "Entendemos o negócio, os desafios e o que precisa mudar."],
  ["Planejamento", "Definimos escopo, arquitetura e um caminho claro."],
  ["Design", "Damos forma à experiência, com foco em quem vai usar."],
  ["Desenvolvimento", "Transformamos as decisões em software funcional."],
  [
    "Entrega e evolução",
    "Validamos, publicamos e planejamos os próximos passos.",
  ],
];
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: true,
          },
        },
      );
      gsap.from(".process-step", {
        opacity: 0.35,
        y: 16,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 65%",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section ref={root} className="section process" id="processo">
      <div className="section-heading centered">
        <span className="eyebrow">04 / UM CAMINHO CLARO</span>
        <h2>
          Da ideia ao <span>produto.</span>
        </h2>
        <p>
          Colaboração em cada decisão.
          <br />
          Clareza em cada etapa.
        </p>
      </div>
      <div className="process-track">
        <div className="process-line">
          <i className="process-progress" />
        </div>
        {steps.map(([name, text], i) => (
          <article className="process-step" key={name}>
            <span>0{i + 1}</span>
            <h3>{name}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
