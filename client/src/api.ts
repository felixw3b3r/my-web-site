import type { Project } from "./types";

const API_BASE = "/api";

export async function fetchProjects(category?: string): Promise<Project[]> {
  const url = category
    ? `${API_BASE}/projects?category=${category}`
    : `${API_BASE}/projects`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Projeler yüklenemedi");
  return res.json();
}

export async function fetchProject(id: string): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`);
  if (!res.ok) throw new Error("Proje bulunamadı");
  return res.json();
}
