import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Slider.module.css";
import lamp from "../assets/Lamp.png";
import bigHeadphones from "../assets/BigHeadphones.png";
import discount from "../assets/discount.png";
import { motion } from "framer-motion";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = (index) => {
    setCurrentIndex(index);
  };

  const slideOffset = -currentIndex * 100;

  return (
    <>
      <div className={styles.sliderContainer}>
        <div
          className={styles.slides}
          style={{
            transform: `translateX(${slideOffset}%)`,
          }}
        >
          <div className={styles.slide}>
            <motion.img
              animate={{ y: 0 }}
              initial={{ y: -400 }}
              transition={{ type: "spring", stiffness: 100, duration: 2 }}
              className={styles.slideLamp}
              src={lamp}
              alt="lamp image"
            />
            <div className={styles.slideContent}>
              <p className={styles.highlighted}>
                Best Headphones For Your Life....
              </p>
              <h1>New Trendy Collection Headphones</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/products" className={styles.slideButton}>
                  Shop Now
                </Link>
              </motion.div>
            </div>
            <div className={styles.slideOffer}>
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                src={bigHeadphones}
                alt="headphones image"
              />
              <motion.img
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className={styles.slideDiscount}
                src={discount}
                alt="discount sticker"
              />
            </div>
          </div>

          <div className={styles.slide}>
            <img className={styles.slideLamp} src={lamp} alt="lamp image" />
            <div className={styles.slideContent}>
              <p className={styles.highlighted}>
                Best Headphones For Your Life....
              </p>
              <h1>New Trendy Collection Headphones</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/products" className={styles.slideButton}>
                  Shop Now
                </Link>
              </motion.div>
            </div>
            <div className={styles.slideOffer}>
              <img src={bigHeadphones} alt="headphones image" />
              <img
                className={styles.slideDiscount}
                src={discount}
                alt="discount sticker"
              />
            </div>
          </div>

          <div className={styles.slide}>
            <img className={styles.slideLamp} src={lamp} alt="lamp image" />
            <div className={styles.slideContent}>
              <p className={styles.highlighted}>
                Best Headphones For Your Life....
              </p>
              <h1>New Trendy Collection Headphones</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/products" className={styles.slideButton}>
                  Shop Now
                </Link>
              </motion.div>
            </div>
            <div className={styles.slideOffer}>
              <img src={bigHeadphones} alt="headphones image" />
              <img
                className={styles.slideDiscount}
                src={discount}
                alt="discount sticker"
              />
            </div>
          </div>
        </div>
        <div className={styles.dots}>
          <span
            className={`${styles.dot} ${
              currentIndex === 0 ? styles.active : ""
            }`}
            onClick={() => currentSlide(0)}
          ></span>
          <span
            className={`${styles.dot} ${
              currentIndex === 1 ? styles.active : ""
            }`}
            onClick={() => currentSlide(1)}
          ></span>
          <span
            className={`${styles.dot} ${
              currentIndex === 2 ? styles.active : ""
            }`}
            onClick={() => currentSlide(2)}
          ></span>
        </div>
      </div>
    </>
  );
}
