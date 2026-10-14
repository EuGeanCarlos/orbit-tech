# Gean Carlos — Portfólio

Portfólio pessoal para compartilhar projetos autorais, estudos e experiências com desenvolvimento de software. Autor: [Gean Carlos](https://github.com/EuGeanCarlos).

[Abrir portfólio](https://eugeancarlos.github.io/orbit-tech/)

## Conteúdo

Apresentação pessoal, projetos, tecnologias e interesses, sobre e conexão pelo GitHub. Cena 3D original com reação ao cursor, carregamento separado, pausa fora da viewport e alternativa visual para falhas de WebGL. Layout responsivo, menu mobile, foco visível, navegação por teclado e movimento reduzido.

Os projetos apresentados são EnergIA SLZ, Calculadora de Collatz e Player de música. Projetos de estudo são identificados; os previews são composições ilustrativas, não screenshots das aplicações. Não há alegações de trabalho comercial contratado.

## Tecnologias

React, TypeScript, Vite, CSS, Three.js, React Three Fiber e Lucide. Verificação com ESLint e Playwright, formatação com Prettier, publicação com GitHub Actions.

## Executar

Requer Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

| Script            | Função                        |
| ----------------- | ----------------------------- |
| `npm run dev`     | Servidor local                |
| `npm run build`   | Tipos e build de produção     |
| `npm run preview` | Prévia de produção            |
| `npm run lint`    | Análise estática              |
| `npm run format`  | Formatação                    |
| `npm test`        | Testes e capturas responsivas |

Para testes: `npx playwright install chromium`. Capturas em 1440, 768 e 390 pixels ficam em `test-results`, sem versionamento. `TEST_PORT` permite escolher outra porta para os testes.

## Organização e configuração

`src/App.tsx` contém as seções; `src/components/Scene.tsx`, a cena; `src/config/site.ts`, o nome, perfil e projetos; `src/styles.css`, o visual. `public` contém favicon, imagem social, robots e sitemap. `tests` contém as verificações. Atualize os metadados e arquivos de SEO caso o endereço seja alterado.

## Publicação

O repositório conserva o nome `orbit-tech`. Cada push em `main` executa lint, build e testes antes de publicar no GitHub Pages. O caminho base de produção deriva do nome do repositório. Nenhum backend ou segredo é necessário. Fontes Google Fonts possuem fallback do sistema; o 3D é local. A imagem social SVG pode exigir conversão para PNG em plataformas de compartilhamento que não a suportem.
