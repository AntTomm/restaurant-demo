function Contact() {
    return (
      <main className="page contact-page">
        <h1>Contact Us!</h1>
        <p className="contact-subtitle">We would love to hear from our customers.</p>

        <div className="contact-content">
          <div className="map-container">
            <iframe title="Little Italy Map"
            src ="https://www.google.com/maps?q=Little%20Italy,%20New%20York,%20NY&output=embed"
            loading = "lazy"
            allowFullScreen></iframe>
          </div>

          <form className="contact-form">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" />
            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" />

            <label htmlFor="message">Message</label>
            <textarea id = "message" rows = "6" placeholder="Write your message here:"></textarea>

            <button type="button">Send Message</button>
          </form>
        </div>
      </main>
    );
  }
  
  export default Contact;