import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const nav = useNavigate()

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message); else nav('/admin')
  }

  return (
    <div className="card" style={{maxWidth:400, margin:'24px auto'}}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} className="grid" style={{gap:12}}>
        <input className="input" type="email" placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="input" type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required/>
        {error && <p style={{color:'#ff8080'}}>{error}</p>}
        <button className="btn" disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</button>
      </form>
      <p style={{color:'var(--muted)',marginTop:8}}>Tu usuario debe tener rol <b>admin</b> en la tabla <code>profiles</code>.</p>
    </div>
  )
}
