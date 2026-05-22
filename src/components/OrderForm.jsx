import { useState, useEffect } from 'react'
import './OrderForm.css'

// ── WhatsApp number ──────────────────────────────────────────────
// Cambiá esto por tu número real (solo dígitos, con código de país)
const WA_NUMBER = '56964012919'

// ── Rank data by game ────────────────────────────────────────────
const RANKS = {
  Valorant: [
    'Hierro 1', 'Hierro 2', 'Hierro 3',
    'Bronce 1', 'Bronce 2', 'Bronce 3',
    'Plata 1',  'Plata 2',  'Plata 3',
    'Oro 1',    'Oro 2',    'Oro 3',
    'Platino 1','Platino 2','Platino 3',
    'Diamante 1','Diamante 2','Diamante 3',
    'Ascendente 1','Ascendente 2','Ascendente 3',
    'Inmortal 1','Inmortal 2','Inmortal 3',
    'Radiante',
  ],
  CS2: [
    'Silver I', 'Silver II', 'Silver III', 'Silver IV',
    'Silver Elite', 'Silver Elite Master',
    'Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master',
    'Master Guardian I', 'Master Guardian II',
    'Master Guardian Elite', 'Distinguished Master Guardian',
    'Legendary Eagle', 'Legendary Eagle Master',
    'Supreme Master First Class', 'Global Elite',
  ],
  'Marvel Rivals': [
    'Bronce III', 'Bronce II', 'Bronce I',
    'Plata III',  'Plata II',  'Plata I',
    'Oro III',    'Oro II',    'Oro I',
    'Platino III','Platino II','Platino I',
    'Diamante III','Diamante II','Diamante I',
    'Grandmaster III','Grandmaster II','Grandmaster I',
    'Celestial III','Celestial II','Celestial I',
    'Eternity', 'One Above All',
  ],
}

const SERVICES = {
  Valorant:        ['Elo Boost', 'Win Boost', 'Placement Matches', 'Duo Boost'],
  CS2:             ['Elo Boost', 'Win Boost', 'Placement Matches'],
  'Marvel Rivals': ['Elo Boost', 'Win Boost', 'Placement Matches'],
}

const REGIONS = {
  Valorant:        ['LATAM', 'Brasil'],
  CS2:             ['LATAM', 'Brasil'],
  'Marvel Rivals': ['LATAM', 'Brasil'],
}

const GAMES = ['Valorant']

const WIN_OPTIONS = ['1', '2', '3', '5', '7', '10', '15', '20', '30', '50']
const PLACEMENT_OPTIONS = ['1', '2', '3', '5', '10', '20']

function Field({ label, required, children }) {
  return (
    <div className="form-field">
      <label className="field-label">
        {label}
        {required && <span className="required-dot">*</span>}
      </label>
      {children}
    </div>
  )
}

function Select({ value, onChange, options, placeholder, disabled }) {
  return (
    <div className={`select-wrap${disabled ? ' disabled' : ''}`}>
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled}>
        <option value="">{placeholder}</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="select-arrow" aria-hidden="true">▾</span>
    </div>
  )
}

