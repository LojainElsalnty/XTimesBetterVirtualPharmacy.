import React, { useEffect, useState } from 'react';

import styles from './medicineDetails.module.css'
import medImage from '../../assests/images/medicineImage.jpg';

const MedicineDetails = ({ medicine }) => {
    // Convert the Buffer data into a data URL
    // const imageDataUrl = `data:${medicine.image.contentType};base64,${medicine.image.data.toString('base64')}`;

    //console.log(imageDataUrl);
    return (
        <tr>
            {/* <td><img src={imageDataUrl} alt={medicine.image.filename} /></td> */}
            {/* <td><img src={medImage} className={styles.medimage} /></td> */}
            <td><img src={medicine.image} alt="Medicine Image" style={{ width: '150px', height: 'auto' }} /></td>
            <td>{medicine.name}</td>
            <td>{medicine.price}</td>
            <td>{medicine.activeIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}</td>
            <td>{medicine.medicinalUses.map((use, index) => (
                <li key={index}>{use}</li>
            ))}</td>
            <td>{!medicine.availableQuantity ? 'Out of Stock' : 'Available'}</td>
        </tr>
    )
}

export default MedicineDetails