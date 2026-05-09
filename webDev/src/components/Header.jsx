import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="logo">Ristorante dell'Amore</div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact Us!
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;