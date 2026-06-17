import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from './admin/AuthContext'
import RequireAuth from './admin/RequireAuth'

// Admin pages are split into their own chunk so public visitors never download them.
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-400/30 border-t-gold-400" />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<AdminFallback />}>
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            </Suspense>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
