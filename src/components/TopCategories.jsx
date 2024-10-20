import { Link } from "react-router-dom";
import styles from "./TopCategories.module.css";
import { useState } from "react";
import useProducts from "../hooks/useProducts";

export default function TopCategories() {
  const { products } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTops = (index) => {
    setCurrentIndex(index);
  };

  const topOffset = -currentIndex * 100;

  return (
    <div className={styles.topContainer}>
      <h1 className={styles.topTitle}>Top Categories</h1>
      <div
        className={styles.tops}
        style={{
          transform: `translateX(${topOffset}%)`,
        }}
      >
        {[
          ["7", "8", "9", "10"],
          ["5", "6", "1", "2"],
          ["3", "4", "11", "12"],
        ].map((group, index) => (
          <div key={index} className={styles.top}>
            {products
              .filter((product) => group.includes(product.id))
              .map((product) => (
                <div key={product.id} className={styles.topContent}>
                  <Link
                    to={`/products/${product.id}`}
                    className={styles.details}
                  >
                    View Category
                  </Link>
                  <img
                    className={styles.image}
                    src={product.image}
                    alt={product.name}
                  />

                  <p className={styles.title}>{product.name}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        <span
          className={`${styles.dot} ${currentIndex === 0 ? styles.active : ""}`}
          onClick={() => currentTops(0)}
        ></span>
        <span
          className={`${styles.dot} ${currentIndex === 1 ? styles.active : ""}`}
          onClick={() => currentTops(1)}
        ></span>
        <span
          className={`${styles.dot} ${currentIndex === 2 ? styles.active : ""}`}
          onClick={() => currentTops(2)}
        ></span>
      </div>
    </div>
  );
}
