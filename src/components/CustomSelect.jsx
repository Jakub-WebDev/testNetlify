import React, { useState } from "react";
import styles from "./CustomSelect.module.css";

function LanguageSelector({ option1, option2, option3 }) {
  const [selectedOption, setSelectedOption] = useState(option1);
  const [isOpen, setIsOpen] = useState(false);

  const options = [option1, option2, option3];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.customDropdown} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.selectedOption}>{selectedOption}</div>
      <div className={styles.arrow}></div>
      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
