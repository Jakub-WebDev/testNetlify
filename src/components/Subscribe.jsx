import styles from "./Subscribe.module.css";

export default function Subscribe() {
  return (
    <div className={styles.subscribe}>
      <h1 className={styles.title}>
        Get Latest Update By Subscribing To Our Newsletter
      </h1>
      <button className={styles.button}>Subscribe</button>
    </div>
  );
}
