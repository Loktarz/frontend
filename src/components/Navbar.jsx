import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useClientAuth } from '../ClientAuthContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { client, logout } = useClientAuth()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  const links = [
    { to: '/',        label: 'Accueil' },
    { to: '/suivi',   label: 'Suivi réparation' },
    { to: '/demande', label: 'Déposer un appareil' },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top green banner */}
      <div className="bg-[#3ab54a] text-white text-xs py-2 text-center font-medium">
        🔧 Service de réparation professionnel — Diagnostic gratuit sur tous vos appareils
      </div>

      {/* Main navbar */}
      <nav className="bg-white shadow-nav border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-0 flex-shrink-0">
            <div className="bg-[#3ab54a] text-white font-extrabold text-lg px-3 py-2 rounded-l-md tracking-wide">
              WIKI
            </div>
            <div className="bg-[#1d6b2e] text-white font-extrabold text-lg px-3 py-2 rounded-r-md tracking-wide">
              Repair
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === l.to
                    ? 'text-[#3ab54a] border-b-2 border-[#3ab54a] pb-0.5'
                    : 'text-[#1a1a1a] hover:text-[#3ab54a]'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {client ? (
              <>
                <Link to="/mon-espace"
                  className={`text-sm font-medium transition-colors ${
                    pathname === '/mon-espace' ? 'text-[#3ab54a]' : 'text-[#1a1a1a] hover:text-[#3ab54a]'
                  }`}>
                  👤 {client.fullName?.split(' ')[0]}
                </Link>
                <button onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-[#3ab54a] border border-gray-300 hover:border-[#3ab54a] px-4 py-1.5 rounded-md transition">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className={`text-sm font-medium transition-colors ${
                    pathname === '/login' ? 'text-[#3ab54a]' : 'text-[#1a1a1a] hover:text-[#3ab54a]'
                  }`}>
                  Connexion
                </Link>
                <Link to="/register"
                  className="btn-green text-sm py-2 px-5">
                  Créer un compte
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-[#1a1a1a]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 space-y-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block py-2.5 text-sm font-medium border-b border-gray-50 transition ${
                  pathname === l.to ? 'text-[#3ab54a]' : 'text-[#1a1a1a] hover:text-[#3ab54a]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {client ? (
              <>
                <Link to="/mon-espace" onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-[#1a1a1a] hover:text-[#3ab54a] transition border-b border-gray-50">
                  👤 Mon espace
                </Link>
                <button onClick={handleLogout}
                  className="block w-full text-left py-2.5 text-sm text-gray-500 hover:text-[#3ab54a] transition">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-[#1a1a1a] hover:text-[#3ab54a] transition border-b border-gray-50">
                  Connexion
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}
                  className="block btn-green text-center text-sm mt-3">
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
