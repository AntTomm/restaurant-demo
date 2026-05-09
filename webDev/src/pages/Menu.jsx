import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// SLIDESHOW
const slideshowImages = [
  { src: "/images/spaghetti.jpg", alt: "Spaghetti dish" },
  { src: "/images/risotto.jpg", alt: "Risotto dish" },
  { src: "/images/tortellini.jpg", alt: "Tortellini dish" },
  { src: "/images/smokedsalmon.jpg", alt: "Smoked salmon dish" },
  { src: "/images/tiramisu.jpg", alt: "Tiramisu dessert" },
];

function Menu() {
  const [popMessage, setPopMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...item,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setPopMessage(`${item.name} added to cart!`);

    setTimeout(() => {
      setPopMessage("");
    }, 4000);
  }

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch("http://localhost:5000/api/menu");

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previousSlide) =>
        previousSlide === slideshowImages.length - 1 ? 0 : previousSlide + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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