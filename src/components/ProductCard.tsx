export default function ProductCard({ p }: { p: any }){
  return (
    <div className="card">
      {p.image_url && <img src={p.image_url} alt={p.name} />}
      <h3>{p.name}</h3>
      <p style={{color:'var(--muted)'}}>{p.description ?? '—'}</p>
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>S/ {Number(p.price).toFixed(2)}</strong>
        <span className="badge">{p.stock} en stock</span>
      </div>
    </div>
  )
}
