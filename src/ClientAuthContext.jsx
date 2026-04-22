import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const ClientAuthContext = createContext(null)

export function ClientAuthProvider({ children }) {
  const [client, setClient] = useState(null)
  const [ready, setReady]   = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('client_token')
    const data  = localStorage.getItem('client_data')
    if (token && data) setClient(JSON.parse(data))
    setReady(true)
  }, [])

  const saveLogin = (data) => {
    localStorage.setItem('client_token', data.token)
    localStorage.setItem('client_data', JSON.stringify({ email: data.email, fullName: data.fullName }))
    setClient({ email: data.email, fullName: data.fullName })
  }

  const logout = () => {
    localStorage.removeItem('client_token')
    localStorage.removeItem('client_data')
    setClient(null)
  }

  return (
    <ClientAuthContext.Provider value={{ client, saveLogin, logout, ready }}>
      {children}
    </ClientAuthContext.Provider>
  )
}

export const useClientAuth = () => useContext(ClientAuthContext)

// Axios instance with client JWT
const BASE = import.meta.env.VITE_API_URL || ''
export const clientApi = axios.create({ baseURL: `${BASE}/api` })
clientApi.interceptors.request.use(cfg => {
  const token = localStorage.getItem('client_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
