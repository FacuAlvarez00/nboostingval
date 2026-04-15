import './Hero.css'

export default function Hero() {
  const scrollTo = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="hero">
      {/* Animated background grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Glow orbs */}
      <div className="orb orb-left"  aria-hidden="true" />
      <div className="orb orb-right" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Servicio activo 24/7
        </div>

        <h1 className="hero-title">
          Sube de rango.<br />
          <span>Sin excusas.</span>
        </h1>

        <p className="hero-sub">
          El servicio de elo boosting más rápido y seguro para
          <strong> Valorant</strong>, CS2 y Marvel Rivals.
          Boosters profesionales, resultados garantizados.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">5,000+</span>
            <span className="stat-label">Pedidos completados</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">98%</span>
            <span className="stat-label">Tasa de éxito</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">24h</span>
            <span className="stat-label">Tiempo promedio</span>
          </div>
        </div>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => scrollTo('#order')}>
            Pedir mi boost
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('#how')}>
            Cómo funciona
          </button>
        </div>

        <div className="hero-games">
          <span className="games-label">Disponible para:</span>
          <div className="games-pills">
            <span className="pill pill-valorant">Valorant</span>
            <span className="pill pill-cs2">CS2</span>
            <span className="pill pill-marvel">Marvel Rivals</span>
          </div>
        </div>
      </div>
    </section>
  )
}
