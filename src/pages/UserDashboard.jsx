import { useState } from 'react'

function UserDashboard(props) {
  const [showForm, setShowForm] = useState(false)
  const [deletingTicketId, setDeletingTicketId] = useState(null)

  // Kontrolliert die Eingaben des Formulars als React-State.
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Hardware')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Normal')

  // Erstellt ein Ticket, ergänzt Datum und Uhrzeit und setzt das Formular zurück.
  function handleSubmit(event) {
    event.preventDefault()

    const newTicket = {
      id: Date.now(),
      title: title.trim(),
      category,
      description: description.trim(),
      priority,
      status: 'Offen',
      createdAt: new Date().toLocaleString('de-DE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    }

    // Das neue Ticket wird oben in die gemeinsame Ticketliste eingefügt.
    props.setTickets((previousTickets) => [newTicket, ...previousTickets])

    setTitle('')
    setCategory('Hardware')
    setDescription('')
    setPriority('Normal')
    setShowForm(false)
  }

  // Zeigt die Löschanimation 1,5 Sekunden lang und blockiert weitere Lösch-Klicks.
  function handleDelete(id) {
    if (deletingTicketId !== null) return

    setDeletingTicketId(id)
    window.setTimeout(() => {
      props.setTickets((previousTickets) =>
        previousTickets.filter((ticket) => ticket.id !== id)
      )
      setDeletingTicketId(null)
    }, 1500)
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
          onClick={() => setShowForm((isOpen) => !isOpen)}
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
          <span className="ticket-count">{props.tickets.length} Tickets</span>
        </div>

        {props.tickets.length === 0 ? (
          <p className="welcome-description">Noch keine Tickets vorhanden.</p>
        ) : (
          <div className="ticket-list">
            {props.tickets.map((ticket) => {
              const statusClass = ticket.status
                .replaceAll(' ', '-')
                .toLowerCase()

              return (
                <article className={'ticket-card ' + (deletingTicketId === ticket.id ? 'ticket-card-deleting' : '')} key={ticket.id}>
                  <h3 className={ticket.status === 'Geschlossen' ? 'ticket-title-closed' : ''}>{ticket.title || 'Ohne Titel'}</h3>

                  <div className="ticket-info">
                    <p>
                      <strong>Kategorie:</strong> {ticket.category}
                    </p>
                    <p>
                      <strong>Priorität:</strong>{' '}
                      <span className={`priority-text priority-${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`status-text status-${statusClass}`}>
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

                  {/* Bei geschlossenen Tickets wird die Löschen-Schaltfläche hervorgehoben. */}
                  <button
                    className={`danger-button ${ticket.status === 'Geschlossen' ? 'danger-button-closed' : ''}`}
                    type="button"
                    disabled={deletingTicketId !== null}
                    onClick={() => handleDelete(ticket.id)}
                  >
                    {deletingTicketId === ticket.id ? 'Wird gelöscht …' : 'Löschen'}
                  </button>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

export default UserDashboard
