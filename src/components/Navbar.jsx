import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Inicio',       href: '#hero' },
  { label: 'Juegos',       href: '#games' },
  { label: 'Servicios',    href: '#services' },
  { label: 'Cómo funciona',href: '#how' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Logo */}
        <a href="#hero" className="navbar-logo" onClick={e => handleLink(e, '#hero')}>
          <span className="logo-text"><span>N</span> Boosting</span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar-nav">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav-link"
               onClick={e => handleLink(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#order" className="btn btn-primary navbar-cta"
           onClick={e => handleLink(e, '#order')}>
          Pedir boost
        </a>

        {/* Hamburger */}
        <button className={`hamburger${menuOpen ? ' open' : ''}`}
                aria-label="Menú"
                onClick={() => setMenuOpen(p => !p)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} className="mobile-link"
             onClick={e => handleLink(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a href="#order" className="btn btn-primary mobile-cta"
           onClick={e => handleLink(e, '#order')}>
          Pedir boost
        </a>
      </div>
    </header>
  )
}
