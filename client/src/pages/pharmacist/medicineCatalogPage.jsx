import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './medicinalUsesDDL.module.css';

//components
import PharmacistMedicineDetails from '../../components/pharmacistMedicineDetails/pharmacistMedicineDetails';
import MedicineSearchBar from '../../components/medicineSearchBar/medicineSearchBar'
import { useNavigate } from 'react-router-dom';

const MedicineCatalog = () => {
    const navigate = useNavigate();

    //new part
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');
    console.log(accessToken);
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
                'User-type': 'pharmacist',
            },
        })
            .then((response) => {
                console.log(response);
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
                const response = await axios.get('http://localhost:8000/pharmacist/medicineCatalog', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // console.log('Response:', response);
                //console.log('Response Data:', response.data);
                if (response && response.data) {
                    setMedicines(response.data);
                    setMedicinesToBeDisplay(response.data) //so that initially all medicines are displayed

                    //get unique medicinal uses to populate the filter ddl
                    const uniqueMedicinalUses = [];
                    for (const med of response.data) {
                        for (const use of med.medicinalUses) {
                            if (!uniqueMedicinalUses.includes(use.toLowerCase())) {
                                uniqueMedicinalUses.push(use.toLowerCase())
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

    //Archive Medicine
    const archiveMedicine = async (medName) => {
        try {
            console.log('Medicine Name:', medName);
            const response = await axios.post(`http://localhost:8000/pharmacist/medicineCatalog/${medName}`);
            console.log('Response:', response);

            if (response.data.success) {

                setMedicines(medicines => medicines.map(med => {
                    if (med.name === medName) {
                        return { ...med, archived: true };
                    }
                    return med;
                }));

                alert('archived successfully!')
                window.location.reload()

            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error archiving item :', error);
            if (error.response && error.response.status === 400) {
                alert("Bad Request: " + error.response.data.message);
            }
        }
    };

    //UnArchive Medicine
    const UnarchiveMedicine = async (medName) => {
        try {
            console.log('Medicine Name:', medName);
            const response = await axios.post(`http://localhost:8000/pharmacist/medicineCatalog/unarch/${medName}`);
            console.log('Response:', response);

            if (response.data.success) {
                setMedicines(medicines => medicines.map(med => {
                    if (med.name === medName) {
                        return { ...med, archived: false };
                    }
                    return med;
                }));
                alert('Unarchived successfully!')
                window.location.reload()
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error Unarchiving item :', error);
            if (error.response && error.response.status === 400) {
                alert("Bad Request: " + error.response.data.message);
            }
        }
    };

    //Redirect to View Cart
    const redirectToEdit = async (medName) => {

        try {
            navigate('/pharmacist/editMedicine', { state: { medName: medName } })
        } catch (error) {
            console.error('Failed to edit: ', error);
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
                            <th>Sold</th>
                            <th>Available Quantity</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicinesToBeDisplay && medicinesToBeDisplay.map((medicine) => {
                                return <PharmacistMedicineDetails key={medicine._id} medicine={medicine} redirectToEdit={redirectToEdit} archiveMedicine={archiveMedicine} UnarchiveMedicine={UnarchiveMedicine} />
                            })
                        }
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default MedicineCatalog;
