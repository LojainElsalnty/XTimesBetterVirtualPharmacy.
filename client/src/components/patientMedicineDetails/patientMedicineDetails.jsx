import React, { useEffect, useState } from 'react';

import styles from './patientMedicineDetails.module.css'
import medImage from '../../assests/images/medicineImage.jpg';

const PatientMedicineDetails = ({ medicine, addToCart }) => {
    // Convert the Buffer data into a data URL
    // const imageDataUrl = `data:${medicine.image.contentType};base64,${medicine.image.data.toString('base64')}`;

    //console.log(imageDataUrl);
    return (
        <tr>
            {/* <td><img src={imageDataUrl} alt={medicine.image.filename} /></td> */}
            <td><img src={medImage} className={styles.medimage} /></td>
            <td>{medicine.name}</td>
            <td>{medicine.price}</td>
            <td>{medicine.activeIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}</td>
            <td>{medicine.medicinalUses.map((use, index) => (
                <li key={index}>{use}</li>
            ))}</td>
            <td>{!medicine.availableQuantity ? <span className={styles["out-of-stock"]}>Out of Stock</span> : 'Available'}</td>
            <td>
                {!medicine.availableQuantity ? <span className={styles["out-of-stock"]}>Out of Stock</span> : (<button className={styles["green-button"]} onClick={() => addToCart(medicine.name)}>Add to Cart</button>)}
            </td>
        </tr>
    )
}

export default PatientMedicineDetails