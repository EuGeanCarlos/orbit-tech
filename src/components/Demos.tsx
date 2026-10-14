import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Play,
  Send,
  Sparkles,
  Activity,
  Workflow,
  BarChart3,
} from "lucide-react";
const steps = [
  "Formulário",
  "Recebimento",
  "Processamento",
  "Notificação",
  "Dashboard",
];
const questions = [
  "Como automatizar meu atendimento?",
  "Como conectar meus sistemas?",
  "Preciso de um site ou sistema?",
];
const answers = [
  "Um assistente pode organizar perguntas frequentes, encaminhar solicitações e integrar seus canais ao sistema da empresa. O primeiro passo é mapear o atendimento e definir quando uma pessoa deve assumir.",
  "APIs permitem conectar ferramentas e manter dados sincronizados. Começamos identificando os sistemas, suas interfaces e as regras de segurança de cada integração.",
  "Um site apresenta seu negócio e gera oportunidades. Um sistema organiza operações e dados. Podemos começar pelo seu objetivo e escolher a solução adequada.",
];
export default function Demos() {
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(-1);
  const [question, setQuestion] = useState(-1);
  const [period, setPeriod] = useState("Semana");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  function run() {
    if (timer.current) clearInterval(timer.current);
    setStep(0);
    let next = 0;
    timer.current = setInterval(() => {
      next++;
      setStep(next);
      if (next === 5 && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, 650);
  }
  return (
    <div className="demo-shell">
      <div className="demo-toolbar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>orbit / playground</span>
        <span className="demo-label">DEMONSTRAÇÃO LOCAL</span>
      </div>
      <div className="demo-tabs" role="tablist" aria-label="Demonstrações">
        {["Automação", "Assistente IA", "Dashboard"].map((label, i) => (
          <button
            key={label}
            role="tab"
            id={`tab-${i}`}
            aria-controls={`panel-${i}`}
            aria-selected={tab === i}
            onClick={() => setTab(i)}
          >
            {i === 0 ? (
              <Workflow size={16} />
            ) : i === 1 ? (
              <Sparkles size={16} />
            ) : (
              <BarChart3 size={16} />
            )}{" "}
            {label}
          </button>
        ))}
      </div>
      <div
        className="demo-body"
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
      >
        {tab === 0 ? (
          <>
            <div className="demo-heading">
              <div>
                <span className="eyebrow">
                  MENOS TAREFAS. MAIS POSSIBILIDADES.
                </span>
                <h3>Uma conexão. Todo o fluxo.</h3>
              </div>
              <button
                className="button small"
                disabled={step >= 0 && step < 5}
                onClick={run}
              >
                <Play size={14} />{" "}
                {step >= 0 && step < 5
                  ? "Executando…"
                  : "Executar demonstração"}
              </button>
            </div>
            <div className="flow">
              {steps.map((s, i) => (
                <div className="flow-part" key={s}>
                  <div className={`flow-node ${step >= i ? "done" : ""}`}>
                    <span>
                      {step > i ? (
                        <Check size={21} />
                      ) : i === 0 ? (
                        <Send size={21} />
                      ) : i === 2 ? (
                        <Sparkles size={21} />
                      ) : (
                        <Activity size={21} />
                      )}
                    </span>
                    <small>0{i + 1}</small>
                    <b>{s}</b>
                  </div>
                  {i < 4 && (
                    <ArrowRight className={step > i ? "lit" : ""} size={20} />
                  )}
                </div>
              ))}
            </div>
            <p className="demo-status" role="status">
              {step === 5
                ? "✓ Fluxo concluído. Notificação simulada e dashboard atualizado."
                : step >= 0
                  ? `Etapa ${step + 1} de 5: ${steps[step]}`
                  : "Do primeiro contato ao dado organizado. Clique para simular."}
            </p>
          </>
        ) : tab === 1 ? (
          <div className="chat">
            <div className="chat-title">
              <span className="ai-avatar">
                <Sparkles size={22} />
              </span>
              <div>
                <b>Orbit Assistant</b>
                <small>
                  Respostas predefinidas · sem modelo de IA conectado
                </small>
              </div>
            </div>
            <p className="bubble">
              Olá! Vamos explorar como a tecnologia pode ajudar seu negócio?
            </p>
            {question >= 0 && (
              <>
                <p className="bubble user">{questions[question]}</p>
                <p className="bubble" role="status">
                  {answers[question]}
                </p>
              </>
            )}
            <div className="question-buttons">
              {questions.map((q, i) => (
                <button key={q} onClick={() => setQuestion(i)}>
                  {q}
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="dashboard">
            <div className="demo-heading">
              <div>
                <span className="eyebrow">DADOS FICTÍCIOS</span>
                <h3>Seu negócio, em perspectiva.</h3>
              </div>
              <select
                aria-label="Período do dashboard"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option>Semana</option>
                <option>Mês</option>
              </select>
            </div>
            <div className="stats">
              <div>
                <small>Solicitações</small>
                <strong>{period === "Semana" ? "128" : "512"}</strong>
              </div>
              <div>
                <small>Processos concluídos</small>
                <strong>{period === "Semana" ? "94" : "386"}</strong>
              </div>
              <div>
                <small>Tarefas pendentes</small>
                <strong>{period === "Semana" ? "12" : "24"}</strong>
              </div>
            </div>
            <div
              className="chart"
              aria-label={`Gráfico ilustrativo por ${period.toLowerCase()}`}
            >
              {[35, 60, 45, 80, 65, 95, 75, 55, 85, 100, 70, 90].map((v, i) => (
                <div
                  key={i}
                  style={{
                    height: `${period === "Semana" ? v : 110 - v / 2}%`,
                  }}
                />
              ))}
            </div>
            <div className="activity-row">
              <span className="status-dot" /> Integração sincronizada{" "}
              <span>Simulação · agora</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
