import React, { useState } from 'react';
import styles from './medicineSearchBar.module.css';
const searchBar = ({ onSearch, onClear }) => {
    const [medicineName, setMedicineName] = useState('');

    const handleInputChange = (e) => {
        setMedicineName(e.target.value)
    }

    //to handle clicking on "search button"
    const handleSearchClick = () => {
        onSearch(medicineName)
    }
    //to handle clicking "cancel search button"
    const handleClearSearch = () => {
        onClear()
        setMedicineName('');
    }
    //to handle pressing "enter" to search
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(medicineName)
        }
    }

    return (
        <div className={styles["search-container"]}>
            <input className={styles["search-bar"]} type="text" placeholder='Medicine Name' value={medicineName} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <button className={styles["search-button"]} onClick={handleSearchClick}>Search</button>
            <button className={styles["clear-button"]} onClick={handleClearSearch}>Clear Search</button>
        </div>
    );

}

export default searchBar
