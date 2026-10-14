import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Check,
  Code2,
  Database,
  Play,
  Send,
  Sparkles,
  Workflow,
} from "lucide-react";
import SceneViewport from "../components/three/SceneViewport";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { motionTokens } from "../animations/tokens";
const steps = [
  { label: "Solicitação", icon: Send },
  { label: "Recebimento", icon: Database },
  { label: "Processamento", icon: Workflow },
  { label: "Integração", icon: Code2 },
  { label: "Dashboard", icon: Check },
];
const questions = [
  "Como automatizar meu atendimento?",
  "É possível integrar meus sistemas?",
  "Como começar um projeto com IA?",
];
const answers = [
  "Um assistente pode organizar perguntas frequentes e encaminhar solicitações para sua equipe. Primeiro, mapeamos os canais e definimos quando uma pessoa deve assumir o atendimento.",
  "Podemos avaliar as APIs das ferramentas que você utiliza para sincronizar informações e automatizar tarefas. Cada integração depende das permissões e possibilidades dos sistemas envolvidos.",
  "Começamos com um problema bem definido e avaliamos os dados disponíveis. Um protótipo ajuda a validar a experiência antes de investir em uma integração completa.",
];
export default function Experiences() {
  const [step, setStep] = useState(-1);
  const [question, setQuestion] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = useReducedMotion();
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  function run() {
    if (timer.current) clearInterval(timer.current);
    setStep(0);
    let current = 0;
    timer.current = setInterval(() => {
      current++;
      setStep(current);
      if (current === 5 && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, 600);
  }
  return (
    <section className="section experiences" id="solucoes">
      <div className="section-heading centered">
        <span className="eyebrow">02 / TECNOLOGIA EM AÇÃO</span>
        <h2>
          Não é só sobre código.
          <br />É sobre o que ele <span>possibilita.</span>
        </h2>
        <p>
          Explore duas demonstrações locais.
          <br />
          Pequenas experiências, grandes possibilidades.
        </p>
      </div>
      <div className="automation-panel">
        <div className="panel-bar">
          <span>
            <span className="status-dot" /> ORBIT / AUTOMAÇÃO
          </span>
          <span className="demo-tag">SIMULAÇÃO LOCAL</span>
        </div>
        <div className="automation-heading">
          <div>
            <h3>
              Uma solicitação.
              <br />
              Todo um fluxo em movimento.
            </h3>
            <p>
              Conecte as etapas. Deixe as tarefas repetitivas para o software.
            </p>
          </div>
          <button
            className="button primary"
            disabled={step >= 0 && step < 5}
            onClick={run}
          >
            <Play size={14} />
            {step >= 0 && step < 5 ? "Executando…" : "Executar demonstração"}
          </button>
        </div>
        <div className="flow">
          {steps.map(({ label, icon: Icon }, i) => (
            <div className="flow-item" key={label}>
              <div className={`flow-node ${step >= i ? "is-active" : ""}`}>
                <span className="node-index">0{i + 1}</span>
                <span className="node-icon">
                  {step > i ? <Check size={23} /> : <Icon size={23} />}
                </span>
                <b>{label}</b>
              </div>
              {i < 4 && (
                <div
                  className={`flow-connection ${step > i ? "is-complete" : ""}`}
                >
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flow-status" role="status">
          {step === 5
            ? "✓ Fluxo concluído. Integração e atualização simuladas com sucesso."
            : step >= 0
              ? `Etapa ${step + 1} de 5: ${steps[step].label}`
              : "Clique para acompanhar a solicitação, do início ao fim."}
          <span>NENHUM DADO É ENVIADO</span>
        </div>
      </div>
      <div className="ai-experience" id="inteligencia">
        <div className="ai-visual">
          <SceneViewport variant="ai" reduced={reduced} />
          <div className="ai-visual-copy">
            <span className="eyebrow">INTELIGÊNCIA COM PROPÓSITO</span>
            <h3>
              Inteligência aplicada
              <br />a desafios reais.
            </h3>
            <p>
              Assistentes, informação organizada e processos mais eficientes.
            </p>
          </div>
        </div>
        <div className="chat-panel">
          <div className="panel-bar">
            <span>
              <Sparkles size={15} /> ASSISTENTE ORBIT
            </span>
            <span className="demo-tag">DEMONSTRAÇÃO</span>
          </div>
          <p className="chat-disclaimer">
            Respostas locais predefinidas. Sem um modelo de IA conectado.
          </p>
          <div className="chat-message">
            Olá! Vamos explorar como a tecnologia pode ajudar sua empresa?
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {question >= 0 && (
              <motion.div
                key={question}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduced ? 0 : motionTokens.ui,
                  ease: motionTokens.ease,
                }}
              >
                <p className="chat-message user-message">
                  {questions[question]}
                </p>
                <p className="chat-message" role="status">
                  {answers[question]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="question-list">
            {questions.map((q, i) => (
              <button key={q} onClick={() => setQuestion(i)}>
                {q}
                <ArrowUpRightIcon />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={14} />;
}
