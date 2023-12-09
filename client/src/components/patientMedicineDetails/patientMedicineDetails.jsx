import React, { useEffect, useState } from 'react';

import styles from './patientMedicineDetails.module.css'
import medImage from '../../assests/images/medicineImage.jpg';

const PatientMedicineDetails = ({ medicine, addToCart,getAlternatives }) => {
    // Convert the Buffer data into a data URL
    // const imageDataUrl = `data:${medicine.image.contentType};base64,${medicine.image.data.toString('base64')}`;
    //console.log(getAlternatives(medicine.activeIngredients[0]))
    //const alternatives = getAlternatives(medicine.activeIngredients[0]);
    //console.log(medicine.activeIngredients)
    //console.log(imageDataUrl);


    const [alternatives, setAlternatives] = useState([]);

    useEffect(() => {
        const fetchAlternatives = async () => {
            const alternativesData = await getAlternatives(medicine.activeIngredients[0]);
            if (alternativesData !== null) {
                setAlternatives(alternativesData);
            }
        };

        fetchAlternatives();
    }, [getAlternatives, medicine.activeIngredients]);


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
            <td>
                {!medicine.availableQuantity ? <span className={styles["out-of-stock"]}>Out of Stock</span> : (<button className={styles["green-button"]} onClick={() => addToCart(medicine.name)}>Add to Cart</button>)}

            </td>

            <td>
                {!medicine.availableQuantity ? (
                    (alternatives.length>0)?
                    <>
                    <span className={styles["alter"]}>Alternatives</span>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ul style={{ listStyleType: 'disc', margin: '0.5em 0 0 1em', padding: '0' }}>
                        {alternatives.map((alt, index) => (
                            <li key={index} style={{ margin: '0.5em 0', padding: '0' }}>
                                {alt}
                            </li>
                        ))}
                      </ul>
                    </div>
                    </>
                    :<span className={styles["out-of-stock"]}>No Alternatives</span> 
                ) : (<></>)}
            </td>
        </tr>
    )
}

export default PatientMedicineDetails