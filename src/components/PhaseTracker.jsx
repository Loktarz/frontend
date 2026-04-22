const PHASES = [
  { key: 'DEPOT',      label: 'Dépôt',       icon: '📦' },
  { key: 'DIAGNOSTIC', label: 'Diagnostic',   icon: '🔍' },
  { key: 'DEVIS',      label: 'Devis',        icon: '📋' },
  { key: 'REPARATION', label: 'Réparation',   icon: '🔧' },
  { key: 'PRET',       label: 'Prêt',         icon: '✅' },
  { key: 'LIVRE',      label: 'Livré',        icon: '🎉' },
]

export default function PhaseTracker({ phase }) {
  const isImpossible = phase === 'IMPOSSIBLE'
  const currentIndex = isImpossible ? -1 : PHASES.findIndex(p => p.key === phase)

  if (isImpossible) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
        <p className="text-4xl mb-2">❌</p>
        <p className="text-red-700 font-bold text-lg">Réparation impossible</p>
        <p className="text-red-500 text-sm mt-1">
          Nous n'avons pas pu réparer votre appareil. Veuillez nous contacter pour plus d'informations.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop stepper */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0" />
        <div
          className="absolute top-6 left-0 h-0.5 bg-[#3ab54a] z-0 transition-all duration-700"
          style={{ width: currentIndex >= 0 ? `${(currentIndex / (PHASES.length - 1)) * 100}%` : '0%' }}
        />
        {PHASES.map((p, i) => {
          const done    = i < currentIndex
          const current = i === currentIndex
          return (
            <div key={p.key} className="flex flex-col items-center z-10 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300 ${
                done    ? 'bg-[#3ab54a] border-[#3ab54a] text-white shadow-md' :
                current ? 'bg-[#1d6b2e] border-[#1d6b2e] text-white shadow-lg scale-110' :
                          'bg-white border-gray-300 text-gray-400'
              }`}>
                {done ? '✓' : p.icon}
              </div>
              <p className={`mt-2 text-xs font-semibold text-center ${
                current ? 'text-[#1d6b2e]' : done ? 'text-[#3ab54a]' : 'text-gray-400'
              }`}>
                {p.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* Mobile list */}
      <div className="sm:hidden space-y-2">
        {PHASES.map((p, i) => {
          const done    = i < currentIndex
          const current = i === currentIndex
          return (
            <div key={p.key} className={`flex items-center gap-3 p-3 rounded-lg ${
              current ? 'bg-[#1d6b2e] text-white' : done ? 'bg-[#e8f5eb]' : 'bg-gray-50'
            }`}>
              <span className="text-xl">{done ? '✓' : p.icon}</span>
              <span className={`text-sm font-medium ${
                current ? 'text-white' : done ? 'text-[#3ab54a]' : 'text-gray-400'
              }`}>{p.label}</span>
              {current && <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full">En cours</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
