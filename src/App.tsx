import { Outlet, Link } from 'react-router-dom'
import NavBar from './components/NavBar'

export default function App(){
  return (
    <>
      <div className="nav"><div className="inner">
        <Link to="/" style={{color:'#fff', fontWeight:700}}>🐾 Petshop</Link>
        <NavBar/>
      </div></div>
      <main className="container">
        <Outlet/>
      </main>
    </>
  )
}
