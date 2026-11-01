import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/user">
        <span className="brand-icon">IT</span>
        <span>
          Support<span className="brand-highlight">Desk</span>
        </span>
      </a>

      <nav className="nav-links">
        <NavLink to="/user">
          👤 User Dashboard
        </NavLink>

        <NavLink to="/admin">
          🛠️ Admin Dashboard
        </NavLink>
      </nav>

      <div className="user-profile">
        <div className="avatar">HK</div>

        <div className="user-info">
          <span className="user-name">IT Support Desk</span>
          <span className="user-role">React Project</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar