import React, { useState } from "react";
import Popup from "./Popup";

const AddToCartButton = ({ product, className, children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupOpen(true);
    setTimeout(() => setIsPopupOpen(false), 3000); // Auto-close after 3 seconds
  };

  const addToCart = async (product, e) => {
    e.preventDefault();

    try {
      // Check if the product is already in the cart
      const response = await fetch(
        `https://6e00-37-128-119-106.ngrok-free.app/cart?id=${product.id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const cartItems = await response.json();

      if (cartItems.length > 0) {
        // The product is already in the cart, show popup message
        showPopup("Product is already in the cart");
        return;
      }

      // If the product is not in the cart, add it with quantity 1
      const newCartItem = {
        id: product.id,
        name: product.name,
        newPrice: product.newPrice,
        image: product.image,
        quantity: 1,
      };

      // Post the new cart item to the server
      const addResponse = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCartItem),
      });

      if (addResponse.ok) {
        showPopup("Product added to the cart successfully");
      } else {
        showPopup("Failed to add product to the cart");
      }
    } catch (error) {
      console.error("Error while adding product to the cart:", error);
      showPopup("An error occurred while adding the product");
    }
  };

  return (
    <>
      <button className={className} onClick={(e) => addToCart(product, e)}>
        {children}
      </button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
      />
    </>
  );
};

export default AddToCartButton;
