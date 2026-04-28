function Home() {
    return (
      <>
        <main className="home-intro">
          <div className="home-intro-container">
            <div className="home-intro-content">
              <div className="home-text">
                <h2>Welcome to Ristorante dell'Amore</h2>

            {/* CONTENT */}
                <p>
                  Located in the heart of New York City, Ristorante dell'Amore
                  brings authentic Italian flavors and warm hospitality to every
                  guest who walks through our doors.
                </p>
  
                <p>
                  Our chefs combine traditional recipes with fresh ingredients to
                  create dishes that celebrate the culinary heritage of Italy.
                  Whether you're dining in or ordering delivery, every meal is
                  prepared with passion and care.
                </p>
  
                <h2>WE DELIVER! Stop in now & give us a try!</h2>
              </div>
  
              <div className="home-image">
                <img src="/images/tiramisu.jpg" alt="Tiramisu Dessert" />
                <img src="/images/interior.png" alt="Inside the restaurant" />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
  
  export default Home;