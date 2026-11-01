//HAmidkhadir
import { useState } from 'react'

function UserDashboard({ tickets, setTickets }) {
  const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Hardware')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Normal')

  // Neues Ticket erstellen
  function handleSubmit(event) {
    event.preventDefault()

    const newTicket = {
      id: Date.now(),
      title,
      category,
      description,
      priority,
      status: 'Offen',
      createdAt: new Date().toLocaleDateString('de-DE'),
    }

   setTickets((previousTickets) => [newTicket, ...previousTickets])

    setTitle('')
    setCategory('Hardware')
    setDescription('')
    setPriority('Normal')
    setShowForm(false)
  }

  // Ticket ohne Bestätigung löschen
  function handleDelete(id) {
    setTickets((previousTickets) =>
      previousTickets.filter((ticket) => ticket.id !== id)
    )
  }

  return (
    <main className="main-content user-dashboard">
      <section className="welcome-section">
        <div>
          <p className="eyebrow">USER PORTAL</p>
          <h1>Willkommen im User Dashboard</h1>
          <p className="welcome-description">
            Hier kannst du deine Support-Anfragen verwalten.
          </p>
        </div>

        <button
          className="primary-button"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Abbrechen' : '+ Neues Ticket'}
        </button>
      </section>

      {showForm && (
        <section className="ticket-form-container">
          <h2>Neues Ticket erstellen</h2>

          <form className="ticket-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="title">Titel</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="z. B. Computer startet nicht"
                maxLength={120}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="category">Kategorie</label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Netzwerk">Netzwerk</option>
                <option value="Drucker">Drucker</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="priority">Priorität</label>
              <select
                id="priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="Low">Niedrig</option>
                <option value="Normal">Normal</option>
                <option value="High">Hoch</option>
                <option value="Urgent">Dringend</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="description">Beschreibung</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Beschreibe dein Problem ..."
                rows={5}
                maxLength={3000}
                required
              />
            </div>

            <button className="primary-button form-submit" type="submit">
              Ticket erstellen
            </button>
          </form>
        </section>
      )}

      <section className="tickets-section">
        <div className="section-heading">
          <div>
            <h2>Meine Tickets</h2>
            <p>Alle deine Support-Anfragen auf einen Blick.</p>
          </div>

          <span className="ticket-count">{tickets.length} Tickets</span>
        </div>

        {tickets.length === 0 ? (
          <p className="welcome-description">
            Noch keine Tickets vorhanden.
          </p>
        ) : (
          <div className="ticket-list">
            {tickets.map((ticket) => (
              <article className="ticket-card" key={ticket.id}>
                <h3>{ticket.title || 'Ohne Titel'}</h3>

                <div className="ticket-info">
                  <p>
                    <strong>Kategorie:</strong> {ticket.category}
                  </p>

                  <p>
                    <strong>Priorität:</strong> {ticket.priority}
                  </p>

                  <p>
                  <strong>Status:</strong>{' '}
                   <span className={`status-text status-${ticket.status.replaceAll(' ', '-').toLowerCase()}`}>
                    {ticket.status}
                    </span>
                  </p>

                  <p>
                    <strong>Erstellt am:</strong> {ticket.createdAt}
                  </p>
                </div>

                <div className="ticket-description">
                  <strong>Beschreibung</strong>
                  <p>{ticket.description}</p>
                </div>

                <button
                  className="danger-button"
                  type="button"
                  onClick={() => handleDelete(ticket.id)}
                >
                  Löschen
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default UserDashboard