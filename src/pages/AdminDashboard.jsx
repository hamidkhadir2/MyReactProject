import { useState } from 'react'

function AdminDashboard({ tickets, setTickets }) {
  // Der Suchtext wird über React-State kontrolliert.
  const [search, setSearch] = useState('')

  // Ändert den Status eines Tickets und lässt alle anderen Daten unverändert.
  function handleStatusChange(id, newStatus) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    )
  }

  // Sucht an jeder Stelle im Titel; Groß-/Kleinschreibung wird ignoriert.
  const searchTerm = search.trim().toLowerCase()
  const filteredTickets = tickets.filter((ticket) =>
    (ticket.title ?? '').toLowerCase().includes(searchTerm)
  )

  return (
    <main className="main-content">
      <section className="welcome-section">
        <div>
          <p className="eyebrow">ADMIN PORTAL</p>
          <h1>Admin Dashboard</h1>
          <p className="welcome-description">
            Hier kannst du alle Support-Tickets verwalten.
          </p>
        </div>
      </section>

      <section className="tickets-section">
        <div className="section-heading">
          <div>
            <h2>Alle Tickets</h2>
            <p>Tickets ansehen und ihren Status ändern.</p>
          </div>
          <span className="ticket-count">{tickets.length} Tickets</span>
        </div>

        {/* Ein einfaches Textfeld zum Suchen nach dem Ticket-Titel. */}
        <input
          className="ticket-search"
          type="text"
          aria-label="Tickets nach Titel suchen"
          placeholder="Tickets suchen..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {filteredTickets.length === 0 ? (
          <p className="welcome-description">Keine Tickets gefunden.</p>
        ) : (
          <div className="ticket-list">
            {filteredTickets.map((ticket) => {
              const statusClass = ticket.status
                .replaceAll(' ', '-')
                .toLowerCase()

              return (
                <article className="ticket-card" key={ticket.id}>
                  <h3>{ticket.title}</h3>

                  <div className="admin-ticket-meta">
                    <div className="ticket-info">
                      <p>
                        <strong>Kategorie:</strong> {ticket.category}
                      </p>
                      <p>
                        <strong>Erstellt am:</strong> {ticket.createdAt}
                      </p>
                    </div>

                    {/* Der Status kann direkt in der jeweiligen Ticketkarte geändert werden. */}
                    <div className="form-field admin-status-field">
                      <label htmlFor={`status-${ticket.id}`}>Status</label>
                      <select
                        id={`status-${ticket.id}`}
                        className={`status-select status-${statusClass}`}
                        value={ticket.status}
                        onChange={(event) =>
                          handleStatusChange(ticket.id, event.target.value)
                        }
                      >
                        <option value="Offen">Offen</option>
                        <option value="In Bearbeitung">In Bearbeitung</option>
                        <option value="Geschlossen">Geschlossen</option>
                      </select>
                    </div>
                  </div>

                  <div className="ticket-description">
                    <strong>Beschreibung</strong>
                    <p>{ticket.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

export default AdminDashboard
