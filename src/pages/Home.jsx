import { Link } from 'react-router-dom'

const SERVICES = [
  { icon: '🔍', title: 'Diagnostic',              desc: 'Identification précise de la panne avec rapport détaillé.' },
  { icon: '🔧', title: 'Réparation & Dépannage',  desc: 'Réparation rapide par nos techniciens certifiés.' },
  { icon: '💾', title: 'Récupération de données', desc: 'Récupération de vos données sur tout support défaillant.' },
  { icon: '🖥️', title: 'Montage & Installation',  desc: 'Assemblage PC, installation logiciels, configuration réseau.' },
  { icon: '🧹', title: 'Nettoyage & Entretien',   desc: 'Nettoyage professionnel et maintenance préventive.' },
  { icon: '📱', title: 'Téléphonie',              desc: 'Réparation smartphones et tablettes toutes marques.' },
]

const WHY_US = [
  { icon: '⚡', title: 'Réparation rapide',     desc: 'Délais respectés, service express disponible.' },
  { icon: '🛡️', title: 'Techniciens certifiés', desc: 'Une équipe qualifiée et expérimentée.' },
  { icon: '💰', title: 'Devis gratuit',          desc: 'Diagnostic et devis transparents avant toute intervention.' },
  { icon: '📲', title: 'Suivi en temps réel',    desc: 'Suivez l\'avancement de votre réparation en ligne.' },
]

const BRANDS = ['Apple','Samsung','HP','Dell','Lenovo','Asus','Huawei','Sony']

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="badge-green mb-4 inline-block">
              ✅ Experts en réparation depuis 2015
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight mt-3 mb-5">
              Votre réparation en<br />
              <span className="text-[#3ab54a]">toute confiance</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg mb-8 leading-relaxed">
              Informatique, téléphonie, hi-fi — nos techniciens certifiés diagnostiquent
              et réparent vos appareils avec rapidité et transparence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link to="/demande" className="btn-green text-base px-8 py-3.5">
                Déposer un appareil →
              </Link>
              <Link to="/suivi" className="btn-outline-green text-base px-8 py-3.5">
                Suivre ma réparation
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="flex-shrink-0 w-full md:w-80">
            <div className="bg-[#f5f5f5] rounded-xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 gap-6">
                {[['500+','Réparations / mois'],['98%','Clients satisfaits'],['24h','Délai moyen']].map(([n,l]) => (
                  <div key={l} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3ab54a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-extrabold text-sm">{n}</span>
                    </div>
                    <p className="text-[#1a1a1a] font-medium text-sm">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-gray-200">
                <Link to="/demande" className="block btn-green text-center text-sm py-3">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section bg-[#f5f5f5]">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="badge-green mb-3 inline-block">Nos prestations</span>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mt-2 mb-3">Nos services de réparation</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Une gamme complète de services pour tous vos besoins en réparation électronique.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <div key={s.title} className="card group cursor-default">
                <div className="w-12 h-12 bg-[#e8f5eb] rounded-lg flex items-center justify-center text-2xl mb-4">
                  {s.icon}
                </div>
                <h3 className="text-[#1a1a1a] font-bold text-base mb-2 group-hover:text-[#3ab54a] transition">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="badge-green mb-3 inline-block">Pourquoi nous ?</span>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mt-2 mb-3">Pourquoi choisir Wiki Repair ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              La promesse d'un service professionnel, rapide et transparent.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map(w => (
              <div key={w.title} className="card text-center group">
                <div className="w-14 h-14 bg-[#e8f5eb] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {w.icon}
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-2 group-hover:text-[#3ab54a] transition text-sm">{w.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Suivi CTA ── */}
      <section className="bg-[#3ab54a]">
        <div className="container-main px-4 py-14 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Suivez votre réparation</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto text-sm">
            Entrez votre numéro de ticket pour voir en temps réel où en est votre appareil.
          </p>
          <Link to="/suivi"
            className="bg-white text-[#3ab54a] font-bold text-base px-10 py-3.5 rounded-md hover:bg-gray-100 transition inline-block">
            Accéder au suivi →
          </Link>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="section bg-[#f5f5f5]">
        <div className="container-main text-center">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-8">
            Marques réparées
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {BRANDS.map(b => (
              <span key={b}
                className="bg-white border border-gray-200 text-gray-600 font-semibold text-sm px-5 py-2.5 rounded-md hover:border-[#3ab54a] hover:text-[#3ab54a] transition cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
