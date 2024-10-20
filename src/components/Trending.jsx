import styles from "./Trending.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

export default function Trending() {
  const { products } = useProducts();
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setTrendingProducts(shuffled.slice(0, 4));
  }, [products]);

  return (
    <div className={styles.trendingContainer}>
      <h1 className={styles.title}>Trending Products</h1>
      <div className={styles.products}>
        {trendingProducts.map((product) => (
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
        ))}
      </div>
    </div>
  );
}
