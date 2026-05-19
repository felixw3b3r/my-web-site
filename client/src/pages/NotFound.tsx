import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="error-section section">
      <div className="container">
        <div className="error-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Sayfa Bulunamadı</h1>
          <p className="error-desc">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-home"></i> Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </section>
  );
}
