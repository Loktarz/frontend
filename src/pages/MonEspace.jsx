import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClientAuth, clientApi } from '../ClientAuthContext'
import PhaseTracker from '../components/PhaseTracker'

function phaseBadge(phase) {
  if (phase === 'LIVRE')      return 'bg-green-100 text-green-700'
  if (phase === 'IMPOSSIBLE') return 'bg-red-100 text-red-700'
  if (phase === 'PRET')       return 'bg-[#e8f5eb] text-[#1d6b2e]'
  return 'bg-[#e8f5eb] text-[#1d6b2e]'
}

function roleLabel(role) {
  const map = {
    CLIENT:        'Client',
    ADMIN:         'Administrateur',
    AGENT_MAGASIN: 'Agent Magasin',
    TECHNICIAN:    'Technicien',
    INFOLINE:      'Agent Infoline',
  }
  return map[role] || role
}

// ─── Tab: Mes Tickets ─────────────────────────────────────────────────────────
function MesTickets({ client, navigate }) {
  const [tickets, setTickets]   = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  useEffect(() => {
    if (!client) { navigate('/login'); return }
    clientApi.get('/client/my-tickets')
      .then(r => setTickets(r.data))
      .catch(() => setError('Impossible de charger vos tickets.'))
      .finally(() => setLoading(false))
  }, [client])

  if (loading) return <p className="text-gray-400 text-center py-10">Chargement...</p>
  if (error)   return <p className="text-red-500 text-center py-10">{error}</p>

  if (tickets.length === 0)
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">📭</p>
        <p className="text-gray-500 text-lg mb-6">Vous n'avez pas encore de tickets.</p>
        <Link to="/demande" className="btn-green">Soumettre une demande →</Link>
      </div>
    )

  if (selected)
    return (
      <div>
        <button onClick={() => setSelected(null)} className="text-sm text-[#3ab54a] hover:underline mb-6 block">
          ← Retour à mes tickets
        </button>

        <div className="bg-white rounded-lg shadow-card p-6 mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Numéro de ticket</p>
            <p className="text-2xl font-mono font-bold text-[#1a1a1a]">{selected.ticketNumber}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${phaseBadge(selected.phase)}`}>
            {selected.phaseLabel}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6 mb-4">
          <h2 className="text-[#1a1a1a] font-bold mb-6 text-lg">Progression</h2>
          <PhaseTracker phase={selected.phase} />
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 mb-1">Statut actuel</p>
            <p className="text-[#1d6b2e] font-semibold">{selected.statusLabel}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-[#1a1a1a] font-bold mb-4">Informations</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Appareil',   [selected.productType, selected.brand].filter(Boolean).join(' — ')],
              ['Service',    selected.serviceType],
              ['Déposé le',  selected.createdAt],
              ['Mis à jour', selected.updatedAt || '—'],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-gray-700 font-medium">{value || '—'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">{tickets.length} ticket(s) trouvé(s)</p>
      <div className="space-y-3">
        {tickets.map(t => (
          <button key={t.ticketNumber} onClick={() => setSelected(t)}
            className="w-full bg-white rounded-lg shadow-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:border-[#3ab54a] border-2 border-transparent transition text-left">
            <div className="flex-1">
              <p className="font-mono font-bold text-[#1a1a1a] text-lg">{t.ticketNumber}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {[t.productType, t.brand].filter(Boolean).join(' — ')}
                {t.serviceType && <span className="ml-2 text-gray-400">· {t.serviceType}</span>}
              </p>
              <p className="text-xs text-gray-400 mt-1">Déposé le {t.createdAt}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center ${phaseBadge(t.phase)}`}>
              {t.phaseLabel}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

