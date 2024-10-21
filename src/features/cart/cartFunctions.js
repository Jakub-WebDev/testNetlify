// cartUtils.js
export const addToCart = async (product) => {
  try {
    // Fetch the current cart items
    const response = await fetch(
      "https://6e00-37-128-119-106.ngrok-free.app/cart",
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const cartItems = await response.json();

    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      console.log("Product already in the cart");
      return;
    }

    // Add the product to the cart
    await fetch("https://6e00-37-128-119-106.ngrok-free.app/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ ...product, quantity: 1 }),
    });

    console.log("Product added to the cart");
  } catch (error) {
    console.error("Failed to add product to cart", error);
  }
};
