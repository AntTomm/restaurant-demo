function About() {
    return (
      <main className="page about-page">
        <h1>About Us</h1>
        
        <div className="about-content">
          <div className="about-text">
            <h2>
              Our Story...
            </h2>

            <p>
            Ristorante dell'Amore was created to bring authentic Italian food,
            warm hospitality, and a welcoming dining experience to the heart of
            New York City.
            </p>

            <p>
            From handmade pasta to fresh antipasti and classic pizzas, every dish is prepared with care and high-quality ingredients. 
            We believe that meals should bring people together, 
            which is why our restaurant focuses on creating an experience filled with flavor, hospitality, and love.
            </p>

            <p>
            Whether you are dining with family, meeting friends, or ordering
            from home, we want every dish to feel like it was made with care.
            </p>
          </div>

          <div className="about-image">
            <img src="/images/interior.png" alt="Inside Our restaurant!" />
          </div>
        </div>
      </main>
    );
  }
  
  export default About;