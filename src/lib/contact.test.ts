import { describe, expect, it } from "vitest";
import { buildBrief, emailLink } from "./contact";
describe("contato estático", () => {
  it("preserva a mensagem e identifica empresa não informada", () => {
    const text = buildBrief({
      name: " Ana ",
      email: " ana@example.com ",
      company: " ",
      service: "Automação",
      description: " Quero integrar pedidos & relatórios. ",
    });
    expect(text).toBe(
      "Nome: Ana\nE-mail: ana@example.com\nEmpresa: Não informada\nServiço: Automação\n\nQuero integrar pedidos & relatórios.",
    );
  });
  it("codifica caracteres sem criar campos extras no mailto", () => {
    const url = emailLink("contato@example.com", "Ideia & teste?\nOlá!");
    expect(url).toContain("mailto:contato@example.com?subject=");
    expect(url).toContain("&body=Ideia%20%26%20teste%3F%0AOl%C3%A1!");
    expect(url.split("&")).toHaveLength(2);
  });
});
