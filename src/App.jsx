import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClientAuthProvider } from './ClientAuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Suivi from './pages/Suivi'
import Demande from './pages/Demande'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import Register from './pages/Register'
import MonEspace from './pages/MonEspace'
import ForgotPassword from './pages/ForgotPassword'

export default function App() {
  return (
    <BrowserRouter>
      <ClientAuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"                     element={<Home />} />
              <Route path="/suivi"                element={<Suivi />} />
              <Route path="/demande"              element={<Demande />} />
              <Route path="/demande/confirmation" element={<Confirmation />} />
              <Route path="/login"                element={<Login />} />
              <Route path="/register"             element={<Register />} />
              <Route path="/mon-espace"           element={<MonEspace />} />
              <Route path="/forgot-password"      element={<ForgotPassword />} />
              <Route path="*"                     element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ClientAuthProvider>
    </BrowserRouter>
  )
}
