import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../types";
import { fetchProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import Counter from "../components/Counter";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Mobil & Web Geliştirici
            </div>
            <h1 className="hero-title">
              Merhaba, Ben <span className="gradient-text">Taha</span>
            </h1>
            <p className="hero-subtitle">
              Modern, hızlı ve kullanıcı dostu mobil uygulamalar ve web siteleri geliştiriyorum.
              Java ile native Android mobil uygulamalar, modern web teknolojileri ve Express.js ile uçtan uca yazılım çözümleri üretiyorum.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                <i className="fas fa-code"></i> Projelerimi İncele
              </Link>
              <Link to="/download" className="btn btn-secondary">
                <i className="fas fa-download"></i> APK İndir
              </Link>
            </div>
            <div className="hero-stats">
              <Counter target={2} label="Tamamlanan Proje" />
              <Counter target={1000} label="İndirme" suffix="+" />
              <Counter target={2} label="Yıllık Deneyim" suffix="+" />
            </div>
          </div>
          <div className="hero-visual">
            <div className="code-block techstack-block">
              <div className="code-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="code-header-title">Tech Stack</span>
              </div>
              <div className="techstack-scroll">
                <div className="techstack-list">
                  <div className="techstack-item" style={{ '--i': 0 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fab fa-android"></i></span>
                    <span className="techstack-name">Android</span>
                    <span className="techstack-level">Native</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 1 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fab fa-java"></i></span>
                    <span className="techstack-name">Java</span>
                    <span className="techstack-level">Advanced</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 2 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fab fa-js"></i></span>
                    <span className="techstack-name">JavaScript</span>
                    <span className="techstack-level">Intermediate</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 3 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fab fa-node-js"></i></span>
                    <span className="techstack-name">Node.js</span>
                    <span className="techstack-level">Backend</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 4 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fas fa-database"></i></span>
                    <span className="techstack-name">MongoDB</span>
                    <span className="techstack-level">Database</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 5 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fas fa-code-branch"></i></span>
                    <span className="techstack-name">Express.js</span>
                    <span className="techstack-level">Backend</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 6 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fas fa-paint-brush"></i></span>
                    <span className="techstack-name">UI/UX</span>
                    <span className="techstack-level">Design</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 7 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fas fa-cloud"></i></span>
                    <span className="techstack-name">API</span>
                    <span className="techstack-level">Integration</span>
                  </div>
                  <div className="techstack-item" style={{ '--i': 8 } as React.CSSProperties}>
                    <span className="techstack-icon"><i className="fab fa-git-alt"></i></span>
                    <span className="techstack-name">Git</span>
                    <span className="techstack-level">VCS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Öne Çıkan <span className="gradient-text">Projeler</span>
            </h2>
            <p className="section-desc">Son geliştirdiğim mobil ve web projelerinden bazıları</p>
          </div>
          <div className="projects-grid">
            {projects.slice(0, 3).map((p, i) => (
              <div key={p.id} className={`animate-in${i > 0 ? `-d${i}` : ""}`}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/projects" className="btn btn-outline">
              Tüm Projeleri Gör <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Yetenekler & <span className="gradient-text">Teknolojiler</span>
            </h2>
            <p className="section-desc">Kullandığım teknolojiler ve araçlar</p>
          </div>
          <div className="skills-grid">
            {[
              { icon: "fab fa-android", title: "Android", desc: "Java ile native uygulama geliştirme" },
              { icon: "fas fa-database", title: "Veritabanı", desc: "MongoDB, Firebase" },
              { icon: "fas fa-cloud", title: "Backend", desc: "Node.js, Express.js" },
              { icon: "fas fa-paint-brush", title: "UI/UX", desc: "Material Design, Modern arayüz tasarımı" },
            ].map((s, i) => (
              <div key={s.title} className={`skill-card animate-in-d${i}`}>
                <div className="skill-icon"><i className={s.icon}></i></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h2>Uygulamaları Hemen İndir</h2>
              <p>Tüm projelerimin APK dosyalarına erişmek için indirme sayfasını ziyaret edin.</p>
              <Link to="/download" className="btn btn-primary btn-lg">
                <i className="fas fa-download"></i> APK İndir
              </Link>
            </div>
            <div className="cta-visual">
              <i className="fas fa-rocket"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
