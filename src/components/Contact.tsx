import { useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { site } from "../config/site";
export default function Contact() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [brief, setBrief] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = `Nome: ${data.get("nome")}\nE-mail: ${data.get("email")}\nEmpresa: ${data.get("empresa")}\nProjeto: ${data.get("tipo")}\n\n${data.get("descricao")}`;
    setBrief(text);
    if (site.formEndpoint) {
      setBusy(true);
      try {
        const response = await fetch(site.formEndpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error();
        setStatus("Mensagem enviada pelo serviço de formulário configurado.");
        form.reset();
      } catch {
        setStatus(
          "Não foi possível enviar. Seu briefing está disponível abaixo para copiar.",
        );
      } finally {
        setBusy(false);
      }
    } else if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Novo projeto — Orbit")}&body=${encodeURIComponent(text)}`;
      setStatus(
        "Seu aplicativo de e-mail foi solicitado. Revise e envie a mensagem por lá.",
      );
    } else
      setStatus(
        "Briefing preparado. O envio ainda não está configurado. Copie o texto e entre em contato pelo perfil do responsável no GitHub.",
      );
  }
  return (
    <section id="contato" className="section contact">
      <div className="contact-copy">
        <span className="eyebrow">O PRÓXIMO PASSO COMEÇA AQUI</span>
        <h2>
          Vamos construir
          <br />
          algo <em>incrível</em>
          <br />
          juntos?
        </h2>
        <p>
          Conte sobre seu projeto e vamos explorar como a tecnologia pode ajudar
          sua empresa.
        </p>
        <a
          className="text-link"
          href={site.github}
          target="_blank"
          rel="noreferrer"
        >
          Conheça o responsável no GitHub <ArrowUpRight size={18} />
        </a>
        {site.whatsapp && (
          <a
            className="button"
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Olá! Conheci a empresa pelo site e gostaria de conversar sobre um projeto.")}`}
          >
            Conversar sobre meu projeto
          </a>
        )}
        <small className="contact-note">
          {site.email
            ? "Seu briefing abre no aplicativo de e-mail."
            : "Contato comercial em configuração. Prepare seu briefing abaixo."}
        </small>
      </div>
      <form onSubmit={submit}>
        <div className="form-grid">
          <label>
            Seu nome
            <input
              name="nome"
              placeholder="Como podemos chamar você?"
              required
              maxLength={100}
            />
          </label>
          <label>
            E-mail
            <input
              name="email"
              type="email"
              placeholder="voce@empresa.com"
              required
              maxLength={200}
            />
          </label>
        </div>
        <label>
          Empresa <span>(opcional)</span>
          <input
            name="empresa"
            placeholder="Nome da sua empresa"
            maxLength={150}
          />
        </label>
        <label>
          O que vamos construir?
          <select name="tipo" required defaultValue="">
            <option disabled value="">
              Selecione o tipo de projeto
            </option>
            {[
              "Website",
              "Landing Page",
              "Sistema Web",
              "Automação",
              "Inteligência Artificial",
              "Outro",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Conte um pouco sobre sua ideia
          <textarea
            name="descricao"
            placeholder="Seu desafio, sua ideia e o que deseja alcançar…"
            required
            minLength={15}
            maxLength={5000}
            rows={4}
          />
        </label>
        <button className="button" disabled={busy}>
          {busy
            ? "Enviando…"
            : site.email || site.formEndpoint
              ? "Solicitar orçamento"
              : "Preparar solicitação"}
          <ArrowUpRight size={18} />
        </button>
        <p role="status" className="form-status">
          {status}
        </p>
        {brief && (
          <div className="brief">
            <pre>{brief}</pre>
            <button
              type="button"
              className="text-link"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(brief);
                  setStatus(
                    "Briefing copiado. Nenhuma mensagem foi enviada automaticamente.",
                  );
                } catch {
                  setStatus("Selecione o briefing acima e copie manualmente.");
                }
              }}
            >
              {status.startsWith("Briefing copiado") ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}{" "}
              Copiar briefing
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
