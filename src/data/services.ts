export const services = [
  {
    id: "web",
    number: "01",
    title: "Desenvolvimento Web",
    short: "Websites que fazem a diferença.",
    description:
      "Sites, landing pages e experiências digitais construídas para comunicar sua marca com clareza e funcionar em qualquer tela.",
    details: [
      "Design responsivo",
      "Performance e acessibilidade",
      "Publicação e evolução",
    ],
    color: "#8855ff",
    label: "WEBSITES / LANDING PAGES",
  },
  {
    id: "systems",
    number: "02",
    title: "Sistemas Personalizados",
    short: "Sua operação, em perspectiva.",
    description:
      "Plataformas, aplicações web e dashboards sob medida para organizar informações e simplificar a rotina da sua empresa.",
    details: [
      "Plataformas web e SaaS",
      "Dashboards e gestão",
      "Integrações com APIs",
    ],
    color: "#465cff",
    label: "PLATAFORMAS / SOFTWARE",
  },
  {
    id: "automation",
    number: "03",
    title: "Automação Empresarial",
    short: "Conecte ferramentas. Libere tempo.",
    description:
      "Fluxos que conectam sistemas e reduzem tarefas repetitivas. Do recebimento de uma solicitação à atualização da operação.",
    details: [
      "Mapeamento de processos",
      "Conexão entre ferramentas",
      "Monitoramento de fluxos",
    ],
    color: "#00c896",
    label: "PROCESSOS / INTEGRAÇÕES",
  },
  {
    id: "ai",
    number: "04",
    title: "Inteligência Artificial",
    short: "Inteligência com propósito.",
    description:
      "Assistentes e aplicações para organizar informações, apoiar o atendimento e explorar dados com responsabilidade.",
    details: [
      "Assistentes inteligentes",
      "Processamento de informações",
      "Integrações com IA",
    ],
    color: "#e841a0",
    label: "ASSISTENTES / INTELIGÊNCIA",
  },
] as const;
export type ServiceId = (typeof services)[number]["id"];
