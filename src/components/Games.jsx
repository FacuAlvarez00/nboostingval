import './Games.css'

const games = [
  {
    id: 'valorant',
    name: 'Valorant',
    color: '#FF4655',
    desc: 'El FPS táctico más competitivo del momento. Sube desde Iron hasta Radiante con nuestros boosters profesionales.',
    image: 'https://www.riotgames.com/darkroom/900/907ad200ce2591f4a142ec00cd875d89:d1186f97ea7fe19ae99ebb897e4f1222/val-homepage-productcard-v26a2.png',
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
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/library_hero.jpg',
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
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2767030/library_hero.jpg',
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
              style={{
                '--card-color': g.color,
                '--card-border': g.border,
                backgroundImage: `url(${g.image})`,
              }}
            >
              <div className="game-card-content">
                <h3 className="game-name">{g.name}</h3>
                <p className="game-desc">{g.desc}</p>

                <div className="game-modes">
                  {g.modes.map(m => (
                    <span key={m} className="game-mode">{m}</span>
                  ))}
                </div>

                <button className="btn btn-primary game-btn" onClick={scrollToOrder}
                        style={{ background: g.color }}>
                  Pedir ahora
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
