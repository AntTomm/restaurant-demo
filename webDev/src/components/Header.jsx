import { Link } from "react-router-dom";
function Header() { // HEADER IN REACT / JSX
    return (
        <header className="header">
            <div className="logo">Ristorante dell'Amore</div>

    <nav className="navbar">
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
        </ul>
    </nav>
    </header>
    );
}

export default Header;