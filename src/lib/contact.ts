export interface Brief {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
}
export function buildBrief(brief: Brief) {
  return `Nome: ${brief.name.trim()}\nE-mail: ${brief.email.trim()}\nEmpresa: ${brief.company.trim() || "Não informada"}\nServiço: ${brief.service}\n\n${brief.description.trim()}`;
}
export function emailLink(email: string, brief: string) {
  return `mailto:${email}?subject=${encodeURIComponent("Novo projeto — Orbit")}&body=${encodeURIComponent(brief)}`;
}
