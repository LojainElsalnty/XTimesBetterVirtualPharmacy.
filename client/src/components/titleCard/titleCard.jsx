import React from 'react';

import styles from './titleCard.module.css';

export const TitleCard = ({title}) => {
  return (
    <>
        <div className={styles['main__div']}>
            <h1 className={styles['title']}>{title}</h1>
            <div className={styles["box"]}>
                <div className={styles["box-inner"]}></div>
            </div>
        </div>
    </>
  )
}
