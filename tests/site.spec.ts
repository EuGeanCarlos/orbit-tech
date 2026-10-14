import { test, expect } from "@playwright/test";
test("serviços, filtros e demonstrações locais", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "futuro digital",
  );
  await page.getByRole("tab", { name: "02 Sistemas Personalizados" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Sua operação, em perspectiva.",
  );
  await page.getByRole("tab", { name: "04 Inteligência Artificial" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Inteligência com propósito.",
  );
  await page.getByRole("button", { name: "Executar demonstração" }).click();
  await expect(page.locator(".flow-status")).toContainText("Fluxo concluído", {
    timeout: 10000,
  });
  await page
    .getByRole("button", { name: "Como automatizar meu atendimento?" })
    .click();
  await expect(page.locator(".chat-panel")).toContainText(
    "Um assistente pode organizar",
  );
  await page
    .getByRole("button", { name: "Inteligência artificial", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(
    page.getByRole("link", { name: "Repositório Calculadora de Collatz" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/EuGeanCarlos/Appweb_Collatz_Calculator",
  );
  expect(errors).toEqual([]);
});
test("contato valida e prepara briefing sem envio fictício", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Nome", { exact: true }).fill("Pessoa Teste");
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Serviço desejado").selectOption("Automação");
  await page
    .getByLabel("Descrição do projeto")
    .fill("Quero integrar os pedidos da minha loja.");
  await page.getByRole("button", { name: "Preparar solicitação" }).click();
  await expect(page.locator(".form-message")).toContainText(
    "Nenhuma mensagem foi enviada",
  );
  await expect(page.locator(".brief-output")).toContainText("Pessoa Teste");
});
test("scroll real controla a hero e respeita movimento reduzido", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1200);
  const start = await page
    .locator("h1")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(1400);
  const end = await page
    .locator("h1")
    .evaluate((el) => getComputedStyle(el).transform);
  expect(end).not.toBe(start);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.waitForTimeout(700);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
});
test("conteúdo permanece acessível sem WebGL", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".scene-fallback").first()).toBeVisible();
  await page.getByRole("tab", { name: "03 Automação Empresarial" }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Conecte ferramentas.",
  );
  await context.close();
});
for (const width of [1440, 768, 390])
  test(`revisão visual ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1800);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `test-results/hero-${width}.png` });
    if (width === 390) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .getByRole("navigation", { name: "Principal" })
        .getByRole("link", { name: "Serviços" })
        .click();
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toBeVisible();
    }
    await page.locator("#servicos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `test-results/services-${width}.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    for (const id of ["servicos", "solucoes", "projetos", "sobre", "contato"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `test-results/site-${width}.png`,
      fullPage: true,
    });
  });
