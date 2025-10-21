import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import ProductCard from '../components/ProductCard'

export default function Home(){
  const [items, setItems] = useState<any[]>([])
  const [q, setQ] = useState('')

  useEffect(() => {
  api.listProducts()
    .then(rows => setItems(rows as any[]))   // 👈 cast simple
    .catch(console.error)
}, [])

  const filtered = items.filter(p => p.is_active && p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <h1>Artículos para mascotas</h1>
      <div className="row" style={{margin:'12px 0'}}>
        <input className="input" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid grid-3">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
      {!filtered.length && <p style={{color:'var(--muted)'}}>No hay productos (o no coinciden con la búsqueda).</p>}
    </>
  )
}
