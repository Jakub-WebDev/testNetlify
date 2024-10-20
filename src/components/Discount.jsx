import { useState } from "react";
import styles from "./Discount.module.css";
import HeadphonesImg from "../assets/BigHeadphones.png";
import LaptopImg from "../assets/products/laptop.png";
import ChairImg from "../assets/Chair.png";
import { Link } from "react-router-dom";

export default function Discount() {
  const [item, setItem] = useState(["Headphones", 2]);
  const imageMap = {
    Headphones: HeadphonesImg,
    Laptop: LaptopImg,
    Chair: ChairImg,
  };

  return (
    <div className={styles.discountContainer}>
      <div className={styles.navigation}>
        <h1 className={styles.title}>Discount Item</h1>
        <button onClick={() => setItem(["Headphones", 2])}>Headphones</button>
        <button onClick={() => setItem(["Laptop", 3])}>Laptop</button>
        <button onClick={() => setItem(["Chair", 41])}>Other</button>
      </div>
      <div className={styles.discountContent}>
        <h1 className={styles.contentTitle}>20% Discount Of All Products</h1>
        <p className={styles.contentName}>{item[0]} Compact</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget
          feugiat habitasse nec, bibendum condimentum.
        </p>
        <ul>
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5L5.5 12L14 3.5"
                stroke="#101750"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Material expose like metals
          </li>
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5L5.5 12L14 3.5"
                stroke="#101750"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Simple neutral colours.
          </li>
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5L5.5 12L14 3.5"
                stroke="#101750"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Clear lines and geomatric figures
          </li>
          <li>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8.5L5.5 12L14 3.5"
                stroke="#101750"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Material expose like metals
          </li>
        </ul>
        <Link to={`/products/${item[1]}`} className={styles.contentButton}>
          Shop Now
        </Link>
      </div>
      <img
        className={styles.discountImage}
        src={imageMap[item[0]]}
        alt="product image"
      />
    </div>
  );
}
