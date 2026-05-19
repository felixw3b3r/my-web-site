import { useEffect, useState } from "react";
import type { Project } from "../types";
import { fetchProjects } from "../api";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <>
      <section className="page-header section">
        <div className="container">
          <h1 className="page-title">Projelerim</h1>
          <p className="page-desc">Geliştirdiğim mobil ve web uygulamalarını keşfedin</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="projects-grid">
            {projects.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-folder-open"></i>
                <p>Bu kategoride henüz proje bulunmuyor.</p>
              </div>
            ) : (
              projects.map((p) => <ProjectCard key={p.id} project={p} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
