# Análise da referência — 14/10/2026

## Fontes examinadas

- https://spline.design/ — conteúdo, navegação e composição inicial inspecionados no navegador.
- Gravação fornecida: 1920 × 1020, duração 1min48,57s. Extraídos 14 frames em intervalos de 8 segundos, cobrindo do início ao rodapé. Arquivo e frames permanecem locais, fora do Git.

## Evidências da gravação

| Intervalo | Observação | Aplicação original |
| --- | --- | --- |
| 0–24s | Texto central, área preta, formas coloridas nas bordas com orientações que mudam entre frames. Espaço livre atrás da leitura. | Hero central com peças geométricas próprias; movimentos ambientais independentes e reação amortecida ao cursor. |
| 24–40s | Passagem para galeria densa de experiências; navegação compacta continua visível. | Galeria de projetos autorais, previews identificados e filtro por categoria; header fixo compacto. |
| 40–56s | Títulos com bastante respiro e demonstração grande de produto, cercada de preto. | Experiência de serviços com palco 3D grande e seletor de categorias acessível. |
| 64–80s | Alternância entre texto central e interfaces grandes com profundidade. | Laboratório de automação e assistente local; diferença clara entre simulação e produto conectado. |
| 80–104s | Conteúdo modular, integrações, convite final e rodapé extenso. | Processo progressivo e contato com briefing realista, sem marcas de clientes ou métricas inventadas. |

## Movimento: observação versus decisão

A variação das formas da hero comprova movimento contínuo. A sequência de frames mostra a persistência do header e progressão entre seções. A amostragem não comprova por si só que uma seção usa pinning ou que uma câmera está ligada ao scroll. **Pinning, scrubbing e mudança de câmera são decisões desta implementação para atender ao briefing**, não afirmações sobre o código da Spline.

Vocabulário aplicado: Float, Parallax, Stagger, Scroll-driven animation, Orchestration e Press / Tap feedback, conforme a skill animation-vocabulary.

## Composição e componentes

Preto predominante; cores concentradas em geometrias; títulos centrais; áreas de demonstração grandes; materiais com brilho controlado. Construir logo, modelos e interfaces próprios. Reutilizar cabeçalho, botão, título de seção, viewport 3D com fallback, seletor de experiência e preview de projeto.

## Técnicas

GSAP/ScrollTrigger: entrada coordenada, pin desktop, progresso 3D e linha do processo. Motion: transição de conteúdo selecionado. R3F/Drei: geometrias arredondadas, materiais, iluminação e câmera. CSS/Tailwind: layout, foco, responsividade e feedback de pressão. Sem modelos, assets ou código da referência.

## Skills e critérios adotados

Origem revisada: https://github.com/emilkowalski/skills. Instaladas em `~/.codex/skills`: emil-design-eng, animate, animation-vocabulary, find-animation-opportunities, animation-performance, review-animations, improve-animations e mobile-native.

Curvas centralizadas: `cubic-bezier(0.23,1,0.32,1)` e `cubic-bezier(0.32,0.72,0,1)`. Pressão 100–160ms, menus 180ms, troca de conteúdo 200ms, stagger 50ms. Movimento decorativo somente na apresentação, nunca em dados sendo lidos. Respeitar movimento reduzido, hover por capacidade e viewport móvel `svh`.
