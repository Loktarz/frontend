import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackTicket, trackByPhone } from '../api'
import PhaseTracker from '../components/PhaseTracker'

function TicketResult({ result }) {
  const phaseClass =
    result.phase === 'LIVRE'      ? 'bg-green-100 text-green-700' :
    result.phase === 'IMPOSSIBLE' ? 'bg-red-100 text-red-700'     :
    result.phase === 'PRET'       ? 'bg-[#e8f5eb] text-[#1d6b2e]'  : 'bg-[#e8f5eb] text-[#1d6b2e]'
  return (
    <>
      <div className="bg-white rounded-lg shadow-card p-6 mb-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Numéro de ticket</p>
          <p className="text-2xl font-mono font-bold text-[#1a1a1a]">{result.ticketNumber}</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${phaseClass}`}>
          {result.phaseLabel}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-card p-6 mb-5">
        <h2 className="text-[#1a1a1a] font-bold mb-6 text-lg">Progression de la réparation</h2>
        <PhaseTracker phase={result.phase} />
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 mb-1">Statut actuel</p>
          <p className="text-[#1d6b2e] font-semibold">{result.statusLabel}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-[#1a1a1a] font-bold mb-4 text-lg">Informations</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            ['Client',   result.clientName],
            ['Appareil', [result.productType, result.brand].filter(Boolean).join(' — ')],
            ['Service',  result.serviceType],
            ['Déposé le', result.createdAt],
            ['Dernière mise à jour', result.updatedAt || '—'],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">{label}</span>
              <span className="text-gray-700 font-medium">{value || '—'}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-400 text-xs mt-4">
        Pour toute question, contactez-nous au <span className="text-[#3ab54a] font-medium">+216 XX XXX XXX</span>
      </p>
    </>
  )
}

export default function Suivi() {
  const { state } = useLocation()
  const [mode, setMode]                 = useState('ticket')
  const [ticketNumber, setTicketNumber] = useState('')
  const [phone, setPhone]               = useState('')
  const [result, setResult]             = useState(null)
  const [results, setResults]           = useState([])
  const [selected, setSelected]         = useState(null)
  const [error, setError]               = useState('')
  const [loading, setLoading]           = useState(false)

  useEffect(() => {
    if (state?.ticketNumber) {
      setTicketNumber(state.ticketNumber)
      doTrackTicket(state.ticketNumber)
    }
  }, [])

  const doTrackTicket = async (num) => {
    setLoading(true); setError(''); setResult(null); setResults([]); setSelected(null)
    try {
      const res = await trackTicket(num.trim().toUpperCase())
      setResult(res.data)
    } catch {
      setError('Aucun ticket trouvé avec ce numéro. Vérifiez et réessayez.')
    } finally { setLoading(false) }
  }

  const handleSearchTicket = (e) => {
    e.preventDefault()
    if (!ticketNumber.trim()) return
    doTrackTicket(ticketNumber)
  }

  const handleSearchPhone = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return
    setLoading(true); setError(''); setResult(null); setResults([]); setSelected(null)
    try {
      const res = await trackByPhone(phone.trim())
      setResults(res.data)
    } catch {
      setError('Aucun ticket trouvé pour ce numéro de téléphone.')
    } finally { setLoading(false) }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1d6b2e] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            Suivi en temps réel
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Suivi de réparation
          </h1>
          <p className="text-white/70 mb-10">
            Entrez votre numéro de ticket pour connaître l'état de votre appareil.
          </p>

          {/* Mode tabs */}
          <div className="flex gap-2 justify-center mb-6">
            {[['ticket','🎫 N° de ticket'],['phone','📞 Téléphone']].map(([m,label]) => (
              <button key={m} onClick={() => { setMode(m); setError(''); setResult(null); setResults([]); setSelected(null) }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  mode === m ? 'bg-[#3ab54a] text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {mode === 'ticket' && (
            <form onSubmit={handleSearchTicket} className="flex gap-2 max-w-lg mx-auto">
              <input type="text" value={ticketNumber} onChange={e => setTicketNumber(e.target.value)}
                placeholder="Ex : WR-2026-000001"
                className="flex-1 px-5 py-4 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#3ab54a] shadow-lg uppercase" />
              <button type="submit" disabled={loading}
                className="bg-[#3ab54a] hover:bg-[#2e9440] text-white font-semibold px-6 py-4 rounded-md text-sm disabled:opacity-60 whitespace-nowrap transition">
                {loading ? '...' : 'Rechercher'}
              </button>
            </form>
          )}

          {mode === 'phone' && (
            <form onSubmit={handleSearchPhone} className="flex gap-2 max-w-lg mx-auto">
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="Ex : +216 55 123 456"
                className="flex-1 px-5 py-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3ab54a] shadow-lg" />
              <button type="submit" disabled={loading}
                className="bg-[#3ab54a] hover:bg-[#2e9440] text-white font-semibold px-6 py-4 rounded-md text-sm disabled:opacity-60 whitespace-nowrap transition">
                {loading ? '...' : 'Rechercher'}
              </button>
            </form>
          )}

          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-400/40 text-red-200 rounded-lg px-4 py-3 text-sm max-w-lg mx-auto">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Phone results list */}
      {results.length > 0 && !selected && (
        <section className="section bg-[#f5f5f5]">
          <div className="container-main max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-4">{results.length} ticket(s) trouvé(s) — cliquez pour voir le détail</p>
            <div className="space-y-3">
              {results.map(r => (
                <button key={r.ticketNumber} onClick={() => setSelected(r)}
                  className="w-full bg-white rounded-lg shadow-card p-4 flex items-center justify-between hover:border-[#3ab54a] border-2 border-transparent transition text-left">
                  <div>
                    <p className="font-mono font-bold text-[#1a1a1a]">{r.ticketNumber}</p>
                    <p className="text-sm text-gray-500">{[r.productType, r.brand].filter(Boolean).join(' — ')}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Déposé le {r.createdAt}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e8f5eb] text-[#1d6b2e]">
                    {r.phaseLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {selected && (
        <section className="section bg-[#f5f5f5]">
          <div className="container-main max-w-3xl mx-auto">
            <button onClick={() => setSelected(null)} className="text-sm text-[#3ab54a] hover:underline mb-4 block">
              ← Voir tous les tickets
            </button>
            <TicketResult result={selected} />
          </div>
        </section>
      )}

      {result && !selected && (
        <section className="section bg-[#f5f5f5]">
          <div className="container-main max-w-3xl mx-auto">
            <TicketResult result={result} />
          </div>
        </section>
      )}

      {/* How it works */}
      {!result && !selected && results.length === 0 && !loading && (
        <section className="section bg-white">
          <div className="container-main max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                ['1', '📦', 'Dépôt', 'Déposez votre appareil en magasin ou soumettez une demande en ligne.'],
                ['2', '🔍', 'Diagnostic & Réparation', 'Nos techniciens diagnostiquent et réparent votre appareil.'],
                ['3', '✅', 'Récupération', 'Vous êtes notifié dès que votre appareil est prêt à être retiré.'],
              ].map(([num, icon, title, desc]) => (
                <div key={num} className="relative card text-center">
                  <div className="w-14 h-14 rounded-full bg-[#e8f5eb] flex items-center justify-center text-2xl mx-auto mb-4">
                    {icon}
                  </div>
                  <span className="absolute top-4 right-4 w-6 h-6 bg-[#3ab54a] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {num}
                  </span>
                  <h3 className="font-bold text-[#1a1a1a] mb-2 text-sm">{title}</h3>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
