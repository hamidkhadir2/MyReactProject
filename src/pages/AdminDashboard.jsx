import { useState } from 'react'

function AdminDashboard({ tickets, setTickets }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Alle Kategorien')
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)

  const categories = [...new Set(tickets.map((ticket) => ticket.category).filter(Boolean))]
  const categoryOptions = ['Alle Kategorien', ...categories].filter((category) =>
    category.toLowerCase().includes(search.trim().toLowerCase())
  )

  function handleStatusChange(id, newStatus) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    )
  }

  const filteredTickets = tickets.filter((ticket) => {
    const searchTerm = search.trim().toLowerCase()
    const title = (ticket.title ?? '').toLowerCase()
    const category = (ticket.category ?? '').toLowerCase()
    const matchesSearch = title.includes(searchTerm) || category.includes(searchTerm)
    const matchesCategory =
      selectedCategory === 'Alle Kategorien' || ticket.category === selectedCategory

    return matchesSearch && matchesCategory
  })

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

        <div className="ticket-search-combobox">
          <input
            className="ticket-search"
            type="text"
            role="combobox"
            aria-label="Tickets suchen oder Kategorie auswählen"
            aria-expanded={categoryMenuOpen}
            aria-controls="ticket-category-options"
            placeholder="Ticket suchen oder Kategorie wählen..."
            value={search || (selectedCategory !== 'Alle Kategorien' ? selectedCategory : '')}
            onFocus={() => setCategoryMenuOpen(true)}
            onChange={(event) => {
              setSearch(event.target.value)
              setSelectedCategory('Alle Kategorien')
              setCategoryMenuOpen(true)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setCategoryMenuOpen(false)
            }}
          />
          {categoryMenuOpen && (
            <div className="ticket-category-options" id="ticket-category-options" role="listbox">
              {categoryOptions.length > 0 ? (
                categoryOptions.map((category) => (
                  <button
                    type="button"
                    className="ticket-category-option"
                    key={category}
                    role="option"
                    aria-selected={selectedCategory === category}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setSelectedCategory(category)
                      setSearch('')
                      setCategoryMenuOpen(false)
                    }}
                  >
                    {category}
                  </button>
                ))
              ) : (
                <p className="ticket-category-empty">Keine passende Kategorie</p>
              )}
            </div>
          )}
        </div>

        {filteredTickets.length === 0 ? (
          <p className="welcome-description">Keine Tickets gefunden.</p>
        ) : (
          <div className="ticket-list">
            {filteredTickets.map((ticket) => (
              <article className="ticket-card" key={ticket.id}>
                <h3>{ticket.title}</h3>

                <div className="admin-ticket-meta">
                  <div className="ticket-info">
                    <p><strong>Kategorie:</strong> {ticket.category}</p>
                    <p><strong>Priorität:</strong> {ticket.priority}</p>
                    <p><strong>Erstellt am:</strong> {ticket.createdAt}</p>
                  </div>
                  <div className="form-field admin-status-field">
                    <label htmlFor={`status-${ticket.id}`}>Status</label>
                    <select
                      id={`status-${ticket.id}`}
                      className={`status-select status-${ticket.status.replaceAll(' ', '-').toLowerCase()}`}
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
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default AdminDashboard