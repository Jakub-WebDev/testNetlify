import facebookLogo from "../assets/icons/FB.svg";
import twitterLogo from "../assets/icons/TW.svg";
import instagramLogo from "../assets/icons/INST.svg";
import hektoLogo from "../assets/logo.png";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <footer>
      <div className={styles.footContainer}>
        <div className={styles.footChildren}>
          <img className={styles.logo} src={hektoLogo} alt="Hekto logo" />
          <form className={styles.footForm}>
            <input
              type="text"
              className={styles.footInput}
              placeholder="Enter Email Address"
            />
            <button
              className={styles.footButton}
              onClick={handleSubmit}
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className={styles.footerP}>
            17 Princess Road, London, Greater London NW18JR, UK
          </p>
        </div>
        <div className={styles.footChildren}>
          <ul className={styles.footList}>
            <li>
              <h1>Categories</h1>
            </li>
            <li>
              <a href="#">Latops & Computers</a>
            </li>
            <li>
              <a href="#">Cameras & Photography</a>
            </li>
            <li>
              <a href="#">Smart Phones & Tablets</a>
            </li>
            <li>
              <a href="#">Video Games & Consoles</a>
            </li>
            <li>
              <a href="#">Waterproof Headphones</a>
            </li>
          </ul>
        </div>
        <div className={styles.footChildren}>
          <ul className={styles.footList}>
            <li>
              <h1>Customer Care</h1>
            </li>
            <li>
              <a href="#">My Account</a>
            </li>
            <li>
              <a href="#">Discount</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Orders History</a>
            </li>
            <li>
              <a href="#">Order Tracking</a>
            </li>
          </ul>
        </div>
        <div className={styles.footChildren}>
          <ul className={styles.footList}>
            <li>
              <h1>Pages</h1>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <Link to="/products">Browse the Shop</Link>
            </li>
            <li>
              <a href="#">Category</a>
            </li>
            <li>
              <a href="#">Pre-Built Pages</a>
            </li>
            <li>
              <a href="#">Visual Composer Elements</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.foot}>
        <p>@Webecy - All Rights Reserved</p>
        <div className={styles.footLogos}>
          <a href="https://facebook.com" target="_blank">
            <img src={facebookLogo} alt="facebook logo" />
          </a>
          <a href="https://x.com" target="_blank">
            <img src={twitterLogo} alt="twitter logo" />
          </a>
          <a href="https://instagram.com" target="_blank">
            <img src={instagramLogo} alt="insagram logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
