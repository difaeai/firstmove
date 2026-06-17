import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../admin/AuthContext'
import { isFirebaseConfigured } from '../../lib/firebase'
import Logo from '../../components/Logo'

function friendlyError(code: string): string {
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found'))
    return 'Incorrect email or password.'
  if (code.includes('too-many-requests')) return 'Too many attempts. Please try again later.'
  if (code.includes('invalid-email')) return 'Please enter a valid email address.'
  return 'Unable to sign in. Please try again.'
}

export default function AdminLogin() {
  const { login, isAdmin, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!loading && isAdmin) navigate('/admin', { replace: true })
  }, [isAdmin, loading, navigate])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      const code = (err as { code?: string }).code ?? ''
      setError(friendlyError(code))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy-radial p-12 lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-grid-navy bg-[size:40px_40px] opacity-50" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-gold-500/20 blur-[120px]" />
        <div className="relative">
          <Logo className="h-14" />
        </div>
        <div className="relative">
          <ShieldCheck className="h-10 w-10 text-gold-400" />
          <h1 className="mt-5 font-serif text-4xl font-700 leading-tight text-white">
            Admin <span className="text-gradient-gold">Control Panel</span>
          </h1>
          <p className="mt-3 max-w-sm text-navy-200">
            Manage enquiries and trade delegation registrations submitted through the website.
          </p>
        </div>
        <p className="relative text-xs text-navy-300">
          © 2025 First Option Worldwide (Pvt) Ltd.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-slate-50 p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden">
            <div className="inline-flex rounded-2xl bg-navy-900 px-4 py-3">
              <Logo className="h-10" />
            </div>
          </div>

          <h2 className="mt-8 font-serif text-3xl font-700 text-navy-800">Sign in</h2>
          <p className="mt-2 text-sm text-slate-500">Enter your admin credentials to continue.</p>

          {!isFirebaseConfigured && (
            <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
              Firebase is not configured yet. Add your keys to a <code>.env</code> file and create an
              admin user in Firebase Authentication.
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-600 uppercase tracking-wide text-slate-500">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-navy-800 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                  placeholder="admin@firstoptionworldwide.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-600 uppercase tracking-wide text-slate-500">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-navy-800 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={busy || !isFirebaseConfigured}
              className="w-full rounded-xl bg-navy-800 py-3.5 font-display text-sm font-600 uppercase tracking-widest text-white transition hover:bg-navy-700 disabled:opacity-60"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <a href="/" className="mt-6 inline-block text-sm text-slate-500 hover:text-navy-800">
            ← Back to website
          </a>
        </motion.div>
      </div>
    </div>
  )
}
