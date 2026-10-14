# Revisão de movimento

## Oportunidades selecionadas

| Local | Situação | Propósito | Frequência | Receita |
| --- | --- | --- | --- | --- |
| Hero | Passagem para serviços sem continuidade | Explanation / Spatial consistency | Primeira visita | ScrollTrigger com scrub 1 e pin desktop de 500px; transformação, opacidade e câmera. Movimento reduzido elimina pin e deslocamento. |
| Serviços | Troca de especialidade | Preventing a jarring change | Ocasional | Motion 200ms, curva `[.23,1,.32,1]`, translateY 8px + opacity; teclado instantâneo. |
| Menu móvel | Abertura de navegação | Spatial consistency | Ocasional | Origem no controle superior direito; 180ms, scale .97 + opacity; teclado instantâneo. |
| Botões | Falta de feedback de pressão | Feedback | Repetida | Scale .97 no active, 100ms; retorno 160ms; hover apenas para ponteiro fino. |
| Processo | Etapas sem progresso | Explanation | Uma passagem | Linha em scaleX e sequência de cinco etapas ligadas ao scroll; mobile em coluna. |

Rejeitados: animação de números do dashboard (dados devem ser legíveis); carrossel horizontal forçado no celular (piora navegação); rotação contínua de cards de projetos (distrai da leitura); scroll hijacking (retira controle).

## Inventário e causas

| Elemento | Motor | Propriedades | Condição |
| --- | --- | --- | --- |
| Hero / processo | GSAP + ScrollTrigger | transform / opacity / refs de cena | Scroll real, com cleanup via context |
| Geometrias | R3F | position / rotation / scale / materiais na entrada | Canvas visível, sem React setState por frame |
| Painel de serviço / assistente | Motion | transform string / opacity | Seleção do visitante |
| Botões e menu | CSS | transform / opacity / cores | Pressão, entrada e ponteiro compatível |
| Conexões da automação | CSS | scaleX | Progressão demonstrativa de 600ms por etapa |

## Ajustes e decisão

| Antes | Depois | Por quê |
| --- | --- | --- |
| Orientação das conexões recalculada em todo frame | Quaternion memoizado | Reduzir alocações desnecessárias. |
| Objetos laterais excessivamente cortados no celular | Quatro peças com escala .48 e posições próprias | Garantir objetos reconhecíveis e texto legível. |
| Cursor sem amortecimento na hero | Interpolação amortecida em ref | Suavizar retargeting, sem renderizações React. |
| Menu animado também por teclado | Entrada instantânea e foco gerenciado | Resposta imediata à navegação. |

**Decisão de código:** aprovar após os ajustes acima, com confirmação visual por capturas e testes de scroll, movimento reduzido e fallback. Isso não equivale a medição de FPS em hardware físico. Não foi feita promessa de 60fps nem pontuação Lighthouse.

## Limitações verificáveis

WebGL está limitado a DPR 1–1.5, cenas são lazy e pausam fora da tela. Geometria e material dos nós são compartilhados. Sem pós-processamento nem modelos externos. A avaliação de GPU de celular e toque físico permanece pendente de dispositivo real.
