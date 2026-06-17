import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { adminEmail, auth, isFirebaseConfigured } from '../lib/firebase'

interface AuthState {
  user: User | null
  loading: boolean
  configured: boolean
  /** True when signed in AND (no admin email restriction OR email matches). */
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const value = useMemo<AuthState>(() => {
    const emailOk = !adminEmail || user?.email?.toLowerCase() === adminEmail
    return {
      user,
      loading,
      configured: isFirebaseConfigured,
      isAdmin: Boolean(user) && emailOk,
      async login(email, password) {
        if (!auth) throw new Error('Firebase is not configured.')
        await signInWithEmailAndPassword(auth, email, password)
      },
      async logout() {
        if (auth) await signOut(auth)
      },
    }
  }, [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
