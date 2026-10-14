# Orbit — Soluções digitais inteligentes

Website institucional de uma startup de tecnologia, com marca provisória configurável, cena 3D original e experiências interativas. Desenvolvido por **Gean Carlos** — [GitHub](https://github.com/EuGeanCarlos).

## Demonstração

[Website no GitHub Pages](https://eugeancarlos.github.io/orbit-tech/). A publicação depende da conclusão do workflow `Verificar e publicar no GitHub Pages`.

## Tecnologias

React 19, TypeScript, Vite, CSS com variáveis, Three.js, React Three Fiber e Lucide. ESLint e Prettier para manutenção; Playwright para verificação funcional e capturas em 1440, 768 e 390 pixels. Sem backend obrigatório.

## Experiência

- Núcleo 3D geométrico original com iluminação, órbitas e reação ao cursor; carregamento separado e fallback visual para falhas de WebGL.
- Serviços, automação, inteligência artificial, processo, projetos, diferenciais, sobre, FAQ e contato.
- Fluxo de automação executável, assistente com perguntas predefinidas e dashboard com períodos alternáveis. Todas as demonstrações são locais; os números são fictícios.
- Navegação móvel, indicação de seção, foco visível, link de salto, HTML semântico e respeito a movimento reduzido.
- Identidade SVG original, metadados sociais, favicon, robots e sitemap.

## Instalação e execução

Requer Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

| Script | Função |
| --- | --- |
| `npm run dev` | Servidor local |
| `npm run build` | TypeScript e build em `dist` |
| `npm run preview` | Prévia de produção |
| `npm run lint` | Análise estática |
| `npm run format` | Formatação do código |
| `npm test` | Testes Playwright |

Para testes locais, instale o navegador com `npx playwright install chromium`. As capturas são gravadas em `test-results` e não são versionadas.

## Estrutura

```text
src/
  components/   Cena 3D, demonstrações e contato
  config/       Marca, contatos e projetos
  App.tsx       Seções e navegação
  styles.css    Design system e responsividade
public/         Identidade, metadados e SEO
tests/          Verificação funcional e visual
.github/workflows/  Verificação e deploy
```

## Configurações comerciais

Edite `src/config/site.ts`: nome, e-mail, número de WhatsApp (somente dígitos incluindo código do país), endpoint HTTPS de formulário e projetos.

Sem contato configurado, o formulário **prepara um briefing copiável** e direciona ao perfil público do responsável. Não informa envio bem-sucedido. Com e-mail, solicita a abertura do aplicativo de e-mail, onde o visitante deve confirmar o envio. Com endpoint, envia `FormData` por POST e só confirma após resposta HTTP de sucesso. O serviço precisa aceitar CORS e oferecer suas próprias proteções contra abuso. Nunca coloque tokens privados no frontend.

O EnergIA SLZ é identificado como projeto autoral; os demais projetos são conceitos demonstrativos locais. Não há clientes, depoimentos ou resultados comerciais inventados. A marca Orbit é provisória e não representa validação jurídica da disponibilidade do nome.

## Deploy

O workflow verifica lint, tipos, build e testes antes de publicar. Ative **Settings → Pages → Source → GitHub Actions**. Cada push em `main` publica automaticamente. O Vite deriva o caminho base do nome do repositório no GitHub Actions. O sitemap e as URLs de compartilhamento devem ser atualizados se mudar o repositório ou domínio; canonical deve ser definido quando o endereço definitivo estiver aprovado.

Não são necessários segredos para o deploy do Pages. Fontes usam Google Fonts com fallback local do sistema; a cena 3D não depende de serviços externos. A imagem social SVG está incluída; plataformas que não aceitam SVG podem exigir conversão para PNG antes de uma campanha.

## Design

Referência conceitual: [Spline](https://spline.design/), pela integração de 3D e experiências de produto. A identidade, geometria, interfaces e código desta implementação são originais. Tipografia Manrope e Space Grotesk; base escura, lavanda, iluminação ciano e materiais discretos.
