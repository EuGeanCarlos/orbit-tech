# Validação da atualização

- TypeScript strict: aprovado.
- ESLint: aprovado.
- Build de produção: aprovado. A dependência 3D mantém um chunk grande (aproximadamente 239 kB gzip), carregado separadamente da interface; não é uma medição Lighthouse.
- Vitest: 2 testes aprovados, para composição do briefing e codificação do `mailto`.
- Playwright: 7 testes aprovados. Serviços e filtros; automação e assistente; contato; scroll real e movimento reduzido; fallback sem WebGL; capturas em 1440, 768 e 390px.
- Após afastar formas do título no tablet, sua captura e verificação de largura foram executadas novamente e aprovadas.
- Working tree inicial estava limpo; repositório confirmado como `EuGeanCarlos/orbit-tech`, branch padrão `main` e Pages por workflow.

As capturas ficam em `test-results/hero-*.png`, `services-*.png` e `site-*.png`. O vídeo e os frames de análise ficam somente em `.tools`, ignorado pelo Git. A gravação de terceiros não é distribuída com o site.

Não foram feitos testes físicos em telefone, medição de FPS ou teste com um serviço real de formulário. E-mail, telefone e endpoint não foram informados. A alternativa copiável é funcional e não simula envio.
