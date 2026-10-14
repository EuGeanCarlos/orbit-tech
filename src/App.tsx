import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Code2,
  Workflow,
  Sparkles,
  Menu,
  X,
  Github,
  Play,
} from "lucide-react";
import { site, projects } from "./config/site";
const Scene = lazy(() => import("./components/Scene"));
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="fallback-core" />
    ) : (
      this.props.children
    );
  }
}
const nav = [
  ["inicio", "Início"],
  ["projetos", "Projetos"],
  ["habilidades", "Habilidades"],
  ["sobre", "Sobre"],
  ["contato", "Contato"],
];
function Logo() {
  return (
    <span className="logo personal-logo">
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <ellipse cx="21" cy="21" rx="20" ry="9" transform="rotate(-40 21 21)" />
        <circle cx="21" cy="21" r="6" />
      </svg>
      <span>
        gean carlos<span className="logo-period">.</span>
      </span>
    </span>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const scroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (nav.some(([id]) => id === entry.target.id))
              setActive(entry.target.id);
          }
        }),
      { threshold: 0.13 },
    );
    document
      .querySelectorAll("section, .reveal")
      .forEach((el) => observer.observe(el));
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className={scrolled ? "scrolled" : ""}>
        <a href="#inicio" aria-label="Gean Carlos — início">
          <Logo />
        </a>
        <nav aria-label="Principal" className={menu ? "open" : ""}>
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenu(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={site.github}
          className="nav-cta"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <span className="pill">
              <span className="status-dot" /> PORTFÓLIO / GEAN CARLOS
            </span>
            <h1>
              Ideias, código
              <br />e{" "}
              <span>
                possibilidades
                <br />
                em movimento.
              </span>
            </h1>
            <p>
              Sou Gean Carlos. Este é meu espaço para compartilhar projetos
              autorais, estudos e experiências com desenvolvimento de software.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projetos">
                Explorar projetos <ArrowUpRight size={19} />
              </a>
              <a className="button ghost" href="#sobre">
                Sobre mim <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-caption">
              <span />
              <small>
                Aprender, construir e evoluir. Um projeto de cada vez.
              </small>
            </div>
          </div>
          <div className="hero-art">
            <div className="orbital-glow" />
            <div className="scene">
              <SceneBoundary>
                <Suspense fallback={<div className="fallback-core" />}>
                  <Scene reduced={reduced} />
                </Suspense>
              </SceneBoundary>
            </div>
            <div className="satellite sat-one">
              <Code2 size={18} />
              <span>
                Desenvolvimento web<small>Interfaces e interações.</small>
              </span>
              <span className="status-dot" />
            </div>
            <div className="satellite sat-two">
              <Sparkles size={18} />
              <span>
                Experimentos<small>Ideias em construção.</small>
              </span>
            </div>
            <div className="satellite sat-three">
              <Workflow size={18} />
              <span>
                Software & lógica<small>Aprendizado em movimento.</small>
              </span>
            </div>
            <span className="art-caption">
              UM ESPAÇO PARA EXPLORAR POSSIBILIDADES.
            </span>
            <span className="coordinate">GC—01 / CREATIVE DEVELOPMENT</span>
          </div>
          <div className="hero-bottom">
            <span>DESENVOLVIMENTO + CURIOSIDADE + PRÁTICA</span>
            <a href="#projetos">
              Conheça meu trabalho <ArrowDown size={15} />
            </a>
          </div>
        </section>
        <div className="capability-strip">
          <span>
            Projetos autorais.
            <br />
            <b>Aprendizado contínuo.</b>
          </span>
          {[
            "Desenvolvimento web",
            "Interfaces",
            "Lógica de programação",
            "Experimentos com IA",
          ].map((x) => (
            <p key={x}>
              <span className="status-dot" />
              {x}
            </p>
          ))}
        </div>
        <section className="section portfolio" id="projetos">
          <div className="section-top">
            <span className="eyebrow">01 / SELEÇÃO DE PROJETOS</span>
            <a
              className="text-link"
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              Todos os repositórios <ArrowUpRight size={17} />
            </a>
          </div>
          <h2>
            Um pouco do que
            <br />
            venho <em>construindo.</em>
          </h2>
          <p className="section-intro">
            Projetos pessoais e de estudo disponíveis no meu GitHub. Cada um faz
            parte da minha jornada de aprendizado.
          </p>
          <div className="project-grid">
            {projects.map((project, i) => (
              <article key={project.name} className="project-card reveal">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Explorar ${project.name}`}
                  className={`project-art ${project.visual}`}
                >
                  {i === 0 ? (
                    <>
                      <span className="energy-symbol">ϟ</span>
                      <div>
                        <small>ENERGIA INTELIGENTE</small>
                        <b>
                          Um futuro
                          <br />
                          mais eficiente.
                        </b>
                      </div>
                    </>
                  ) : i === 1 ? (
                    <div className="collatz-preview">
                      <small>COLLATZ EXPLORER</small>
                      <b>7 → 22 → 11</b>
                      <span>
                        Explorando padrões.
                        <br />
                        Praticando lógica.
                      </span>
                    </div>
                  ) : (
                    <div className="player-preview">
                      <span className="record-disc">
                        <Play size={32} fill="currentColor" />
                      </span>
                      <b>Interface em sintonia.</b>
                      <span>HTML / CSS / JAVASCRIPT</span>
                    </div>
                  )}
                  <span className="project-preview-tag">
                    {i === 0 ? "PROJETO AUTORAL" : "PROJETO DE ESTUDO"} ·
                    PREVIEW ILUSTRATIVO
                  </span>
                  <span className="project-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </a>
                <span className="micro-label">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Repositório ${project.name}`}
                  >
                    <Github size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section differences" id="habilidades">
          <span className="eyebrow">02 / TECNOLOGIAS E INTERESSES</span>
          <h2>
            Ferramentas para criar.
            <br />
            Curiosidade para <em>evoluir.</em>
          </h2>
          <p className="section-intro">
            Tecnologias presentes nos meus projetos e áreas que exploro na
            prática.
          </p>
          <div className="difference-grid">
            {[
              [
                "Frontend",
                "HTML, CSS, JavaScript, React e TypeScript para construir interfaces e experiências no navegador.",
              ],
              [
                "Software e lógica",
                "Estudos com Java, organização de código e resolução de problemas de programação.",
              ],
              [
                "Git e publicação",
                "Versionamento com Git, projetos no GitHub e publicação estática com GitHub Pages.",
              ],
              [
                "Experimentos digitais",
                "Explorações com inteligência artificial, visualização de dados e interfaces tridimensionais.",
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1} /</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section about" id="sobre">
          <div>
            <span className="eyebrow">03 / SOBRE MIM</span>
            <h2>
              Prazer,
              <br />
              sou <em>Gean Carlos.</em>
            </h2>
            <p>
              Tenho interesse em desenvolvimento de software e em como ideias se
              tornam experiências digitais. Compartilho no GitHub projetos
              pessoais, exercícios e experimentos que acompanham meu
              aprendizado.
            </p>
            <p>
              Este portfólio reúne parte desse percurso: interfaces web,
              aplicações de lógica e explorações com tecnologia. Cada projeto é
              uma oportunidade de praticar, entender e melhorar.
            </p>
            <a
              className="text-link about-link"
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              Acompanhe minha jornada no GitHub <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="about-code">
            <div className="code-top">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <small>journey.ts</small>
            </div>
            <pre>
              <span className="code-muted">// Um projeto de cada vez</span>
              {"\n\n"}
              <span className="code-purple">const</span> journey = {"{\n"}{" "}
              curiosity: <span className="code-green">true</span>,{"\n"} ideas:{" "}
              <span className="code-green">'em movimento'</span>,{"\n"}{" "}
              learning: <span className="code-green">'contínuo'</span>,{"\n"}{" "}
              nextStep: <span className="code-green">'construir'</span>
              {"\n};\n\n"}
              <span className="code-purple">await</span>{" "}
              <span className="code-blue">create</span>(journey);
              <span className="cursor">▌</span>
            </pre>
            <div className="code-bottom">
              <span className="status-dot" /> LEARN. BUILD. ITERATE.
            </div>
          </div>
        </section>
        <section id="contato" className="section portfolio-contact">
          <span className="eyebrow">04 / VAMOS NOS CONECTAR</span>
          <h2>
            Uma boa conversa pode
            <br />
            abrir novas <em>possibilidades.</em>
          </h2>
          <p className="section-intro">
            Para conhecer mais projetos, acompanhar meu trabalho ou encontrar
            meus canais públicos, visite meu perfil no GitHub.
          </p>
          <a
            className="button"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} /> Encontrar Gean no GitHub{" "}
            <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <footer>
        <div className="portfolio-footer">
          <div>
            <a href="#inicio">
              <Logo />
            </a>
            <p>{site.description}</p>
          </div>
          <a
            className="text-link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. Portfólio pessoal.
          </span>
          <span>
            APRENDER + CONSTRUIR + EVOLUIR <span className="status-dot" />
          </span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </>
  );
}
