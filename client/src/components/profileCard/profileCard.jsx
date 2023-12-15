import React from 'react';

// Styles
import styles from './profileCard.module.css';

export const ProfileCard = (information) => {
    console.log('Information');
    console.log(information);

    return (
        <div className={styles['main__div']}>
            <ul className={styles['profile__ul']}>
                {information.info.map((info, index) => {
                    return (
                        <li key={index} className={styles['profile__li']}>
                            <div className={styles['info__div']}>
                                <p className={styles['profile__name']}>{info.name}</p>
                                <p className={styles['profile__value']}>{info.value}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}