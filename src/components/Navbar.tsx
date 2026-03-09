import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/stay', label: 'Stay' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const visible = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-cream/95 backdrop-blur-sm border-b border-border ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <nav className="max-w-screen-xl mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Nawa House">
            <img
              src="/logo-dark.png"
              alt="Nawá House"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-fg transition-all duration-300 ${
                menuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'
              }`}
            />
            <span
              className={`block h-px bg-fg transition-all duration-300 ${
                menuOpen ? 'w-0 opacity-0' : 'w-3'
              }`}
            />
            <span
              className={`block h-px bg-fg transition-all duration-300 ${
                menuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-opacity duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center h-full px-10 pb-16">
          
          <nav className="flex flex-col gap-8">
            {links.map(({ to, label }, i) => (
              <Link
                key={to}
                to={to}
                className="font-display text-5xl font-light text-fg hover:text-accent transition-colors duration-300"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-16 pt-8 border-t border-border">
            <p className="font-ui text-[10px] tracking-widest2 uppercase text-muted">
              Feel free to reach out to us on Instagram @nawasiargao
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
