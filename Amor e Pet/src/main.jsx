import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Login from './Login.jsx'
import Loja from './Loja.jsx'
import Carrinho from './Carrinho.jsx'
import Cadastro from './Cadastro.jsx'
import Agendamentos from './Agendamentos.jsx'
import NovoAgendamento from './NovoAgendamento.jsx'
import PerfilUsuario from './PerfilUsuario.jsx';

const router = createBrowserRouter([
  { path: "/", element: <App/> },
  { path: "/Login", element: <Login /> },
  { path: "/Loja", element: <Loja /> },
  { path: "/Carrinho", element: <Carrinho /> },
  { path: "/Cadastro", element: <Cadastro/> },
  { path: "/Agendamentos", element: <Agendamentos /> },
  { path: "/novo-agendamento", element: <NovoAgendamento /> },
  { path: "/perfil-usuario", element: <PerfilUsuario /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
