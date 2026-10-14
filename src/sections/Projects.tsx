import { useState } from "react";
import { ArrowUpRight, Github, Play } from "lucide-react";
import { projects, site } from "../config/site";
export default function Projects() {
  const [filter, setFilter] = useState("Todos");
  const visible = projects.filter(
    (p) =>
      filter === "Todos" ||
      (filter === "Inteligência artificial"
        ? p.visual === "energy"
        : p.visual !== "energy"),
  );
  return (
    <section className="section projects" id="projetos">
      <div className="section-heading">
        <span className="eyebrow">03 / IDEIAS QUE GANHARAM FORMA</span>
        <h2>
          Software que transforma
          <br />
          ideias em <span>realidade.</span>
        </h2>
        <div className="heading-bottom">
          <p>
            Uma seleção de projetos autorais e de estudo.
            <br />
            Experimente as aplicações e explore o código.
          </p>
          <a
            className="text-link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            Todos os repositórios <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label="Filtrar projetos"
      >
        {["Todos", "Aplicações web", "Inteligência artificial"].map((x) => (
          <button
            key={x}
            aria-pressed={filter === x}
            onClick={() => setFilter(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((p) => (
          <article className="project-card" key={p.name}>
            <a
              className={`project-art ${p.visual}`}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Explorar ${p.name}`}
            >
              <span className="preview-label">PREVIEW ILUSTRATIVO</span>
              {p.visual === "energy" ? (
                <>
                  <div className="energy-object">ϟ</div>
                  <div className="preview-title">
                    Um futuro
                    <br />
                    mais eficiente.
                  </div>
                </>
              ) : p.visual === "operations" ? (
                <div className="collatz-preview">
                  <span>COLLATZ EXPLORER</span>
                  <b>7 → 22 → 11</b>
                  <div className="collatz-bars">
                    {[20, 75, 38, 100, 50, 26, 60].map((h, i) => (
                      <i key={i} style={{ height: h }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="player-preview">
                  <span className="record-disc">
                    <Play size={30} fill="currentColor" />
                  </span>
                  <b>Interface em sintonia.</b>
                  <span>HTML / CSS / JAVASCRIPT</span>
                </div>
              )}
              <span className="project-arrow">
                <ArrowUpRight size={20} />
              </span>
            </a>
            <div className="project-info">
              <span className="eyebrow">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Repositório ${p.name}`}
                >
                  <Github size={17} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
