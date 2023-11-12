import classNames from 'classnames';
import styles from './navBar.module.css';

// Components
import { NavLink, Link } from 'react-router-dom';

// Hooks
import { useState } from 'react';

export const Navbar = ({ className, name, list }) => {
    return (
        <div className={classNames(styles.root, className, styles.navbar)}>
            <div className={styles['navbar-logo']}>
            </div>
            <ul className={styles['navbar-list']}>
                {
                    list.map((item, index) => {
                        return (<li key={index} className={styles['navbar-list']}><Link to={item.url}>{item.pageName}</Link></li>);
                    })
                }
            </ul>
        </div>
    );
};