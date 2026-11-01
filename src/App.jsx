
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

import './App.css'

function App() {
 const [tickets, setTickets] = useState([
  {
    id: 1,
    title: 'Computer startet nicht',
    category: 'Hardware',
    description:
      'Der Computer lässt sich nicht einschalten. Die Betriebsleuchte bleibt aus, obwohl das Stromkabel angeschlossen ist.',
    priority: 'High',
    status: 'Offen',
    createdAt: '28.10.2026',
  },
  {
    id: 2,
    title: 'Drucker funktioniert nicht',
    category: 'Drucker',
    description:
      'Der Drucker druckt keine Dokumente. In der Druckerwarteschlange bleiben alle Aufträge hängen.',
    priority: 'Normal',
    status: 'In Bearbeitung',
    createdAt: '29.10.2026',
  },
  {
    id: 3,
    title: 'Kein Internetzugang',
    category: 'Netzwerk',
    description:
      'Die Internetverbindung funktioniert nicht. Andere Geräte im Büro haben ebenfalls Verbindungsprobleme.',
    priority: 'Urgent',
    status: 'Offen',
    createdAt: '30.10.2026',
  },
  {
    id: 4,
    title: 'Software kann nicht installiert werden',
    category: 'Software',
    description:
      'Bei der Installation der benötigten Software erscheint eine Fehlermeldung. Die Installation wird abgebrochen.',
    priority: 'Low',
    status: 'Geschlossen',
    createdAt: '31.10.2026',
  },
])

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/user" replace />} />

        <Route path="/user" 
        element={<UserDashboard tickets={tickets} setTickets={setTickets}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminDashboard  tickets={tickets} setTickets={setTickets}
            />
          }
        />
      </Routes>

      <footer className="footer">
        <span>© 2026 IT Support Desk</span>
        <span>Ein React-Projekt</span>
      </footer>
    </div>
  )
}

export default App
