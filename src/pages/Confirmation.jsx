import { useLocation, Link, useNavigate } from 'react-router-dom'

export default function Confirmation() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const ticket = state?.ticket

  return (
    <section className="section bg-[#f5f5f5] min-h-[70vh] flex items-center">
      <div className="container-main max-w-lg mx-auto text-center">
        <div className="bg-white rounded-lg shadow-card p-10">
          {/* Success icon */}
          <div className="w-20 h-20 bg-[#e8f5eb] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>

          <h1 className="text-2xl font-extrabold text-[#1a1a1a] mb-3">
            Demande envoyée !
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed text-sm">
            Votre demande de réparation a bien été enregistrée. Un agent vous contactera dans les <strong>24 heures</strong> pour confirmer votre dépôt.
          </p>

          {ticket && (
            <div className="bg-[#e8f5eb] border border-[#3ab54a]/30 rounded-lg p-5 mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Votre numéro de ticket</p>
              <p className="text-3xl font-mono font-extrabold text-[#1d6b2e]">{ticket.ticketNumber}</p>
              <p className="text-xs text-gray-400 mt-2">
                Conservez ce numéro pour suivre l'avancement de votre réparation.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/suivi', { state: { ticketNumber: ticket?.ticketNumber } })}
              className="btn-green">
              Suivre ma réparation →
            </button>
            <Link to="/"
              className="border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white font-semibold px-6 py-3 rounded-md transition-all duration-200 inline-block">
              Retour à l'accueil
            </Link>
          </div>
        </div>

        <p className="text-gray-400 text-xs mt-6">
          Besoin d'aide ? Appelez-nous au <span className="text-[#3ab54a] font-medium">+216 XX XXX XXX</span>
        </p>
      </div>
    </section>
  )
}