export default function OrderForm() {
  const [form, setForm] = useState({
    game:       '',
    service:    '',
    region:     '',
    currentRank:'',
    desiredRank:'',
    quantity:   '',
    note:       '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')

  // Reset dependent fields when game changes
  useEffect(() => {
    setForm(f => ({ ...f, service: '', region: '', currentRank: '', desiredRank: '', quantity: '' }))
  }, [form.game])

  // Reset rank / quantity when service changes
  useEffect(() => {
    setForm(f => ({ ...f, currentRank: '', desiredRank: '', quantity: '' }))
  }, [form.service])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const isEloBoost      = form.service === 'Elo Boost'    || form.service === 'Duo Boost'
  const isWinBoost      = form.service === 'Win Boost'
  const isPlacement     = form.service === 'Placement Matches'

  const validate = () => {
    if (!form.game)    return 'Selecciona el juego.'
    if (!form.service) return 'Selecciona el servicio.'
    if (!form.region)  return 'Selecciona la región.'
    if (isEloBoost && !form.currentRank) return 'Selecciona tu rango actual.'
    if (isEloBoost && !form.desiredRank) return 'Selecciona el rango deseado.'
    if ((isWinBoost || isPlacement) && !form.quantity) return 'Selecciona la cantidad.'
    return ''
  }

  const buildMessage = () => {
    const lines = [
      `🎮 *Juego:* ${form.game}`,
      `⚡ *Servicio:* ${form.service}`,
      `🌍 *Región:* ${form.region}`,
    ]
    if (isEloBoost) {
      lines.push(`📊 *Rango actual:* ${form.currentRank}`)
      lines.push(`🏆 *Rango deseado:* ${form.desiredRank}`)
    }
    if (isWinBoost)   lines.push(`🏅 *Victorias:* ${form.quantity}`)
    if (isPlacement)  lines.push(`📋 *Partidas:* ${form.quantity}`)
    if (form.note)    lines.push(`📝 *Nota:* ${form.note}`)
    lines.push(`\n¡Hola! Me interesa este servicio. ¿Podrían confirmarme precio y disponibilidad?`)
    return lines.join('\n')
  }

  const handleSubmit = e => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    const msg = buildMessage()
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    setSubmitted(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleReset = () => {
    setSubmitted(false)
    setForm({ game: '', service: '', region: '', currentRank: '', desiredRank: '', quantity: '', note: '' })
  }

  const ranks      = form.game ? RANKS[form.game]    : []
  const services   = form.game ? SERVICES[form.game] : []
  const regions    = form.game ? REGIONS[form.game]  : []

  // Filter desired rank to only show higher ranks than current
  const currentIdx   = ranks.indexOf(form.currentRank)
  const desiredRanks = currentIdx >= 0 ? ranks.slice(currentIdx + 1) : ranks

  return (
    <section className="section order-section" id="order">
      <div className="container">
        {/* Header */}
        <div className="order-header">
          <span className="section-label">Pide tu boost</span>
          <h2 className="section-title">Crea tu pedido<br /><span>en segundos</span></h2>
          <div className="divider-line" />
          <p className="section-sub">
            Completa el formulario y te contactamos por WhatsApp al instante con el precio exacto.
          </p>
        </div>

        <div className="order-layout">
          {/* ── FORM ── */}
          <div className="form-wrapper">
            {submitted ? (
              <div className="success-panel">
                <div className="success-icon">🟢</div>
                <h3>¡Pedido enviado!</h3>
                <p>
                  Se abrió WhatsApp con todos los detalles. Si no se abrió automáticamente,
                  presiona el botón a continuación.
                </p>
                <button className="btn btn-teal"
                        onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMessage())}`, '_blank', 'noopener,noreferrer')}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Abrir WhatsApp
                </button>
                <button className="btn btn-outline reset-btn" onClick={handleReset}>
                  Hacer otro pedido
                </button>
              </div>
            ) : (
              <form className="order-form" onSubmit={handleSubmit} noValidate>
                {/* Row 1: Game */}
                <Field label="Juego" required>
                  <Select
                    value={form.game}
                    onChange={v => set('game', v)}
                    options={GAMES}
                    placeholder="Selecciona el juego"
                  />
                </Field>

                {/* Row 2: Service + Region */}
                <div className="form-row">
                  <Field label="Servicio" required>
                    <Select
                      value={form.service}
                      onChange={v => set('service', v)}
                      options={services}
                      placeholder="Tipo de boost"
                      disabled={!form.game}
                    />
                  </Field>
                  <Field label="Región / Servidor" required>
                    <Select
                      value={form.region}
                      onChange={v => set('region', v)}
                      options={regions}
                      placeholder="Tu región"
                      disabled={!form.game}
                    />
                  </Field>
                </div>

                {/* Elo / Duo Boost — rank selectors */}
                {isEloBoost && (
                  <div className="form-row rank-row">
                    <Field label="Rango actual" required>
                      <Select
                        value={form.currentRank}
                        onChange={v => set('currentRank', v)}
                        options={ranks}
                        placeholder="Rango en el que estás"
                        disabled={!form.service}
                      />
                    </Field>
                    <div className="rank-arrow" aria-hidden="true">→</div>
                    <Field label="Rango deseado" required>
                      <Select
                        value={form.desiredRank}
                        onChange={v => set('desiredRank', v)}
                        options={desiredRanks}
                        placeholder="Rango al que deseas llegar"
                        disabled={!form.currentRank}
                      />
                    </Field>
                  </div>
                )}

                {/* Win Boost — quantity */}
                {isWinBoost && (
                  <Field label="Cantidad de victorias" required>
                    <Select
                      value={form.quantity}
                      onChange={v => set('quantity', v)}
                      options={WIN_OPTIONS}
                      placeholder="¿Cuántas victorias?"
                    />
                  </Field>
                )}

                {/* Placement — quantity */}
                {isPlacement && (
                  <Field label="Cantidad de partidas de colocación" required>
                    <Select
                      value={form.quantity}
                      onChange={v => set('quantity', v)}
                      options={PLACEMENT_OPTIONS}
                      placeholder="¿Cuántas partidas?"
                    />
                  </Field>
                )}

                {/* Optional note */}
                <Field label="Nota adicional (opcional)">
                  <textarea
                    className="form-textarea"
                    placeholder="Ej: quiero que usen Jett / quiero offline mode / etc."
                    value={form.note}
                    onChange={e => set('note', e.target.value)}
                    rows={3}
                    maxLength={300}
                  />
                </Field>

                {/* Error */}
                {error && <p className="form-error">{error}</p>}

                {/* Submit */}
                <button type="submit" className="btn btn-teal submit-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Continuar por WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* ── SIDE INFO ── */}
          <aside className="order-aside">
            <div className="aside-card">
              <h4 className="aside-title">¿Por qué elegirnos?</h4>
              <ul className="aside-list">
                {[
                  { icon: '🛡️', text: 'Jugamos en offline para mantener tu privacidad' },
                  { icon: '⚡', text: 'Inicio garantizado en menos de 24 horas' },
                  { icon: '🏆', text: 'Jugadores ex profesionales' },
                  { icon: '💬', text: 'Soporte y novedades 24/7 a través de nuestro discord' },
                ].map(i => (
                  <li key={i.text}>
                    <span className="aside-icon">{i.icon}</span>
                    <span>{i.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aside-card aside-faq">
              <h4 className="aside-title">Preguntas frecuentes</h4>
              <div className="faq-list">
                {[
                  { q: '¿Es seguro?', a: 'Gente confiable y de la escena, nos dedicamos a boostear hace 1 año.' },
                  { q: '¿Cuánto tarda?', a: 'Depende del rango y nuestra demanda, tratamos de tenerlo terminado en 3 dias maximo.' },
                  { q: '¿Cómo pago?', a: 'Transferencia bancaria, MercadoPago, cripto y otros métodos disponibles.' },
                ].map(faq => (
                  <div key={faq.q} className="faq-item">
                    <span className="faq-q">{faq.q}</span>
                    <span className="faq-a">{faq.a}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
