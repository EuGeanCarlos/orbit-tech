# Orbit — Software House 3D

Website institucional de software house, com marca **Orbit provisória**, composição 3D original e experiências interativas. Autor: [Gean Carlos](https://github.com/EuGeanCarlos).

[Website no GitHub Pages](https://eugeancarlos.github.io/orbit-tech/)

## Experiência

- Hero central em preto com seis objetos 3D coloridos, entrada escalonada e resposta amortecida ao cursor. No celular, quatro objetos com composição própria.
- ScrollTrigger coordena título, câmera e geometrias. Pinning somente no desktop; scroll natural no celular; movimento reduzido desativa os deslocamentos e pinning.
- Quatro especialidades em palco 3D: navegador, dashboard, fluxo conectado e núcleo de inteligência. Troca acessível de conteúdo via Motion.
- Demonstração executável de automação e assistente com respostas predefinidas. **Tudo local, sem integração de IA ou serviços empresariais reais.**
- Projetos com filtros, links públicos e previews ilustrativos. EnergIA SLZ é autoral; Collatz e Player são estudos. Não há clientes, depoimentos ou resultados comerciais inventados.
- Processo acompanha o scroll; navegação mobile, foco visível, Escape, link de salto e alternativas sem WebGL.
- Contato com validação nativa e briefing copiável. Não confirma envio sem resposta do serviço configurado.

## Tecnologias e responsabilidades

| Tecnologia | Responsabilidade |
| --- | --- |
| React / TypeScript strict / Vite | Componentes, tipos e build estático |
| Three.js / React Three Fiber | Geometrias, materiais, luzes e câmera |
| Drei | Geometrias arredondadas |
| GSAP / ScrollTrigger | Timelines, scrub, pinning e progresso |
| Motion | Transições de conteúdo selecionado |
| Tailwind CSS / CSS moderno | Base de estilos, layout, tokens e interação simples |
| Lucide | Ícones |
| Vitest / Playwright | Contato, experiências, acessibilidade básica e capturas |
| ESLint / Prettier | Análise e formatação |
| GitHub Actions / Pages | Verificação e publicação |

## Arquitetura

```text
src/
  animations/          Tokens e contrato de estado da cena
  components/layout/   Header, logo e footer
  components/three/    Lazy loading, visibilidade e error boundary
  config/              Nome, contatos e projetos
  data/                Especialidades tipadas
  hooks/               Preferência de movimento
  lib/                 Briefing e testes unitários
  scenes/              Objetos, redes, navegador, dashboard e câmera
  sections/            Hero, serviços, experiências, projetos, processo,
                       sobre e contato
  App.tsx              Composição das seções
  styles.css           Design system e responsividade
docs/design/           Análise da referência e revisão de animações
plans/                 Plano de melhorias e estado da execução
tests/                 Testes no navegador e capturas
.github/workflows/     Verificação e publicação
```

## Desenvolvimento

Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

| Script | Ação |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run typecheck` | Verificação TypeScript |
| `npm run lint` | Análise estática |
| `npm run test:unit` | Testes de briefing e codificação de e-mail |
| `npm test` | Testes Playwright e capturas |
| `npm run build` | Produção em `dist` |
| `npm run preview` | Servidor do build |
| `npm run format` | Formatação |

Antes do Playwright: `npx playwright install chromium`. `TEST_PORT=5181` permite usar outra porta. As capturas de hero, serviços e página inteira em 1440, 768 e 390px ficam em `test-results` e não são versionadas. O teste sem WebGL injeta a indisponibilidade de contexto para verificar a alternativa visual e os controles HTML.

## Configurações

Edite `src/config/site.ts` para trocar a marca provisória, GitHub, projetos, e-mail, WhatsApp (somente dígitos com código do país) ou endpoint HTTPS de formulário. Atualize também metadados em `index.html`, imagem social em `public/social.svg`, sitemap e canonical ao mudar domínio ou nome.

Sem contato configurado, o formulário **prepara um texto copiável** e oferece o perfil público do responsável. Com e-mail, abre o aplicativo de e-mail; o visitante deve revisar e enviar. Com endpoint, envia `FormData` por POST e confirma somente após sucesso HTTP. O serviço precisa aceitar CORS e oferecer validação e proteção contra abuso próprias. Nenhuma credencial privada deve ser colocada no frontend. As configurações vazias não geram links de telefone ou e-mail fictícios.

## Performance e acessibilidade

### Controle de movimento e sequência WebGL

O botão fixo **Ativar animações / Reduzir movimento** permite escolher o movimento somente neste site, com preferência salva em `localStorage` (`orbit-motion`). Por padrão, o site respeita o sistema. Se o navegador informar `prefers-reduced-motion: reduce`, a versão fica estática até a ativação explícita; nenhuma configuração do dispositivo é alterada.

A hero agora acompanha o scroll também abaixo de 900px, sem pinning. A seção **Explore outra dimensão do seu negócio** mantém uma cena WebGL em posição sticky enquanto a rolagem transforma a apresentação entre Web, Sistemas, Automação e IA. Progresso, posição, escala, rotação e câmera são sincronizados por GSAP e R3F, sem setState por frame. Em movimento reduzido, os quatro capítulos aparecem como conteúdo estático, sem um trecho longo de rolagem.

O teste de regressão reproduz uma tela de 856px com movimento reduzido, ativa as animações, verifica persistência após reload, confirma contexto WebGL2 e compara quatro capturas de render diferentes conforme o scroll.

Carregamento separado das cenas, Suspense, error boundary, alternativa sem WebGL, DPR limitado a 1–1.5, pausa fora da viewport e câmera atualizada sem setState por frame. Nós reutilizam geometria e material; conexões memoizam orientação. Não há HDRs, modelos externos ou pós-processamento. Fontes Google Fonts têm fallback do sistema. Não há pontuação Lighthouse ou FPS físico presumidos.

Hover depende da capacidade de ponteiro. Inputs usam no mínimo 16px em toque; navegação funciona por teclado; movimento reduzido preserva conteúdo. Emulação não substitui conferência em celular físico para GPU, teclado virtual, áreas seguras e Safari.

## Referência e skills

[Análise do Spline e da gravação](docs/design/reference-analysis.md), [revisão de movimento](docs/design/motion-review.md) e [plano aplicado](plans/001-motion-polish.md). Código, identidade e modelos são originais; a referência orienta composição e movimento. Skills de Emil Kowalski instaladas e aplicadas: emil-design-eng, animate, animation-vocabulary, find-animation-opportunities, animation-performance, review-animations, improve-animations e mobile-native.

## Deploy

O repositório continua `EuGeanCarlos/orbit-tech`, branch `main`. A origem do Pages é GitHub Actions; cada push verifica lint, tipos, Vitest, build e Playwright antes de publicar. O Vite calcula `base` de produção pelo nome do repositório em `GITHUB_REPOSITORY`. Desenvolvimento e testes usam `/`. Sem backend Node em produção e sem segredos necessários para deploy.

O endereço acima é o Pages configurado e já publicado neste projeto; a atualização de código deve sempre ser confirmada no workflow. Imagem social SVG disponível; algumas plataformas podem exigir PNG para campanhas.
