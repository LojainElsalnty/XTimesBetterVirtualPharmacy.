import React, { useState, useEffect } from 'react';
import styles from './ViewAppointmentsPage.module.css';
import AppointmentList from '../../../components/appointmentList/appointmentList';

// Axios
import axios from 'axios';

// React Router DOM
import { useNavigate } from 'react-router-dom';

const ViewAppointments = () => {

    // State variables
    const [appointments, setAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(false);
    const [doctorName,setDoctorName] = useState("");

    const navigate = useNavigate();  

//Authenticate part
    const accessToken = sessionStorage.getItem('accessToken');
    const [load, setLoad] = useState(true);
    const [username, setUsername] = useState('');
    
    
    useEffect(() => {
        if (username.length != 0) {
            setLoad(false);
        }
    }, [username]);
    async function checkAuthentication() {
        await axios({
            method: 'get',
            url: 'http://localhost:5000/authentication/checkAccessToken',
            headers: {
                "Content-Type": "application/json",
                'Authorization': accessToken,
                'User-type': 'patient',
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

    //Authenticate part

    // function to get upcoming appointments
    const getUpcomingAppointments = async (currentUser) => {
        const response = await fetch(`http://localhost:5000/patient/appointment/upcomingAppointments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setAppointments(data);
        } else {
            throw new Error('Error filtering appointments by status');
        }
    };

    // function to get past appointments
    const getPastAppointments = async (currentUser) => {
        const response = await fetch(`http://localhost:5000/patient/appointment/pastAppointments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setAppointments(data);
        } else {
            throw new Error('Error filtering appointments by status');
        }
    };

    const getBookedAppointments = async (currentUser) => {
        const response = await fetch(`http://localhost:5000/patient/appointment/bookedAppointments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setAppointments(data);
        } else {
            throw new Error('Error filtering appointments by status');
        }
    };

    // function to handle form submit
    const handleUpcomingAppointments = async (event) => {
        //const currentUser = "ahmed"
        const currentUser = username
        console.log(currentUser)
        await getUpcomingAppointments(currentUser);
        
        setShowAppointments(true);
    };

    const handlePastAppointments = async (event) => {
        //const currentUser = "ahmed"
        const currentUser = username
        await getPastAppointments(currentUser);
        setShowAppointments(true);
    };

    const handleBookedAppointments = async (event) => {
        //const currentUser = "ahmed"
        const currentUser = username
        await getBookedAppointments(currentUser);
        setShowAppointments(true);
    };

   

    //Authenticate
    if (load) {
        return (<div>Loading</div>)
    }

    // Render the component
    return (
        <div>
            <h1>Appointments</h1>
            <button className={styles["button"]} type="submit" onClick={handleUpcomingAppointments}>Upcoming Appointments</button>
            <button className={styles["button-2"]} type="submit" onClick={handlePastAppointments}>Past Appointments</button>
            <button className={styles["button-2"]} type="submit" onClick={handleBookedAppointments}>Booked Appointments</button>
            {showAppointments && 
                
                <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((appointment) => {
                                return <AppointmentList key={appointment._id} appointment={appointment} />
                        })
                    }
                </tbody>
              </table>
            }
        </div>
    );
};

export default ViewAppointments;