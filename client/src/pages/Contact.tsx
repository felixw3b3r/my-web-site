export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajınız alınmıştır. En kısa sürede dönüş yapacağım.");
  };

  return (
    <>
      <section className="page-header section">
        <div className="container">
          <h1 className="page-title">İletişim</h1>
          <p className="page-desc">Projelerinizi birlikte hayata geçirelim</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="coming-soon-card animate-in" style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "80px 40px",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div className="coming-soon-glow" style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)",
              pointerEvents: "none"
            }} />
            <div className="coming-soon-icon" style={{
              fontSize: "64px",
              marginBottom: "24px",
              background: "linear-gradient(135deg, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}>
              <i className="fas fa-hourglass-half animate-pulse"></i>
            </div>
            <h2 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "16px", color: "var(--text)", letterSpacing: "-0.5px" }}>
              Çok Yakında
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "16px", lineHeight: "1.6", marginBottom: "32px", maxWidth: "460px", margin: "0 auto 32px" }}>
              İletişim bölümümüz güncelleniyor. Yeni ve etkileşimli özelliklerle çok yakında hizmetinizde olacağız.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
