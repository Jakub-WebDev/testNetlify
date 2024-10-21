import React from "react";
import styles from "./Popup.module.css"; // Include a CSS file for styles

const Popup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.chatBubble} onClick={onClose}>
      <p>{message}</p>
    </div>
  );
};

export default Popup;
