import chair from "../assets/Chair.png";
import gradient from "../assets/Gradient.png";
import styles from "./Chair.module.css";

export default function Chair() {
  const addToCart = async () => {
    try {
      // Check if the item is already in the cart
      const response = await fetch(
        "https://6e00-37-128-119-106.ngrok-free.app/cart?id=41",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const cartItems = await response.json();

      if (cartItems.length > 0) {
        // The item is already in the cart, do nothing
        console.log("Item is already in the cart");
        return;
      }

      // If the item is not in the cart, add it with quantity 1
      const newCartItem = {
        id: "41",
        name: "Sofa",
        newPrice: 32,
        image: "Chair.png",
        quantity: 1,
      };

      // Post the new cart item to the server
      const addResponse = await fetch(
        "https://6e00-37-128-119-106.ngrok-free.app/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(newCartItem),
        }
      );

      if (addResponse.ok) {
        console.log("Item added to the cart successfully");
      } else {
        console.log("Failed to add item to the cart");
      }
    } catch (error) {
      console.error("Error while adding item to the cart:", error);
    }
  };

  return (
    <div className={styles.chairContainer}>
      <img className={styles.chairImage} src={chair} alt="chair image" />
      <img
        className={styles.gradientImage}
        src={gradient}
        alt="chair decoration"
      />
      <div className={styles.chairContent}>
        <h1 className={styles.title}>
          Unique Features Of leatest & Trending Poducts{" "}
        </h1>
        <ul className={styles.list}>
          <li className={styles.pink}>
            All frames constructed with hardwood solids and laminates
          </li>
          <li className={styles.blue}>
            Reinforced with double wood dowels, glue, screw - nails corner{" "}
          </li>
          <li className={styles.green}>
            Arms, backs and seats are structurally reinforced
          </li>
        </ul>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={addToCart}>
            Add To Cart
          </button>
          <p className={styles.name}>B&B Italian Sofa $32.00</p>
        </div>
      </div>
    </div>
  );
}
