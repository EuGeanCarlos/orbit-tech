import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "../../config/site";
const links = [
  ["servicos", "Serviços"],
  ["solucoes", "Soluções"],
  ["projetos", "Projetos"],
  ["sobre", "Sobre"],
  ["contato", "Contato"],
];
export function Logo() {
  return (
    <span className="brand">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 4 34 12v16L20 36 6 28V12Z" />
        <path d="m6 12 14 8 14-8M20 20v16" />
      </svg>
      {site.name.toLowerCase()}
      <span className="brand-period">.</span>
    </span>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-20% 0px -55% 0px" },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    if (instant)
      document.querySelector<HTMLAnchorElement>("#navigation a")?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open, instant]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#inicio" aria-label={`${site.name} — início`}>
        <Logo />
      </a>
      <nav
        id="navigation"
        className={`${open ? "is-open" : ""} ${instant ? "instant" : ""}`}
        aria-label="Principal"
      >
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#contato">
        Começar um projeto <ArrowUpRight size={15} />
      </a>
      <button
        id="menu-toggle"
        className="menu-toggle"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={(event) => {
          setInstant(event.detail === 0);
          setOpen(!open);
        }}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
