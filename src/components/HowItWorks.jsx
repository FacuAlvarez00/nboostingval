import './HowItWorks.css'

const steps = [
  {
    num: '01',
    icon: '📝',
    title: 'Completa el formulario',
    desc: 'Selecciona el juego, el servicio que deseas y tus rangos actual y deseado. Todo en un formulario simple.',
  },
  {
    num: '02',
    icon: '💬',
    title: 'Contacto por WhatsApp',
    desc: 'Te redirigimos a nuestro WhatsApp con todos los detalles de tu pedido. Confirmamos precio y detalles al instante.',
  },
  {
    num: '03',
    icon: '💳',
    title: 'Confirma el pago',
    desc: 'Acordamos el método de pago más conveniente para ti. Aceptamos múltiples métodos: transferencia, cripto y más.',
  },
  {
    num: '04',
    icon: '🏅',
    title: 'Sube de rango',
    desc: 'Nuestro booster empieza a trabajar en menos de una hora. Sigue el progreso en tiempo real por WhatsApp.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section how-section" id="how">
      <div className="container">
        <div className="how-header">
          <span className="section-label">Proceso</span>
          <h2 className="section-title">Así de <span>simple</span></h2>
          <div className="divider-line" />
          <p className="section-sub">
            En menos de 5 minutos tu pedido estará en camino. Sin registros, sin complicaciones.
          </p>
        </div>

        <div className="steps-wrapper">
          {/* Connecting line */}
          <div className="steps-line" aria-hidden="true" />

          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-num-wrap">
                  <div className="step-circle">
                    <span className="step-icon">{s.icon}</span>
                  </div>
                  <span className="step-num">{s.num}</span>
                </div>
                <div className="step-body">
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA panel */}
        <div className="how-cta-panel">
          <div className="cta-panel-text">
            <h3>¿Listo para subir?</h3>
            <p>Empieza hoy mismo. Tu booster profesional está disponible ahora.</p>
          </div>
          <button className="btn btn-primary"
                  onClick={() => document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' })}>
            Pedir mi boost ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
