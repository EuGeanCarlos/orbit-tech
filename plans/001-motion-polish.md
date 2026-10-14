# 001 — Refinar continuidade, cursor e composição móvel

- **Status:** DONE
- **Commit de base:** 4c261bd
- **Severidade:** MEDIUM
- **Categorias:** performance, acessibilidade, coesão
- **Escopo:** hero, cena compartilhada e cabeçalho

## Diagnóstico da revisão

| Antes | Depois | Motivo |
| --- | --- | --- |
| Uma única composição orbital em coluna lateral no portfólio | Texto central e seis peças próprias; quatro peças menores no celular | Aplicar a nova direção aprovada sem afetar a leitura. |
| Cursor aplicado diretamente à posição | Alvo armazenado em ref e interpolação com `MathUtils.damp(...,5,delta)` | Evitar saltos sem renderizar React por frame. |
| Conexões calculavam orientação em todo frame | Quaternion calculado com `useMemo` | A geometria da conexão é estática. |
| Menu acionado pelo teclado recebia animação de entrada | Abertura instantânea, foco no primeiro link e Escape retorna ao controle | Não atrasar navegação por teclado. |
| Hover possível em touchscreen | `@media (hover:hover) and (pointer:fine)` | Evitar estado visual preso após toque. |

## Alvos exatos e convenções

Curvas CSS: `cubic-bezier(.23,1,.32,1)` e `cubic-bezier(.32,.72,0,1)`. Pressão: escala `.97`, 100ms; retorno 160ms. Menus: 180ms; troca de serviço: 200ms. Entrada explicativa: 700ms e stagger 50ms, partindo de escala `.95` com opacidade. Não aplicar pinning abaixo de 900px. Não aplicar deslocamentos com movimento reduzido.

## Implementação

1. Separar hero, cenas, layout, experiências e dados em módulos TypeScript.
2. Usar refs no progresso do ScrollTrigger e cursor; `useFrame` somente para transformações 3D e câmera.
3. Pausar renderização fora da área visível e carregar perto da viewport.
4. Dispor quatro objetos menores nas telas estreitas. Preservar o scroll vertical no canvas.
5. Implementar foco do menu, Escape, hover por capacidade e áreas seguras.

## Limites

Não alterar projetos, contatos ou atribuições de autoria. Não importar assets da referência. Sem temporizadores para resultados empresariais reais: fluxos e respostas são simulações identificadas.

## Verificação

`npm run typecheck`, `npm run lint`, `npm run test:unit`, `npm test` e `npm run build`. Conferir capturas de hero e serviços em 1440, 768 e 390px. Testar scroll 0→300px e retorno; movimento reduzido deve remover pinning. Conferir sem WebGL e com teclado. Hardware móvel real segue necessário para avaliar GPU, áreas seguras e toque físico.
