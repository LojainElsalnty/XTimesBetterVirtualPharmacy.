import React, { useEffect, useState } from 'react';

import styles from './pharmacistMedicineDetails.module.css'
import medImage from '../../assests/images/medicineImage.jpg';


const PharmacistMedicineDetails = ({ medicine, redirectToEdit, archiveMedicine, UnarchiveMedicine }) => {
    // Convert the Buffer data into a data URL
    // const imageDataUrl = `data:${medicine.image.contentType};base64,${medicine.image.data.toString('base64')}`;

    //console.log(imageDataUrl);
    //console.log('medicine:', medicine);
    //console.log('archivedOrNot:',medicine.archived)
    //console.log(medicine.sales)
    return (
        <tr>
            {/* <td><img src={imageDataUrl} alt={medicine.image.filename} /></td> */}
            <td><img src={medicine.image} alt="Medicine Image" style={{ width: '150px', height: 'auto' }} /></td>
            <td>{medicine.name}</td>
            <td>{medicine.price}</td>
            <td>{medicine.activeIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}</td>
            <td>{medicine.medicinalUses.map((use, index) => (
                <li key={index}>{use}</li>
            ))}</td>
            <td>{medicine.sales}</td>
            {/* <td>{!medicine.sales ? '0' : medicine.sales}</td> */}
            <td>{!medicine.availableQuantity ? <span className={styles["out-of-stock"]}>Out of Stock</span> : medicine.availableQuantity}</td>
            <td><button className={styles["green-button"]} onClick={() => redirectToEdit(medicine.name)}>Edit</button></td>

            <td>

                <button
                    className={styles.archiveButton}
                    onClick={() => archiveMedicine(medicine.name)}
                    disabled={medicine.archived}

                >
                    Archive
                </button>
                <br />
                <button
                    className={styles.unarchiveButton}
                    onClick={() => UnarchiveMedicine(medicine.name)}
                    disabled={!medicine.archived}
                >
                    UnArchive
                </button>

            </td>

        </tr >
    )
}

export default PharmacistMedicineDetails