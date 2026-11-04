import { useEffect, useReducer } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

import './App.css'

// Die ursprünglichen Beispieltickets dienen als Standarddaten,
// wenn noch keine gespeicherten Tickets im localStorage vorhanden sind.
const initialTickets = [
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
]

// Lädt gespeicherte Tickets oder verwendet die Standarddaten.
function loadTickets(defaultTickets) {
  try {
    const savedTickets = localStorage.getItem('tickets')

    if (savedTickets) { 
      const parsedTickets = JSON.parse(savedTickets)

      if (Array.isArray(parsedTickets)) {
        return parsedTickets
      }
    }
  } catch (error) {
    console.error('Die gespeicherten Tickets konnten nicht geladen werden:', error)
  }

  return defaultTickets
}


function ticketReducer(state, action) {
  switch (action.type) {
    case 'ADD_TICKET':
      return [action.payload, ...state]

    case 'DELETE_TICKET':
      return state.filter((ticket) => ticket.id !== action.payload)

    case 'UPDATE_STATUS':
      return state.map((ticket) =>
        ticket.id === action.payload.id
          ? { ...ticket, status: action.payload.newStatus }
          : ticket
      )

    default:
      return state
  }
}

function App() {
 
  const [tickets, dispatch] = useReducer(
    ticketReducer,
    initialTickets,
    loadTickets
  )

  // Speichert die Ticketliste nach dem ersten Rendern und bei jeder Änderung.
  useEffect(() => {
    try {
      localStorage.setItem('tickets', JSON.stringify(tickets))
    } catch (error) {
      console.error('Die Tickets konnten nicht gespeichert werden:', error)
    }
  }, [tickets])

  return (
    <div className="app">
      <Navbar />

      {/* Die Startseite leitet automatisch zum User-Dashboard weiter. */}
      <Routes>
        <Route path="*" element={<Navigate to="/user" replace />} />
        <Route
          path="/user"
          element={<UserDashboard tickets={tickets} dispatch={dispatch} />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard tickets={tickets} dispatch={dispatch} />}
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
