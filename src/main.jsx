import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'

// Startet die React-Anwendung im HTML-Element mit der ID "root".
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter ermöglicht die Navigation zwischen den Dashboard-Routen. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
