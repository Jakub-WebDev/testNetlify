import React from "react";

const AddToCartButton = ({ product, className, children }) => {
  const addToCart = async (product, e) => {
    e.preventDefault();

    try {
      // Check if the product is already in the cart
      const response = await fetch(
        `https://7ce9-195-191-163-209.ngrok-free.app/cart?id=${product.id}`
      );
      const cartItems = await response.json();

      if (cartItems.length > 0) {
        // The product is already in the cart, do nothing
        alert("Product is already in the cart");
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
      const addResponse = await fetch(
        "https://7ce9-195-191-163-209.ngrok-free.app/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCartItem),
        }
      );

      if (addResponse.ok) {
        alert("Product added to the cart successfully");
      } else {
        alert("Failed to add product to the cart");
      }
    } catch (error) {
      console.error("Error while adding product to the cart:", error);
    }
  };

  return (
    <button className={className} onClick={(e) => addToCart(product, e)}>
      {children}
    </button>
  );
};

export default AddToCartButton;
