import React from 'react';

// Axios
import axios from 'axios';

// Styles
import styles from './viewPatientsPage.module.css';

// User Defined Components
import { PatientCard } from '../../../components/patientCard/patientCard';
import { SearchBar } from '../../../components/searchBar/searchBar';

// React Router DOM
import { useNavigate } from 'react-router-dom';

// Hooks
import { useFetch } from '../../../components/hooks/useFetch';
import { useState, useEffect } from 'react';

// User Defined Hooks
import { useAuth } from '../../../components/hooks/useAuth';

export const ViewPatients = () => {
    // const {accessToken} = useAuth();
    const accessToken = sessionStorage.getItem('accessToken');

    async function checkAuthentication() {
        await axios ({
            method: 'get',
            url: `http://localhost:5000/authentication/checkAccessToken`,
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'doctor',
            },
        })
        .then((response) => {
            console.log(`Username: ${sessionStorage.getItem("username")}`);
            console.log(`User Type: ${sessionStorage.getItem("userType")}`);

            console.log(response);
        })
        .catch((error) => {
          navigate('/login');
        });
    }

    // Check that user is authenticated to view this page
    checkAuthentication();

    const [response] = useFetch('get', 'http://localhost:5000/doctor/patients', {}, {}, {accessToken: accessToken}); // To store the response of the request
    const [patients, setPatients] = useState([]); // To store the patients that will be displayed in cards
    const [patientInfo, setPatientInfo] = useState(""); // To store the patient that was clicked
    const [startAppointmentsDate, setStartAppointmentsDate] = useState(new Date(-8640000000000000));
    const [endAppointmentsDate, setEndAppointmentsDate] = useState(new Date(8640000000000000));
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate(); // To redirect to another page

    useEffect(() => {
        if (patientInfo !== "") {
            navigate('/doctor/viewPatientInfoPage', { state: patientInfo });
        }
    },[patientInfo]);

    useEffect(() => {
        const list = [];

        if(response !== undefined && response.patients !== undefined) {
            for (let i = 0; i < response.patients.length; i++) {
                list.push(response.patients[i]);
            }

            setPatients(list);
        }

    }, [response]);
    
    // Functions
    function handleSearch(name) {
        const list = [];

        if (response !== undefined && response.patients !== undefined) {
            for (let i = 0; i < response.patients.length; i++) {
                let name1 = name.toUpperCase();
                let name2 = response.patients[i].name.toUpperCase();
    
                if (name2.indexOf(name1) === 0) {
                    list.push(response.patients[i]);
                }
            }
    
            setPatients(list);
        }
    }

    function handleFilterClick() {
        // Search over each patient and check whether any of his appointments is greater than the current appointment
        // If yes, then add him to the list
        // If no, then don't add him to the list
        const list = [];
        const date = new Date();
        setStartAppointmentsDate(date);
        setEndAppointmentsDate(new Date(8640000000000000));
        setShowError(false);
        setErrorMessage("");
        
        if (response !== undefined && response.patients !== undefined) {
            for (let i = 0; i < response.patients.length; i++) {
                for (let j = 0; j < response.patients[i].appointments.length; j++) {
                    let appointmentDate = new Date(response.patients[i].appointments[j].date);
    
                    if (appointmentDate >= date) {
                        list.push(response.patients[i]);
                        break;
                    }
                }
            }
            setPatients(list);
        }
    }

    function handleUpcomingAppointmentsClick() {
        const list = [];
        setStartAppointmentsDate(new Date(-8640000000000000));
        setEndAppointmentsDate(new Date(8640000000000000));
        setShowError(false);
        setErrorMessage("");
        
        if (response !== undefined && response.patients !== undefined) {
            for (let i = 0; i < response.patients.length; i++) {
                for (let j = 0; j < response.patients[i].appointments.length; j++) {
                    let appointmentStatus = response.patients[i].appointments[j].status;
    
                    if (appointmentStatus === "upcoming") {
                        list.push(response.patients[i]);
                        break;
                    }
                }
            }
            setPatients(list);
        }
    }

    function handleStartDatePickerClick(date) {
        if (date > endAppointmentsDate) {
            setErrorMessage("Start date must be before end date");
            setShowError(true);
            setPatients([]);
        } else {
            const list = [];
            setStartAppointmentsDate(date);
            setShowError(false);
            setErrorMessage("");
    
            if (response !== undefined && response.patients !== undefined) {
                for (let i = 0; i < response.patients.length; i++) {
                    for (let j = 0; j < response.patients[i].appointments.length; j++) {
                        let appointmentDate = new Date(response.patients[i].appointments[j].date);
        
                        if (appointmentDate >= date && appointmentDate <= endAppointmentsDate) {
                            list.push(response.patients[i]);
                            break;
                        }
                    }
                }
                setPatients(list);
            }
        }
    }

    function handleEndDatePickerClick(date) {

        if (date < startAppointmentsDate) {
            setErrorMessage("End date must be after start date");
            setShowError(true);
            setPatients([]);
        } else {
            const list = [];
            setEndAppointmentsDate(date);
            setShowError(false);
            setErrorMessage("");
    
            if (response !== undefined && response.patients !== undefined) {
                for (let i = 0; i < response.patients.length; i++) {
                    for (let j = 0; j < response.patients[i].appointments.length; j++) {
                        let appointmentDate = new Date(response.patients[i].appointments[j].date);
        
                        if (appointmentDate <= date && appointmentDate >= startAppointmentsDate) {
                            list.push(response.patients[i]);
                            break;
                        }
                    }
                }
                setPatients(list);
            }
        }
    }


    function handleCardClick(patient_username) {
        // Set the detailed patient to the patient that was clicked
        // Redirect to the patient's page
        if (response !== undefined && response.patients !== undefined) {
            let patient = null;
            for (let i = 0; i < response.patients.length; i++) {
                if (response.patients[i].username === patient_username) {
                    patient = response.patients[i];
                    break;
                }
            }
            
            if (patient !== null) {
                setPatientInfo(patient);
            }
        }
    }

    function handleClearSearchFilter() {
        // Clear the search bar
        // Clear the filter
        // Clear the date picker
        // Set the patients to the original list
        setStartAppointmentsDate(new Date(-8640000000000000));
        setEndAppointmentsDate(new Date(8640000000000000));
        setShowError(false);
        setErrorMessage("");
        if (response !== undefined && response.patients !== undefined) {
            setPatients(response.patients);
        }
    }
    
    return (
        <div className={styles['page-body-div']}>
            <div className={styles['page-search-div']}>
                <SearchBar handleSearch={handleSearch} handleFilterClick={handleFilterClick} handleStartDatePickerClick={handleStartDatePickerClick} handleEndDatePickerClick={handleEndDatePickerClick} handleClearSearchFilter={handleClearSearchFilter} handleUpcomingAppointmentsClick={handleUpcomingAppointmentsClick}/>
            </div>
            <div className={styles['page-cards-div']}>
                {
                    patients && patients.map((patient, index) => {
                        return <PatientCard key={index} patient={patient} handleCardClick={handleCardClick} />
                    })
                }
                {
                    showError && (
                        <div className={styles['error-div']}>
                            <a className={styles['error-message-a']}>{errorMessage}</a>
                        </div>
                    )
                }
            </div>
        </div>
    );
};