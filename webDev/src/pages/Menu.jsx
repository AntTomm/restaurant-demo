import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// SLIDESHOW
const slideshowImages = [
    {
      src: "/images/spaghetti.jpg",
      alt: "Spaghetti dish",
    },
    {
      src: "/images/risotto.jpg",
      alt: "Risotto dish",
    },
    {
      src: "/images/tortellini.jpg",
      alt: "Tortellini dish",
    },
    {
      src: "/images/smokedsalmon.jpg",
      alt: "Smoked salmon dish",
    },
    {
      src: "/images/tiramisu.jpg",
      alt: "Tiramisu dessert",
    },
  ];


// MENU ITEMS FORMATTED
const menuItems = [
    {
        category: "Antipasto",
        items: [
            {
            id: 1,
            name: "Pate Di Fegato",
            description: "Liver Pate",
            price: 5.5,
            },
            {
                id: 2,
                name: "Prosciutto E Melone",
                description: "Cured Ham & Melon",
                price: 6.0,
            },
            {
                id: 3,
                name: "Salmone affumicato",
                description: "Smoked Salmon",
                price: 10.3,
            },
        ],
    },
    {
        category: "Primi Piatti",
        items: [
            {
                id: 4,
                name: "Tortellini In Brodo",
                description: "Tortellini in Broth",
                price: 7.0,
            },
            {
                id: 5,
                name: "Gnocchi Al Sugo Di Pomodoro",
                description: "Dumplings with Tomato Sauce",
                price: 6.5,
            },
            {
                id: 6,
                name: "Risotto Alla Marinara",
                description: "Creamy Rice with Seafood",
                price: 8.5
            },
            {
                id: 7,
                name: "Spaghetti Alla Bolognese",
                description: "Spaghetti with Meat Sauce",
                price: 6.3,
            },
        ],
    },
    {
        category: "Contorni",
        items: [
          {
            id: 8,
            name: "Peperoni Alla Griglia",
            description: "Grilled Peppers",
            price: 3.5,
          },
          {
            id: 9,
            name: "Zucchine e Fagiolini",
            description: "Zucchini & Green Beans",
            price: 5.2,
          },
        ],
      },
      {
        category: "Bevande",
        items: [
          {
            id: 10,
            name: "Vino Della Casa",
            description: "House Wine",
            price: 4.0,
          },
          {
            id: 11,
            name: "Birra",
            description: "Beer",
            price: 2.0,
          },
          {
            id: 12,
            name: "Acqua Minerale",
            description: "Mineral Water Still / Sparkling",
            price: 2.0,
          },
        ],
      },
];


function Menu() {
    function addToCart(item){
        const cart = JSON.parse(localStorage.getItem("cart")) || []; 
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if(existingItem){
            existingItem.quantity += 1;
        }
        else {
            cart.push({
                ...item,
                quantity: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${item.name} added to your cart!`);
    }

    // SLIDESHOE FUNCTIONALITY
    const [currentSlide, setCurrentSlide] = useState(0);

        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentSlide((previousSlide) =>
                previousSlide === slideshowImages.length - 1 ? 0 : previousSlide + 1);
            }, 3000);

            return () => clearInterval(timer);
        }, []);

    return (
        <main className="page menu-page">
            <h1>Il Menu</h1>
            <div className="menu-slideshow">
                <img src={slideshowImages[currentSlide].src}
                alt = {slideshowImages[currentSlide].alt}
                />

                <div className="slideshow-dots">
                    {slideshowImages.map((image, index) => (
                        <button key={image.src} className={index === currentSlide ? "dot active-dot" : "dot"}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Show slide ${index+1}`}
                        ></button>
                    ))}
                </div>
            </div>

            {menuItems.map((section) => (
                <section className="menu-category" key={section.category}>
                    <h2>{section.category}</h2>

                    {section.items.map((item) => (
                        <div className="menu-item" key={item.id}>
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

            {/* <div className="menu-slideshow">
                <img src={slideshowImages[currentSlide].src}
                alt = {slideshowImages[currentSlide].alt}
                />

                <div className="slideshow-dots">
                    {slideshowImages.map((image, index) => (
                        <button key={image.src} className={index === currentSlide ? "dot active-dot" : "dot"}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Show slide ${index+1}`}
                        ></button>
                    ))}
                </div>
            </div> */}
        </main>
    );
  }
  
  export default Menu;