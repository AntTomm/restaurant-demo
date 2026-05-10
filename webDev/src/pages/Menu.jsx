import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// SLIDESHOW
const slideshowImages = [
  { src: "/images/spaghetti.jpg", alt: "Spaghetti dish" },
  { src: "/images/risotto.jpg", alt: "Risotto dish" },
  { src: "/images/tortellini.jpg", alt: "Tortellini dish" },
  { src: "/images/smokedsalmon.jpg", alt: "Smoked salmon dish" },
  { src: "/images/tiramisu.jpg", alt: "Tiramisu dessert" },
];

// menu
function Menu() {
  const [popMessage, setPopMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  
  // adds selected menu item to database cart
  // sends POST request to backend -> cart updates
  // get saved in db
  async function addToCart(item) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to cart.");
      }
  
      setPopMessage(`${item.name} added to cart!`);
  
      setTimeout(() => {
        setPopMessage("");
      }, 4000);
    } catch (error) {
      console.error(error);
      setPopMessage("Could not add item to cart.");
  
      setTimeout(() => {
        setPopMessage("");
      }, 4000);
    }
  }


  // loads all menu items from backend when page first opens
  // backend gets menu data from db & sends to frontend
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/menu`);

        if (!response.ok) {
          throw new Error("Failed to fetch menu.");
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError("Could not load menu items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);


  // runs menu slideshow automatically
  useEffect(() => {
    const timer = setInterval(() => {
        // switches to next img every 3 seconds & loops back to start
      setCurrentSlide((previousSlide) =>
        previousSlide === slideshowImages.length - 1 ? 0 : previousSlide + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // shows msg while menu data is being fetched
  if (loading) {
    return (
      <main className="page menu-page">
        <h1>Il Menu</h1>
        <p>Loading menu...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page menu-page">
        <h1>Il Menu</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="page menu-page">
      <h1>Il Menu</h1>

      {popMessage && <div className="popUp">{popMessage}</div>}

      <div className="menu-slideshow">
        <img
          src={slideshowImages[currentSlide].src}
          alt={slideshowImages[currentSlide].alt}
        />

        <div className="slideshow-dots">
          {slideshowImages.map((image, index) => (
            <button
              key={image.src}
              className={index === currentSlide ? "dot active-dot" : "dot"}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Show slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {menuItems.map((section) => (
        <section className="menu-category" key={section.category}>
          <h2>{section.category}</h2>

          {section.items.map((item) => (
            <div className="menu-item" key={item._id}>
              <div className="menu-item-header">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="price-cart">
                  <span>${item.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(item)}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      ))}

      <Link to="/cart" className="cart-link">
        <button>View Cart</button>
      </Link>
    </main>
  );
}

export default Menu;