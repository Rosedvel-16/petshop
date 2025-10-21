import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App'
import Home from './pages/Home'
import Adoptions from './pages/Adoptions'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Protected from './components/Protected'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'adopciones', element: <Adoptions /> },
      { path: 'login', element: <Login /> },
      { path: 'admin', element:
        <Protected>
          <Admin />
        </Protected>
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>
)
