import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderMessage, setOrderMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);


  // fetches current cart from backedn
  // gets cart document from mongo & stores items
  // in a react state
  async function fetchCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`);

      if (!response.ok) {
        throw new Error("Failed to fetch cart.");
      }

      const data = await response.json();
      setCart(data.items || []);
    } catch (error) {
      console.error(error);
      setOrderMessage("Could not load cart.");
    } finally {
      setLoading(false);
    }
  }


  // runs when page first loads
  // calls backend so the cart page always shows
  // the curr cart in database
  useEffect(() => {
    async function loadCart() {
      await fetchCart();
    }
  
    loadCart();
  }, []);


  // removes 1 quantity of specific item in cart
  // sends PUT request to backend -> updates
  // database & returns new cart
  async function removeCart(menuItemId) {
    try {
        const response = await fetch(
        `http://localhost:5000/api/cart/${menuItemId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart.");
      }

      const updatedCart = await response.json();
      setCart(updatedCart.items || []);
    } catch (error) {
      console.error(error);
      setOrderMessage("Could not update cart.");
    }
  }


  // clears entire cart
  // sends DELETE request to backend
  // -> empties cart in mongo
  async function clearCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to clear cart.");
      }
  
      const updatedCart = await response.json();
      setCart(updatedCart.items || []);
    } catch (error) {
      console.error(error);
      setOrderMessage("Could not clear cart.");
    }
  }

  // new function i created entirely,
  // places an order using items in curr cart
  // sends order data -> backend -> saves in mongodb
  // -> clears cart after successful order
  async function placeOrder() {
    if (cart.length === 0) return;

    setPlacingOrder(true);
    setOrderMessage("");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderData = {
      items: cart.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

      await clearCart();
      setOrderMessage("Order placed successfully!");
    } catch (error) {
      console.error(error);
      setOrderMessage("Could not place order.");
    } finally {
      setPlacingOrder(false);
    }
  }


  // creates total price of all items
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // shows loading msg while cart data is fetched
  if (loading) {
    return (
      <main className="page cart-page">
        <h1>Your Shopping Cart</h1>
        <p>Loading cart...</p>
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <h1>Your Shopping Cart</h1>

      {orderMessage && <p>{orderMessage}</p>}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty!</p>

          <Link to="/menu">
            <button>Back to Menu</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.menuItemId}>
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <button onClick={() => removeCart(item.menuItemId)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>

          <div className="cart-actions">
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={placeOrder} disabled={placingOrder}>
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>

            <Link to="/menu">
              <button>Back to Menu</button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;