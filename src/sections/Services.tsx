import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "../data/services";
import SceneViewport from "../components/three/SceneViewport";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { motionTokens } from "../animations/tokens";
export default function Services() {
  const [selected, setSelected] = useState(0);
  const [keyboard, setKeyboard] = useState(false);
  const reduced = useReducedMotion();
  const service = services[selected];
  return (
    <section className="section services" id="servicos">
      <div className="section-heading centered">
        <span className="eyebrow">01 / O QUE CONSTRUÍMOS</span>
        <h2>
          Tecnologia para transformar
          <br />o seu <span>negócio.</span>
        </h2>
        <p>
          Da primeira ideia à solução completa.
          <br />
          Explore as possibilidades de cada especialidade.
        </p>
      </div>
      <div className="service-tabs" role="tablist" aria-label="Especialidades">
        {services.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            id={`service-tab-${s.id}`}
            aria-selected={selected === i}
            aria-controls="service-panel"
            onClick={(e) => {
              setKeyboard(e.detail === 0);
              setSelected(i);
            }}
          >
            <span>{s.number}</span>
            {s.title}
          </button>
        ))}
      </div>
      <div
        className="service-stage"
        id="service-panel"
        role="tabpanel"
        aria-labelledby={`service-tab-${service.id}`}
      >
        <div className="service-scene">
          <div className="scene-caption">
            <span className="status-dot" /> CENA 3D INTERATIVA{" "}
            <span>ARRASTE O CURSOR PARA EXPLORAR</span>
          </div>
          <SceneViewport variant={service.id} reduced={reduced} />
          <span className="stage-footnote">
            REPRESENTAÇÃO VISUAL / DADOS ILUSTRATIVOS
          </span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={service.id}
            className="service-copy"
            initial={
              reduced || keyboard
                ? false
                : { opacity: 0, transform: "translateY(8px)" }
            }
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduced || keyboard ? 0 : motionTokens.ui,
              ease: motionTokens.ease,
            }}
          >
            <span className="eyebrow" style={{ color: service.color }}>
              {service.label}
            </span>
            <h3>{service.short}</h3>
            <p>{service.description}</p>
            <ul>
              {service.details.map((x) => (
                <li key={x}>
                  <Check size={15} />
                  {x}
                </li>
              ))}
            </ul>
            <a className="text-link" href="#contato">
              Conversar sobre {service.title.toLowerCase()}{" "}
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
