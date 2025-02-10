import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import LogIn from './components/login'
import App from './components/App'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
