import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useClientAuth } from '../ClientAuthContext'

export default function Login() {
  const { saveLogin } = useClientAuth()
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const BASE = import.meta.env.VITE_API_URL || ''
      const res = await axios.post(`${BASE}/api/auth/login`, form)
      if (res.data.role !== 'CLIENT') {
        setError('Ce compte est réservé au personnel. Utilisez le back office.')
        return
      }
      saveLogin(res.data)
      navigate('/mon-espace')
    } catch (err) {
      if (!err.response) {
        setError('Impossible de contacter le serveur. Vérifiez que le backend est démarré.')
      } else {
        setError('Email ou mot de passe incorrect.')
      }
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[80vh] bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-card p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-0 mb-4">
              <div className="bg-[#3ab54a] text-white font-extrabold text-xl px-4 py-2 rounded-l-md">WIKI</div>
              <div className="bg-[#1d6b2e] text-white font-extrabold text-xl px-4 py-2 rounded-r-md">Repair</div>
            </div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Connexion</h1>
            <p className="text-gray-400 text-sm mt-1">Accédez à votre espace client</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <input type="email" required value={form.email}
                onChange={e => set('email', e.target.value)}
                className="input-field" placeholder="votre@email.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Mot de passe</label>
              <input type="password" required value={form.password}
                onChange={e => set('password', e.target.value)}
                className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-green py-3 text-center disabled:opacity-50">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="text-right mt-2">
            <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-[#3ab54a] transition">
              Mot de passe oublié ?
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-[#3ab54a] font-semibold hover:text-[#1d6b2e] transition">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
