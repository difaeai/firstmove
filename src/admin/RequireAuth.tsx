import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from './AuthContext'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-400/30 border-t-gold-400" />
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
