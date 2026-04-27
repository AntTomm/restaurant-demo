function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Ristorante dell'Amore</h3>
                    <p>Authentica cucina italiana nel cuore di New York.</p>
                    <p>Created by Anthony Tommaso</p>
                </div>

                <div className="footer-section">
                    <h3>Hours</h3>
                    <p> Mon - Thu: 11:00 AM - 10:00 PM</p>
                    <p> Fri - Sat: 11:00 AM - 11:00 PM</p>
                    <p> Sun: 12:00 PM - 9:00 PM</p>
                </div>

                <div className="footer-section">
                    <h3>Follow Us.</h3>
                    <a href="#">Instagram</a>
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                </div>
            </div>

            <p className="footer-bottom">© 2026 Ristorante dell'Amore</p>
        </footer>
    );
}

export default Footer;