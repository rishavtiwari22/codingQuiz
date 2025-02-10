import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import LogIn from './components/login'
import html from './components/Html'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <html />
  </StrictMode>,
)