// ─── Tab: Mon Profil ──────────────────────────────────────────────────────────
function MonProfil() {
  const [profile, setProfile]       = useState(null)
  const [loading, setLoading]       = useState(true)

  // Edit info
  const [editMode, setEditMode]     = useState(false)
  const [fullName, setFullName]     = useState('')
  const [phone, setPhone]           = useState('')
  const [saving, setSaving]         = useState(false)
  const [saveMsg, setSaveMsg]       = useState('')

  // Change password
  const [showPwd, setShowPwd]       = useState(false)
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd]         = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdSaving, setPwdSaving]   = useState(false)
  const [pwdMsg, setPwdMsg]         = useState('')
  const [pwdError, setPwdError]     = useState('')

  useEffect(() => {
    clientApi.get('/users/me')
      .then(r => {
        setProfile(r.data)
        setFullName(r.data.fullName || '')
        setPhone(r.data.phone || '')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSaveProfile = async () => {
    if (!fullName.trim()) { setSaveMsg('Le nom est obligatoire.'); return }
    if (phone && !/^(\+216)?[0-9]{8}$/.test(phone)) { setSaveMsg('Numéro de téléphone invalide (8 chiffres, ex: 55123456).'); return }
    setSaving(true); setSaveMsg('')
    try {
      const res = await clientApi.put('/users/me', { fullName, phone })
      setProfile(res.data)
      setEditMode(false)
      setSaveMsg('Profil mis à jour avec succès.')
    } catch {
      setSaveMsg('Erreur lors de la mise à jour.')
    } finally { setSaving(false) }
  }

  const handleChangePassword = async () => {
    setPwdMsg(''); setPwdError('')
    if (newPwd !== confirmPwd) { setPwdError('Les mots de passe ne correspondent pas.'); return }
    if (newPwd.length < 6)    { setPwdError('Le mot de passe doit contenir au moins 6 caractères.'); return }
    setPwdSaving(true)
    try {
      await clientApi.patch('/users/me/password', { currentPassword: currentPwd, newPassword: newPwd })
      setPwdMsg('Mot de passe modifié avec succès.')
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('')
      setShowPwd(false)
    } catch {
      setPwdError('Mot de passe actuel incorrect.')
    } finally { setPwdSaving(false) }
  }

  if (loading) return <p className="text-gray-400 text-center py-10">Chargement...</p>
  if (!profile) return <p className="text-red-500 text-center py-10">Impossible de charger le profil.</p>

  return (
    <div className="space-y-6">

      {/* ── Informations personnelles ── */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#1a1a1a] font-bold text-lg">Informations personnelles</h2>
          {!editMode && (
            <button onClick={() => { setEditMode(true); setSaveMsg('') }}
              className="text-sm text-[#3ab54a] border border-[#3ab54a]/40 hover:border-[#3ab54a] px-3 py-1 rounded-lg transition">
              ✏️ Modifier
            </button>
          )}
        </div>

        {!editMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            {[
              ['Nom complet',   profile.fullName],
              ['Email',         profile.email],
              ['Téléphone',     profile.phone || '—'],
              ['Rôle',          roleLabel(profile.role)],
              ['Membre depuis', profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
                : '—'],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-gray-800 font-medium">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nom complet</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)}
                className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Téléphone</label>
              <input value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
                maxLength={12}
                className="input-field" placeholder="55123456" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveProfile} disabled={saving}
                className="btn-green py-2 px-5 text-sm disabled:opacity-50">
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button onClick={() => { setEditMode(false); setFullName(profile.fullName || ''); setPhone(profile.phone || '') }}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 transition">
                Annuler
              </button>
            </div>
          </div>
        )}

        {saveMsg && (
          <p className={`mt-3 text-sm ${saveMsg.includes('succès') ? 'text-[#1d6b2e]' : 'text-red-500'}`}>
            {saveMsg}
          </p>
        )}
      </div>

      {/* ── Sécurité ── */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[#1a1a1a] font-bold text-lg">Sécurité</h2>
          {!showPwd && (
            <button onClick={() => { setShowPwd(true); setPwdMsg(''); setPwdError('') }}
              className="text-sm text-[#3ab54a] border border-[#3ab54a]/40 hover:border-[#3ab54a] px-3 py-1 rounded-lg transition">
              🔒 Changer le mot de passe
            </button>
          )}
        </div>
        <p className="text-sm text-gray-400 mb-4">Votre compte est protégé par un mot de passe.</p>

        {pwdMsg && (
          <div className="bg-[#e8f5eb] border border-[#3ab54a] text-[#1d6b2e] rounded-lg px-4 py-3 text-sm mb-4">
            ✅ {pwdMsg}
          </div>
        )}

        {showPwd && (
          <div className="space-y-4 border-t border-gray-100 pt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Mot de passe actuel</label>
              <input type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Nouveau mot de passe</label>
              <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Confirmer le nouveau mot de passe</label>
              <input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} className="input-field" />
            </div>
            {pwdError && <p className="text-red-500 text-sm">{pwdError}</p>}
            <div className="flex gap-3">
              <button onClick={handleChangePassword} disabled={pwdSaving}
                className="btn-green py-2 px-5 text-sm disabled:opacity-50">
                {pwdSaving ? 'Modification...' : 'Modifier'}
              </button>
              <button onClick={() => { setShowPwd(false); setCurrentPwd(''); setNewPwd(''); setConfirmPwd(''); setPwdError('') }}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 transition">
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MonEspace() {
  const { client, logout } = useClientAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tickets')

  const handleLogout = () => { logout(); navigate('/') }

  if (!client) { navigate('/login'); return null }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1d6b2e] py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Mon Espace</h1>
            <p className="text-white/60 mt-1">
              Bonjour, <span className="text-[#3ab54a] font-semibold">{client?.fullName}</span> 👋
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/demande" className="btn-green text-sm py-2 px-4">
              + Nouvelle demande
            </Link>
            <button onClick={handleLogout}
              className="border-2 border-white/30 text-white/70 hover:border-white hover:text-white text-sm py-2 px-4 rounded-md transition">
              Déconnexion
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex">
          {[
            { key: 'tickets', label: '🎫 Mes Tickets' },
            { key: 'profil',  label: '👤 Mon Profil'  },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition ${
                activeTab === tab.key
                  ? 'border-[#3ab54a] text-[#1d6b2e]'
                  : 'border-transparent text-gray-400 hover:text-[#1d6b2e]'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="section bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'tickets' && <MesTickets client={client} navigate={navigate} />}
          {activeTab === 'profil'  && <MonProfil />}
        </div>
      </section>
    </div>
  )
}
