import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || ''

const api = axios.create({ baseURL: `${BASE}/api/public` })

export const trackTicket   = (ticketNumber) => api.get(`/track/${ticketNumber}`)
export const trackByPhone  = (phone)        => api.get(`/track-by-phone?phone=${encodeURIComponent(phone)}`)
export const submitDemande = (data)         => api.post('/demande', data)
