import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useClientAuth } from '../ClientAuthContext'

export default function Register() {
  const { saveLogin } = useClientAuth()
  const navigate = useNavigate()
  const [form, setForm]       = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    if (!form.fullName.trim()) { setError('Le nom est obligatoire.'); return }
    if (/^[0-9]+$/.test(form.fullName.trim())) { setError('Le nom ne peut pas être uniquement des chiffres.'); return }
    if (form.phone && !/^(\+216)?[0-9]{8}$/.test(form.phone)) { setError('Numéro de téléphone invalide (8 chiffres requis, ex: 55123456).'); return }
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (form.password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return }
    setLoading(true)
    try {
      const BASE = import.meta.env.VITE_API_URL || ''
      const res = await axios.post(`${BASE}/api/auth/register`, {
        fullName: form.fullName,
        email:    form.email,
        phone:    form.phone,
        password: form.password,
      })
      saveLogin(res.data)
      navigate('/mon-espace')
    } catch (err) {
      if (!err.response) {
        setError('Impossible de contacter le serveur. Vérifiez que le backend est démarré.')
      } else {
        setError(err.response.data?.message || `Erreur ${err.response.status} — réessayez.`)
      }
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[80vh] bg-[#f5f5f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-card p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-0 mb-4">
              <div className="bg-[#3ab54a] text-white font-extrabold text-xl px-4 py-2 rounded-l-md">WIKI</div>
              <div className="bg-[#1d6b2e] text-white font-extrabold text-xl px-4 py-2 rounded-r-md">Repair</div>
            </div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Créer un compte</h1>
            <p className="text-gray-400 text-sm mt-1">Suivez vos réparations facilement</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nom complet *</label>
              <input required value={form.fullName} onChange={e => set('fullName', e.target.value)}
                className="input-field" placeholder="Ahmed Ben Ali" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email *</label>
              <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                className="input-field" placeholder="votre@email.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Téléphone</label>
              <input type="tel" value={form.phone}
                onChange={e => set('phone', e.target.value.replace(/[^0-9+]/g, ''))}
                maxLength={12}
                className="input-field" placeholder="55123456" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Mot de passe *</label>
              <input type="password" required value={form.password} onChange={e => set('password', e.target.value)}
                className="input-field" placeholder="Minimum 6 caractères" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Confirmer le mot de passe *</label>
              <input type="password" required value={form.confirm} onChange={e => set('confirm', e.target.value)}
                className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-green py-3 text-center disabled:opacity-50">
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#3ab54a] font-semibold hover:text-[#1d6b2e] transition">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
