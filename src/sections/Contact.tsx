import { useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Github } from "lucide-react";
import { site } from "../config/site";
import { buildBrief, emailLink } from "../lib/contact";
export default function Contact() {
  const [message, setMessage] = useState("");
  const [brief, setBrief] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = buildBrief({
      name: String(data.get("name")),
      email: String(data.get("email")),
      company: String(data.get("company")),
      service: String(data.get("service")),
      description: String(data.get("description")),
    });
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
        setMessage("Mensagem enviada pelo serviço de formulário configurado.");
        form.reset();
      } catch {
        setMessage(
          "Não foi possível enviar. Copie o briefing abaixo para continuar por outro canal.",
        );
      } finally {
        setBusy(false);
      }
    } else if (site.email) {
      window.location.href = emailLink(site.email, text);
      setMessage(
        "Seu aplicativo de e-mail foi solicitado. Revise e envie a mensagem por lá.",
      );
    } else {
      setMessage(
        "Briefing preparado. O envio ainda não está configurado. Copie o texto e consulte os canais públicos do responsável no GitHub. Nenhuma mensagem foi enviada.",
      );
    }
  }
  return (
    <section className="section contact" id="contato">
      <div className="contact-copy">
        <span className="eyebrow">06 / VAMOS TIRAR DO PAPEL</span>
        <h2>
          Vamos construir
          <br />o próximo
          <br />
          <span>grande projeto?</span>
        </h2>
        <p>
          Conte sua ideia. Nós ajudamos a transformá-la em uma solução digital.
        </p>
        <a
          href={site.github}
          className="text-link"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={17} /> Perfil do responsável <ArrowUpRight size={16} />
        </a>
        {site.whatsapp && (
          <a
            className="button secondary"
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de conversar sobre um projeto.")}`}
          >
            Conversar sobre um projeto <ArrowUpRight size={16} />
          </a>
        )}
        <span className="contact-note">
          {site.email || site.formEndpoint
            ? "Compartilhe seu desafio para começar."
            : "Canal comercial em configuração. Você pode preparar e copiar seu briefing."}
        </span>
      </div>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>
            Nome
            <input
              name="name"
              placeholder="Como podemos chamar você?"
              required
              maxLength={100}
              autoComplete="name"
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
              autoComplete="email"
            />
          </label>
        </div>
        <label>
          Empresa <span>(opcional)</span>
          <input
            name="company"
            placeholder="Nome da sua empresa"
            maxLength={150}
            autoComplete="organization"
          />
        </label>
        <label>
          Serviço desejado
          <select name="service" required defaultValue="">
            <option value="" disabled>
              O que vamos construir?
            </option>
            {[
              "Desenvolvimento Web",
              "Sistema Personalizado",
              "Automação",
              "Inteligência Artificial",
              "Integração de APIs",
              "Outro",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Descrição do projeto
          <textarea
            name="description"
            placeholder="Seu desafio, sua ideia e o que deseja alcançar…"
            required
            minLength={15}
            maxLength={5000}
            rows={4}
          />
        </label>
        <button className="button primary" disabled={busy}>
          {busy
            ? "Enviando…"
            : site.email || site.formEndpoint
              ? "Solicitar orçamento"
              : "Preparar solicitação"}
          <ArrowUpRight size={17} />
        </button>
        <p className="form-message" role="status">
          {message}
        </p>
        {brief && (
          <div className="brief-output">
            <pre>{brief}</pre>
            <button
              type="button"
              className="text-link"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(brief);
                  setMessage(
                    "Briefing copiado. Nenhuma mensagem foi enviada automaticamente.",
                  );
                } catch {
                  setMessage("Selecione o briefing e copie manualmente.");
                }
              }}
            >
              <Copy size={15} /> Copiar briefing
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
