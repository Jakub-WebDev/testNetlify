import styles from "./Favourites.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favourites() {
  const [products, setProducts] = useState([]);
  const [favouritesProducts, setFavouritesProducts] = useState([]);

  useEffect(() => {
    fetch("https://6e00-37-128-119-106.ngrok-free.app/products", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Filter products where favourite is true
    const favourites = products.filter((product) => product.favourite === true);
    setFavouritesProducts(favourites);
  }, [products]);

  return (
    <div className={styles.favouritesContainer}>
      <h1 className={styles.title}>Favourites Products</h1>
      <div className={styles.products}>
        {favouritesProducts.length > 0 ? (
          favouritesProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              className={styles.product}
              key={product.id}
            >
              <img
                className={styles.image}
                src={product.image}
                alt={product.name}
              />
              <p className={styles.name}>{product.name}</p>
              <div className={styles.prices}>
                <p className={styles.price}>${product.newPrice}.00</p>
                <p className={styles.oldPrice}>${product.price}.00</p>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.title}>
            You don't have any favourite products yet.
          </p> // Message displayed when no favourites
        )}
      </div>
    </div>
  );
}
