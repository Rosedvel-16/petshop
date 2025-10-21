export default function PetCard({ pet }: { pet:any }){
  return (
    <div className="card">
      {pet.image_url && <img src={pet.image_url} alt={pet.name} />}
      <h3>{pet.name}</h3>
      <p style={{color:'var(--muted)'}}>{pet.breed ?? '—'} · {pet.status}</p>
      <p>{pet.description ?? ''}</p>
    </div>
  )
}
