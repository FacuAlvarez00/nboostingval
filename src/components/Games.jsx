import './Games.css'

const games = [
  {
    id: 'valorant',
    name: 'Valorant',
    color: '#FF4655',
    desc: 'El FPS táctico más competitivo del momento. Sube desde Iron hasta Radiante con nuestros boosters profesionales.',
    image: '/images/valorant.png',
    border: 'rgba(255,70,85,0.45)',
    modes: ['Elo Boost', 'Win Boost', 'Placements', 'Duo Boost'],
    active: true,
    featured: true,
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    color: '#F0A500',
    desc: 'El shooter clásico renovado. Mejoramos tu rating Premier y tus rangos competitivos de forma segura.',
    image: '/images/cs2.jpg',
    bgPos: 'center center',
    border: 'rgba(240,165,0,0.3)',
    modes: ['Elo Boost', 'Win Boost', 'Placements'],
    active: false,
    featured: false,
  },
  {
    id: 'marvel',
    name: 'Marvel Rivals',
    color: '#9B59F5',
    desc: 'El hero shooter más épico. Lleva tu cuenta desde Bronze hasta One Above All con los mejores héroes.',
    image: '/images/marvel-rivals.webp',
    bgPos: 'center center',
    border: 'rgba(155,89,245,0.3)',
    modes: ['Elo Boost', 'Win Boost', 'Placements'],
    active: false,
    featured: false,
  },
]

export default function Games() {
  const scrollToOrder = () =>
    document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section games" id="games">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Juegos</span>
          <h2 className="section-title">Todos tus juegos,<br /><span>un solo lugar</span></h2>
          <div className="divider-line" />
          <p className="section-sub">
            Boosters especializados por juego. Conocimiento profundo del meta actual en cada plataforma.
          </p>
        </div>

        <div className="games-grid">
          {games.map(g => (
            <div
              key={g.id}
              className={`game-card${g.featured ? ' featured' : ''}${!g.active ? ' inactive' : ''}`}
              style={{ '--card-color': g.color, '--card-border': g.border }}
            >
              <div
                className="game-card-image"
                style={{ backgroundImage: `url(${g.image})`, backgroundPosition: g.bgPos || 'center top' }}
              >
                {!g.active && <span className="game-badge">Próximamente</span>}
                {g.featured && <span className="game-badge game-badge--active">Disponible</span>}
              </div>

              <div className="game-card-content">
                <div className="game-card-top">
                  <h3 className="game-name" style={{ color: g.active ? g.color : undefined }}>{g.name}</h3>
                  <p className="game-desc">{g.desc}</p>
                </div>

                <div className="game-card-bottom">
                  <div className="game-modes">
                    {g.modes.map(m => (
                      <span key={m} className="game-mode">{m}</span>
                    ))}
                  </div>

                  <button
                    className="btn btn-primary game-btn"
                    onClick={g.active ? scrollToOrder : undefined}
                    style={g.active ? { background: g.color } : undefined}
                  >
                    Pedir ahora
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
