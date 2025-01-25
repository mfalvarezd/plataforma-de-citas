import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Calendar from './Components/Calendar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Calendar />
  </StrictMode>,
)
