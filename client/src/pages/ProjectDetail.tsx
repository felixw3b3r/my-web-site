import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Project } from "../types";
import { fetchProject, fetchProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import ProjectSlider from "../components/ProjectSlider";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    fetchProject(id)
      .then((p) => {
        setProject(p);
        return fetchProjects(p.category);
      })
      .then((all) => all.filter((p) => p.id !== id).slice(0, 3))
      .then(setRelated)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p style={{ color: "var(--text-muted)" }}>Yükleniyor...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <section className="error-section section">
        <div className="container">
          <div className="error-content">
            <div className="error-code">404</div>
            <h1 className="error-title">Proje Bulunamadı</h1>
            <p className="error-desc">Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
            <Link to="/projects" className="btn btn-primary">
              <i className="fas fa-arrow-left"></i> Projelere Dön
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Debug screenshots and fallback
  const screenshots = project.screenshots && project.screenshots.length > 0 
    ? project.screenshots 
    : (project.id === "archer-app" ? [
        "/images/archer/Screenshot_2026-05-18-19-27-55-943_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-19-28-03-382_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-19-29-19-041_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-20-17-41-062_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-20-17-42-746_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-20-17-48-606_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-20-18-03-635_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-20-18-13-454_com.zoomy.archerpro.jpg",
        "/images/archer/Screenshot_2026-05-18-20-18-16-296_com.zoomy.archerpro.jpg"
      ] : []);
      
  const hasSlider = screenshots.length > 0;

  return (
    <section className="project-detail section">
      <div className="container">
        <Link to="/projects" className="back-link">
          <i className="fas fa-arrow-left"></i> Projelere Dön
        </Link>

        {/* Header */}
        <div className="detail-header animate-in">
          <span className="project-category">{project.category}</span>
          <h1>{project.title}</h1>
          <p className="detail-desc">{project.longDescription}</p>
        </div>

        {/* Premium Photo Slider & Features Side-by-Side */}
        <div className="side-by-side-layout animate-in">
          {/* Features Left */}
          <div className="detail-section features-side">
            <h3><i className="fas fa-star"></i> Özellikler</h3>
            <ul className="feature-list">
              {project.features.map((f, i) => (
                <li key={i}><i className="fas fa-check-circle"></i> {f}</li>
              ))}
            </ul>
          </div>

          {/* Slider Right */}
          {hasSlider && (
            <div className="slider-side">
              <ProjectSlider images={screenshots} title={project.title} />
            </div>
          )}
        </div>

        {/* Technologies Section */}
        <div className="detail-content animate-in">
          <div className="detail-section">
            <h3><i className="fas fa-cogs"></i> Kullanılan Teknolojiler</h3>
            <div className="project-tech">
              {project.technologies.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .side-by-side-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: stretch;
            margin-bottom: 60px;
            margin-top: 40px;
          }
          
          .features-side {
            background: rgba(255, 255, 255, 0.02);
            padding: 30px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .slider-side {
            width: 100%;
            display: flex;
            align-items: center;
          }

          .detail-content {
            margin-left: 0;
            max-width: 100%;
          }

          @media (max-width: 992px) {
            .side-by-side-layout {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="related-section animate-in">
            <h2>Benzer Projeler</h2>
            <div className="projects-grid">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
