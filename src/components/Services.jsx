import './Services.css'

const services = [
  {
    icon: '🚀',
    title: 'Elo Boost',
    desc: 'Nuestro booster juega en tu cuenta desde tu rango actual hasta el rango deseado. Rápido y sin interrupciones.',
    highlights: ['Boosters top ranked', 'VPN incluida', 'Modo offline disponible'],
    popular: true,
  },
  {
    icon: '🏆',
    title: 'Win Boost',
    desc: 'Compra la cantidad de victorias que necesitas. Perfecto para salir de rachas negativas o para escalar rápido.',
    highlights: ['Mínimo 1 victoria', 'Precio por victoria', 'Sin límite de cantidad'],
    popular: false,
  },
  {
    icon: '📋',
    title: 'Placements',
    desc: 'Nuestro equipo hace tus partidas de colocación para comenzar la temporada en el rango que mereces.',
    highlights: ['Hasta 20 partidas', 'Máximo winrate posible', 'Recomendado inicio de temporada'],
    popular: false,
  },
  {
    icon: '👥',
    title: 'Duo Boost',
    desc: 'Juega con uno de nuestros boosters en tu cuenta. Aprende, gana y sube sin ceder acceso a tu cuenta.',
    highlights: ['Tu cuenta segura', 'Aprende con el booster', 'Comunicación por Discord'],
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
            <span>100% Seguro</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">⚡</span>
            <span>Inicio en &lt;1 hora</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">🛡️</span>
            <span>Garantía de resultado</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-icon">💬</span>
            <span>Soporte 24/7 por WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  )
}
