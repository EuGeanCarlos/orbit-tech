import { test, expect } from "@playwright/test";
test("demonstrações locais e contato sem envio fictício", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "soluções digitais inteligentes",
  );
  await page.getByRole("button", { name: "Executar demonstração" }).click();
  await expect(page.getByRole("status").first()).toContainText(
    "Fluxo concluído",
    { timeout: 10000 },
  );
  await page.getByRole("tab", { name: "Assistente IA" }).click();
  await page
    .getByRole("button", { name: "Como automatizar meu atendimento?" })
    .click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Um assistente pode organizar",
  );
  await page.getByRole("tab", { name: "Dashboard" }).click();
  await page.getByLabel("Período do dashboard").selectOption("Mês");
  await expect(page.getByRole("tabpanel")).toContainText("512");
  await page.getByLabel("Seu nome").fill("Pessoa Teste");
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("O que vamos construir?").selectOption("Website");
  await page
    .getByLabel("Conte um pouco sobre sua ideia")
    .fill("Quero um website para apresentar meus serviços.");
  await page.getByRole("button", { name: "Preparar solicitação" }).click();
  await expect(page.locator(".form-status")).toContainText(
    "O envio ainda não está configurado",
  );
  await expect(page.locator(".brief")).toContainText("Pessoa Teste");
});
for (const width of [1440, 768, 390])
  test(`layout e captura ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
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
    for (const element of await page.locator(".reveal").all()) {
      await element.scrollIntoViewIfNeeded();
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(800);
    await page.screenshot({
      path: `test-results/orbit-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `test-results/hero-${width}.png` });
  });
test("navegação por teclado e movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeInViewport();
  await page
    .getByText("As demonstrações usam inteligência artificial real?")
    .click();
  await expect(page.locator("details[open]")).toContainText(
    "simulações locais",
  );
});
