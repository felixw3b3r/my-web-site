import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../types";
import { fetchProjects } from "../api";

export default function Download() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data.filter((p) => p.id === "archer-app"));
    }).catch(() => {});
  }, []);

  return (
    <>
      <section className="page-header section">
        <div className="container">
          <h1 className="page-title">
            APK <span className="gradient-text">İndir</span>
          </h1>
          <p className="page-desc">Tüm projelerimin APK dosyalarını buradan indirebilirsiniz</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="download-intro">
            <div className="warning-box">
              <i className="fas fa-shield-alt"></i>
              <div>
                <h3>Güvenli İndirme</h3>
                <p>
                  Tüm APK dosyaları güvenlik taramasından geçirilmiştir. Yine de
                  bilinmeyen kaynaklardan uygulama yüklerken dikkatli olmanızı öneririz.
                </p>
              </div>
            </div>
          </div>
          <div className="download-list">
            {projects.map((p) => (
              <div key={p.id} className="download-item">
                <div className="download-item-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="download-item-info">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="download-item-meta">
                    <span><i className="fas fa-tag"></i> v{p.version}</span>
                    <span><i className="fas fa-file"></i> {p.size}</span>
                    <span><i className="fas fa-calendar"></i> {p.date}</span>
                    <span className="tech-tag">{p.category}</span>
                  </div>
                </div>
                <div className="download-item-action">
                  <a 
                    href={`/api/projects/${p.id}/download`} 
                    className="btn btn-primary" 
                    download
                  >
                    <i className="fas fa-download"></i> İndir
                  </a>
                  <Link to={`/projects/${p.id}`} className="btn btn-link">
                    Detay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
