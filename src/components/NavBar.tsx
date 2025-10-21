import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export default function NavBar(){
  const nav = useNavigate()
  const { role, session } = useAuth()

  async function logout(){
    await supabase.auth.signOut()
    nav('/')
  }

  return (
    <div className="row" style={{gap:16}}>
      <Link to="/">Tienda</Link>
      <Link to="/adopciones">Adopciones</Link>
      {role === 'admin' && <Link to="/admin" className="badge">Admin</Link>}
      {!session ? <Link to="/login" className="badge">Iniciar sesión</Link>
                : <button className="btn secondary" onClick={logout}>Salir</button>}
    </div>
  )
}
