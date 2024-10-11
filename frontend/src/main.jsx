import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Signup/>
  </StrictMode>,
)
