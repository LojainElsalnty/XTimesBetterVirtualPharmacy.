import React from 'react'

// Styles
import styles from './creditCard.module.css';

export const CreditCard = () => {
    
  return (
    <div className={styles["card"]}>
      <div className={styles["container"]}>
        <div className={styles["card"]}>
            <div className={styles["visa_logo"]}>
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt=""/>
            </div>
            <div className={styles["visa_info"]}>
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt=""/>
                <label className={styles['amount']}></label>
            </div>
            <div className={styles["visa_crinfo"]}>
                <p>{Date.now()}</p>
                <p>{sessionStorage.getItem('name')}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

