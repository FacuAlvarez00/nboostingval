import './Services.css'

const services = [
  {
    icon: '🚀',
    title: 'Elo Boost',
    desc: 'Jugamos en tu cuenta desde tu rango actual hasta el rango deseado. Rápido y sin interrupciones.',
    highlights: ['Boosters top ranked', 'Agentes a elección', 'Modo offline disponible'],
    popular: true,
  },
  {
    icon: '👥',
    title: 'Duo Boost',
    desc: 'Juega con uno de nuestros boosters en tu cuenta. Aprende, gana y sube sin ceder acceso a tu cuenta.',
    highlights: ['Acompañado por un booster', 'Aprende con un profesional', 'Comunicación constante'],
    popular: false,
  },
   {
    icon: '📋',
    title: 'Placements',
    desc: 'Jugamos hasta ganar las 5 placements para comenzar la temporada de la mejor manera posible.',
    highlights: ['5 Victorias aseguradas', 'Recomendado inicio de temporada'],
    popular: false,
  },
  {
    icon: '🏆',
    title: 'Win Boost',
    desc: 'Compra la cantidad de victorias que necesitas (no son wins seguidas).',
    highlights: ['Mínimo 5 wins', 'Precio por victoria'],
    popular: false,
  },
]

export default function Services() {
  const scrollToOrder = () =>
    document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-header">
          <div>
            <span className="section-label">Servicios</span>
            <h2 className="section-title">Todo lo que<br /><span>necesitas</span></h2>
            <div className="divider-line" />
          </div>
          <p className="section-sub">
            Elige el servicio que mejor se adapta a tu objetivo y presupuesto.
            Todos incluyen garantía de resultado.
          </p>
        </div>

        <div className="services-grid">
          {services.map(s => (
            <div key={s.title} className={`service-card${s.popular ? ' popular' : ''}`}>
              {s.popular && <div className="popular-badge">Más pedido</div>}

              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>

              <ul className="service-highlights">
                {s.highlights.map(h => (
                  <li key={h}>
                    <span className="check-icon">✓</span>
                    {h}
                  </li>
                ))}
              </ul>

              <button className={`btn ${s.popular ? 'btn-primary' : 'btn-outline'} service-cta`}
                      onClick={scrollToOrder}>
                Contratar
              </button>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="trust-bar">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>Seguro y anonimo</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">⚡</span>
            <span>Inicio en menos de 24 horas</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">🛡️</span>
            <span>Boost 100% garantizado</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">💬</span>
            <span>Soporte 24/7 por Discord</span>
          </div>
        </div>
      </div>
    </section>
  )
}
