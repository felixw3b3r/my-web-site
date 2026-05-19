import Counter from "../components/Counter";

export default function About() {
  const steps = [
    { num: "01", title: "Analiz & Planlama", desc: "İhtiyaçları belirleme, hedef kitle analizi ve proje planlaması" },
    { num: "02", title: "Tasarım", desc: "Kullanıcı arayüzü ve deneyim tasarımı, prototip oluşturma" },
    { num: "03", title: "Geliştirme", desc: "Modern teknolojilerle temiz ve sürdürülebilir kod yazımı" },
    { num: "04", title: "Test & Yayınlama", desc: "Kalite testleri, optimizasyon ve kullanıma sunma" },
  ];

  return (
    <>
      <section className="page-header section">
        <div className="container">
          <h1 className="page-title">Hakkımda</h1>
          <p className="page-desc">Beni ve çalışmalarımı daha yakından tanıyın</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-image animate-in">
              <div className="about-avatar">
                <i className="fas fa-user-astronaut"></i>
              </div>
            </div>
            <div className="about-content animate-in-d1">
              <h2>Merhaba, Ben <span className="gradient-text">Taha</span></h2>
              <p>
                Mobil ve web uygulama geliştirme konusunda tutkulu bir yazılım geliştiricisiyim.
                Java başta olmak üzere modern teknolojilerle kullanıcı odaklı,
                performanslı ve estetik mobil uygulamalar ile web çözümleri geliştiriyorum.
              </p>
              <p>
                Geliştirdiğim projelerde temiz kod, kullanıcı deneyimi ve performans
                benim için her zaman ön plandadır. Aynı zamanda Node.js ve Express.js
                ile backend çözümleri üreterek full-stack bir perspektifle çalışıyorum.
              </p>
              <div className="about-stats">
                <Counter target={2} label="Tamamlanan Proje" />
                <Counter target={2} label="Yıllık Deneyim" suffix="+" />
                <Counter target={5} label="Geliştirilen Proje" suffix="+" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Çalışma <span className="gradient-text">Sürecim</span></h2>
            <p className="section-desc">Projelerimi hayata geçirirken izlediğim adımlar</p>
          </div>
          <div className="journey-steps">
            {steps.map((s, i) => (
              <div key={s.num} className={`journey-step animate-in${i > 0 ? `-d${i}` : ""}`}>
                <div className="step-number">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
