import { test, expect } from "@playwright/test";
test("portfólio pessoal e links dos projetos", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideias, código",
  );
  await expect(page.locator("#sobre")).toContainText("Gean Carlos");
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(
    page.getByRole("link", { name: "Repositório Calculadora de Collatz" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/EuGeanCarlos/Appweb_Collatz_Calculator",
  );
  await expect(
    page.getByRole("link", { name: "Encontrar Gean no GitHub" }),
  ).toHaveAttribute("href", "https://github.com/EuGeanCarlos");
  await expect(page.locator("form")).toHaveCount(0);
  await page.getByRole("link", { name: "Explorar projetos" }).click();
  await expect(page.locator("#projetos")).toBeInViewport();
});
for (const width of [1440, 768, 390])
  test(`layout e captura ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (width === 390) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .getByRole("navigation", { name: "Principal" })
        .getByRole("link", { name: "Projetos" })
        .click();
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toBeVisible();
    }
    for (const element of await page.locator(".reveal").all())
      await element.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(800);
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `test-results/hero-${width}.png` });
  });
test("teclado e movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeInViewport();
});
