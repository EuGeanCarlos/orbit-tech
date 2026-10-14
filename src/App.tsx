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
  Layers3,
  Workflow,
  Sparkles,
  Menu,
  X,
  Github,
  Check,
  Plus,
} from "lucide-react";
import { site, projects } from "./config/site";
import Demos from "./components/Demos";
import Contact from "./components/Contact";
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
const services = [
  {
    title: "Websites & landing pages",
    text: "Experiências digitais que conectam sua marca às pessoas certas.",
    icon: Code2,
    kind: "browser",
    tags: "PRESENÇA DIGITAL / CONVERSÃO",
  },
  {
    title: "Sistemas personalizados",
    text: "Software sob medida para organizar operações e resolver desafios reais.",
    icon: Layers3,
    kind: "mini-dashboard",
    tags: "PLATAFORMAS / SAAS / APIS",
  },
  {
    title: "Automação empresarial",
    text: "Ferramentas conectadas. Menos tarefas repetitivas. Mais tempo para evoluir.",
    icon: Workflow,
    kind: "mini-flow",
    tags: "INTEGRAÇÕES / PROCESSOS",
  },
  {
    title: "Inteligência artificial",
    text: "Soluções inteligentes para atendimento, informação e decisões melhores.",
    icon: Sparkles,
    kind: "mini-chat",
    tags: "ASSISTENTES / ANÁLISE / IA",
  },
];
const nav = [
  ["inicio", "Início"],
  ["servicos", "Serviços"],
  ["solucoes", "Soluções"],
  ["projetos", "Projetos"],
  ["sobre", "Sobre"],
];
function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <ellipse cx="21" cy="21" rx="20" ry="9" transform="rotate(-40 21 21)" />
        <circle cx="21" cy="21" r="6" />
      </svg>
      {site.name.toLowerCase()}
      <sup>®</sup>
    </span>
  );
}
function MiniVisual({ kind }: { kind: string }) {
  return (
    <div className={`service-visual ${kind}`} aria-hidden="true">
      {kind === "browser" ? (
        <div className="tiny-window">
          <span>
            ● ● ● <i>orbit.studio</i>
          </span>
          <div>
            <b>
              Make
              <br />
              your next move.
            </b>
            <em />
            <small>Explore possibilidades ↗</small>
          </div>
        </div>
      ) : kind === "mini-dashboard" ? (
        <div className="tiny-window">
          <span>
            ● ● ● <i>Visão geral · dados fictícios</i>
          </span>
          <div className="mini-stats">
            <b>
              128<small>Solicitações</small>
            </b>
            <b>
              94<small>Concluídas</small>
            </b>
          </div>
          <div className="mini-bars">
            {[35, 65, 48, 90, 58, 78, 100, 82].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      ) : kind === "mini-flow" ? (
        <div className="mini-flow-inner">
          <span>
            <Code2 />
          </span>
          <i />
          <span>
            <Workflow />
          </span>
          <i />
          <span>
            <Check />
          </span>
        </div>
      ) : (
        <div className="tiny-conversation">
          <span>
            <Sparkles size={16} /> Assistente · demo
          </span>
          <p>Como posso otimizar minha operação?</p>
          <p>Vamos conectar suas ferramentas e simplificar seus processos.</p>
        </div>
      )}
    </div>
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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (nav.some(([id]) => id === entry.target.id))
              setActive(entry.target.id);
          }
        });
      },
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
        <a href="#inicio" aria-label="Orbit — início">
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
          <a
            href="#contato"
            className="mobile-contact"
            onClick={() => setMenu(false)}
          >
            Contato
          </a>
        </nav>
        <a href="#contato" className="nav-cta">
          Fale com a gente <ArrowUpRight size={16} />
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
              <span className="status-dot" /> SOFTWARE PARA O PRÓXIMO CAPÍTULO
            </span>
            <h1>
              Transformamos{" "}
              <br />
              ideias em{" "}
              <span>
                soluções{" "}
                <br />
                digitais inteligentes.
              </span>
            </h1>
            <p>
              Desenvolvemos sites, sistemas e soluções com inteligência
              artificial para acelerar a transformação digital do seu negócio.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contato">
                Começar um projeto <ArrowUpRight size={19} />
              </a>
              <a className="button ghost" href="#solucoes">
                Explorar soluções <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-caption">
              <span />
              <small>Da primeira ideia à próxima grande possibilidade.</small>
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
                Web experiences<small>Design que conecta.</small>
              </span>
              <span className="status-dot" />
            </div>
            <div className="satellite sat-two">
              <Sparkles size={18} />
              <span>
                Intelligence<small>Possibilidades ampliadas.</small>
              </span>
            </div>
            <div className="satellite sat-three">
              <Workflow size={18} />
              <span>
                Connected systems<small>Fluxos em movimento.</small>
              </span>
            </div>
            <span className="art-caption">
              UM ECOSSISTEMA. INFINITAS CONEXÕES.
            </span>
            <span className="coordinate">ORB—01 / DIGITAL CORE</span>
          </div>
          <div className="hero-bottom">
            <span>TECNOLOGIA COM PROPÓSITO. DESIGN COM INTENÇÃO.</span>
            <a href="#servicos">
              Explore a órbita <ArrowDown size={15} />
            </a>
          </div>
        </section>
        <div className="capability-strip">
          <span>
            Ideias conectadas.
            <br />
            <b>Possibilidades expandidas.</b>
          </span>
          {[
            "Web experiences",
            "Software sob medida",
            "Automação",
            "Inteligência artificial",
          ].map((x) => (
            <p key={x}>
              <Plus size={17} />
              {x}
            </p>
          ))}
        </div>
        <section id="servicos" className="section">
          <div className="section-top">
            <span className="eyebrow">01 / O QUE CONSTRUÍMOS</span>
            <span className="section-aside">
              Seu desafio é o ponto de partida.
              <br />A tecnologia é o caminho.
            </span>
          </div>
          <h2>
            Tecnologia para transformar
            <br />o seu <em>negócio.</em>
          </h2>
          <p className="section-intro">
            Da primeira ideia à solução completa, desenvolvemos tecnologia para
            impulsionar empresas.
          </p>
          <div className="services-grid">
            {services.map(({ title, text, icon: Icon, kind, tags }, i) => (
              <a href="#solucoes" className="service-card reveal" key={title}>
                <div className="card-top">
                  <span>0{i + 1}</span>
                  <ArrowUpRight size={21} />
                </div>
                <MiniVisual kind={kind} />
                <span className="micro-label">{tags}</span>
                <h3>
                  <Icon size={20} />
                  {title}
                </h3>
                <p>{text}</p>
              </a>
            ))}
          </div>
        </section>
        <section id="solucoes" className="section solutions">
          <div className="section-top">
            <span className="eyebrow">02 / EXPLORE NA PRÁTICA</span>
            <span className="pill subtle">INTERATIVO. SIMPLES. CONECTADO.</span>
          </div>
          <div className="split-title">
            <h2>
              Experimente o que
              <br />a tecnologia <em>pode fazer.</em>
            </h2>
            <p>
              Uma pequena amostra de possibilidades reais.
              <br />
              Explore nossas experiências com dados fictícios e simulações
              locais.
            </p>
          </div>
          <Demos />
        </section>
        <section className="section ai-section" id="inteligencia">
          <div className="neural" aria-hidden="true">
            <div className="neural-ring" />
            <div className="neural-ring second" />
            {Array.from({ length: 12 }, (_, i) => (
              <i
                key={i}
                style={{ "--angle": `${i * 30}deg` } as React.CSSProperties}
              />
            ))}
            <div className="neural-center">
              <Sparkles size={44} />
            </div>
            <span className="neural-tag">INTELLIGENCE, CONNECTED.</span>
          </div>
          <div>
            <span className="eyebrow">INTELIGÊNCIA COM PROPÓSITO</span>
            <h2>
              Inteligência artificial
              <br />
              aplicada a <em>desafios reais.</em>
            </h2>
            <p>
              Utilizamos inteligência artificial para desenvolver experiências e
              processos empresariais mais eficientes. Começamos pelo problema,
              com atenção aos dados e às pessoas.
            </p>
            <div className="ai-list">
              {[
                "Assistentes inteligentes",
                "Atendimento automatizado",
                "Análise de dados",
                "Integrações com IA",
                "Processamento de informações",
                "Automação de fluxos",
              ].map((x) => (
                <span key={x}>
                  <Plus size={14} />
                  {x}
                </span>
              ))}
            </div>
            <a href="#contato" className="text-link">
              Explore uma solução para sua empresa <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="section process" id="processo">
          <span className="eyebrow">03 / COMO CHEGAMOS LÁ</span>
          <div className="split-title">
            <h2>
              Da ideia
              <br />à <em>solução.</em>
            </h2>
            <p>
              Clareza em cada etapa.
              <br />
              Colaboração do primeiro encontro à próxima evolução.
            </p>
          </div>
          <div className="timeline">
            {[
              ["Descoberta", "Entendemos seu negócio, desafios e objetivos."],
              [
                "Planejamento",
                "Definimos a arquitetura e a estratégia da solução.",
              ],
              ["Design", "Criamos experiências centradas nas pessoas."],
              [
                "Desenvolvimento",
                "Transformamos o planejamento em software funcional.",
              ],
              [
                "Entrega e evolução",
                "Validamos, publicamos e evoluímos a solução.",
              ],
            ].map(([title, text], i) => (
              <div className="process-step reveal" key={title}>
                <span className="step-index">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section portfolio" id="projetos">
          <div className="section-top">
            <span className="eyebrow">04 / IDEIAS EM MOVIMENTO</span>
            <a
              className="text-link"
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              Explore o GitHub <ArrowUpRight size={17} />
            </a>
          </div>
          <h2>
            Projetos que transformam
            <br />
            ideias em <em>realidade.</em>
          </h2>
          <p className="section-intro">
            Projetos autorais e conceitos demonstrativos. Um olhar sobre o que
            podemos construir.
          </p>
          <div className="project-grid">
            {projects.map((project, i) => (
              <article key={project.name} className="project-card reveal">
                <a
                  href={project.url}
                  target={project.url.startsWith("http") ? "_blank" : undefined}
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
                      <span className="project-preview-tag">
                        PROJETO AUTORAL
                      </span>
                    </>
                  ) : i === 1 ? (
                    <>
                      <span className="mock-sidebar">
                        ◈<br />—<br />—<br />—
                      </span>
                      <div className="mock-screen">
                        <small>Operations overview</small>
                        <div className="mock-metrics">
                          <b>128</b>
                          <b>94</b>
                          <b>12</b>
                        </div>
                        <div className="mock-chart">
                          {[30, 55, 40, 75, 60, 85, 100, 80].map((h, j) => (
                            <i key={j} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                      <span className="project-preview-tag">
                        DADOS FICTÍCIOS
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="intelligence-orb">
                        <Sparkles size={45} />
                      </div>
                      <b>
                        Uma nova forma
                        <br />
                        de conectar.
                      </b>
                      <span className="project-preview-tag">
                        CONCEITO DEMONSTRATIVO
                      </span>
                    </>
                  )}
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
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Repositório ${project.name}`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section about" id="sobre">
          <div>
            <span className="eyebrow">05 / NOSSA ÓRBITA</span>
            <h2>
              Tecnologia,
              <br />
              criatividade
              <br />e <em>inovação.</em>
            </h2>
            <p>
              Somos uma startup de tecnologia dedicada ao desenvolvimento de
              soluções digitais para empresas.
            </p>
            <p>
              Combinamos engenharia de software, design e inteligência
              artificial para transformar desafios em produtos e processos mais
              eficientes.
            </p>
          </div>
          <div className="about-code">
            <div className="code-top">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <small>possibilities.ts</small>
            </div>
            <pre>
              <span className="code-muted">
                // O próximo capítulo do seu negócio
              </span>
              {"\n\n"}
              <span className="code-purple">const</span> future = {"{\n"} idea:{" "}
              <span className="code-green">'sua visão'</span>,{"\n"} design:{" "}
              <span className="code-green">'centrado nas pessoas'</span>,{"\n"}{" "}
              technology:{" "}
              <span className="code-green">'a serviço do negócio'</span>,{"\n"}{" "}
              possibilities: <span className="code-purple">Infinity</span>
              {"\n};\n\n"}
              <span className="code-purple">await</span> orbit.
              <span className="code-blue">build</span>(future);
              <span className="cursor">▌</span>
            </pre>
            <div className="code-bottom">
              <span className="status-dot" /> READY TO CREATE SOMETHING
              MEANINGFUL
            </div>
          </div>
        </section>
        <section className="section differences">
          <span className="eyebrow">DESIGN E ENGENHARIA NA MESMA DIREÇÃO</span>
          <h2>
            Construímos tecnologia pensando
            <br />
            no seu <em>crescimento.</em>
          </h2>
          <div className="difference-grid">
            {[
              [
                "Soluções personalizadas",
                "Seu contexto orienta cada escolha. Software que se adapta ao negócio.",
              ],
              [
                "Tecnologia moderna",
                "Arquitetura clara e ferramentas adequadas ao desafio.",
              ],
              [
                "Experiência do usuário",
                "Interfaces que fazem sentido para quem as utiliza.",
              ],
              [
                "Evolução contínua",
                "Uma base preparada para acompanhar novas possibilidades.",
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
        <section className="section faq" id="perguntas">
          <div>
            <span className="eyebrow">ANTES DE COMEÇAR</span>
            <h2>
              Boas perguntas.
              <br />
              Respostas <em>claras.</em>
            </h2>
            <p>
              Não encontrou sua resposta?
              <br />
              <a href="#contato" className="text-link">
                Vamos conversar <ArrowUpRight size={16} />
              </a>
            </p>
          </div>
          <div className="faq-list">
            {[
              [
                "Qual solução é ideal para minha empresa?",
                "Começamos entendendo seus objetivos, processos e necessidades. A partir dessa descoberta, propomos uma solução e um escopo adequados ao seu momento.",
              ],
              [
                "Quanto tempo leva para desenvolver um projeto?",
                "O prazo depende da complexidade, das integrações e do conteúdo necessário. Definimos etapas e um cronograma durante o planejamento, antes de iniciar o desenvolvimento.",
              ],
              [
                "Vocês integram ferramentas que já utilizamos?",
                "Sim. Avaliamos as APIs e possibilidades de integração dos sistemas existentes para conectar informações e automatizar processos com segurança.",
              ],
              [
                "As demonstrações usam inteligência artificial real?",
                "Não. As experiências desta página são simulações locais com respostas predefinidas e dados fictícios. Uma integração real exige escopo, infraestrutura e configuração próprios.",
              ],
              [
                "Como funciona o orçamento?",
                "Você compartilha seu desafio. Conversamos sobre o contexto e definimos entregas, cronograma e investimento a partir do escopo.",
              ],
              [
                "O projeto pode evoluir após a entrega?",
                "Sim. Podemos planejar manutenção e novas funcionalidades conforme as necessidades da solução. Condições e responsabilidades são definidas na proposta.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={19} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <a href="#inicio">
              <Logo />
            </a>
            <p>{site.description}</p>
          </div>
          <div>
            <span>NAVEGUE</span>
            {[...nav.slice(1), ["contato", "Contato"]].map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <span>CONSTRUA</span>
            <a href="#servicos">Websites e landing pages</a>
            <a href="#servicos">Sistemas personalizados</a>
            <a href="#solucoes">Automação empresarial</a>
            <a href="#inteligencia">Inteligência artificial</a>
          </div>
          <div>
            <span>CONECTE-SE</span>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            <a href="#contato">
              Começar um projeto <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. Feito para novas
            possibilidades.
          </span>
          <span>
            DESIGN + CÓDIGO + PROPÓSITO <span className="status-dot" />
          </span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </>
  );
}
