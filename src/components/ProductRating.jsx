import styles from "./ProductRating.module.css";

const Star = ({ fill }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function ProductRating({ rating }) {
  const maxRating = 5;
  const yellow = "#F9BA00";
  const grey = "#E5E0FC";

  return (
    <figure className={styles.productRating}>
      {Array.from({ length: maxRating }, (v, i) => (
        <Star key={i} fill={i < rating ? yellow : grey} />
      ))}
    </figure>
  );
}
