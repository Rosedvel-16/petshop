import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import PetCard from '../components/PetCard'
export default function Adoptions(){
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
  api.listAdoptions()
    .then(rows => setData(rows as any[]))   // 👈 cast
    .catch(console.error)
}, [])

  return (
    <>
      <h1>Perritos en adopción</h1>
      <div className="grid grid-3">
        {data.map(p => <PetCard key={p.id} pet={p} />)}
      </div>
      {!data.length && <p style={{color:'var(--muted)'}}>Aún no hay registros.</p>}
    </>
  )
}
