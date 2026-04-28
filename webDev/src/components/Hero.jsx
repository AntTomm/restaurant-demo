function Hero({
    title = "Ristorante dell'Amore", subtitle = "The Best Italian Food You'll Taste."
}){
    return (
        <section className="hero">
            <div className="hero-text">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </section>
    );
}

export default Hero;