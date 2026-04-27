import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useState(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            return savedCart;
    }, []);

    function updateCart(newCart){
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    function removeCart(id){
        const updatedCart = cart
        .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1} : item
        )
        .filter((item) => item.quantity > 0);
    
    updateCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
        localStorage.removeItem("cart");
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return (
        <main className="page cart-page">
            <h1> Your Shopping Cart</h1>

            {cart.length === 0 ? (<div className="empty-cart">
                <p>Your cart is empty!</p>

                <Link to="/menu">
                    <button>Back to Menu</button>
                </Link>
            </div>) : (
                <>
                <div className="cart-items">
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>

                            <button onClick={() => removeCart(item.id)}>
                                Remove
                            </button>
                            </div>
                    ))}
                </div>

                <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>

                <div className="cart-actions">
                    <button onClick={clearCart}>Clear Cart</button>

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