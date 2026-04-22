import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function ForgotPassword() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post('/api/auth/forgot-password', { email })
      setSent(true)
    } catch {
      setError('Aucun compte trouvé avec cette adresse e-mail.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-card p-8">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-0 mb-4">
              <div className="bg-[#3ab54a] text-white font-extrabold text-xl px-4 py-2 rounded-l-md">WIKI</div>
              <div className="bg-[#1d6b2e] text-white font-extrabold text-xl px-4 py-2 rounded-r-md">Repair</div>
            </div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Mot de passe oublié</h1>
            <p className="text-gray-400 text-sm mt-1">Saisissez votre email pour recevoir un lien de réinitialisation</p>
          </div>

          {/* Success state */}
          {sent ? (
            <div className="text-center">
              <div className="bg-[#e8f5eb] border border-[#3ab54a] text-[#1d6b2e] rounded-lg px-4 py-4 text-sm mb-6">
                ✅ Un lien de réinitialisation a été envoyé à <strong>{email}</strong>. Vérifiez votre boîte mail.
              </div>
              <Link to="/login" className="text-[#3ab54a] font-semibold hover:text-[#1d6b2e] transition text-sm">
                ← Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="votre@email.com"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full btn-green py-3 text-center disabled:opacity-50">
                  {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                <Link to="/login" className="text-[#3ab54a] font-semibold hover:text-[#1d6b2e] transition">
                  ← Retour à la connexion
                </Link>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
