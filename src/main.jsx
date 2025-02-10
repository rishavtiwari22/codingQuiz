import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LogIn from './components/login'
import Main from './components/Main'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogIn />
  </StrictMode>,
)
