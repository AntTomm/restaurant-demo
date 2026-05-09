import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart;
  });

  const [orderMessage, setOrderMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function removeCart(id) {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  async function placeOrder() {
    if (cart.length === 0) return;

    setPlacingOrder(true);
    setOrderMessage("");

    const orderData = {
      items: cart.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

      clearCart();
      setOrderMessage("Order placed successfully!");
    } catch (error) {
      console.error(error);
      setOrderMessage("Could not place order.");
    } finally {
      setPlacingOrder(false);
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
              <div className="cart-item" key={item._id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <button onClick={() => removeCart(item._id)}>Remove</button>
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