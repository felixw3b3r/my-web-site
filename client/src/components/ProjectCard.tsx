import { Link } from "react-router-dom";
import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-card-image">
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-card-img" />
        ) : (
          <div className="project-placeholder">
            <i className="fas fa-mobile-alt"></i>
          </div>
        )}
      </div>
      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.technologies.slice(0, 3).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
        <div className="project-meta">
          <span><i className="fas fa-tag"></i> v{project.version}</span>
          <span><i className="fas fa-calendar"></i> {project.date}</span>
        </div>
      </div>
    </Link>
  );
}
