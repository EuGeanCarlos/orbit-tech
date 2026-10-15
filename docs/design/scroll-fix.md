# Correção da experiência WebGL e scroll

## Causa confirmada na prévia publicada

O navegador usado pelo usuário reportou largura de 856px e `prefers-reduced-motion: reduce`. A implementação anterior respeitava essa preferência, mas não explicava que o movimento estava desativado. Além disso, a timeline da hero só existia a partir de 900px. A combinação resultava em uma página quase estática nessa prévia.

| Antes | Depois | Motivo |
| --- | --- | --- |
| Movimento reduzido sem indicação ou controle | Botão visível para ativar ou reduzir, com escolha persistida só no site | Tornar o estado compreensível e permitir escolha explícita sem alterar o sistema. |
| Hero com scroll apenas acima de 900px | Scrub em todas as larguras; pinning continua restrito ao desktop | Incluir tablet e celular sem prender a rolagem. |
| 3D e demonstrações pouco conectados ao percurso | Sequência WebGL de quatro capítulos ligada à rolagem real | Evidenciar a transformação de interface, sistema, conexões e inteligência. |
| Câmera fixa em canvas estreito | Distância ajustada à proporção do canvas | Preservar o enquadramento dos modelos. |

## Implementação e revisão

Estado de preferência em provider React, exposto a todas as cenas, timelines e ao MotionConfig. CSS usa o estado efetivo do site, permitindo ativação explícita mesmo quando o sistema pede menos movimento. Default continua acessível. Timelines são limpas com `gsap.context().revert()`.

A sequência usa uma área sticky com scroll natural, quatro capítulos e geometrias originais reutilizadas. GSAP altera uma ref de progresso; R3F atualiza posição, escala, rotação, visibilidade e câmera. Apenas os grupos em transição são visíveis. Sem renderizações React por frame ou interceptação de wheel/touchmove.

## Validação

O novo teste usa 856 × 900px e movimento reduzido. Verifica a ativação explícita, persistência após reload e retorno ao modo reduzido. Confirma WebGL2 não perdido e quatro imagens renderizadas diferentes nas fases Web, Sistemas, Automação e IA. Suíte completa: 8 testes de navegador aprovados, além de tipos, lint e build.
