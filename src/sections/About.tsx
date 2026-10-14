import { ArrowUpRight } from "lucide-react";
import { site } from "../config/site";
export default function About() {
  return (
    <section className="section about" id="sobre">
      <div>
        <span className="eyebrow">05 / NOSSA FORMA DE PENSAR</span>
        <h2>
          Código, criatividade
          <br />e <span>inovação.</span>
        </h2>
        <p>
          Unimos engenharia de software, design e tecnologia para desenvolver
          experiências e sistemas que resolvem problemas reais.
        </p>
        <p>
          Da interface à integração, cada escolha parte de um objetivo:
          construir uma solução que faça sentido para o seu negócio e para as
          pessoas que vão utilizá-la.
        </p>
        <a href="#contato" className="text-link">
          Conheça as possibilidades <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="code-window">
        <div className="panel-bar">
          <span className="window-dots">● ● ●</span>
          <span>possibilidades.ts</span>
        </div>
        <pre>
          <span className="code-muted">
            // O próximo capítulo começa com uma ideia
          </span>
          {"\n\n"}
          <span className="code-purple">const</span> projeto = {"{\n"}{" "}
          propósito: <span className="code-green">'resolver problemas'</span>,
          {"\n"} experiência:{" "}
          <span className="code-green">'pensada para pessoas'</span>,{"\n"}{" "}
          tecnologia: <span className="code-green">'possibilidades reais'</span>
          {"\n};\n\n"}
          <span className="code-purple">await</span> {site.name.toLowerCase()}.
          <span className="code-blue">construir</span>(projeto);
        </pre>
        <div className="code-foot">
          <span className="status-dot" /> DESIGN + ENGENHARIA NA MESMA DIREÇÃO
        </div>
      </div>
    </section>
  );
}
