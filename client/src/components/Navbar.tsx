import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const links = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/projects", label: "Projeler" },
    { to: "/about", label: "Hakkımda" },
    { to: "/download", label: "İndir" },
    { to: "/contact", label: "İletişim" },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">Taha</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>
        <button
          className={`nav-toggle${open ? " active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={`nav-link${isActive(l.to) ? " active" : ""}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
