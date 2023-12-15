import React from 'react'

// Styles
import styles from './creditCard.module.css';

export const CreditCard = ({ children }) => {
    
  return (
    <div className={styles["card"]}>
      <div className={styles["container"]}>
        <div className={styles["card"]}>
            <div className={styles["visa_info"]}>
                <img src="../../../src/assets/img/money.svg"  alt=""/>
                {children}
            </div>
        </div>
      </div>
    </div>
  )
}

