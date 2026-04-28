import { NavLink } from "react-router-dom";
function Header() { // HEADER IN REACT / JSX
    return (
        <header className="header">
            <div className="logo">Ristorante dell'Amore</div>

    <nav className="navbar">
        <ul className="nav-links">
            <li><NavLink to = "/" className={({isActive}) => (isActive ? "active-link" : "")}>Home</NavLink></li>
            <li><NavLink to = "/menu" className={({isActive}) => (isActive ? "active-link" : "")}>Menu</NavLink></li>
            <li><NavLink to = "/about" className={({isActive}) => (isActive ? "active-link" : "")}>About</NavLink></li>
            <li><NavLink to = "/contact" className={({isActive}) => (isActive ? "active-link" : "")}>Contact Us!</NavLink></li>
            <li><NavLink to ="/Cart" className={({isActive}) => (isActive ? "active-link" : "")}>Cart</NavLink></li>
        </ul>
    </nav>
    </header>
    );
}

export default Header;