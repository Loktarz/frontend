import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitDemande } from '../api'

const FAMILIES = ['IT', 'HIFI', 'Téléphonie']
const TYPES = {
  IT:         ['Desktop', 'Laptop', 'Serveur', 'Disque dur', 'Ecran', 'Clavier'],
  HIFI:       ['Videoprojecteur', 'Haut parleur', 'Barre de son'],
  Téléphonie: ['Smartphone'],
}
const SERVICES = [
  'Diagnostic',
  'Réparation et dépannage',
  'Montage et Installation',
  'Récupération des données',
  'Nettoyage et Entretien',
]

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function Demande() {
  const navigate = useNavigate()
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm] = useState({
    clientType: 'PARTICULIER', clientName: '', clientPhone: '',
    clientEmail: '', clientAddress: '', clientCompany: '',
    productFamily: '', productType: '', brand: '',
    designation: '', serialNumber: '', machineState: '', accessories: '',
    problemDescription: '', serviceType: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validateStep1 = () => {
    if (!form.clientName.trim()) return 'Le nom est obligatoire.'
    if (/^[0-9]+$/.test(form.clientName.trim())) return 'Le nom ne peut pas être uniquement des chiffres.'
    if (!form.clientPhone) return 'Le téléphone est obligatoire.'
    if (!/^(\+216)?[0-9]{8}$/.test(form.clientPhone)) return 'Numéro de téléphone invalide (8 chiffres, ex: 55123456).'
    if (form.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)) return "Format d'email invalide."
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const res = await submitDemande(form)
      navigate('/demande/confirmation', { state: { ticket: res.data } })
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1d6b2e] py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">Soumettre une demande</h1>
        <p className="text-white/70 max-w-xl mx-auto text-sm">
          Remplissez le formulaire ci-dessous. Un agent vous contactera pour confirmer votre dépôt.
        </p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? 'bg-[#3ab54a] text-white' : 'bg-white/20 text-white/50'
              }`}>{s}</div>
              <span className={`text-sm hidden sm:block ${step >= s ? 'text-[#3ab54a]' : 'text-white/40'}`}>
                {s === 1 ? 'Vos informations' : 'Votre appareil'}
              </span>
              {s < 2 && <div className={`w-12 h-0.5 ${step > s ? 'bg-[#3ab54a]' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="section bg-[#f5f5f5]">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-card p-8 space-y-5">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Vos informations</h2>

                <Field label="Type de client">
                  <div className="flex gap-3">
                    {['PARTICULIER','ENTREPRISE'].map(t => (
                      <button
                        key={t} type="button"
                        onClick={() => set('clientType', t)}
                        className={`flex-1 py-3 rounded-md border-2 text-sm font-semibold transition-all ${
                          form.clientType === t
                            ? 'border-[#3ab54a] bg-[#3ab54a] text-white'
                            : 'border-gray-200 text-gray-500 hover:border-[#3ab54a]'
                        }`}
                      >
                        {t === 'PARTICULIER' ? '👤 Particulier' : '🏢 Entreprise'}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Nom complet" required>
                  <input required value={form.clientName}
                    onChange={e => set('clientName', e.target.value.replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, ''))}
                    className="input-field" placeholder="Ahmed Ben Ali" />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Téléphone" required>
                    <input required value={form.clientPhone}
                      onChange={e => set('clientPhone', e.target.value.replace(/[^0-9+]/g, ''))}
                      maxLength={12}
                      className="input-field" placeholder="55123456" />
                  </Field>
                  <Field label="Email">
                    <input type="email" value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)}
                      className="input-field" placeholder="email@exemple.com" />
                  </Field>
                </div>

                <Field label="Adresse">
                  <input value={form.clientAddress} onChange={e => set('clientAddress', e.target.value)}
                    className="input-field" placeholder="Rue, Ville" />
                </Field>

                {form.clientType === 'ENTREPRISE' && (
                  <Field label="Nom de la société">
                    <input value={form.clientCompany} onChange={e => set('clientCompany', e.target.value)}
                      className="input-field" placeholder="Raison sociale" />
                  </Field>
                )}

                <div className="flex justify-end pt-2">
                  <button type="button" onClick={() => {
                      const err = validateStep1()
                      if (err) { setError(err); return }
                      setError(''); setStep(2)
                    }}
                    disabled={!form.clientName || !form.clientPhone}
                    className="btn-green disabled:opacity-50">
                    Suivant →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-card p-8 space-y-5">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Votre appareil</h2>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Famille" required>
                    <select required value={form.productFamily}
                      onChange={e => { set('productFamily', e.target.value); set('productType', '') }}
                      className="input-field">
                      <option value="">Sélectionner...</option>
                      {FAMILIES.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </Field>
                  <Field label="Type d'appareil" required>
                    <select required value={form.productType} onChange={e => set('productType', e.target.value)}
                      className="input-field" disabled={!form.productFamily}>
                      <option value="">Sélectionner...</option>
                      {(TYPES[form.productFamily] || []).map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Marque">
                    <input value={form.brand} onChange={e => set('brand', e.target.value)}
                      className="input-field" placeholder="Ex : Samsung, HP..." />
                  </Field>
                  <Field label="Modèle / Désignation">
                    <input value={form.designation} onChange={e => set('designation', e.target.value)}
                      className="input-field" placeholder="Ex : Galaxy S21" />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="N° de série">
                    <input value={form.serialNumber} onChange={e => set('serialNumber', e.target.value)}
                      className="input-field" placeholder="Optionnel" />
                  </Field>
                  <Field label="État physique">
                    <input value={form.machineState} onChange={e => set('machineState', e.target.value)}
                      className="input-field" placeholder="Ex : Bon état, écran fissuré..." />
                  </Field>
                </div>

                <Field label="Accessoires fournis">
                  <input value={form.accessories} onChange={e => set('accessories', e.target.value)}
                    className="input-field" placeholder="Ex : Chargeur, housse..." />
                </Field>

                <Field label="Service souhaité" required>
                  <select required value={form.serviceType} onChange={e => set('serviceType', e.target.value)}
                    className="input-field">
                    <option value="">Sélectionner...</option>
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label="Description du problème" required>
                  <textarea required rows={4} value={form.problemDescription}
                    onChange={e => set('problemDescription', e.target.value)}
                    className="input-field resize-none"
                    placeholder="Décrivez la panne ou le problème rencontré..." />
                </Field>

                <div className="flex justify-between pt-2">
                  <button type="button" onClick={() => setStep(1)}
                    className="text-gray-500 hover:text-[#3ab54a] text-sm font-medium transition">
                    ← Retour
                  </button>
                  <button type="submit" disabled={loading || !form.serviceType || !form.problemDescription}
                    className="btn-green disabled:opacity-50">
                    {loading ? 'Envoi en cours...' : 'Soumettre ma demande ✓'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Un agent vous contactera dans les 24h pour confirmer votre dépôt.
          </p>
        </div>
      </section>
    </div>
  )
}
