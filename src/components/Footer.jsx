import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Top green strip */}
      <div className="bg-[#3ab54a] py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <span>🔧</span>
            <span>Réparation professionnelle — Diagnostic gratuit</span>
          </div>
          <Link to="/demande" className="bg-white text-[#3ab54a] font-bold text-sm px-5 py-2 rounded-md hover:bg-gray-100 transition">
            Déposer un appareil →
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-0 mb-4">
              <div className="bg-[#3ab54a] text-white font-extrabold text-base px-3 py-2 rounded-l-md">WIKI</div>
              <div className="bg-[#1d6b2e] text-white font-extrabold text-base px-3 py-2 rounded-r-md">Repair</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre expert en réparation informatique, téléphonie et hi-fi en Tunisie.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-[#3ab54a] mb-4 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/demande" className="hover:text-[#3ab54a] transition">Dépôt de réparation</Link></li>
              <li><Link to="/suivi" className="hover:text-[#3ab54a] transition">Suivi de ticket</Link></li>
              <li className="hover:text-[#3ab54a] transition cursor-default">Diagnostic gratuit</li>
              <li className="hover:text-[#3ab54a] transition cursor-default">Récupération de données</li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-[#3ab54a] mb-4 text-sm uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-[#3ab54a] transition">Accueil</Link></li>
              <li><Link to="/login" className="hover:text-[#3ab54a] transition">Connexion</Link></li>
              <li><Link to="/register" className="hover:text-[#3ab54a] transition">Créer un compte</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#3ab54a] mb-4 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span> Tunis, Tunisie
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📞</span> +216 XX XXX XXX
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✉️</span> contact@wikirepair.tn
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">🕐</span> Lun–Sam : 8h – 18h
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Wiki Repair. Tous droits réservés.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>Réparation rapide</span>
            <span>·</span>
            <span>Diagnostic précis</span>
            <span>·</span>
            <span>Service fiable</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
