import { Link } from "react-router-dom";

export default function Footer() {
  const categories = [
    { label: "Eğlence", cat: "entertainment" },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">Taha</span>
              <span className="logo-bracket">/&gt;</span>
            </Link>
            <p>
              Mobil & web uygulama geliştirme ve yazılım çözümleriyle hayalinizdeki
              projeleri gerçeğe dönüştürüyorum.
            </p>
          </div>
          <div className="footer-col">
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><Link to="/">Ana Sayfa</Link></li>
              <li><Link to="/projects">Projeler</Link></li>
              <li><Link to="/about">Hakkımda</Link></li>
              <li><Link to="/download">İndir</Link></li>
              <li><Link to="/contact">İletişim</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kategoriler</h4>
            <ul>
              {categories.map((c) => (
                <li key={c.cat}>
                  <Link to={`/projects?category=${c.cat}`}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>İletişim</h4>
            <ul className="contact-info">
              <li><i className="fas fa-envelope"></i> felixweber190699@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Taha. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
