import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function Protected({ children }: { children: ReactNode }) {
  const { loading, role } = useAuth()
  if (loading) return <p>Cargando...</p>
  if (role !== 'admin') return <Navigate to="/login" replace />
  return <>{children}</>
}
