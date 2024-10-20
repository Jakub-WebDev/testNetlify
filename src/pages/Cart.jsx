import styles from "./Cart.module.css";
import emptyCart from "../assets/emptyCart.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const fetchCartItems = async () => {
    const response = await fetch(
      "https://7ce9-195-191-163-209.ngrok-free.app/cart"
    );
    const data = await response.json();
    setCartItems(data);
    calculateSubtotal(data);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateSubtotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.newPrice * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const handleIncrement = async (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);
    await updateCartItem(
      id,
      updatedItems.find((item) => item.id === id).quantity
    );
  };

  // Handle decrementing item quantity
  const handleDecrement = async (id) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove items with 0 quantity

    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);

    if (updatedItems.find((item) => item.id === id)) {
      await updateCartItem(
        id,
        updatedItems.find((item) => item.id === id).quantity
      );
    } else {
      await deleteCartItem(id);
    }
  };

  const updateCartItem = async (id, quantity) => {
    await fetch(`https://7ce9-195-191-163-209.ngrok-free.app/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
  };

  const deleteCartItem = async (id) => {
    await fetch(`https://7ce9-195-191-163-209.ngrok-free.app/cart/${id}`, {
      method: "DELETE",
    });
  };

  const clearCart = async () => {
    try {
      // Fetch all items currently in the cart
      const response = await fetch(
        "https://7ce9-195-191-163-209.ngrok-free.app/cart"
      );
      const cartItems = await response.json();

      // Loop through each cart item and send a DELETE request
      for (const item of cartItems) {
        await fetch(
          `https://7ce9-195-191-163-209.ngrok-free.app/cart/${item.id}`,
          {
            method: "DELETE",
          }
        );
      }

      setCartItems([]);
      setSubtotal(0);

      console.log("Cart has been cleared successfully");
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  return (
    <div className={styles.cartPage}>
      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <img
            className={styles.emptyImage}
            src={emptyCart}
            alt="empty cart drawing"
          />
          <h1 className={styles.emptyInfo}>Your Cart Is Empty</h1>
          <Link className={styles.emptyButton} to="/products">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.cart}>
          <div className={styles.items}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <Link to={`/products/${item.id}`}>
                  <img
                    className={styles.image}
                    src={item.image}
                    alt={item.name}
                  />
                </Link>
                <div className={styles.itemDetails}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.price}>${item.newPrice}.00</div>
                </div>
                <div className={styles.buttons}>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>
                <div className={styles.totalPrice}>
                  ${item.newPrice * item.quantity}.00
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className={styles.checkoutDetails}>
              <div className={styles.shippingPriceContainer}>
                <div className={styles.shippingText}>Subtotal:</div>
                <div className={styles.shippingPrice}>${subtotal}.00</div>
              </div>
              <div className={styles.shippingPriceContainer}>
                <div className={styles.shippingText}>Total:</div>
                <div className={styles.shippingPrice}>${subtotal + 100}.00</div>
              </div>
              <div className={styles.itemPriceContainer}>
                <div className={styles.itemText}>Shipping:</div>
                <div className={styles.itemPrice}>$100.00</div>
              </div>
              <button className={styles.checkoutButton}>
                Proceed to checkout
              </button>
            </div>

            <button onClick={clearCart} className={styles.clearButton}>
              Clear cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
