import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Header";
import { site } from "../../config/site";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <a href="#inicio" aria-label="Orbit — início">
            <Logo />
          </a>
          <p>
            Engenharia, design e tecnologia.
            <br />
            Novas possibilidades para o seu negócio.
          </p>
        </div>
        <div>
          <span>EXPLORE</span>
          <a href="#servicos">Serviços</a>
          <a href="#solucoes">Soluções</a>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
        </div>
        <div>
          <span>CONECTE-SE</span>
          <a href="#contato">
            Começar um projeto <ArrowUpRight size={14} />
          </a>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} />
          </a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}. Tecnologia em movimento.
        </span>
        <span>FEITO POR GEAN CARLOS</span>
        <a href="#inicio">Voltar ao início ↑</a>
      </div>
    </footer>
  );
}
