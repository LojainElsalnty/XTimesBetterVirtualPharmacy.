import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './medicinalUsesDDL.module.css';


//components
import PatientMedicineDetails from '../../components/patientMedicineDetails/patientMedicineDetails';
import MedicineSearchBar from '../../components/medicineSearchBar/medicineSearchBar'

import { useNavigate } from 'react-router-dom';

const MedicineCatalog = () => {
    const navigate = useNavigate();

    //new part
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');
    //console.log(accessToken);
    useEffect(() => {
        if (username.length != 0) {
            setLoad(false);
        }
    }, [username]);
    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: 'http://localhost:8000/authentication/checkAccessToken',
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
            },
        })
            .then((response) => {
                //console.log(response);
                setUsername(response.data.username);
                //setLoad(false);
            })
            .catch((error) => {
                //setLoad(false);
                navigate('/login');

            });
    }

    const xTest = checkAuthentication();

    const [medicines, setMedicines] = useState([]);

    //search related
    const [medicineName, setMedicineName] = useState('');
    //filter related
    const [medicinalUses, setMedicinalUses] = useState([]);
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState('')
    //const [medicineFilterResult, setMedicineFilterResult] = useState([])
    //for display
    const [medicinesToBeDisplay, setMedicinesToBeDisplay] = useState([]);

    useEffect(() => {

        const fetchAllMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:8000/patient/medicineCatalog', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response && response.data) {
                    // Filter medicines based on isOTC property
                    const otcMedicines = response.data.filter(medicine => medicine.isOTC === true);

                    setMedicines(otcMedicines);
                    setMedicinesToBeDisplay(otcMedicines);

                    // get unique medicinal uses to populate the filter ddl
                    const uniqueMedicinalUses = [];
                    for (const med of otcMedicines) {
                        for (const use of med.medicinalUses) {
                            if (!uniqueMedicinalUses.includes(use.toLowerCase())) {
                                uniqueMedicinalUses.push(use.toLowerCase());
                            }
                        }
                    }
                    setMedicinalUses(uniqueMedicinalUses);
                }
            } catch (error) {
                throw new Error('Invalid response data');
            }
        };

        fetchAllMedicines();
    }, []);


    //search function
    const handleSearch = (name) => {
        setMedicineName(name);
        const searchResult = medicines.filter((medicine) => medicine.name.toLowerCase().startsWith(name.toLowerCase()))
        setMedicinesToBeDisplay(searchResult)
        setSelectedMedicinalUse(" ");

    }
    //clear search
    const handleClearSearch = () => {
        setMedicinesToBeDisplay(medicines)
        setSelectedMedicinalUse(" ");
    }

    //filter function
    const handleFilter = (event) => {
        //console.log(event.target.value)
        setSelectedMedicinalUse(event.target.value);
        if (event.target.value === " ") {
            setMedicinesToBeDisplay(medicines)
        }
        else {
            //.some() was added to loop over the medicinal uses array and compare each use.toLowerCase with selectedUse [case insensitive filter]
            const filterResult = medicines.filter((medicine) => {
                return medicine.medicinalUses.some((use) =>
                    use.toLowerCase() === event.target.value.toLowerCase()
                );
            });
            setMedicinesToBeDisplay(filterResult)
        }

    };

    //Add to cart method
    const addToCart = async (medName) => {
        try {
            const existingCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];


            const response = await axios.post('http://localhost:8000/patient/medicineCatalog', { cartItems: existingCartItems, medName });
            if (response.data.success) {
                alert('added successfully!')
                sessionStorage.setItem('cartItems', JSON.stringify(response.data.cartItems));
            } else {
                //console.log(response.data.message);
                alert("insufficient stock!")
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            if (error.response && error.response.status === 400) {
                alert("Bad Request: " + error.response.data.message);
            }
        }
    };

    //GetAlternatives Method
    const getAlternatives = async (actveIng) => {
        try {
            //const existingCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            const response = await axios.get(`http://localhost:8000/patient/medicineCatalog/alternatives/${actveIng}`);
            if (response.data.success) {
                //alert('alternatives success!')
                //console.log(response.data.medicineNames)
                return response.data.medicineNames;

            } else {
                console.log(response.data.message);
                //alert("insufficient stock!")
            }
        } catch (error) {
            //console.error('Error adding item to cart:', error);
            if (error.response && error.response.status === 400) {
                alert("Bad Request: " + error.response.data.message);
            }
        }
    };

    //Redirect to View Cart
    const redirectToViewCart = async () => {
        try {
            // Fetch cartItems from BE
            const response = await axios.get('http://localhost:8000/patient/medicineCatalog/viewCart');
            const cartItems = response.data.cartItems;
            // Redirect to myCart
            //window.location.href = `/myCart?cartItems=${JSON.stringify(cartItems)}`;
            navigate('/patient/myCart', { state: { cartItems: cartItems } })
        } catch (error) {
            console.error('Error retrieving cartItems:', error);
        }
    };

    if (load) {
        return (<div>Loading</div>)
    }


    return (
        <>

            <h1 className={styles["list-title"]}>Medicines List</h1>
            <MedicineSearchBar onSearch={handleSearch} onClear={handleClearSearch} />
            <div className={styles["ddl-container"]}>
                <label className={styles["ddl-label"]}>Select Medicinal Use:</label>
                <select className={styles["ddl-select"]} value={selectedMedicinalUse} onChange={handleFilter}>
                    <option value=" ">No filter</option>
                    {
                        medicinalUses && medicinalUses.map((use, index) => (
                            <option key={index} value={use}>
                                {use}
                            </option>
                        ))}
                </select>
            </div>
            < div className={styles["result-container"]}>
                <table className={styles.pharmacistTable}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price (LE)</th>
                            <th>Active Ingredients</th>
                            <th>Medicinal Uses</th>
                            <th></th>
                            <th className={styles["cart-th"]}> <button className={styles["cart-button"]} onClick={redirectToViewCart}>View Cart  </button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicinesToBeDisplay && medicinesToBeDisplay.map((medicine) => {
                                return <PatientMedicineDetails key={medicine._id} medicine={medicine} addToCart={addToCart} getAlternatives={getAlternatives} />
                            })
                        }
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default MedicineCatalog;
