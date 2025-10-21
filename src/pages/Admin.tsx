import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Admin(){
  const [products, setProducts] = useState<any[]>([])
  const [adoptions, setAdoptions] = useState<any[]>([])

  // Formularios simples
  const [p, setP] = useState<any>({ name:'', price:0, stock:0, image_url:'', description:'', is_active:true, category:'' })
  const [pet, setPet] = useState<any>({ name:'', breed:'', description:'', image_url:'', status:'available' })

  async function load(){
    const [a,b] = await Promise.all([api.listProducts(), api.listAdoptions()]) as [any[], any[]]
    setProducts(a); setAdoptions(b)
  }
  useEffect(()=>{ load().catch(console.error) }, [])

  return (
    <>
      <h1>Panel de administración</h1>

      <div className="card">
        <h2>Crear producto</h2>
        <div className="grid" style={{gap:8}}>
          <input className="input" placeholder="Nombre" value={p.name} onChange={e=>setP({...p,name:e.target.value})}/>
          <div className="row">
            <input className="input" type="number" placeholder="Precio" value={p.price} onChange={e=>setP({...p,price:Number(e.target.value)})}/>
            <input className="input" type="number" placeholder="Stock" value={p.stock} onChange={e=>setP({...p,stock:Number(e.target.value)})}/>
          </div>
          <input className="input" placeholder="Categoría" value={p.category} onChange={e=>setP({...p,category:e.target.value})}/>
          <input className="input" placeholder="URL de imagen (Storage público)" value={p.image_url} onChange={e=>setP({...p,image_url:e.target.value})}/>
          <textarea className="input" placeholder="Descripción" value={p.description} onChange={e=>setP({...p,description:e.target.value})}/>
          <div className="row">
            <label><input type="checkbox" checked={p.is_active} onChange={e=>setP({...p,is_active:e.target.checked})}/> Activo</label>
            <button className="btn" onClick={async()=>{ await api.createProduct(p); setP({ name:'', price:0, stock:0, image_url:'', description:'', is_active:true, category:'' }); await load() }}>Guardar</button>
          </div>
        </div>
      </div>

      <h3>Productos</h3>
      <table className="table">
        <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Activo</th><th></th></tr></thead>
        <tbody>
          {products.map(pr => (
            <tr key={pr.id}>
              <td>{pr.name}</td>
              <td>S/ {Number(pr.price).toFixed(2)}</td>
              <td>{pr.stock}</td>
              <td>{pr.is_active ? 'Sí' : 'No'}</td>
              <td className="row">
                <button className="btn secondary" onClick={async()=>{ await api.updateProduct(pr.id, { is_active: !pr.is_active }); await load() }}>Toggle</button>
                <button className="btn" onClick={async()=>{ await api.deleteProduct(pr.id); await load() }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card" style={{marginTop:24}}>
        <h2>Registrar perrito</h2>
        <div className="grid" style={{gap:8}}>
          <input className="input" placeholder="Nombre" value={pet.name} onChange={e=>setPet({...pet,name:e.target.value})}/>
          <input className="input" placeholder="Raza" value={pet.breed} onChange={e=>setPet({...pet,breed:e.target.value})}/>
          <input className="input" placeholder="URL de imagen" value={pet.image_url} onChange={e=>setPet({...pet,image_url:e.target.value})}/>
          <textarea className="input" placeholder="Descripción" value={pet.description} onChange={e=>setPet({...pet,description:e.target.value})}/>
          <div className="row">
            <select className="input" value={pet.status} onChange={e=>setPet({...pet,status:e.target.value})}>
              <option value="available">available</option>
              <option value="adopted">adopted</option>
            </select>
            <button className="btn" onClick={async()=>{ await api.createPet(pet); setPet({ name:'', breed:'', description:'', image_url:'', status:'available' }); await load() }}>Guardar</button>
          </div>
        </div>
      </div>

      <h3>Perritos</h3>
      <table className="table">
        <thead><tr><th>Nombre</th><th>Raza</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {adoptions.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.breed ?? '—'}</td>
              <td>{a.status}</td>
              <td className="row">
                <button className="btn secondary" onClick={async()=>{ await api.updatePet(a.id, { status: a.status === 'available' ? 'adopted':'available' }); await load() }}>Toggle</button>
                <button className="btn" onClick={async()=>{ await api.deletePet(a.id); await load() }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
    